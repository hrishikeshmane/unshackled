import { z } from "zod";
import {
  createTRPCRouter,
  adminProcedure,
  adminOrVendorProcedure,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { eq, or } from "drizzle-orm";
import {
  type StoreTable,
  type OrderTable,
  type ProductTable,
} from "~/types/globals";
import { orderItem } from "~/server/db/schema";

export const orderRouter = createTRPCRouter({
  getOrderItemsByStoreIdWithProductandOrder: adminProcedure
    .input(z.object({ storeId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { storeId } = input;
      const orderItems = await ctx.db.query.orderItem.findMany({
        where: (table) => eq(table.storeId, storeId),
      });

      const orderItemsWithProductandCustomer = await Promise.all(
        orderItems.map(async (orderItem) => {
          const ProductForOrderItem = await ctx.db.query.product.findFirst({
            where: (table) => eq(table.id, orderItem.productId),
          });
          const OrderDetails = await ctx.db.query.order.findFirst({
            where: (table) => eq(table.id, orderItem.orderId),
          });

          return {
            ...orderItem,
            product: ProductForOrderItem as ProductTable,
            order: OrderDetails as OrderTable,
          };
        }),
      );

      return orderItemsWithProductandCustomer;
    }),

  getOrderItemsWithProductAndOrderByCreatorId: adminOrVendorProcedure
    .input(z.object({ creatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { creatorId } = input;

      const products = await ctx.db.query.product.findMany({
        where: (table) => eq(table.creatorId, creatorId),
      });

      const orderItems = await ctx.db.query.orderItem.findMany({
        where: (table) =>
          or(...products.map((product) => eq(table.productId, product.id))),
      });

      const orderItemsWithDetails = await Promise.all(
        orderItems.map(async (orderItem) => {
          const product = await ctx.db.query.product.findFirst({
            where: (table) => eq(table.id, orderItem.productId),
          });

          const order = await ctx.db.query.order.findFirst({
            where: (table) => eq(table.id, orderItem.orderId),
          });

          const store = await ctx.db.query.store.findFirst({
            where: (table) => eq(table.id, String(product?.storeId)),
          });

          return {
            ...orderItem,
            product: product as ProductTable,
            order: order as OrderTable,
            store: store as StoreTable,
          };
        }),
      );

      // Filter out null values
      return orderItemsWithDetails;
    }),

  getOrderItemsWithDetailsForUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      // Find orders with the given userId
      const orders = await ctx.db.query.order.findMany({
        where: (table) => eq(table.customerId, String(ctx.session.userId)),
      });

      // Find order items for the orders
      const orderItems = await ctx.db.query.orderItem.findMany({
        where: (table) =>
          or(...orders.map((order) => eq(table.orderId, order.id))),
      });

      // Fetch product, order, and store details for each order item
      const orderItemsWithDetails = await Promise.all(
        orderItems.map(async (orderItem) => {
          const product = await ctx.db.query.product.findFirst({
            where: (table) => eq(table.id, orderItem.productId),
          });

          const order = await ctx.db.query.order.findFirst({
            where: (table) => eq(table.id, orderItem.orderId),
          });

          const store = await ctx.db.query.store.findFirst({
            where: (table) => eq(table.id, String(product?.storeId)),
          });

          return {
            ...orderItem,
            product: product as ProductTable,
            order: order as OrderTable,
            store: store as StoreTable,
          };
        }),
      );

      return orderItemsWithDetails;
    }),

  updateOrderItemIsFulfilled: adminOrVendorProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const updatedOrderItem = await ctx.db
        .update(orderItem)
        .set({ isFulfilled: true })
        .where(eq(orderItem.id, id))
        .returning();

      return updatedOrderItem[0];
    }),
});
