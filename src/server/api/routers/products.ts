import { z } from "zod";
import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
  adminOrVendorProcedure,
  vendorProcedure,
} from "~/server/api/trpc";
import { product } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import {
  type StoreTable,
  type TagTable,
  type TypeTable,
} from "~/types/globals";

export const productsRouter = createTRPCRouter({
  createOrUpdateProduct: adminOrVendorProcedure
    .input(
      z.object({
        id: z.string().optional(),
        storeId: z.string(),
        typeId: z.string(),
        creatorId: z.string(),
        name: z.string(),
        tagline: z.string(),
        description: z.string(),
        stripeId: z.string(),
        imageUrl: z.string(),
        price: z.string(),
        commission: z.string(),
        estTurnAroundTime: z.string(),
        domainRank: z.string(),
        isFeatured: z.boolean(),
        isArchived: z.boolean(),
        isApproved: z.enum(["approved", "pending", "denied"]),
        tagId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        id,
        storeId,
        typeId,
        creatorId,
        name,
        tagline,
        stripeId,
        imageUrl,
        description,
        price,
        commission,
        estTurnAroundTime,
        domainRank,
        isFeatured,
        isArchived,
        isApproved,
        tagId,
      } = input;

      if (id) {
        const updatedProduct = await ctx.db
          .update(product)
          .set({
            storeId,
            typeId,
            creatorId,
            name,
            tagline,
            description,
            stripeId,
            imageUrl,
            price,
            commission,
            estTurnAroundTime,
            domainRank,
            isFeatured,
            isArchived,
            isApproved,
            tagId,
          })
          .where(eq(product.id, id))
          .returning();

        return updatedProduct[0];
      } else {
        const newProduct = await ctx.db
          .insert(product)
          .values({
            storeId,
            typeId,
            creatorId,
            name,
            tagline,
            stripeId,
            imageUrl,
            description,
            price,
            commission,
            estTurnAroundTime,
            domainRank,
            isFeatured,
            isArchived,
            isApproved,
            tagId,
          })
          .returning();

        return newProduct[0];
      }
    }),

  deleteProductById: adminOrVendorProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const deletedProduct = await ctx.db
        .delete(product)
        .where(eq(product.id, id))
        .returning();

      return deletedProduct[0];
    }),

  getProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.query.product.findMany();

    const productsWithTypeandTagandStore = await Promise.all(
      products.map(async (product) => {
        const storeForProduct = await ctx.db.query.store.findFirst({
          where: (table) => eq(table.id, product.storeId),
        });
        const TypeForProduct = await ctx.db.query.type.findFirst({
          where: (table) => eq(table.id, product.typeId),
        });
        const TagForProduct = await ctx.db.query.tag.findFirst({
          where: (table) => eq(table.id, product.tagId),
        });
        return {
          ...product,
          type: TypeForProduct as TypeTable,
          tag: TagForProduct as TagTable,
          store: storeForProduct as StoreTable,
        };
      }),
    );

    return productsWithTypeandTagandStore;
  }),

  getProductsByStoreId: publicProcedure
    .input(z.object({ storeId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { storeId } = input;
      const products = await ctx.db.query.product.findMany({
        where: (table) => eq(table.storeId, storeId),
      });

      const storeForProduct = await ctx.db.query.store.findFirst({
        where: (table) => eq(table.id, storeId),
      });

      const productsWithTypeandTag = await Promise.all(
        products.map(async (product) => {
          const TypeForProduct = await ctx.db.query.type.findFirst({
            where: (table) => eq(table.id, product.typeId),
          });
          const TagForProduct = await ctx.db.query.tag.findFirst({
            where: (table) => eq(table.id, product.tagId),
          });
          return {
            ...product,
            type: TypeForProduct as TypeTable,
            tag: TagForProduct as TagTable,
            store: storeForProduct as StoreTable,
          };
        }),
      );

      return productsWithTypeandTag;
    }),

  getProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.query.product.findFirst({
        where: (table) => eq(table.id, input.id),
      });
      if (!product) {
        return null;
      }
      const type = await ctx.db.query.type.findFirst({
        where: (table) => eq(table.id, product.typeId),
      });
      const tag = await ctx.db.query.tag.findFirst({
        where: (table) => eq(table.id, product.tagId),
      });
      const store = await ctx.db.query.store.findFirst({
        where: (table) => eq(table.id, product.storeId),
      });

      return {
        ...product,
        type: type as TypeTable,
        tag: tag as TagTable,
        store: store as StoreTable,
      };
    }),

  getProductsByCreatorId: adminOrVendorProcedure
    .input(z.object({ creatorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { creatorId } = input;
      const products = await ctx.db.query.product.findMany({
        where: (table) => eq(table.creatorId, creatorId),
      });

      const productsWithTypeandTagandStore = await Promise.all(
        products.map(async (product) => {
          const TypeForProduct = await ctx.db.query.type.findFirst({
            where: (table) => eq(table.id, product.typeId),
          });
          const TagForProduct = await ctx.db.query.tag.findFirst({
            where: (table) => eq(table.id, product.tagId),
          });
          const storeForProduct = await ctx.db.query.store.findFirst({
            where: (table) => eq(table.id, product.storeId),
          });
          return {
            ...product,
            type: TypeForProduct as TypeTable,
            tag: TagForProduct as TagTable,
            store: storeForProduct as StoreTable,
          };
        }),
      );

      return productsWithTypeandTagandStore;
    }),

  getApprovedProductsByStoreId: publicProcedure
    .input(z.object({ storeId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { storeId } = input;
      const products = await ctx.db.query.product.findMany({
        where: (table) =>
          eq(table.storeId, storeId) && eq(table.isApproved, "approved"),
      });

      const storeForProduct = await ctx.db.query.store.findFirst({
        where: (table) => eq(table.id, storeId),
      });

      const productsWithTypeandTag = await Promise.all(
        products.map(async (product) => {
          const TypeForProduct = await ctx.db.query.type.findFirst({
            where: (table) => eq(table.id, product.typeId),
          });
          const TagForProduct = await ctx.db.query.tag.findFirst({
            where: (table) => eq(table.id, product.tagId),
          });
          return {
            ...product,
            type: TypeForProduct as TypeTable,
            tag: TagForProduct as TagTable,
            store: storeForProduct as StoreTable,
          };
        }),
      );

      return productsWithTypeandTag;
    }),

  getApprovedProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.query.product.findMany({
      where: (table) => eq(table.isApproved, "approved"),
    });

    const productsWithTypeandTagandStore = await Promise.all(
      products.map(async (product) => {
        const TypeForProduct = await ctx.db.query.type.findFirst({
          where: (table) => eq(table.id, product.typeId),
        });
        const TagForProduct = await ctx.db.query.tag.findFirst({
          where: (table) => eq(table.id, product.tagId),
        });
        const storeForProduct = await ctx.db.query.store.findFirst({
          where: (table) => eq(table.id, product.storeId),
        });
        return {
          ...product,
          type: TypeForProduct as TypeTable,
          tag: TagForProduct as TagTable,
          store: storeForProduct as StoreTable,
        };
      }),
    );

    return productsWithTypeandTagandStore;
  }),
});
