import { relations } from "drizzle-orm/relations";
import { unshackledStore, unshackledBillboard, unshackledUsers, unshackledOrder, unshackledTag, unshackledType, unshackledVendorInfo, unshackledOrderItem, unshackledProduct, unshackledFormQuestions, unshackledFormResponses, unshackledRequestApprovals } from "./schema";

export const unshackledBillboardRelations = relations(unshackledBillboard, ({one}) => ({
	unshackledStore: one(unshackledStore, {
		fields: [unshackledBillboard.storeId],
		references: [unshackledStore.id]
	}),
}));

export const unshackledStoreRelations = relations(unshackledStore, ({many}) => ({
	unshackledBillboards: many(unshackledBillboard),
	unshackledTags: many(unshackledTag),
	unshackledTypes: many(unshackledType),
	unshackledOrderItems: many(unshackledOrderItem),
	unshackledProducts: many(unshackledProduct),
}));

export const unshackledOrderRelations = relations(unshackledOrder, ({one, many}) => ({
	unshackledUser: one(unshackledUsers, {
		fields: [unshackledOrder.customerId],
		references: [unshackledUsers.id]
	}),
	unshackledOrderItems: many(unshackledOrderItem),
}));

export const unshackledUsersRelations = relations(unshackledUsers, ({many}) => ({
	unshackledOrders: many(unshackledOrder),
	unshackledVendorInfos: many(unshackledVendorInfo),
	unshackledProducts: many(unshackledProduct),
	unshackledFormQuestions: many(unshackledFormQuestions),
	unshackledFormResponses_vendorId: many(unshackledFormResponses, {
		relationName: "unshackledFormResponses_vendorId_unshackledUsers_id"
	}),
	unshackledFormResponses_customerId: many(unshackledFormResponses, {
		relationName: "unshackledFormResponses_customerId_unshackledUsers_id"
	}),
	unshackledRequestApprovals_vendorId: many(unshackledRequestApprovals, {
		relationName: "unshackledRequestApprovals_vendorId_unshackledUsers_id"
	}),
	unshackledRequestApprovals_customerid: many(unshackledRequestApprovals, {
		relationName: "unshackledRequestApprovals_customerid_unshackledUsers_id"
	}),
}));

export const unshackledTagRelations = relations(unshackledTag, ({one, many}) => ({
	unshackledStore: one(unshackledStore, {
		fields: [unshackledTag.storeId],
		references: [unshackledStore.id]
	}),
	unshackledProducts: many(unshackledProduct),
}));

export const unshackledTypeRelations = relations(unshackledType, ({one, many}) => ({
	unshackledStore: one(unshackledStore, {
		fields: [unshackledType.storeId],
		references: [unshackledStore.id]
	}),
	unshackledProducts: many(unshackledProduct),
}));

export const unshackledVendorInfoRelations = relations(unshackledVendorInfo, ({one}) => ({
	unshackledUser: one(unshackledUsers, {
		fields: [unshackledVendorInfo.userId],
		references: [unshackledUsers.id]
	}),
}));

export const unshackledOrderItemRelations = relations(unshackledOrderItem, ({one}) => ({
	unshackledStore: one(unshackledStore, {
		fields: [unshackledOrderItem.storeId],
		references: [unshackledStore.id]
	}),
	unshackledOrder: one(unshackledOrder, {
		fields: [unshackledOrderItem.orderId],
		references: [unshackledOrder.id]
	}),
}));

export const unshackledProductRelations = relations(unshackledProduct, ({one, many}) => ({
	unshackledTag: one(unshackledTag, {
		fields: [unshackledProduct.tagId],
		references: [unshackledTag.id]
	}),
	unshackledUser: one(unshackledUsers, {
		fields: [unshackledProduct.creatorId],
		references: [unshackledUsers.id]
	}),
	unshackledType: one(unshackledType, {
		fields: [unshackledProduct.typeId],
		references: [unshackledType.id]
	}),
	unshackledStore: one(unshackledStore, {
		fields: [unshackledProduct.storeId],
		references: [unshackledStore.id]
	}),
	unshackledFormQuestions: many(unshackledFormQuestions),
	unshackledFormResponses: many(unshackledFormResponses),
	unshackledRequestApprovals: many(unshackledRequestApprovals),
}));

export const unshackledFormQuestionsRelations = relations(unshackledFormQuestions, ({one}) => ({
	unshackledUser: one(unshackledUsers, {
		fields: [unshackledFormQuestions.vendorId],
		references: [unshackledUsers.id]
	}),
	unshackledProduct: one(unshackledProduct, {
		fields: [unshackledFormQuestions.productId],
		references: [unshackledProduct.id]
	}),
}));

export const unshackledFormResponsesRelations = relations(unshackledFormResponses, ({one}) => ({
	unshackledUser_vendorId: one(unshackledUsers, {
		fields: [unshackledFormResponses.vendorId],
		references: [unshackledUsers.id],
		relationName: "unshackledFormResponses_vendorId_unshackledUsers_id"
	}),
	unshackledProduct: one(unshackledProduct, {
		fields: [unshackledFormResponses.productId],
		references: [unshackledProduct.id]
	}),
	unshackledUser_customerId: one(unshackledUsers, {
		fields: [unshackledFormResponses.customerId],
		references: [unshackledUsers.id],
		relationName: "unshackledFormResponses_customerId_unshackledUsers_id"
	}),
}));

export const unshackledRequestApprovalsRelations = relations(unshackledRequestApprovals, ({one}) => ({
	unshackledUser_vendorId: one(unshackledUsers, {
		fields: [unshackledRequestApprovals.vendorId],
		references: [unshackledUsers.id],
		relationName: "unshackledRequestApprovals_vendorId_unshackledUsers_id"
	}),
	unshackledProduct: one(unshackledProduct, {
		fields: [unshackledRequestApprovals.productId],
		references: [unshackledProduct.id]
	}),
	unshackledUser_customerid: one(unshackledUsers, {
		fields: [unshackledRequestApprovals.customerid],
		references: [unshackledUsers.id],
		relationName: "unshackledRequestApprovals_customerid_unshackledUsers_id"
	}),
}));