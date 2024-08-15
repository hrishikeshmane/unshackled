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
import { Logger } from "next-axiom";

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
      const log = new Logger().with({ userId: ctx.session.userId });
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
            log.info(`Product with ID ${item.productId} not found`);
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Product with ID ${item.productId} not found`,
            });
          }
          return { ...product, quantity: item.quantity };
        }),
      );
      log.debug("buyProduct.products", products);

      const vendor = await ctx.db.query.vendor.findFirst({
        where: (table) => eq(table.userId, String(products[0]?.creatorId)),
      });
      log.debug("buyProduct.vendor", vendor);
      const user = await currentUser();

      if (!vendor) {
        log.info(`Vendor not found`);
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
      log.debug("buyProduct.lineItems", lineItems);

      const order_create = await ctx.db
        .insert(order)
        .values({
          isPaid: false,
          orderTotal: String(totalOrderAmount),
          vendorAmount: String(totalOrderAmount - totalCommissionAmount),
          customerId: ctx.session.userId,
        })
        .returning();
      log.debug("buyProduct.order_create", order_create);

      if (!order_create || order_create.length === 0) {
        log.warn(
          "Could not create an order at this time. Please try again later",
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Could not create an order at this time. Please try again later",
        });
      }

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
      log.debug(
        `buyProduct.orderitem created orderId=,
        ${String(order_create[0]!.id)}`,
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
          metadata: {
            orderId: order_create[0]!.id,
            customerId: ctx.session.userId,
            productIds: products.map((p) => p.id).join(","),
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
      log.debug(`buyProduct.session created, ${order_create[0]!.id}`);
      await log.flush();
      return { sessionUrl: String(session.url) };
    }),

  retryPayment: protectedProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const log = new Logger().with({ userId: ctx.session.userId });
      const { orderId } = input;

      const orderRecord = await ctx.db.query.order.findFirst({
        where: (table) => eq(table.id, orderId),
      });

      if (!orderRecord) {
        log.info(`Order ${orderId} not found`);
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

      const orderItems = await ctx.db.query.orderItem.findMany({
        where: (table) => eq(table.orderId, orderId),
      });

      if (orderItems.length === 0) {
        log.info(`No items found for this order, ${orderItems.toString()}`);
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
            log.info(`Product with ID ${item.productId} not found`);
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
        log.info(`Vendor ${String(products[0]?.creatorId)} not found`);
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
      log.info("creating a session with stripe");
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

      await log.flush();
      return { sessionUrl: String(session.url) };
    }),

  refundOrder: adminOrVendorProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const log = new Logger().with({ userId: ctx.session.userId });
      const { orderId } = input;

      const orderRecord = await ctx.db.query.order.findFirst({
        where: (table) => eq(table.id, orderId),
      });

      if (!orderRecord) {
        log.info(`Order ${orderId} not found`);
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

      const paymentIntentId = orderRecord.paymentIntentId!;
      if (!paymentIntentId) {
        log.info(`No payment intent associated with this order ${orderId}`);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No payment intent associated with this order",
        });
      }

      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === "succeeded") {
        log.info(`Initiating a refund for order ${orderId}`);
        const refund = await stripe.refunds.create({
          payment_intent: paymentIntentId,
          refund_application_fee: true, // Refund the application fee
          reverse_transfer: true, // Reverse the transfer to the vendor
        });

        await ctx.db
          .update(order)
          .set({
            paymentStatus: "Refund Initiated",
          })
          .where(eq(order.id, orderId));
        await log.flush();
        return { refundId: refund.id, status: refund.status };
      } else {
        await stripe.paymentIntents.cancel(paymentIntentId);

        await ctx.db
          .update(order)
          .set({
            paymentStatus: "Reverting Payment",
          })
          .where(eq(order.id, orderId));
        await log.flush();
        return { message: "Payment was not completed and has been canceled." };
      }
    }),

  rejectOrder: adminOrVendorProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const log = new Logger().with({ userId: ctx.session.userId });
      const { orderId } = input;

      const orderRecord = await ctx.db.query.order.findFirst({
        where: (table) => eq(table.id, orderId),
      });

      if (!orderRecord) {
        log.info(`Order ${orderId} not found`);
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

      const paymentIntentId = orderRecord.paymentIntentId!;
      if (!paymentIntentId) {
        log.info(`No payment intent associated with this order ${orderId}`);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No payment intent associated with this order",
        });
      }

      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === "succeeded") {
        log.info(`Initiating a refund for ${orderId}`);
        const refund = await stripe.refunds.create({
          payment_intent: paymentIntentId,
          refund_application_fee: true, // Refund the application fee
          reverse_transfer: true, // Reverse the transfer to the vendor
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
        await log.flush();
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
        await log.flush();
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
