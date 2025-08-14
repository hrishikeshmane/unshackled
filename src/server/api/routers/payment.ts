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
            isDownPayment: z.boolean(),
            refNumber: z.string(),
            orderPrice: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const log = new Logger().with({
        userId: ctx.session.userId,
        procedure: "buyProduct",
        itemCount: input.items.length,
      });

      log.info("Starting buyProduct procedure");

      const { items } = input;
      if (items.length === 0) {
        log.warn("No products selected in request");
        await log.flush();
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No products selected",
        });
      }

      try {
        const products = await Promise.all(
          items.map(async (item) => {
            const product = await ctx.db.query.product.findFirst({
              where: (table) => eq(table.id, String(item.productId)),
            });
            if (!product) {
              log.warn("Product not found", {
                productId: item.productId,
              });
              throw new TRPCError({
                code: "NOT_FOUND",
                message: `Product with ID ${item.productId} not found`,
              });
            }
            return {
              ...product,
              quantity: item.quantity,
              isDownPayment: item.isDownPayment,
              orderPrice: item.orderPrice,
              refNumber: item.refNumber,
            };
          }),
        );
        log.debug("Products fetched successfully", {
          productIds: products.map((p) => p.id),
          productCount: products.length,
        });

        try {
          const vendor = await ctx.db.query.vendor.findFirst({
            where: (table) => eq(table.userId, String(products[0]?.creatorId)),
          });

          if (!vendor) {
            log.warn("Vendor not found", {
              vendorId: String(products[0]?.creatorId),
            });
            await log.flush();
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Vendor not found",
            });
          }

          log.debug("Vendor found", {
            vendorId: vendor.userId,
            hasStripeConnect: !!vendor.stripeConnectedId,
          });

          const user = await currentUser();
          if (!user) {
            log.warn("Current user not found");
            await log.flush();
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "User not found",
            });
          }

          log.debug("Current user fetched", {
            userEmail: user.emailAddresses[0]?.emailAddress
              ? user.emailAddresses[0]?.emailAddress.replace(
                  /(.{2})(.*)(@.*)/,
                  "$1***$3",
                )
              : "no email",
          });

          let totalOrderAmount = 0;
          let totalCommissionAmount = 0;

          const lineItems = products.map((product) => {
            const finalPrice = product.orderPrice;
            const [commissionAmount, vendorAmount] =
              calculateCommissionAndVendorAmount(
                Number(finalPrice),
                product.quantity,
                Number(product.commission),
                product.commissionType,
              );

            totalOrderAmount += Number(finalPrice) * product.quantity;
            totalCommissionAmount += commissionAmount;

            return {
              price_data: {
                currency: "usd",
                unit_amount: Math.round(Number(finalPrice) * 100),
                product_data: {
                  name: product.name,
                  images: [product.imageUrl],
                },
              },
              quantity: product.quantity,
            };
          });

          log.debug("Line items created", {
            lineItemCount: lineItems.length,
            totalOrderAmount,
            totalCommissionAmount,
          });

          try {
            const order_create = await ctx.db
              .insert(order)
              .values({
                isPaid: false,
                orderTotal: String(totalOrderAmount),
                vendorAmount: String(totalOrderAmount - totalCommissionAmount),
                customerId: ctx.session.userId,
              })
              .returning();

            if (!order_create || order_create.length === 0) {
              log.error("Failed to create order record");
              await log.flush();
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message:
                  "Could not create an order at this time. Please try again later",
              });
            }

            log.info("Order record created successfully", {
              orderId: order_create[0]!.id,
              orderTotal: totalOrderAmount,
              vendorAmount: totalOrderAmount - totalCommissionAmount,
            });

            try {
              await Promise.all(
                products.map((product) =>
                  ctx.db.insert(orderItem).values({
                    isFulfilled: false,
                    approval: "approved",
                    orderId: String(order_create[0]!.id),
                    storeId: String(product.storeId),
                    productId: String(product.id),
                    isDownPayment: product.isDownPayment,
                    quantity: product.quantity,
                    refNumber: product.refNumber,
                    vendorPayout: false,
                  }),
                ),
              );

              log.info("Order items created successfully", {
                orderId: order_create[0]!.id,
                itemCount: products.length,
              });

              try {
                const session = await stripe.checkout.sessions.create({
                  mode: "payment",
                  customer_email: user?.emailAddresses[0]?.emailAddress,
                  line_items: lineItems,
                  payment_intent_data: {
                    application_fee_amount: Math.round(
                      totalCommissionAmount * 100,
                    ),
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

                log.info("Stripe checkout session created", {
                  orderId: order_create[0]!.id,
                  sessionId: session.id,
                  hasSessionUrl: !!session.url,
                });

                await log.flush();
                return { sessionUrl: String(session.url) };
              } catch (stripeError) {
                log.error("Failed to create Stripe checkout session", {
                  error:
                    stripeError instanceof Error
                      ? stripeError.message
                      : String(stripeError),
                  orderId: order_create[0]!.id,
                });
                await log.flush();
                throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message: "Failed to create checkout session",
                });
              }
            } catch (orderItemError) {
              log.error("Failed to create order items", {
                error:
                  orderItemError instanceof Error
                    ? orderItemError.message
                    : String(orderItemError),
                orderId: order_create[0]!.id,
              });
              await log.flush();
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create order items",
              });
            }
          } catch (orderCreateError) {
            log.error("Failed to create order", {
              error:
                orderCreateError instanceof Error
                  ? orderCreateError.message
                  : String(orderCreateError),
            });
            await log.flush();
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message:
                "Could not create an order at this time. Please try again later",
            });
          }
        } catch (vendorError) {
          if (vendorError instanceof TRPCError) {
            throw vendorError;
          }
          log.error("Error fetching vendor", {
            error:
              vendorError instanceof Error
                ? vendorError.message
                : String(vendorError),
            vendorId: products[0]?.creatorId,
          });
          await log.flush();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error fetching vendor information",
          });
        }
      } catch (productError) {
        if (productError instanceof TRPCError) {
          throw productError;
        }
        log.error("Error fetching products", {
          error:
            productError instanceof Error
              ? productError.message
              : String(productError),
        });
        await log.flush();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching product information",
        });
      }
    }),

  // TODO: DownPayment Logic and more
  retryPayment: protectedProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const log = new Logger().with({
        userId: ctx.session.userId,
        procedure: "retryPayment",
        orderId: input.orderId,
      });

      log.info("Starting retryPayment procedure");

      const { orderId } = input;

      try {
        const orderRecord = await ctx.db.query.order.findFirst({
          where: (table) => eq(table.id, orderId),
        });

        if (!orderRecord) {
          log.warn("Order not found", { orderId });
          await log.flush();
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Order not found",
          });
        }

        log.debug("Order record found", {
          orderTotal: orderRecord.orderTotal,
          isPaid: orderRecord.isPaid,
          paymentStatus: orderRecord.paymentStatus,
        });

        try {
          const orderItems = await ctx.db.query.orderItem.findMany({
            where: (table) => eq(table.orderId, orderId),
          });

          if (orderItems.length === 0) {
            log.warn("No items found for this order", { orderId });
            await log.flush();
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "No items found for this order",
            });
          }

          log.debug("Order items found", {
            itemCount: orderItems.length,
            productIds: orderItems.map((item) => item.productId),
          });

          try {
            const products = await Promise.all(
              orderItems.map(async (item) => {
                const product = await ctx.db.query.product.findFirst({
                  where: (table) => eq(table.id, item.productId),
                });
                if (!product) {
                  log.warn("Product not found", {
                    productId: item.productId,
                    orderId,
                  });
                  throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Product with ID ${item.productId} not found`,
                  });
                }
                return { ...product, quantity: item.quantity };
              }),
            );

            log.debug("Products fetched successfully", {
              productCount: products.length,
            });

            try {
              const vendor = await ctx.db.query.vendor.findFirst({
                where: (table) =>
                  eq(table.userId, String(products[0]?.creatorId)),
              });

              if (!vendor) {
                log.warn("Vendor not found", {
                  vendorId: String(products[0]?.creatorId),
                  orderId,
                });
                await log.flush();
                throw new TRPCError({
                  code: "NOT_FOUND",
                  message: "Vendor not found",
                });
              }

              log.debug("Vendor found", {
                vendorId: vendor.userId,
                hasStripeConnect: !!vendor.stripeConnectedId,
              });

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

              log.debug("Line items created", {
                lineItemCount: lineItems.length,
                totalCommissionAmount,
              });

              try {
                const user = await currentUser();
                if (!user) {
                  log.warn("Current user not found");
                  await log.flush();
                  throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User not found",
                  });
                }

                log.info("Creating Stripe checkout session for retry payment");

                try {
                  const session = await stripe.checkout.sessions.create({
                    mode: "payment",
                    customer_email: user?.emailAddresses[0]?.emailAddress,
                    line_items: lineItems,
                    payment_intent_data: {
                      application_fee_amount: Math.round(
                        totalCommissionAmount * 100,
                      ),
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

                  log.info(
                    "Stripe checkout session created for retry payment",
                    {
                      orderId,
                      sessionId: session.id,
                      hasSessionUrl: !!session.url,
                    },
                  );

                  await log.flush();
                  return { sessionUrl: String(session.url) };
                } catch (stripeError) {
                  log.error(
                    "Failed to create Stripe checkout session for retry",
                    {
                      error:
                        stripeError instanceof Error
                          ? stripeError.message
                          : String(stripeError),
                      orderId,
                    },
                  );
                  await log.flush();
                  throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create checkout session",
                  });
                }
              } catch (userError) {
                log.error("Error fetching current user", {
                  error:
                    userError instanceof Error
                      ? userError.message
                      : String(userError),
                });
                await log.flush();
                throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message: "Error fetching user information",
                });
              }
            } catch (vendorError) {
              if (vendorError instanceof TRPCError) {
                throw vendorError;
              }
              log.error("Error fetching vendor", {
                error:
                  vendorError instanceof Error
                    ? vendorError.message
                    : String(vendorError),
              });
              await log.flush();
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Error fetching vendor information",
              });
            }
          } catch (productError) {
            if (productError instanceof TRPCError) {
              throw productError;
            }
            log.error("Error fetching products", {
              error:
                productError instanceof Error
                  ? productError.message
                  : String(productError),
            });
            await log.flush();
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Error fetching product information",
            });
          }
        } catch (orderItemsError) {
          if (orderItemsError instanceof TRPCError) {
            throw orderItemsError;
          }
          log.error("Error fetching order items", {
            error:
              orderItemsError instanceof Error
                ? orderItemsError.message
                : String(orderItemsError),
            orderId,
          });
          await log.flush();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error fetching order items",
          });
        }
      } catch (orderError) {
        if (orderError instanceof TRPCError) {
          throw orderError;
        }
        log.error("Error fetching order", {
          error:
            orderError instanceof Error
              ? orderError.message
              : String(orderError),
          orderId,
        });
        await log.flush();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching order information",
        });
      }
    }),

  // TODO: if product required approval, clear all records from requestapproval table and formresponses table
  refundOrder: adminOrVendorProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const log = new Logger().with({
        userId: ctx.session.userId,
        procedure: "refundOrder",
        orderId: input.orderId,
      });

      log.info("Starting refundOrder procedure");

      const { orderId } = input;

      try {
        const orderRecord = await ctx.db.query.order.findFirst({
          where: (table) => eq(table.id, orderId),
        });

        if (!orderRecord) {
          log.warn("Order not found", { orderId });
          await log.flush();
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Order not found",
          });
        }

        log.debug("Order record found", {
          orderTotal: orderRecord.orderTotal,
          isPaid: orderRecord.isPaid,
          paymentStatus: orderRecord.paymentStatus,
          hasPaymentIntent: !!orderRecord.paymentIntentId,
        });

        const paymentIntentId = orderRecord.paymentIntentId;
        if (!paymentIntentId) {
          log.warn("No payment intent associated with this order", { orderId });
          await log.flush();
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "No payment intent associated with this order",
          });
        }

        try {
          log.info("Retrieving payment intent from Stripe", {
            paymentIntentId,
            orderId,
          });

          const paymentIntent =
            await stripe.paymentIntents.retrieve(paymentIntentId);

          log.debug("Payment intent retrieved", {
            paymentIntentStatus: paymentIntent.status,
            paymentIntentAmount: paymentIntent.amount,
          });

          if (paymentIntent.status === "succeeded") {
            log.info("Initiating refund for successful payment", {
              paymentIntentId,
              orderId,
            });

            try {
              const refund = await stripe.refunds.create({
                payment_intent: paymentIntentId,
                refund_application_fee: true, // Refund the application fee
                reverse_transfer: true, // Reverse the transfer to the vendor
              });

              log.info("Refund created successfully", {
                refundId: refund.id,
                refundStatus: refund.status,
                refundAmount: refund.amount,
              });

              try {
                await ctx.db
                  .update(order)
                  .set({
                    paymentStatus: "Refund Initiated",
                  })
                  .where(eq(order.id, orderId));

                log.info("Order updated with refund status", { orderId });

                await log.flush();
                return { refundId: refund.id, status: refund.status };
              } catch (dbUpdateError) {
                log.error("Failed to update order with refund status", {
                  error:
                    dbUpdateError instanceof Error
                      ? dbUpdateError.message
                      : String(dbUpdateError),
                  orderId,
                });
                // Still return the refund info since the refund was successful
                await log.flush();
                return { refundId: refund.id, status: refund.status };
              }
            } catch (refundError) {
              log.error("Failed to create refund", {
                error:
                  refundError instanceof Error
                    ? refundError.message
                    : String(refundError),
                paymentIntentId,
              });
              await log.flush();
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to process refund",
              });
            }
          } else {
            log.info("Cancelling payment intent", {
              paymentIntentId,
              paymentIntentStatus: paymentIntent.status,
            });

            try {
              await stripe.paymentIntents.cancel(paymentIntentId);

              log.info("Payment intent cancelled successfully", {
                paymentIntentId,
              });

              try {
                await ctx.db
                  .update(order)
                  .set({
                    paymentStatus: "Reverting Payment",
                  })
                  .where(eq(order.id, orderId));

                log.info("Order updated with payment cancelled status", {
                  orderId,
                });

                await log.flush();
                return {
                  message: "Payment was not completed and has been canceled.",
                };
              } catch (dbUpdateError) {
                log.error(
                  "Failed to update order with cancelled payment status",
                  {
                    error:
                      dbUpdateError instanceof Error
                        ? dbUpdateError.message
                        : String(dbUpdateError),
                    orderId,
                  },
                );
                // Still return success since the payment was cancelled
                await log.flush();
                return {
                  message: "Payment was not completed and has been canceled.",
                };
              }
            } catch (cancelError) {
              log.error("Failed to cancel payment intent", {
                error:
                  cancelError instanceof Error
                    ? cancelError.message
                    : String(cancelError),
                paymentIntentId,
              });
              await log.flush();
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to cancel payment",
              });
            }
          }
        } catch (stripeError) {
          log.error("Error retrieving or processing payment intent", {
            error:
              stripeError instanceof Error
                ? stripeError.message
                : String(stripeError),
            paymentIntentId,
          });
          await log.flush();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error processing payment information",
          });
        }
      } catch (orderError) {
        if (orderError instanceof TRPCError) {
          throw orderError;
        }
        log.error("Error fetching order", {
          error:
            orderError instanceof Error
              ? orderError.message
              : String(orderError),
          orderId,
        });
        await log.flush();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching order information",
        });
      }
    }),

  rejectOrder: adminOrVendorProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const log = new Logger().with({
        userId: ctx.session.userId,
        procedure: "rejectOrder",
        orderId: input.orderId,
      });

      log.info("Starting rejectOrder procedure");

      const { orderId } = input;

      try {
        const orderRecord = await ctx.db.query.order.findFirst({
          where: (table) => eq(table.id, orderId),
        });

        if (!orderRecord) {
          log.warn("Order not found", { orderId });
          await log.flush();
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Order not found",
          });
        }

        log.debug("Order record found", {
          orderTotal: orderRecord.orderTotal,
          isPaid: orderRecord.isPaid,
          paymentStatus: orderRecord.paymentStatus,
          hasPaymentIntent: !!orderRecord.paymentIntentId,
        });

        const paymentIntentId = orderRecord.paymentIntentId;
        if (!paymentIntentId) {
          log.warn("No payment intent associated with this order", { orderId });
          await log.flush();
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "No payment intent associated with this order",
          });
        }

        try {
          log.info("Retrieving payment intent from Stripe", {
            paymentIntentId,
            orderId,
          });

          const paymentIntent =
            await stripe.paymentIntents.retrieve(paymentIntentId);

          log.debug("Payment intent retrieved", {
            paymentIntentStatus: paymentIntent.status,
            paymentIntentAmount: paymentIntent.amount,
          });

          if (paymentIntent.status === "succeeded") {
            log.info("Initiating refund for rejected order", {
              paymentIntentId,
              orderId,
            });

            try {
              const refund = await stripe.refunds.create({
                payment_intent: paymentIntentId,
                refund_application_fee: true, // Refund the application fee
                reverse_transfer: true, // Reverse the transfer to the vendor
              });

              log.info("Refund created successfully", {
                refundId: refund.id,
                refundStatus: refund.status,
                refundAmount: refund.amount,
              });

              try {
                await ctx.db
                  .update(order)
                  .set({
                    paymentStatus: "Refund Initiated",
                  })
                  .where(eq(order.id, orderId));

                log.info("Order updated with refund status", { orderId });

                try {
                  await ctx.db
                    .update(orderItem)
                    .set({
                      approval: "denied",
                    })
                    .where(eq(orderItem.orderId, orderId));

                  log.info("Order items updated with denied approval status", {
                    orderId,
                  });

                  await log.flush();
                  return { refundId: refund.id, status: refund.status };
                } catch (orderItemUpdateError) {
                  log.error("Failed to update order items with denied status", {
                    error:
                      orderItemUpdateError instanceof Error
                        ? orderItemUpdateError.message
                        : String(orderItemUpdateError),
                    orderId,
                  });
                  // Still return refund info since it was successful
                  await log.flush();
                  return { refundId: refund.id, status: refund.status };
                }
              } catch (orderUpdateError) {
                log.error("Failed to update order with refund status", {
                  error:
                    orderUpdateError instanceof Error
                      ? orderUpdateError.message
                      : String(orderUpdateError),
                  orderId,
                });
                // Still return the refund info since the refund was successful
                await log.flush();
                return { refundId: refund.id, status: refund.status };
              }
            } catch (refundError) {
              log.error("Failed to create refund", {
                error:
                  refundError instanceof Error
                    ? refundError.message
                    : String(refundError),
                paymentIntentId,
              });
              await log.flush();
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to process refund",
              });
            }
          } else {
            log.info("Cancelling payment intent for rejected order", {
              paymentIntentId,
              paymentIntentStatus: paymentIntent.status,
            });

            try {
              await stripe.paymentIntents.cancel(paymentIntentId);

              log.info("Payment intent cancelled successfully", {
                paymentIntentId,
              });

              try {
                await ctx.db
                  .update(order)
                  .set({
                    paymentStatus: "Reverting Payment",
                  })
                  .where(eq(order.id, orderId));

                log.info("Order updated with payment cancelled status", {
                  orderId,
                });

                try {
                  await ctx.db
                    .update(orderItem)
                    .set({
                      approval: "denied",
                    })
                    .where(eq(orderItem.orderId, orderId));

                  log.info("Order items updated with denied approval status", {
                    orderId,
                  });

                  await log.flush();
                  return {
                    message: "Payment was not completed and has been canceled.",
                  };
                } catch (orderItemUpdateError) {
                  log.error("Failed to update order items with denied status", {
                    error:
                      orderItemUpdateError instanceof Error
                        ? orderItemUpdateError.message
                        : String(orderItemUpdateError),
                    orderId,
                  });
                  // Still return success since the payment was cancelled
                  await log.flush();
                  return {
                    message: "Payment was not completed and has been canceled.",
                  };
                }
              } catch (orderUpdateError) {
                log.error(
                  "Failed to update order with cancelled payment status",
                  {
                    error:
                      orderUpdateError instanceof Error
                        ? orderUpdateError.message
                        : String(orderUpdateError),
                    orderId,
                  },
                );
                // Still return success since the payment was cancelled
                await log.flush();
                return {
                  message: "Payment was not completed and has been canceled.",
                };
              }
            } catch (cancelError) {
              log.error("Failed to cancel payment intent", {
                error:
                  cancelError instanceof Error
                    ? cancelError.message
                    : String(cancelError),
                paymentIntentId,
              });
              await log.flush();
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to cancel payment",
              });
            }
          }
        } catch (stripeError) {
          log.error("Error retrieving or processing payment intent", {
            error:
              stripeError instanceof Error
                ? stripeError.message
                : String(stripeError),
            paymentIntentId,
          });
          await log.flush();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error processing payment information",
          });
        }
      } catch (orderError) {
        if (orderError instanceof TRPCError) {
          throw orderError;
        }

        log.error("Error fetching order", {
          error:
            orderError instanceof Error
              ? orderError.message
              : String(orderError),
          orderId: orderId,
        });
        await log.flush();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching order information",
        });
      }
    }),

  createVendorStripeAccountLink: adminOrVendorProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const log = new Logger().with({
        userId: ctx.session.userId,
        procedure: "createVendorStripeAccountLink",
        vendorUserId: input.userId,
      });

      log.info("Starting createVendorStripeAccountLink procedure");

      const { userId } = input;

      try {
        const user = await ctx.db.query.vendor.findFirst({
          where: (table) => eq(table.userId, userId),
        });

        if (!user) {
          log.warn("Vendor not found", { vendorUserId: userId });
          await log.flush();
          throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        }

        log.debug("Vendor found", {
          vendorId: user.userId,
          hasStripeConnect: !!user.stripeConnectedId,
        });

        try {
          log.info("Creating Stripe account link", {
            stripeConnectedId: user.stripeConnectedId,
          });

          const accountLink = await stripe.accountLinks.create({
            account: String(user.stripeConnectedId),
            refresh_url: `${env.NEXT_PUBLIC_SERVER_URL}/vendor/billing`,
            return_url: `${env.NEXT_PUBLIC_SERVER_URL}/vendor/return/${user?.stripeConnectedId}`,
            type: "account_onboarding",
          });

          log.info("Stripe account link created successfully", {
            hasUrl: !!accountLink.url,
          });

          await log.flush();
          return { url: accountLink.url };
        } catch (stripeError) {
          log.error("Failed to create Stripe account link", {
            error:
              stripeError instanceof Error
                ? stripeError.message
                : String(stripeError),
            stripeConnectedId: user.stripeConnectedId,
          });
          await log.flush();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create Stripe account link",
          });
        }
      } catch (userError) {
        if (userError instanceof TRPCError) {
          throw userError;
        }
        log.error("Error fetching vendor", {
          error:
            userError instanceof Error ? userError.message : String(userError),
          vendorUserId: userId,
        });
        await log.flush();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching vendor information",
        });
      }
    }),

  getVendorStripeAccountLink: adminOrVendorProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const log = new Logger().with({
        userId: ctx.session.userId,
        procedure: "getVendorStripeAccountLink",
        vendorUserId: input.userId,
      });

      log.info("Starting getVendorStripeAccountLink procedure");

      const { userId } = input;

      try {
        const user = await ctx.db.query.vendor.findFirst({
          where: (table) => eq(table.userId, userId),
        });

        if (!user) {
          log.warn("Vendor not found", { vendorUserId: userId });
          await log.flush();
          throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        }

        log.debug("Vendor found", {
          vendorId: user.userId,
          hasStripeConnect: !!user.stripeConnectedId,
        });

        try {
          log.info("Creating Stripe login link", {
            stripeConnectedId: user.stripeConnectedId,
          });

          const loginLink = await stripe.accounts.createLoginLink(
            String(user?.stripeConnectedId),
          );

          log.info("Stripe login link created successfully", {
            hasUrl: !!loginLink.url,
          });

          await log.flush();
          return { url: loginLink.url };
        } catch (stripeError) {
          log.error("Failed to create Stripe login link", {
            error:
              stripeError instanceof Error
                ? stripeError.message
                : String(stripeError),
            stripeConnectedId: user.stripeConnectedId,
          });
          await log.flush();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create Stripe login link",
          });
        }
      } catch (userError) {
        if (userError instanceof TRPCError) {
          throw userError;
        }
        log.error("Error fetching vendor", {
          error:
            userError instanceof Error ? userError.message : String(userError),
          vendorUserId: userId,
        });
        await log.flush();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching vendor information",
        });
      }
    }),
});
