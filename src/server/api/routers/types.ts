import { z } from "zod";
import { createTRPCRouter, adminProcedure, publicProcedure } from "~/server/api/trpc";
import { type } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const typesRouter = createTRPCRouter({
    
    createOrUpdateType: adminProcedure
    .input(
        z.object({
            id: z.string().optional(), 
            name: z.string(),
            storeId: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { id, name, storeId } = input;

        if (id) {
            const updatedType = await ctx.db
                .update(type)
                .set({
                    name: name,
                    storeId: storeId,
                })
                .where(eq(type.id, id))
                .returning();

            return updatedType[0];
        } else {
            const newType = await ctx.db
                .insert(type)
                .values({
                    name: name,
                    storeId: storeId,
                })
                .returning();

            return newType[0];
        }
    }),

    deleteTypeById: adminProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { id } = input;

            const deletedType = await ctx.db
                .delete(type)
                .where(eq(type.id, id))
                .returning();

            return deletedType[0];
        }),

    getTypeById: adminProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.type.findFirst({
                where: (table) => eq(table.id, input.id),
            });
        }),

    getTypes: publicProcedure.query(({ ctx }) => {
        const types = ctx.db.query.type.findMany();
        return types;
    }),

    getTypesByStoreId: publicProcedure
        .input(z.object({ storeId: z.string() }))
        .query(async ({ ctx, input }) => {
            const { storeId } = input;
            const types = await ctx.db.query.type.findMany({
                where: (table) => eq(table.storeId, storeId),
            });

            return types;
        }),

});