import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { env } from "~/env";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${evt.data.id} and type of ${eventType}`);
//   console.log("Webhook body:", body);
//   console.log("Webhook event:", evt);
//   console.log("Webhook event data:", evt.data);

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        role: "customer",
        member: false,
      },
    });

    try {
      await db
        .insert(users)
        .values({
          id: id,
          role: "customer",
          member: false,
          fullName: `${first_name} ${last_name}`,
          email: `${email_addresses[0]?.email_address}`,
        })
        .onConflictDoNothing()
        .execute();
    } catch (error) {
      console.log("Error inserting user into db", error);
    }
  }

  if (eventType === "user.updated") {
    // const { id } = evt.data;
    const { id, email_addresses, first_name, last_name } = evt.data;
    // check if user in db
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          role: "customer",
          onBoarded: false,
        },
      });
      // create new and return
      await db
        .insert(users)
        .values({
          id: id,
          role: "customer",
          member: false,
          fullName: `${first_name} ${last_name}`,
          email: `${email_addresses[0]?.email_address}`,
        })
        .onConflictDoNothing()
        .execute();

      return new Response("", { status: 200 });
    }

    const publicMetadata = evt.data
      .public_metadata as CustomJwtSessionClaims["metadata"];

    await db
      .update(users)
      .set({
        role: publicMetadata.role,
        member: publicMetadata.member,
      })
      .where(eq(users.id, id))
      .execute();
  }

  return new Response("", { status: 200 });
}
