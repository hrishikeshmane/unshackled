import { stripe } from "~/lib/stripe";
import { headers } from "next/headers";
import { env } from "~/env";
import { db } from "~/server/db";
import { order } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = String(headers().get("Stripe-Signature"));
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_CHECKOUT_WEBHOOK_SECRET
    );
  } catch (error) {
    return new Response("Webhook error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      await db.update(order)
        .set({
          isPaid: false,
          paymentStatus: "Payment Initiated",
          paymentIntentId: session.payment_intent as string,
          sessionId: session.id,
        })
        .where(eq(order.id, String(session.metadata?.orderId)));
      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;

      await db.update(order)
        .set({
          isPaid: true,
          paymentStatus: "Payment succeeded",
        })
        .where(eq(order.id, String(paymentIntent.metadata?.orderId)));
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      await db.update(order)
        .set({
          isPaid: false,
          paymentStatus: "Payment failed",
        })
        .where(eq(order.id, String(paymentIntent.metadata?.orderId)));
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object;
      const paymentIntentId = charge.payment_intent as string;

      await db.update(order)
        .set({
          isPaid: false,
          paymentStatus: "Refund Successful",
        })
        .where(eq(order.paymentIntentId, paymentIntentId));
      break;
    }
    default: {
      console.log("Unhandled event type:", event.type);
    }
  }

  return new Response(null, { status: 200 });
}