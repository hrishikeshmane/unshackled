import { stripe } from "~/lib/stripe";
import { headers } from "next/headers";
import { env } from "~/env";
import { db } from "~/server/db";
import { order, orderItem, product } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { sendCustomerOrderEmail } from "~/app/_actions/emails";
import { clerkClient } from "@clerk/nextjs/server";
import { log } from "node:console";
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
      const updatedOrder = await db
        .update(order)
        .set({
          isPaid: true,
          // paymentStatus: "Payment Initiated",
          paymentStatus: "Payment Succeeded",
          paymentIntentId: session.payment_intent as string,
          sessionId: session.id,
        })
        .where(eq(order.id, String(session.metadata?.orderId)))
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
          creatorId: product.creatorId,
        })
        .from(order)
        .innerJoin(orderItem, eq(order.id, orderItem.orderId))
        .innerJoin(product, eq(orderItem.productId, product.id))
        .where(eq(order.id, String(session.metadata?.orderId)));

      if (!result?.[0] || result.length === 0) {
        log.error(
          `Result for order is nullish. sending 400 error code to stripe. result = ${result.toString()} ; orderId = ${updatedOrder.toString()} `,
        );
        await log.flush();
        return new Response(null, { status: 400 });
      }

      const customerUser = await clerkClient.users.getUser(
        result[0].customerId,
      );
      const customerEmail = customerUser.emailAddresses[0]?.emailAddress ?? "";
      const customerFirstName = customerUser.firstName ?? "Customer User";

      const vendorUser = await clerkClient.users.getUser(result[0].creatorId);
      const vedorEmail = vendorUser.emailAddresses[0]?.emailAddress ?? "";
      const vedorFistName = vendorUser.firstName ?? "Vendor User";

      // trigger email to customer for successfull order
      await sendCustomerOrderEmail(
        customerEmail,
        customerFirstName,
        vedorEmail,
      );

      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      await db
        .update(order)
        .set({
          isPaid: true,
          paymentStatus: "Payment Succeeded",
        })
        .where(eq(order.id, String(paymentIntent.metadata?.orderId)));
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      await db
        .update(order)
        .set({
          isPaid: false,
          paymentStatus: "Payment Failed",
        })
        .where(eq(order.id, String(paymentIntent.metadata?.orderId)));
      break;
    }
    case "payment_intent.canceled": {
      const paymentIntent = event.data.object;
      await db
        .update(order)
        .set({
          isPaid: false,
          paymentStatus: "Payment Reverted",
        })
        .where(eq(order.id, String(paymentIntent.metadata?.orderId)));
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object;
      const paymentIntentId = charge.payment_intent as string;
      await db
        .update(order)
        .set({
          isPaid: false,
          paymentStatus: "Refund Successful",
        })
        .where(eq(order.paymentIntentId, paymentIntentId));
      break;
    }
    default: {
      console.log("Unhandled event type:", event.type);
      return new Response(null, { status: 400 });
    }
  }

  return new Response(null, { status: 200 });
}
