import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  // dialect: "sqlite",
  // driver: "turso",
  dialect: 'turso',
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  tablesFilter: ["unshackled_*"],
  out: "./src/server/db/migrate",
  verbose: true,
  strict: true,
} as Config;
