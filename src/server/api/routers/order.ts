import { z } from "zod";
import {
  createTRPCRouter,
  adminProcedure,
  adminOrVendorProcedure,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { and, eq, or } from "drizzle-orm";
import {
  type StoreTable,
  type OrderTable,
  type ProductTable,
} from "~/types/globals";
import { formResponses, order, orderItem, requestApprovals } from "~/server/db/schema";

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

  // getOrderItemsWithProductAndOrderByCreatorId: adminOrVendorProcedure
  //   .input(z.object({ creatorId: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const { creatorId } = input;

  //     const products = await ctx.db.query.product.findMany({
  //       where: (table) => eq(table.creatorId, creatorId),
  //     });

  //     const orderItems = await ctx.db.query.orderItem.findMany({
  //       where: (table) =>
  //         or(...products.map((product) => eq(table.productId, product.id))),
  //     });

  //     const orderItemsWithDetails = await Promise.all(
  //       orderItems.map(async (orderItem) => {
  //         const product = await ctx.db.query.product.findFirst({
  //           where: (table) => eq(table.id, orderItem.productId),
  //         });

  //         const order = await ctx.db.query.order.findFirst({
  //           where: (table) => eq(table.id, orderItem.orderId),
  //         });

  //         const store = await ctx.db.query.store.findFirst({
  //           where: (table) => eq(table.id, String(product?.storeId)),
  //         });

  //         return {
  //           ...orderItem,
  //           product: product as ProductTable,
  //           order: order as OrderTable,
  //           store: store as StoreTable,
  //         };
  //       }),
  //     );

  //     // Filter out null values
  //     return orderItemsWithDetails;
  //   }),

  getOrderItemsWithProductAndOrderByCreatorId: adminOrVendorProcedure
  .input(z.object({ creatorId: z.string() }))
  .query(async ({ ctx, input }) => {
    const { creatorId } = input;

    // Fetch products created by the given creatorId
    const products = await ctx.db.query.product.findMany({
      where: (table) => eq(table.creatorId, creatorId),
    });

    // Extract product IDs
    const productIds = products.map((product) => product.id);

    // Fetch all order items
    const allOrderItems = await ctx.db.query.orderItem.findMany();

    // Filter order items for the products
    const orderItems = allOrderItems.filter((orderItem) =>
      productIds.includes(orderItem.productId)
    );

    // Fetch product, order, and store details for each order item
    const orderItemsWithDetails = await Promise.all(
      orderItems.map(async (orderItem) => {
        const product = products.find((prod) => prod.id === orderItem.productId);

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
      })
    );

    return orderItemsWithDetails;
  }),

  // getOrderItemsWithDetailsForUser: publicProcedure
  //   .input(z.object({ userId: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const { userId } = input;

  //     // Find orders with the given userId
  //     const orders = await ctx.db.query.order.findMany({
  //       where: (table) => eq(table.customerId, userId),
  //     });

  //     // Find order items for the orders
  //     const orderItems = await ctx.db.query.orderItem.findMany({
  //       where: (table) =>
  //         or(...orders.map((order) => eq(table.orderId, order.id))),
  //     });

  //     // Fetch product, order, and store details for each order item
  //     const orderItemsWithDetails = await Promise.all(
  //       orderItems.map(async (orderItem) => {
  //         const product = await ctx.db.query.product.findFirst({
  //           where: (table) => eq(table.id, orderItem.productId),
  //         });

  //         const order = await ctx.db.query.order.findFirst({
  //           where: (table) => eq(table.id, orderItem.orderId),
  //         });

  //         const store = await ctx.db.query.store.findFirst({
  //           where: (table) => eq(table.id, String(product?.storeId)),
  //         });

  //         return {
  //           ...orderItem,
  //           product: product as ProductTable,
  //           order: order as OrderTable,
  //           store: store as StoreTable,
  //         };
  //       }),
  //     );

  //     return orderItemsWithDetails;
  //   }),

  getOrderItemsWithDetailsForUser: publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ ctx, input }) => {
    const { userId } = input;

    // Find orders with the given userId
    const ordersRaw = await ctx.db.query.order.findMany({
      where: (table) => eq(table.customerId, userId),
    });

    // Filter approved products in application logic
    const orders = ordersRaw.filter(
      (order) => order.paymentStatus !== "Not Initiated",
    );

    // Extract order IDs
    const orderIds = orders.map((order) => order.id);

    // Fetch all order items
    const allOrderItems = await ctx.db.query.orderItem.findMany();

    // Filter order items for the orders
    const orderItems = allOrderItems.filter((orderItem) =>
      orderIds.includes(orderItem.orderId)
    );

    // Fetch product, order, and store details for each order item
    const orderItemsWithDetails = await Promise.all(
      orderItems.map(async (orderItem) => {
        const product = await ctx.db.query.product.findFirst({
          where: (table) => eq(table.id, orderItem.productId),
        });

        const order = orders.find((order) => order.id === orderItem.orderId);

        const store = await ctx.db.query.store.findFirst({
          where: (table) => eq(table.id, String(product?.storeId)),
        });

        return {
          ...orderItem,
          product: product as ProductTable,
          order: order as OrderTable,
          store: store as StoreTable,
        };
      })
    );

    return orderItemsWithDetails;
  }),

  // updateOrderItemIsFulfilled: adminOrVendorProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { id } = input;

  //     const updatedOrderItem = await ctx.db
  //       .update(orderItem)
  //       .set({ isFulfilled: true })
  //       .where(eq(orderItem.id, id))
  //       .returning();

  //     const productId = updatedOrderItem[0]?.productId
  //     const orderId = updatedOrderItem[0]?.orderId

  //     return updatedOrderItem[0];
  //   }),

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

    const productId = updatedOrderItem[0]?.productId;
    const orderId = updatedOrderItem[0]?.orderId;

    const orderRecord = await ctx.db.query.order.findFirst({
      where: (table) => eq(table.id, String(orderId)),
    });

    const productRecord = await ctx.db.query.product.findFirst({
      where: (table) => eq(table.id, String(productId)),
    });

    if (orderRecord && productRecord && productRecord.requiresVendorApproval) {
      const customerId = order.customerId;
      
      await ctx.db
        .delete(requestApprovals)
        .where(
          and(
            eq(requestApprovals.productId, String(productId)),
            eq(requestApprovals.customerId, customerId),
          ),
        );

      await ctx.db
        .delete(formResponses)
        .where(
          and(
            eq(formResponses.productId, String(productId)),
            eq(formResponses.customerId, customerId),
          ),
        );
    }

    return updatedOrderItem[0];
  }),

});
