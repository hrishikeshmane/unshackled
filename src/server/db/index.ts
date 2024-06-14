// import { createClient, type Client } from "@libsql/client";
// import { drizzle } from "drizzle-orm/libsql";

// import { env } from "~/env";
// import * as schema from "./schema";

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   client: Client | undefined;
// };

// export const client =
//   globalForDb.client ?? createClient({ url: env.DATABASE_URL });
// if (env.NODE_ENV !== "production") globalForDb.client = client;

// export const db = drizzle(client, { schema });

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import { env } from "~/env";
import * as schema from "./schema";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
