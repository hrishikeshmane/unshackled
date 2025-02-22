import { stripe } from "~/lib/stripe";
import { headers } from "next/headers";
import { env } from "~/env";
import { db } from "~/server/db";
import { order, orderItem, product } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { sendCustomerOrderEmail, sendCustomerPaymentFailedEmail, sendCustomerPaymentInitiatedEmail, sendCustomerRefundSuccessfulEmail } from "~/app/_actions/emails";
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

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_CHECKOUT_WEBHOOK_SECRET,
    );
  } catch (error) {
    return new Response("Webhook error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const log = new Logger().with({ userId: session.metadata?.customerId });

      const customerId = session.metadata?.customerId;
      const orderId = session.metadata?.orderId;

      // Check for required metadata
      if (!customerId || !orderId) {
        log.error(`Missing metadata: customerId = ${customerId}, orderId = ${orderId}`);
        await log.flush();
        return new Response("Missing metadata", { status: 400 });
      }

      const orderDetails = await db
        .select()
        .from(order)
        .where(eq(order.id, String(orderId)))
        .execute();

      if (!orderDetails || orderDetails.length === 0) {
        log.error(
          `Result for orderDetails is nullish. sending 400 error code to stripe. orderDetails = ${orderDetails.toString()}`,
        );
        await log.flush();
        return new Response(null, { status: 400 });
      }

      if (orderDetails[0]?.paymentStatus === "Payment Succeeded") {
        await db
          .update(order)
          .set({
            sessionId: session.id,
          })
          .where(eq(order.id, String(orderId)))
      } else {
        await db
          .update(order)
          .set({
            paymentStatus: "Payment Initiated",
            sessionId: session.id,
          })
          .where(eq(order.id, String(orderId)))

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

        if (!result?.[0] || result.length === 0) {
          log.error(
            `Result for order is nullish. sending 400 error code to stripe. result = ${result.toString()}; orderId = ${orderId.toString()}`,
          );
          await log.flush();
          return new Response(null, { status: 400 });
        }

        const customerUser = await clerkClient.users.getUser(result[0].customerId);
        if (!customerUser) {
          log.error(`Customer user not found: customerId = ${result[0].customerId}`);
          await log.flush();
          return new Response("Customer user not found", { status: 400 });
        }

        const customerEmail = customerUser.emailAddresses[0]?.emailAddress ?? "";
        const customerFirstName = customerUser.firstName ?? "Customer User";

        await sendCustomerPaymentInitiatedEmail(
          customerEmail,
          customerFirstName,
          result[0].orderId,
          result[0].productName,
          result[0].refNumber,
          result[0].orderTotal,
        );
      }

      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const log = new Logger().with({ userId: paymentIntent.metadata?.customerId });

      const customerId = paymentIntent.metadata?.customerId;
      const orderId = paymentIntent.metadata?.orderId;

      // Check for required metadata
      if (!customerId || !orderId) {
        log.error(`[payment_intent.succeeded] Missing metadata: customerId = ${customerId}, orderId = ${orderId}`);
        await log.flush();
        return new Response("[payment_intent.succeeded] Missing metadata", { status: 400 });
      }

      const updatedOrder = await db
        .update(order)
        .set({
          isPaid: true,
          paymentStatus: "Payment Succeeded",
          paymentIntentId: paymentIntent.id as string,
        })
        .where(eq(order.id, String(orderId)))
        .returning();

      if (!updatedOrder || updatedOrder.length === 0) {
        log.error(
          `Result for updatedOrder is nullish. sending 400 error code to stripe. updatedOrder = ${updatedOrder.toString()}`,
        );
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

      if (!result?.[0] || result.length === 0) {
        log.error(
          `Result for order is nullish. sending 400 error code to stripe. result = ${result.toString()}; orderId = ${updatedOrder.toString()}`,
        );
        await log.flush();
        return new Response(null, { status: 400 });
      }

      const customerUser = await clerkClient.users.getUser(result[0].customerId);
      if (!customerUser) {
        log.error(`Customer user not found: customerId = ${result[0].customerId}`);
        await log.flush();
        return new Response("Customer user not found", { status: 400 });
      }

      const customerEmail = customerUser.emailAddresses[0]?.emailAddress ?? "";
      const customerFirstName = customerUser.firstName ?? "Customer User";

      const vendorUser = await clerkClient.users.getUser(result[0].creatorId);
      if (!vendorUser) {
        log.error(`Vendor user not found: creatorId = ${result[0].creatorId}`);
        await log.flush();
        return new Response("Vendor user not found", { status: 400 });
      }

      const vendorEmail = vendorUser.emailAddresses[0]?.emailAddress ?? "";
      const vendorFirstName = vendorUser.firstName ?? "Vendor User";

      // Trigger email to customer for successful order
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

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;
      const log = new Logger().with({ userId: paymentIntent.metadata?.customerId });

      if (!orderId) {
        return new Response("Missing orderId in payment intent failed", { status: 400 });
      }

      log.info(`Payment failed for order ${orderId}`);

      await db
        .update(order)
        .set({
          isPaid: false,
          paymentStatus: "Payment Failed",
        })
        .where(eq(order.id, String(orderId)));

      const result = await db
        .select({
          orderId: order.id,
          customerId: order.customerId,
          productId: orderItem.productId,
          storeId: product.storeId,
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

      if (!result?.[0] || result.length === 0) {
        log.error(
          `Result for order is nullish. sending 400 error code to stripe. result = ${result.toString()}; orderId = ${orderId.toString()}`,
        );
        await log.flush();
        return new Response(null, { status: 400 });
      }

      const customerUser = await clerkClient.users.getUser(result[0].customerId);
      if (!customerUser) {
        log.error(`Customer user not found: customerId = ${result[0].customerId}`);
        await log.flush();
        return new Response("Customer user not found", { status: 400 });
      }

      const customerEmail = customerUser.emailAddresses[0]?.emailAddress ?? "";
      const customerFirstName = customerUser.firstName ?? "Customer User";

      await sendCustomerPaymentFailedEmail(
        customerEmail,
        customerFirstName,
        result[0].orderId,
        result[0].productId,
        result[0].storeId,
        result[0].productName,
        result[0].refNumber,
        result[0].orderTotal,
      );
      break;
    }
    case "payment_intent.canceled": {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;

      if (!orderId) {
        return new Response("Missing orderId in payment intent", { status: 400 });
      }

      await db
        .update(order)
        .set({
          isPaid: false,
          paymentStatus: "Payment Canceled",
        })
        .where(eq(order.id, String(orderId)));
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object;
      const paymentIntentId = charge.payment_intent as string;
      const log = new Logger().with({ paymentIntentId });

      await db
        .update(order)
        .set({
          isPaid: false,
          paymentStatus: "Refund Successful",
        })
        .where(eq(order.paymentIntentId, paymentIntentId));

      const result = await db
        .select({
          orderId: order.id,
          customerId: order.customerId,
          productId: orderItem.productId,
          productName: product.name,
          refNumber: orderItem.refNumber,
          orderTotal: order.orderTotal,
        })
        .from(order)
        .innerJoin(orderItem, eq(order.id, orderItem.orderId))
        .innerJoin(product, eq(orderItem.productId, product.id))
        .where(eq(order.paymentIntentId, paymentIntentId));
    
      if (!result?.[0]) {
        log.error(`Order not found for refund. PaymentIntentId: ${paymentIntentId}`);
        await log.flush();
        break;
      }
    
      const customerUser = await clerkClient.users.getUser(result[0].customerId);
      if (!customerUser) {
        log.error(`Customer not found for refund. CustomerId: ${result[0].customerId}`);
        await log.flush();
        break;
      }
    
      await sendCustomerRefundSuccessfulEmail(
        customerUser.emailAddresses[0]?.emailAddress ?? "",
        customerUser.firstName ?? "Customer",
        result[0].orderId,
        result[0].productName,
        result[0].refNumber,
        result[0].orderTotal,
      );

      break;
    }

    default: {
      console.log("Unhandled event type:", event.type);
      return new Response(null, { status: 400 });
    }
  }

  return new Response(null, { status: 200 });
}
