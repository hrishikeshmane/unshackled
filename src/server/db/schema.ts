// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  int,
  sqliteTableCreator,
  text,
  integer,
} from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { boolean } from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `unshackled_${name}`);

// export const posts = createTable(
//   "post",
//   {
//     id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//     name: text("name", { length: 256 }),
//     createdAt: int("created_at", { mode: "timestamp" })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: int("updatedAt", { mode: "timestamp" }),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

export const waitlist = createTable("waitlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email", { length: 256 }).unique(),
});

export const users = createTable("users", {
  id: text("id", { length: 256 }).primaryKey().notNull(),
  role: text("role", {
    enum: ["admin", "moderator", "customer", "vendor"],
  }).notNull(),
  member: integer("member", { mode: "boolean" }).notNull(),
  fullName: text("fullName", { length: 126 }).notNull(),
  email: text("email", { length: 126 }).notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export const vendor = createTable("vendorInfo", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  userId: text("userId", { length: 256 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeConnectedId: text("stripeConnectedId", { length: 256 }),
  stripeConnected: integer("stripeConnected", { mode: "boolean" }).notNull(),
  status: text("status", {
    enum: ["approved", "pending", "denied"],
  }).notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

// export const userInfo = createTable("userInfo", {
//   userId: text("userId")
//     .notNull()
//     .primaryKey()
//     .references(() => users.userId, { onDelete: "cascade" }),
// });

export const store = createTable("store", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  name: text("name", { length: 256 }).notNull(),
  description: text("description").default(""),
  isLive: integer("isLive", { mode: "boolean" }).default(false),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export const billboard = createTable("billboard", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  storeId: text("storeId", { length: 256 })
    .notNull()
    .references(() => store.id),
  label: text("label", { length: 256 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl", { length: 256 }).notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export const type = createTable("type", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  name: text("name", { length: 256 }).notNull(),
  storeId: text("storeId", { length: 256 })
    .notNull()
    .references(() => store.id),
  // billboardId: text("billboardId", { length: 256 })
  //   .notNull()
  //   .references(() => billboard.id),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export const tag = createTable("tag", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  storeId: text("storeId", { length: 256 })
    .notNull()
    .references(() => store.id),
  name: text("name", { length: 256 }).notNull(),
  value: text("value", { length: 256 }).notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export const product = createTable("product", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  storeId: text("storeId", { length: 256 })
    .notNull()
    .references(() => store.id),
  typeId: text("typeId", { length: 256 })
    .notNull()
    .references(() => type.id),
  creatorId: text("creatorId", { length: 256 })
    .notNull()
    .references(() => users.id),
  // discounts: text("discounts", {mode: "json"}).default(sql`json('{}')`),
  stripeId: text("stripeId", { length: 256 }).notNull(),
  name: text("name", { length: 256 }).notNull(),
  tagline: text("tagline", { length: 256 }).notNull(),
  description: text("description").notNull(),
  price: text("price", { length: 256 }).notNull(),
  imageUrl: text("imageUrl", { length: 256 }).notNull(),
  commission: text("commission", { length: 256 }).notNull(),
  commissionType: text("commissionType", {
    enum: ["percentage", "flat"],
  }).notNull(),
  estTurnAroundTime: text("estTurnAroundTime", { length: 256 }).notNull(),
  domainRank: text("domainRank", { length: 256 }).notNull(),
  isFeatured: integer("isFeatured", { mode: "boolean" }).notNull(),
  isArchived: integer("isArchived", { mode: "boolean" }).notNull(),
  isApproved: text("isApproved", {
    enum: ["approved", "pending", "denied"],
  }).notNull(),
  tagId: text("tagId", { length: 256 })
    .notNull()
    .references(() => tag.id),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

// export const image = createTable("image", {
//   id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
//   productId: text("productId", { length: 256 })
//     .notNull()
//     .references(() => product.id, { onDelete: 'cascade' }),
//   url: text("url", { length: 256 }).notNull(),
//   createdAt: int("createdAt", { mode: "timestamp" })
//     .default(sql`(unixepoch())`)
//     .notNull(),
//   updatedAt: int("updatedAt", { mode: "timestamp" }).default(
//     sql`(unixepoch())`,
//   ),
// });

export const order = createTable("order", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  isPaid: integer("isPaid", { mode: "boolean" }).notNull(),
  paymentStatus: text('paymentStatus').default("Not Initiated"),
  orderTotal: text("orderTotal", { length: 256 }).notNull(),
  paymentIntentId: text('paymentIntentId'),
  sessionId: text('sessionId'),
  receipt: text('receipt'),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  customerId: text("customerId", { length: 256 })
    .notNull()
    .references(() => users.id),
});

export const orderItem = createTable("orderItem", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  isFulfilled: integer("isFulfilled", { mode: "boolean" }).notNull(),
  // isFulfilled: text("isFulfilled", {
  //   enum: ["notInitiated", "inProgress", "completed"],
  // }).default("notInitiated"),
  vendorPayout: integer("vendorPayout", { mode: "boolean" }).notNull(),
  orderId: text("orderId", { length: 256 })
    .notNull()
    .references(() => order.id),
  productId: text("productId", { length: 256 })
    .notNull()
    .references(() => product.id),
  quantity: integer("quantity").notNull().default(1),
  storeId: text("storeId", { length: 256 })
    .notNull()
    .references(() => store.id),
});

export type IStore = typeof store.$inferSelect;
