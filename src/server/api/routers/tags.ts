import { z } from "zod";
import { createTRPCRouter, adminProcedure, publicProcedure } from "~/server/api/trpc";
import { tag } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const tagRouter = createTRPCRouter({
    createOrUpdateTag: adminProcedure
        .input(
            z.object({
                id: z.string().optional(), 
                name: z.string(),
                value: z.string(),
                storeId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, name, value, storeId } = input;

            if (id) {
                const updatedTag = await ctx.db
                    .update(tag)
                    .set({
                        name: name,
                        value: value,
                        storeId: storeId,
                    })
                    .where(eq(tag.id, id))
                    .returning();

                return updatedTag[0];
            } else {
                const newTag = await ctx.db
                    .insert(tag)
                    .values({
                        name: name,
                        value: value,
                        storeId: storeId,
                    })
                    .returning();

                return newTag[0];
            }
        }),

    deleteTagById: adminProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { id } = input;

            const deletedTag = await ctx.db
                .delete(tag)
                .where(eq(tag.id, id))
                .returning();

            return deletedTag[0];
        }),

    getTagById: adminProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.tag.findFirst({
                where: (table) => eq(table.id, input.id),
            });
        }),

    getTags: publicProcedure.query(({ ctx }) => {
        const tags = ctx.db.query.tag.findMany();
        return tags;
    }),

    getTagsByStoreId: publicProcedure
        .input(z.object({ storeId: z.string() }))
        .query(async ({ ctx, input }) => {
            const { storeId } = input;
            const tags = await ctx.db.query.tag.findMany({
                where: (table) => eq(table.storeId, storeId),
            });
            return tags;
        }),
});