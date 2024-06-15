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
  } catch (error: unknown) {
    return new Response("webhook error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      
      await db.update(order)
        .set({ isPaid: true })
        .where(eq( order.id, String(session?.metadata?.orderId) ));
      
      break;
    }
    default: {
      console.log("unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}
