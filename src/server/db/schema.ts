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
  requiresVendorApproval: integer("requiresVendorApproval", { mode: "boolean" }).notNull().default(false),
  isExtRequiredFormApprovalLink: integer("isExtRequiredFormApprovalLink", { mode: "boolean" }).notNull().default(false),
  ExtRequiredFormApprovalLink: text("ExtRequiredFormApprovalLink", { length: 256 }).notNull().default(""),
  hasDownPayment: integer("hasDownPayment", { mode: "boolean" }).notNull().default(false),
  downPayment: text("downpayment", { length: 256 }).notNull().default("0"),
  orderCommunicationEmail: text("orderCommunicationEmail", { length: 256 }).notNull().default(""),
  additionalOrderEmailText: text("additionalOrderEmailText", { length: 256 }).notNull().default(""),
  hasAdditionalLink: integer("hasAdditionalLink", { mode: "boolean" }).notNull().default(false),
  additionalLinkLabel: text("additionalLinkLabel", { length: 256 }).notNull().default(""),
  additionalLinkUrl: text("additionalLinkUrl", { length: 256 }).notNull().default(""),
  pricingPlans: text('pricingPlans', { mode: 'json' })
    .notNull()
    .$type<{ label: string, description: string, price: string }[]>()
    .default(sql`'[]'`),
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

export const order = createTable("order", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  isPaid: integer("isPaid", { mode: "boolean" }).notNull(),
  paymentStatus: text("paymentStatus").default("Not Initiated"),
  orderTotal: text("orderTotal", { length: 256 }).notNull(),
  vendorAmount: text("vendorAmount", { length: 256 }).notNull(),
  paymentIntentId: text("paymentIntentId"),
  sessionId: text("sessionId"),
  receipt: text("receipt"),
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
  approval: text("approval", {
    enum: ["requested", "approved", "denied"],
  }).default("approved"),
  orderId: text("orderId", { length: 256 })
    .notNull()
    .references(() => order.id),
  productId: text("productId", { length: 256 })
    .notNull()
    .references(() => product.id),
  quantity: integer("quantity").notNull().default(1),
  isDownPayment: integer("isDownPayment", { mode: "boolean" }).notNull().default(false),
  storeId: text("storeId", { length: 256 })
    .notNull()
    .references(() => store.id),
});

export const formQuestions = createTable("formQuestions", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  productId: text("productId", { length: 256 })
    .notNull()
    .references(() => product.id),
  vendorId: text("vendorId", { length: 256 })
  .notNull()
  .references(() => users.id),
  question: text("question").notNull(),
  type: text("type", { enum: ["short", "long"] }).notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export const formResponses = createTable("formResponses", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  customerId: text("customerid").notNull()
    .notNull()
    .references(() => users.id),
  productId: text("productId", { length: 256 })
    .notNull()
    .references(() => product.id),
  vendorId: text("vendorId", { length: 256 })
  .notNull()
  .references(() => users.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export const requestApprovals = createTable("requestApprovals", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  customerId: text("customerid").notNull()
    .notNull()
    .references(() => users.id),
  productId: text("productId", { length: 256 })
    .notNull()
    .references(() => product.id),
  vendorId: text("vendorId", { length: 256 })
  .notNull()
  .references(() => users.id),
  status: text("status", { enum: ["pending", "approved", "denied"] }).notNull().default("pending"),
  createdAt: int("createdAt", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export type IStore = typeof store.$inferSelect;
export type IProduct = typeof product.$inferSelect;
export type IApprovalFormResponses = typeof formResponses.$inferInsert

