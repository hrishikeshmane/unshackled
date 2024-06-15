import { db } from "~/server/db";
import { stripe } from "~/lib/stripe";
import { headers } from "next/headers";
import { env } from "~/env";
import { vendor } from "~/server/db/schema";
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const body = await req.text();

  const signature = String(headers().get("Stripe-Signature"));

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_CONNECT_WEBHOOK_SECRET
    );
  } catch (error: unknown) {
    return new Response("webhook error", { status: 400 });
  }

  switch (event.type) {
    case "account.updated": {
      const account = event.data.object;
      const stripeConnectedLinked = 
        account.capabilities?.transfers === "pending" ||
        account.capabilities?.transfers === "inactive"
            ? false
            : true;

        await db.update(vendor)
        .set({ stripeConnected: stripeConnectedLinked })
        .where(eq(vendor.stripeConnectedId, account.id));

      break;
    }
    default: {
      console.log("unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}
