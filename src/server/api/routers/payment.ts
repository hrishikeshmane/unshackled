import { z } from "zod";
import {
  protectedProcedure,
  publicProcedure,
  createTRPCRouter,
  adminOrVendorProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";
import { stripe } from "~/lib/stripe";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { order, orderItem, product } from "~/server/db/schema";
import { env } from "~/env";
import { calculateCommissionAndVendorAmount } from "~/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";

export const paymentRouter = createTRPCRouter({
  buyProduct: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            productId: z.string(),
            quantity: z.number().int().positive(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { items } = input;
      if (items.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No products selected",
        });
      }

      const products = await Promise.all(
        items.map(async (item) => {
          const product = await ctx.db.query.product.findFirst({
            where: (table) => eq(table.id, String(item.productId)),
          });
          if (!product) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Product with ID ${item.productId} not found`,
            });
          }
          return { ...product, quantity: item.quantity };
        }),
      );
      console.log("buyProduct.products", products);

      const vendor = await ctx.db.query.vendor.findFirst({
        where: (table) => eq(table.userId, String(products[0]?.creatorId)),
      });
      console.log("buyProduct.vendor", vendor);
      const user = await currentUser();

      if (!vendor) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Vendor not found",
        });
      }

      let totalOrderAmount = 0;
      let totalCommissionAmount = 0;

      const lineItems = products.map((product) => {
        const [commissionAmount, vendorAmount] =
          calculateCommissionAndVendorAmount(
            Number(product.price),
            product.quantity,
            Number(product.commission),
            product.commissionType,
          );

        totalOrderAmount += Number(product.price) * product.quantity;
        totalCommissionAmount += commissionAmount;

        return {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(Number(product.price) * 100),
            product_data: {
              name: product.name,
              images: [product.imageUrl],
            },
          },
          quantity: product.quantity,
        };
      });
      console.log("buyProduct.lineItems", lineItems);

      const order_create = await ctx.db
        .insert(order)
        .values({
          isPaid: false,
          orderTotal: String(totalOrderAmount),
          customerId: ctx.session.userId,
        })
        .returning();
      console.log("buyProduct.order_create", order_create);

      await Promise.all(
        products.map((product) =>
          ctx.db.insert(orderItem).values({
            isFulfilled: false,
            approval: "approved",
            orderId: String(order_create[0]!.id),
            storeId: String(product.storeId),
            productId: String(product.id),
            quantity: product.quantity,
            vendorPayout: false,
          }),
        ),
      );
      console.log(
        "buyProduct.orderitem created orderId=",
        String(order_create[0]!.id),
      );

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: user?.emailAddresses[0]?.emailAddress,
        line_items: lineItems,
        payment_intent_data: {
          application_fee_amount: Math.round(totalCommissionAmount * 100),
          transfer_data: {
            destination: String(vendor.stripeConnectedId),
          },
        },
        success_url: `${env.NEXT_PUBLIC_SERVER_URL}/marketplace/payment/success`,
        cancel_url: `${env.NEXT_PUBLIC_SERVER_URL}/marketplace/payment/cancel`,
        metadata: {
          orderId: order_create[0]!.id,
          customerId: ctx.session.userId,
          productIds: products.map((p) => p.id).join(","),
        },
      });
      console.log("buyProduct.session created", order_create[0]!.id);

      return { sessionUrl: String(session.url) };
    }),

  retryPayment: protectedProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { orderId } = input;

      const orderRecord = await ctx.db.query.order.findFirst({
        where: (table) => eq(table.id, orderId),
      });

      if (!orderRecord) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

      const orderItems = await ctx.db.query.orderItem.findMany({
        where: (table) => eq(table.orderId, orderId),
      });

      if (orderItems.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No items found for this order",
        });
      }

      const products = await Promise.all(
        orderItems.map(async (item) => {
          const product = await ctx.db.query.product.findFirst({
            where: (table) => eq(table.id, item.productId),
          });
          if (!product) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Product with ID ${item.productId} not found`,
            });
          }
          return { ...product, quantity: item.quantity };
        }),
      );

      const vendor = await ctx.db.query.vendor.findFirst({
        where: (table) => eq(table.userId, String(products[0]?.creatorId)),
      });

      if (!vendor) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Vendor not found",
        });
      }

      let totalCommissionAmount = 0;

      const lineItems = products.map((product) => {
        const [commissionAmount] = calculateCommissionAndVendorAmount(
          Number(product.price),
          product.quantity,
          Number(product.commission),
          product.commissionType,
        );

        totalCommissionAmount += commissionAmount;

        return {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(Number(product.price) * 100),
            product_data: {
              name: product.name,
              images: [product.imageUrl],
            },
          },
          quantity: product.quantity,
        };
      });

      const user = await currentUser();

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: user?.emailAddresses[0]?.emailAddress,
        line_items: lineItems,
        payment_intent_data: {
          application_fee_amount: Math.round(totalCommissionAmount * 100),
          transfer_data: {
            destination: String(vendor.stripeConnectedId),
          },
        },
        success_url: `${env.NEXT_PUBLIC_SERVER_URL}/marketplace/payment/success`,
        cancel_url: `${env.NEXT_PUBLIC_SERVER_URL}/marketplace/payment/cancel`,
        metadata: {
          orderId: orderRecord.id,
          customerId: ctx.session.userId,
          productIds: products.map((p) => p.id).join(","),
        },
      });

      return { sessionUrl: String(session.url) };
    }),

  refundOrder: adminOrVendorProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { orderId } = input;

      const orderRecord = await ctx.db.query.order.findFirst({
        where: (table) => eq(table.id, orderId),
      });

      if (!orderRecord) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

      const paymentIntentId = orderRecord.paymentIntentId as string;
      if (!paymentIntentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No payment intent associated with this order",
        });
      }

      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === "succeeded") {
        const refund = await stripe.refunds.create({
          payment_intent: paymentIntentId,
        });

        await ctx.db
          .update(order)
          .set({
            paymentStatus: "Refund Initiated",
          })
          .where(eq(order.id, orderId));

        return { refundId: refund.id, status: refund.status };
      } else {
        await stripe.paymentIntents.cancel(paymentIntentId);

        await ctx.db
          .update(order)
          .set({
            paymentStatus: "Reverting Payment",
          })
          .where(eq(order.id, orderId));

        return { message: "Payment was not completed and has been canceled." };
      }
    }),

  rejectOrder: adminOrVendorProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { orderId } = input;

      const orderRecord = await ctx.db.query.order.findFirst({
        where: (table) => eq(table.id, orderId),
      });

      if (!orderRecord) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

      const paymentIntentId = orderRecord.paymentIntentId as string;
      if (!paymentIntentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No payment intent associated with this order",
        });
      }

      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === "succeeded") {
        const refund = await stripe.refunds.create({
          payment_intent: paymentIntentId,
        });

        await ctx.db
          .update(order)
          .set({
            paymentStatus: "Refund Initiated",
          })
          .where(eq(order.id, orderId));

        await ctx.db
          .update(orderItem)
          .set({
            approval: "denied",
          })
          .where(eq(orderItem.orderId, orderId));

        return { refundId: refund.id, status: refund.status };
      } else {
        await stripe.paymentIntents.cancel(paymentIntentId);

        await ctx.db
          .update(order)
          .set({
            paymentStatus: "Reverting Payment",
          })
          .where(eq(order.id, orderId));

        await ctx.db
          .update(orderItem)
          .set({
            approval: "denied",
          })
          .where(eq(orderItem.orderId, orderId));

        return { message: "Payment was not completed and has been canceled." };
      }
    }),

  createVendorStripeAccountLink: adminOrVendorProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;
      const user = await ctx.db.query.vendor.findFirst({
        where: (table) => eq(table.userId, userId),
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      const accountLink = await stripe.accountLinks.create({
        account: String(user.stripeConnectedId),
        refresh_url: `${env.NEXT_PUBLIC_SERVER_URL}/vendor/billing`,
        return_url: `${env.NEXT_PUBLIC_SERVER_URL}/vendor/return/${user?.stripeConnectedId}`,
        type: "account_onboarding",
      });

      return { url: accountLink.url };
    }),

  getVendorStripeAccountLink: adminOrVendorProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const user = await ctx.db.query.vendor.findFirst({
        where: (table) => eq(table.userId, userId),
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      const loginLink = await stripe.accounts.createLoginLink(
        String(user?.stripeConnectedId),
      );

      return { url: loginLink.url };
    }),
});
