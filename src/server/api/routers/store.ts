import { z } from "zod";

import { createTRPCRouter, adminProcedure, publicProcedure } from "~/server/api/trpc";
import { store } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const storeRouter = createTRPCRouter({
    create: adminProcedure
        .input(z.object({ name: z.string().min(1), description: z.string() }))
        .mutation(async ({ ctx, input }) => {
            ctx.session.userId;
        
        const data =  await ctx.db.insert(store).values({
            name: input.name,
            description: input.description,
        }).returning({storeId: store.id});

        return data[0];
        }),
    
    getStoreById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.store.findFirst({
                where: (table) => eq(table.id, input.id),
            });
        }),

    getStores: publicProcedure.query(({ ctx }) => {
            const stores =  ctx.db.query.store.findMany();
            return stores;
        }),
    
    deleteStorebyId: adminProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { id } = input;

            const deletedStore = await ctx.db
                .delete(store)
                .where(eq(store.id, id))
                .returning();

            return deletedStore[0];
        }),
    
    updateStore: adminProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, name } = input;

            const updatedStore = await ctx.db
                .update(store)
                .set({ name: name })
                .where(eq(store.id, id))
                .returning();

            return updatedStore[0];
        }),
    
    
    })