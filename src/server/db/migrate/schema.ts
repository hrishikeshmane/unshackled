import { sqliteTable, AnySQLiteColumn, foreignKey, check, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const unshackledBillboard = sqliteTable("unshackled_billboard", {
	id: text({ length: 256 }).primaryKey().notNull(),
	storeId: text({ length: 256 }).notNull().references(() => unshackledStore.id),
	label: text({ length: 256 }).notNull(),
	description: text().notNull(),
	imageUrl: text({ length: 256 }).notNull(),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
	updatedAt: integer().default(sql`(unixepoch())`),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledOrder = sqliteTable("unshackled_order", {
	id: text({ length: 256 }).primaryKey().notNull(),
	isPaid: integer().notNull(),
	paymentStatus: text().default("Not Initiated"),
	orderTotal: text({ length: 256 }).notNull(),
	paymentIntentId: text(),
	sessionId: text(),
	receipt: text(),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
	updatedAt: integer().default(sql`(unixepoch())`),
	customerId: text({ length: 256 }).notNull().references(() => unshackledUsers.id),
	vendorAmount: text({ length: 256 }).notNull(),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledStore = sqliteTable("unshackled_store", {
	id: text({ length: 256 }).primaryKey().notNull(),
	name: text({ length: 256 }).notNull(),
	description: text().default(""),
	isLive: integer().default(false),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
	updatedAt: integer().default(sql`(unixepoch())`),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledTag = sqliteTable("unshackled_tag", {
	id: text({ length: 256 }).primaryKey().notNull(),
	storeId: text({ length: 256 }).notNull().references(() => unshackledStore.id),
	name: text({ length: 256 }).notNull(),
	value: text({ length: 256 }).notNull(),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
	updatedAt: integer().default(sql`(unixepoch())`),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledType = sqliteTable("unshackled_type", {
	id: text({ length: 256 }).primaryKey().notNull(),
	name: text({ length: 256 }).notNull(),
	storeId: text({ length: 256 }).notNull().references(() => unshackledStore.id),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
	updatedAt: integer().default(sql`(unixepoch())`),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledUsers = sqliteTable("unshackled_users", {
	id: text({ length: 256 }).primaryKey().notNull(),
	role: text().notNull(),
	member: integer().notNull(),
	fullName: text({ length: 126 }).notNull(),
	email: text({ length: 126 }).notNull(),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
	updatedAt: integer().default(sql`(unixepoch())`),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledVendorInfo = sqliteTable("unshackled_vendorInfo", {
	id: text({ length: 256 }).primaryKey().notNull(),
	userId: text({ length: 256 }).notNull().references(() => unshackledUsers.id, { onDelete: "cascade" } ),
	stripeConnectedId: text({ length: 256 }),
	stripeConnected: integer().notNull(),
	status: text().notNull(),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledWaitlist = sqliteTable("unshackled_waitlist", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	email: text({ length: 256 }),
},
(table) => [
	uniqueIndex("unshackled_waitlist_email_unique").on(table.email),
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledOrderItem = sqliteTable("unshackled_orderItem", {
	id: text({ length: 256 }).primaryKey().notNull(),
	isFulfilled: integer().notNull(),
	vendorPayout: integer().notNull(),
	approval: text().default("approved"),
	orderId: text({ length: 256 }).notNull().references(() => unshackledOrder.id),
	productId: text({ length: 256 }).notNull(),
	quantity: integer().default(1).notNull(),
	storeId: text({ length: 256 }).notNull().references(() => unshackledStore.id),
	isDownPayment: integer().default(0).notNull(),
	refNumber: text().default("").notNull(),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledProduct = sqliteTable("unshackled_product", {
	id: text({ length: 256 }).primaryKey().notNull(),
	storeId: text({ length: 256 }).notNull().references(() => unshackledStore.id),
	typeId: text({ length: 256 }).notNull().references(() => unshackledType.id),
	creatorId: text({ length: 256 }).notNull().references(() => unshackledUsers.id),
	stripeId: text({ length: 256 }).notNull(),
	name: text({ length: 256 }).notNull(),
	tagline: text({ length: 256 }).notNull(),
	description: text().notNull(),
	price: text({ length: 256 }).notNull(),
	imageUrl: text({ length: 256 }).notNull(),
	commission: text({ length: 256 }).notNull(),
	commissionType: text().notNull(),
	estTurnAroundTime: text({ length: 256 }).notNull(),
	domainRank: text({ length: 256 }).notNull(),
	isFeatured: integer().notNull(),
	isArchived: integer().notNull(),
	isApproved: text().notNull(),
	tagId: text({ length: 256 }).notNull().references(() => unshackledTag.id),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
	updatedAt: integer().default(sql`(unixepoch())`),
	requiresVendorApproval: integer().default(false),
	hasDownPayment: integer().default(false),
	downpayment: text({ length: 256 }).default("0"),
	orderCommunicationEmail: text({ length: 256 }).default(""),
	additionalOrderEmailText: text({ length: 256 }).default(""),
	additionalLinkLabel: text({ length: 256 }).default(""),
	additionalLinkUrl: text({ length: 256 }).default(""),
	hasAdditionalLink: integer().default(0).notNull(),
	isExtRequiredFormApprovalLink: integer().default(0).notNull(),
	extRequiredFormApprovalLink: text("ExtRequiredFormApprovalLink").default("").notNull(),
	pricingPlans: text().default("[]").notNull(),
	hasPricingPlans: integer().default(0).notNull(),
	showPricing: integer().default(0).notNull(),
	hasVariablePrice: integer().default(0).notNull(),
	requiresRefNumber: integer().default(0).notNull(),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledFormQuestions = sqliteTable("unshackled_formQuestions", {
	id: text({ length: 256 }).primaryKey().notNull(),
	productId: text({ length: 256 }).notNull().references(() => unshackledProduct.id),
	vendorId: text({ length: 256 }).notNull().references(() => unshackledUsers.id),
	question: text().notNull(),
	type: text().notNull(),
	createdAt: integer().default(sql`(UNIXEPOCH())`).notNull(),
	updatedAt: integer().default(sql`(UNIXEPOCH())`),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledFormResponses = sqliteTable("unshackled_formResponses", {
	id: text({ length: 256 }).primaryKey().notNull(),
	customerId: text().notNull().references(() => unshackledUsers.id),
	productId: text({ length: 256 }).notNull().references(() => unshackledProduct.id),
	vendorId: text({ length: 256 }).notNull().references(() => unshackledUsers.id),
	question: text().notNull(),
	answer: text().notNull(),
	createdAt: integer().default(sql`(UNIXEPOCH())`).notNull(),
	updatedAt: integer().default(sql`(UNIXEPOCH())`),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

export const unshackledRequestApprovals = sqliteTable("unshackled_requestApprovals", {
	id: text({ length: 256 }).primaryKey().notNull(),
	customerid: text().notNull().references(() => unshackledUsers.id),
	productId: text({ length: 256 }).notNull().references(() => unshackledProduct.id),
	vendorId: text({ length: 256 }).notNull().references(() => unshackledUsers.id),
	status: text().default("pending").notNull(),
	createdAt: integer().default(sql`(unixepoch())`).notNull(),
	updatedAt: integer().default(sql`(unixepoch())`),
},
(table) => [
	check("unshackled_formQuestions_check_1", sql``type` IN ('short', 'long'`),
	check("unshackled_requestApprovals_check_2", sql``status` IN ('pending', 'approved', 'denied'`),
]);

