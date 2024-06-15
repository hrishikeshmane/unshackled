import { z } from 'zod'
import { 
    protectedProcedure,
  publicProcedure,
  createTRPCRouter,
  adminOrVendorProcedure
} from '../trpc'
import { TRPCError } from '@trpc/server'
import { stripe } from '~/lib/stripe'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { order, orderItem, vendor } from '~/server/db/schema'
import { env } from '~/env'

export const paymentRouter = createTRPCRouter({
  buyProduct: protectedProcedure
    .input(z.object({ productIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
        const { productIds } = input
        if (productIds.length === 0) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'No products selected'
            })
        }
        const productId = productIds[0]

        const product = await ctx.db.query.product.findFirst({
            where: (table) => eq(table.id, String(productId)),
          });
        
        const vendor = await ctx.db.query.vendor.findFirst({
            where: (table) => eq(table.userId, String(product?.creatorId)),
          });

            if (!product) {
                throw new TRPCError({
                code: "NOT_FOUND",
                message: "Product not found",
                });
            }

            if (!vendor) {
                throw new TRPCError({
                code: "NOT_FOUND",
                message: "Vendor not found",
                });
            }
            const order_create = await ctx.db.insert(order).values({
                isPaid: false,
                orderTotal: product.price,
                customerId: ctx.session.userId,
              }).returning();

            const orderItem_create = await ctx.db.insert(orderItem).values({
                isFulfilled: false,
                orderId: String(order_create[0]!.id),
                storeId: String(product.storeId),
                productId: String(productId),
                vendorPayout: false,
                }).returning();
        
        
            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                line_items: [
                  {
                    price_data: {
                      currency: "usd",
                      unit_amount: Math.round((Number(product.price)) * 100),
                      product_data: {
                        name: product.name,
                        images: [product.imageUrl], 
                      },
                    },
                    quantity: 1,
                  },
                ],
                payment_intent_data: {
                  application_fee_amount: Math.round((Number(product.price)) * 100) * 0.1,
                  transfer_data: {
                    destination: String(vendor.stripeConnectedId),
                  },
                },
          
                success_url:
                    `${env.NEXT_PUBLIC_SERVER_URL}/marketplace/payment/success`,
                cancel_url:
                     `${env.NEXT_PUBLIC_SERVER_URL}/marketplace/payment/cancel`,
                metadata: {
                      orderId: order_create[0]!.id,
                  },
              });
            
          return { sessionUrl: String(session.url)};
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
            refresh_url:
              `${env.NEXT_PUBLIC_SERVER_URL}/vendor/billing`,
          return_url:
              `${env.NEXT_PUBLIC_SERVER_URL}/vendor/return/${user?.stripeConnectedId}`,
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
          String(user?.stripeConnectedId)
        );

        return { url: loginLink.url };
    }),

});
