import { stripe } from "~/lib/stripe";
import { headers } from "next/headers";
import { env } from "~/env";
import { db } from "~/server/db";
import { order, orderItem, product } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { sendCustomerOrderEmail } from "~/app/_actions/emails";
import { clerkClient } from "@clerk/nextjs/server";
import { Logger } from "next-axiom";

// Not Initiated
// Payment Initiated
// Payment Succeeded
// Payment Failed
// Reverting Payment
// Payment Reverted
// Refund Initiated
// Refund Successful

export async function POST(req: Request) {
  const body = await req.text();
  const signature = String(headers().get("Stripe-Signature"));
  let event;

  const baseLogger = new Logger();

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_CHECKOUT_WEBHOOK_SECRET,
    );

    baseLogger.info("Stripe webhook event constructed", {
      eventType: event.type,
      eventId: event.id,
    });
  } catch (error) {
    baseLogger.error("Webhook construction failed", {
      error: error instanceof Error ? error.message : String(error),
      signature: signature.substring(0, 10) + "...", // Log partial signature for debugging
    });
    await baseLogger.flush();
    return new Response("Webhook error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const log = new Logger().with({
        eventType: event.type,
        sessionId: session.id,
        customerId: session.metadata?.customerId || "missing",
        orderId: session.metadata?.orderId || "missing",
      });

      log.info("Processing checkout.session.completed event");

      const customerId = session.metadata?.customerId;
      const orderId = session.metadata?.orderId;

      if (!customerId || !orderId) {
        log.error("Missing metadata in checkout session", {
          availableMetadata: session.metadata || {},
        });
        await log.flush();
        return new Response("Missing metadata", { status: 400 });
      }

      try {
        const updatedOrder = await db
          .update(order)
          .set({
            isPaid: true,
            paymentStatus: "Payment Succeeded",
            paymentIntentId: session.payment_intent as string,
            sessionId: session.id,
          })
          .where(eq(order.id, String(orderId)))
          .returning();

        log.info("Order updated with payment information", {
          orderUpdateCount: updatedOrder.length,
          paymentIntentId: session.payment_intent,
        });

        if (!updatedOrder || updatedOrder.length === 0) {
          log.error("Failed to update order record", {
            orderId,
            dbResponse: JSON.stringify(updatedOrder),
          });
          await log.flush();
          return new Response(null, { status: 400 });
        }

        const result = await db
          .select({
            orderId: order.id,
            customerId: order.customerId,
            productId: orderItem.productId,
            productName: product.name,
            refNumber: orderItem.refNumber,
            creatorId: product.creatorId,
            orderCommunicationEmail: product.orderCommunicationEmail,
            orderTotal: order.orderTotal,
          })
          .from(order)
          .innerJoin(orderItem, eq(order.id, orderItem.orderId))
          .innerJoin(product, eq(orderItem.productId, product.id))
          .where(eq(order.id, String(orderId)));

        log.info("Order details fetched", {
          resultCount: result.length,
          productIds: result.map((r) => r.productId),
        });

        if (!result?.[0] || result.length === 0) {
          log.error(
            "Result for order is nullish. sending 400 error code to stripe.",
            {
              result: JSON.stringify(result),
              orderId: JSON.stringify(updatedOrder),
            },
          );
          await log.flush();
          return new Response(null, { status: 400 });
        }

        try {
          const customerUser = await clerkClient.users.getUser(
            result[0].customerId,
          );

          log.info("Customer user fetched", {
            hasCustomerData: !!customerUser,
            customerId: result[0].customerId,
          });

          if (!customerUser) {
            log.error("Customer user not found in Clerk", {
              customerId: result[0].customerId,
            });
            await log.flush();
            return new Response("Customer user not found", { status: 400 });
          }

          const customerEmail =
            customerUser.emailAddresses[0]?.emailAddress ?? "";
          const customerFirstName = customerUser.firstName ?? "Customer User";

          const vendorUser = await clerkClient.users.getUser(
            result[0].creatorId,
          );

          log.info("Vendor user fetched", {
            hasVendorData: !!vendorUser,
            vendorId: result[0].creatorId,
          });

          if (!vendorUser) {
            log.error("Vendor user not found in Clerk", {
              vendorId: result[0].creatorId,
            });
            await log.flush();
            return new Response("Vendor user not found", { status: 400 });
          }

          const vendorEmail = vendorUser.emailAddresses[0]?.emailAddress ?? "";
          const vendorFirstName = vendorUser.firstName ?? "Vendor User";

          // Trigger email to customer for successful order
          try {
            await sendCustomerOrderEmail(
              customerEmail,
              customerFirstName,
              vendorEmail,
              result[0].orderId,
              result[0].productName,
              result[0].refNumber,
              result[0].orderCommunicationEmail,
              result[0].orderTotal,
            );

            log.info("Order confirmation email sent successfully", {
              customerEmail: customerEmail.replace(
                /(.{2})(.*)(@.*)/,
                "$1***$3",
              ), // Redact most of email
              orderId: result[0].orderId,
              productName: result[0].productName,
            });
          } catch (emailError) {
            log.error("Failed to send order confirmation email", {
              error:
                emailError instanceof Error
                  ? emailError.message
                  : String(emailError),
              customerEmail: customerEmail.replace(
                /(.{2})(.*)(@.*)/,
                "$1***$3",
              ), // Redact most of email
              orderId: result[0].orderId,
            });
          }
        } catch (userError) {
          log.error("Error fetching user data from Clerk", {
            error:
              userError instanceof Error
                ? userError.message
                : String(userError),
            customerId: result[0].customerId,
            creatorId: result[0].creatorId,
          });
          await log.flush();
          return new Response("Error fetching user data", { status: 500 });
        }
      } catch (dbError) {
        log.error("Database operation failed", {
          error: dbError instanceof Error ? dbError.message : String(dbError),
          operation: "update/select order data",
          orderId,
        });
        await log.flush();
        return new Response("Database operation failed", { status: 500 });
      }

      await log.flush();
      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;
      const log = new Logger().with({
        eventType: event.type,
        paymentIntentId: paymentIntent.id,
        orderId: orderId || "missing",
      });

      log.info("Processing payment_intent.succeeded event");

      if (!orderId) {
        log.error("Missing orderId in payment intent metadata", {
          availableMetadata: paymentIntent.metadata || {},
        });
        await log.flush();
        return new Response("Missing orderId in payment intent", {
          status: 400,
        });
      }

      try {
        const updateResult = await db
          .update(order)
          .set({
            isPaid: true,
            paymentStatus: "Payment Succeeded",
          })
          .where(eq(order.id, String(orderId)));

        log.info("Order payment status updated to succeeded", {
          orderId,
          updateResult: JSON.stringify(updateResult),
        });
      } catch (dbError) {
        log.error("Failed to update order payment status", {
          error: dbError instanceof Error ? dbError.message : String(dbError),
          orderId,
        });
      }

      await log.flush();
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;
      const log = new Logger().with({
        eventType: event.type,
        paymentIntentId: paymentIntent.id,
        orderId: orderId || "missing",
        errorCode: paymentIntent.last_payment_error?.code || "unknown",
      });

      log.info("Processing payment_intent.payment_failed event");

      if (!orderId) {
        log.error("Missing orderId in payment intent metadata", {
          availableMetadata: paymentIntent.metadata || {},
        });
        await log.flush();
        return new Response("Missing orderId in payment intent", {
          status: 400,
        });
      }

      try {
        const updateResult = await db
          .update(order)
          .set({
            isPaid: false,
            paymentStatus: "Payment Failed",
          })
          .where(eq(order.id, String(orderId)));

        log.info("Order payment status updated to failed", {
          orderId,
          failureReason: paymentIntent.last_payment_error?.message || "unknown",
          updateResult: JSON.stringify(updateResult),
        });
      } catch (dbError) {
        log.error("Failed to update order payment status", {
          error: dbError instanceof Error ? dbError.message : String(dbError),
          orderId,
        });
      }

      await log.flush();
      break;
    }
    case "payment_intent.canceled": {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;
      const log = new Logger().with({
        eventType: event.type,
        paymentIntentId: paymentIntent.id,
        orderId: orderId || "missing",
        cancellationReason: paymentIntent.cancellation_reason || "unknown",
      });

      log.info("Processing payment_intent.canceled event");

      if (!orderId) {
        log.error("Missing orderId in payment intent metadata", {
          availableMetadata: paymentIntent.metadata || {},
        });
        await log.flush();
        return new Response("Missing orderId in payment intent", {
          status: 400,
        });
      }

      try {
        const updateResult = await db
          .update(order)
          .set({
            isPaid: false,
            paymentStatus: "Payment Reverted",
          })
          .where(eq(order.id, String(orderId)));

        log.info("Order payment status updated to reverted", {
          orderId,
          updateResult: JSON.stringify(updateResult),
        });
      } catch (dbError) {
        log.error("Failed to update order payment status", {
          error: dbError instanceof Error ? dbError.message : String(dbError),
          orderId,
        });
      }

      await log.flush();
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object;
      const paymentIntentId = charge.payment_intent as string;
      const log = new Logger().with({
        eventType: event.type,
        chargeId: charge.id,
        paymentIntentId: paymentIntentId || "missing",
        amount: charge.amount_refunded,
        currency: charge.currency,
      });

      log.info("Processing charge.refunded event");

      if (!paymentIntentId) {
        log.error("Missing paymentIntentId in charge object");
        await log.flush();
        return new Response("Missing paymentIntentId in charge", {
          status: 400,
        });
      }

      try {
        const updateResult = await db
          .update(order)
          .set({
            isPaid: false,
            paymentStatus: "Refund Successful",
          })
          .where(eq(order.paymentIntentId, paymentIntentId));

        log.info("Order payment status updated to refunded", {
          paymentIntentId,
          refundAmount: charge.amount_refunded,
          refundReason: charge.refunds?.data[0]?.reason || "unknown",
          updateResult: JSON.stringify(updateResult),
        });
      } catch (dbError) {
        log.error("Failed to update order payment status for refund", {
          error: dbError instanceof Error ? dbError.message : String(dbError),
          paymentIntentId,
        });
      }

      await log.flush();
      break;
    }
    default: {
      const log = new Logger().with({
        eventType: event.type,
        eventId: event.id,
      });

      log.warn("Unhandled Stripe event type received", {
        event: event.type,
        apiVersion: event.api_version,
      });

      await log.flush();
      return new Response(null, { status: 400 });
    }
  }

  return new Response(null, { status: 200 });
}
