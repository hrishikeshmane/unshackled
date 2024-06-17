import { z } from "zod";

import { createTRPCRouter, adminProcedure, adminOrVendorProcedure, publicProcedure } from "~/server/api/trpc";
import { eq, or } from "drizzle-orm";
import { type StoreTable, type OrderTable, type ProductTable } from "~/types/globals";

interface GraphData {
    name: string;
    total: number;
}

export const storeAnalyticsRouter = createTRPCRouter({
    
        getRevenueGraphByStoreId: adminProcedure
            .input(z.object({ storeId: z.string() }))
            .query(async ({ ctx, input }) => {
                const { storeId } = input;
    
                const paidOrders = await ctx.db.query.order.findMany({
                    where: (table) => eq(table.isPaid, true),
                });
    
                const orderItems = await ctx.db.query.orderItem.findMany({
                    where: (table) => eq(table.storeId, storeId),
                });
    
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
                            where: (table) => eq(table.id, orderItem.productId),
                        });
    
                        if (product) {
                            const revenueForOrder = parseInt(product.price, 10);
                            if (!isNaN(revenueForOrder)) {
                                monthlyRevenue[month] = (monthlyRevenue[month] ?? 0) + revenueForOrder;
                            }
                        }
                    }
                }
    
                const graphData: GraphData[] = [
                    { name: 'Jan', total: 0 },
                    { name: 'Feb', total: 0 },
                    { name: 'Mar', total: 0 },
                    { name: 'Apr', total: 0 },
                    { name: 'May', total: 0 },
                    { name: 'Jun', total: 0 },
                    { name: 'Jul', total: 0 },
                    { name: 'Aug', total: 0 },
                    { name: 'Sep', total: 0 },
                    { name: 'Oct', total: 0 },
                    { name: 'Nov', total: 0 },
                    { name: 'Dec', total: 0 }
                ];
    
                for (const monthIndex in monthlyRevenue) {
                    const month = parseInt(monthIndex, 10);
                    graphData[month]!.total = monthlyRevenue[month] ?? 0;
                }
    
                return graphData;
            }),
    
        getRevenueByStoreId: adminProcedure
            .input(z.object({ storeId: z.string() }))
            .query(async ({ ctx, input }) => {
                const { storeId } = input;

                const paidOrders = await ctx.db.query.order.findMany({
                    where: (table) => eq(table.isPaid, true),
                });

                const orderItems = await ctx.db.query.orderItem.findMany({
                    where: (table) => eq(table.storeId, storeId),
                });

                const paidOrderItems = orderItems.filter((orderItem) => {
                    return paidOrders.some((order) => order.id === orderItem.orderId);
                });

                let totalRevenue = 0;

                for (const orderItem of paidOrderItems) {
                    const product = await ctx.db.query.product.findFirst({
                        where: (table) => eq(table.id, orderItem.productId),
                    });
                    if (product)
                    totalRevenue += parseInt(product.price);
                }
        
                return totalRevenue;
            }),

        getSalesCountByStoreId: adminProcedure
            .input(z.object({ storeId: z.string() }))
            .query(async ({ ctx, input }) => {
                const { storeId } = input;

                const paidOrders = await ctx.db.query.order.findMany({
                    where: (table) => eq(table.isPaid, true),
                });

                const orderItems = await ctx.db.query.orderItem.findMany({
                    where: (table) => eq(table.storeId, storeId),
                });

                const paidOrderItems = orderItems.filter((orderItem) => {
                    return paidOrders.some((order) => order.id === orderItem.orderId);
                });

                return paidOrderItems.length;
            }),

        getStockCountByStoreId: adminProcedure
            .input(z.object({ storeId: z.string() }))
            .query(async ({ ctx, input }) => {
                const { storeId } = input;

                const products = await ctx.db.query.product.findMany({
                    where: (table) => eq(table.storeId, storeId),
                });

                return products.length;
            }),
    
})