import { z } from "zod";

import { createTRPCRouter, adminProcedure, publicProcedure } from "~/server/api/trpc";
import { billboard } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const billboardRouter = createTRPCRouter({

    createOrUpdateBillboard: adminProcedure
    .input(
        z.object({
            id: z.string().optional(),
            label: z.string(),
            description: z.string(),
            imageUrl: z.string(),
            storeId: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { id, label, description, imageUrl, storeId } = input;

        if (id) {
            const updatedBillboard = await ctx.db
                .update(billboard)
                .set({
                    label,
                    description,
                    imageUrl,
                    storeId,
                })
                .where(eq(billboard.id, id))
                .returning();

            return updatedBillboard[0];
        } else {
            const newBillboard = await ctx.db
                .insert(billboard)
                .values({
                    label,
                    description,
                    imageUrl,
                    storeId,
                })
                .returning();

            return newBillboard[0];
        }
    }),

    deleteBillboardById: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const { id } = input;

        const deletedBillboard = await ctx.db
            .delete(billboard)
            .where(eq(billboard.id, id))
            .returning();

        return deletedBillboard[0];
    }),

    getBillboardById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.billboard.findFirst({
                where: (table) => eq(table.id, input.id),
            });
        }),

    getBillboards: publicProcedure.query(({ ctx }) => {
            const stores =  ctx.db.query.billboard.findMany();
            return stores;
        }),

        getBillboardsByStoreId: publicProcedure
        .input(z.object({ storeId: z.string() }))
        .query(async ({ ctx, input }) => {
            const { storeId } = input;
            const billboards = await ctx.db.query.billboard.findMany({
                where: (table) => eq(table.storeId, storeId),
            });
            return billboards;
        }),    
    
    })