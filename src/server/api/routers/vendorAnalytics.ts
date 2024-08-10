import { z } from "zod";
import { createTRPCRouter, adminOrVendorProcedure } from "~/server/api/trpc";
import { and, eq } from "drizzle-orm";
import { calculateCommissionAndVendorAmount } from '@/lib/utils';

interface GraphData {
  name: string;
  total: number;
}

export const vendorAnalyticsRouter = createTRPCRouter({
  getRevenueGraphByCreatorId: adminOrVendorProcedure
    .input(z.object({ creatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { creatorId } = input;

      const paidOrders = await ctx.db.query.order.findMany({
        where: (table) => eq(table.isPaid, true),
      });

      const orderItems = await ctx.db.query.orderItem.findMany({});

      const paidOrderItems = orderItems.filter((orderItem) => {
        return paidOrders.some((order) => order.id === orderItem.orderId);
      });

      const monthlyRevenue: Record<number, number> = {};

      for (const orderItem of paidOrderItems) {
        const order = await ctx.db.query.order.findFirst({
          where: (table) => eq(table.id, orderItem.orderId),
        });

        if (order) {
          const month = order.createdAt.getMonth();
          const product = await ctx.db.query.product.findFirst({
            where: (table) =>
              and(
                eq(table.id, orderItem.productId),
                eq(table.creatorId, creatorId),
              ),
          });

          if (product) {
            const [, vendorAmount] = calculateCommissionAndVendorAmount(
              Number(order.orderTotal),
              1,
              Number(product.commission),
              product.commissionType
            );
            monthlyRevenue[month] = (monthlyRevenue[month] ?? 0) + vendorAmount;
          }
        }
      }

      const graphData: GraphData[] = [
        { name: "Jan", total: 0 },
        { name: "Feb", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Apr", total: 0 },
        { name: "May", total: 0 },
        { name: "Jun", total: 0 },
        { name: "Jul", total: 0 },
        { name: "Aug", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Oct", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
      ];

      for (const monthIndex in monthlyRevenue) {
        const month = parseInt(monthIndex, 10);
        graphData[month]!.total = monthlyRevenue[month] ?? 0;
      }

      return graphData;
    }),

  getRevenueByCreatorId: adminOrVendorProcedure
    .input(z.object({ creatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { creatorId } = input;

      const paidOrders = await ctx.db.query.order.findMany({
        where: (table) => eq(table.isPaid, true),
      });

      const orderItems = await ctx.db.query.orderItem.findMany({});

      const paidOrderItems = orderItems.filter((orderItem) => {
        return paidOrders.some((order) => order.id === orderItem.orderId);
      });

      let totalRevenue = 0;

      for (const orderItem of paidOrderItems) {
        
        const order = await ctx.db.query.order.findFirst({
          where: (table) => eq(table.id, orderItem.orderId),
        });

        const product = await ctx.db.query.product.findFirst({
          where: (table) =>
            and(
              eq(table.id, orderItem.productId),
              eq(table.creatorId, creatorId),
            ),
        });
        if (product) {
          const [, vendorAmount] = calculateCommissionAndVendorAmount(
            Number(order?.orderTotal),
            1,
            Number(product.commission),
            product.commissionType
          );
          totalRevenue += vendorAmount;
        }
      }

      return totalRevenue;
    }),

  getSalesCountByCreatorId: adminOrVendorProcedure
    .input(z.object({ creatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { creatorId } = input;

      const paidOrders = await ctx.db.query.order.findMany({
        where: (table) => eq(table.isPaid, true),
      });

      const orderItems = await ctx.db.query.orderItem.findMany({});

      const paidOrderItems = orderItems.filter((orderItem) => {
        return paidOrders.some((order) => order.id === orderItem.orderId);
      });

      const salesCount = await Promise.all(
        paidOrderItems.map(async (orderItem) => {
          const product = await ctx.db.query.product.findFirst({
            where: (table) =>
              and(
                eq(table.id, orderItem.productId),
                eq(table.creatorId, creatorId),
              ),
          });

          return product ? orderItem.quantity : 0;
        }),
      ).then((counts) =>
        counts.reduce<number>((total, count) => total + count, 0),
      );

      return salesCount;
    }),

  getStockCountByCreatorId: adminOrVendorProcedure
    .input(z.object({ creatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { creatorId } = input;

      const products = await ctx.db.query.product.findMany({
        where: (table) => eq(table.creatorId, creatorId),
      });

      return products.length;
    }),
});