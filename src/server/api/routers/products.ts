import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  adminOrVendorProcedure,
} from "~/server/api/trpc";
import { formQuestions, product } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import {
  type StoreTable,
  type TagTable,
  type TypeTable,
} from "~/types/globals";
import {
  sendAdminNotificationForListing,
  sendVenorListingApproval,
  sendVenorListingDenied,
} from "~/app/_actions/emails";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

type Question = {
  type: "short" | "long";
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  productId: string;
  vendorId: string;
  question: string;
};

const pricingPlanSchema = z.object({
  label: z.string(),
  description: z.string(),
  price: z.string(),
});

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
        commissionType: z.enum(["percentage", "flat"]),
        estTurnAroundTime: z.string(),
        domainRank: z.string(),
        isFeatured: z.boolean(),
        isArchived: z.boolean(),
        isApproved: z.enum(["approved", "pending", "denied"]),
        requiresVendorApproval: z.boolean(),
        isExtRequiredFormApprovalLink: z.boolean(),
        ExtRequiredFormApprovalLink: z.string(),
        hasDownPayment: z.boolean(),
        downPayment: z.string(),
        hasAdditionalLink: z.boolean(),
        pricingPlans: z.array(pricingPlanSchema),
        hasPricingPlans: z.boolean(),
        hasVariablePrice: z.boolean(),
        showPricing: z.boolean(),
        requiresRefNumber: z.boolean(),
        additionalLinkLabel: z.string(),
        additionalLinkUrl: z.string(),    
        orderCommunicationEmail: z.string(),
        additionalOrderEmailText: z.string(),
        tagId: z.string(),
        questions: z.array(
          z.object({
            id: z.string().nullable(),
            question: z.string().min(1, "Question is required"),
            type: z.enum(["short", "long"]),
          })
        ),
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
        commissionType,
        estTurnAroundTime,
        requiresVendorApproval,
        isExtRequiredFormApprovalLink,
        ExtRequiredFormApprovalLink,
        hasDownPayment,
        downPayment,
        pricingPlans,
        showPricing,
        hasPricingPlans,
        hasVariablePrice,
        orderCommunicationEmail,
        additionalOrderEmailText,
        hasAdditionalLink,
        additionalLinkUrl,
        additionalLinkLabel, 
        requiresRefNumber, 
        domainRank,
        isFeatured,
        isArchived,
        isApproved,
        tagId,
        questions,
      } = input;
      const vendorUser = await clerkClient.users.getUser(creatorId);

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
            commissionType,
            estTurnAroundTime,
            domainRank,
            isFeatured,
            isArchived,
            isApproved,
            requiresVendorApproval,
            isExtRequiredFormApprovalLink,
            ExtRequiredFormApprovalLink,
            hasDownPayment,
            downPayment,
            pricingPlans,
            hasPricingPlans,
            hasVariablePrice,
            showPricing,
            requiresRefNumber,
            orderCommunicationEmail,
            additionalOrderEmailText,
            hasAdditionalLink,
            additionalLinkUrl,
            additionalLinkLabel, 
            tagId,
          })
          .where(eq(product.id, id))
          .returning();

        //triger email to admin to noify new/edit listing
        updatedProduct?.[0] &&
          isApproved !== "approved" &&
          (await sendAdminNotificationForListing(id));

        // trigger email to vendor to notify status
        // Note: This will trigger email to vendor when admin performs edit operation on product
        const vendorEmail = vendorUser.emailAddresses[0]?.emailAddress ?? "";
        const vendorFirstName = vendorUser.firstName ?? "User";
        updatedProduct?.[0] &&
          isApproved === "approved" &&
          (await sendVenorListingApproval(vendorEmail, vendorFirstName, true));
        updatedProduct?.[0] &&
          isApproved === "denied" &&
          (await sendVenorListingDenied(vendorEmail, vendorFirstName, true));

          // if (updatedProduct && updatedProduct[0] && updatedProduct[0].id && updatedProduct[0].creatorId) {
          //   questions.forEach(async (question) =>{
          //     if(question.id) {
          //       await ctx.db
          //       .update(formQuestions)
          //       .set({
          //         question: question.question,
          //         type: question.type,
          //       })
          //       .where(eq(formQuestions.id, question.id));
          //       } else {
          //         await ctx.db.insert(formQuestions).values({
          //           productId: updatedProduct[0]?.id as string,
          //           vendorId: updatedProduct[0]?.creatorId as string,
          //           question: question.question,
          //           type: question.type,
          //         });
          //       }
          //   })
          // }

          if (updatedProduct && updatedProduct[0] && updatedProduct[0].id && updatedProduct[0].creatorId) {
            const questionsPromises = questions.map(async (question) => {
              if (question.id) {
                return ctx.db
                  .update(formQuestions)
                  .set({
                    question: question.question,
                    type: question.type,
                  })
                  .where(eq(formQuestions.id, question.id));
              } else {
                return ctx.db.insert(formQuestions).values({
                  productId: updatedProduct[0]?.id as string,
                  vendorId: updatedProduct[0]?.creatorId as string,
                  question: question.question,
                  type: question.type,
                });
              }
            });
          
            try {
              await Promise.all(questionsPromises);
            } catch (error) {
              throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: error instanceof Error ? error.message : 'Failed to update or insert questions',
                cause: error,
              });
            }
          }

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
            commissionType,
            estTurnAroundTime,
            domainRank,
            isFeatured,
            isArchived,
            isApproved,
            requiresVendorApproval,
            isExtRequiredFormApprovalLink,
            ExtRequiredFormApprovalLink,
            hasDownPayment,
            downPayment,
            pricingPlans,
            hasPricingPlans,
            hasVariablePrice,
            showPricing,
            requiresRefNumber,
            orderCommunicationEmail,
            additionalOrderEmailText,
            hasAdditionalLink,
            additionalLinkUrl,
            additionalLinkLabel, 
            tagId,
          })
          .returning();

        //triger email to admin to noify new/edit listing
        newProduct?.[0] &&
          (await sendAdminNotificationForListing(newProduct[0].id));

          // if (newProduct && newProduct[0] && newProduct[0].id && newProduct[0].creatorId) {
          //   questions.forEach(async (question) =>{
          //     if(question.id) {
          //       await ctx.db
          //       .update(formQuestions)
          //       .set({
          //         question: question.question,
          //         type: question.type,
          //       })
          //       .where(eq(formQuestions.id, question.id));
          //       } else {
          //         await ctx.db.insert(formQuestions).values({
          //           productId: newProduct[0]?.id as string,
          //           vendorId: newProduct[0]?.creatorId as string,
          //           question: question.question,
          //           type: question.type,
          //         });
          //       }
          //   })
          // }

          if (newProduct && newProduct[0] && newProduct[0].id && newProduct[0].creatorId) {
            const questionsPromises = questions.map(async (question) => {
              if (question.id) {
                return ctx.db
                  .update(formQuestions)
                  .set({
                    question: question.question,
                    type: question.type,
                  })
                  .where(eq(formQuestions.id, question.id));
              } else {
                return ctx.db.insert(formQuestions).values({
                  productId: newProduct[0]?.id as string,
                  vendorId: newProduct[0]?.creatorId as string,
                  question: question.question,
                  type: question.type,
                });
              }
            });
          
            try {
              await Promise.all(questionsPromises);
            } catch (error) {
              throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: error instanceof Error ? error.message : 'Failed to update or insert questions',
                cause: error,
              });
            }
          }

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

  // getApprovedProductsByStoreId: publicProcedure
  //   .input(z.object({ storeId: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const { storeId } = input;
  //     const products = await ctx.db.query.product.findMany({
  //       where: (table) =>
  //         eq(table.storeId, storeId)&& eq(table.isApproved, "approved"),
  //     });

  //     const storeForProduct = await ctx.db.query.store.findFirst({
  //       where: (table) => eq(table.id, storeId),
  //     });

  //     const productsWithTypeandTag = await Promise.all(
  //       products.map(async (product) => {
  //         const TypeForProduct = await ctx.db.query.type.findFirst({
  //           where: (table) => eq(table.id, product.typeId),
  //         });
  //         const TagForProduct = await ctx.db.query.tag.findFirst({
  //           where: (table) => eq(table.id, product.tagId),
  //         });
  //         return {
  //           ...product,
  //           type: TypeForProduct as TypeTable,
  //           tag: TagForProduct as TagTable,
  //           store: storeForProduct as StoreTable,
  //         };
  //       }),
  //     );

  //     return productsWithTypeandTag;
  //   }),

  getApprovedProductsByStoreId: publicProcedure
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

      // Filter approved products in application logic
      const approvedProducts = productsWithTypeandTag.filter(
        (product) => product.isApproved === "approved",
      );

      const liveProducts = approvedProducts.filter(
        (product) => product.isArchived === false,
      );

      return liveProducts;
    }),

  getApprovedProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.query.product.findMany({
      where: (table) => eq(table.isApproved, "approved"),
    });

    const activeProducts = products.filter((product) => !product.isArchived);

    const productsWithTypeandTagandStore = await Promise.all(
      activeProducts.map(async (product) => {
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
  // getApprovedProducts: publicProcedure.query(async ({ ctx }) => {
  //   const products = await ctx.db.query.product.findMany({
  //     where: (table) => eq(table.isApproved, "approved"),
  //   });

  //   const productsWithTypeandTagandStore = await Promise.all(
  //     products.map(async (product) => {
  //       const TypeForProduct = await ctx.db.query.type.findFirst({
  //         where: (table) => eq(table.id, product.typeId),
  //       });
  //       const TagForProduct = await ctx.db.query.tag.findFirst({
  //         where: (table) => eq(table.id, product.tagId),
  //       });
  //       const storeForProduct = await ctx.db.query.store.findFirst({
  //         where: (table) => eq(table.id, product.storeId),
  //       });

  //       // Check if the store is live
  //       if (storeForProduct && storeForProduct.isLive) {
  //         return {
  //           ...product,
  //           type: TypeForProduct as TypeTable,
  //           tag: TagForProduct as TagTable,
  //           store: storeForProduct as StoreTable,
  //         };
  //       }
  //       return null; // Return null for products with non-live stores
  //     })
  //   );

  //   // Filter out null values (products with non-live stores)
  //   const filteredProducts = productsWithTypeandTagandStore.filter(
  //     (product): product is NonNullable<typeof product> => product !== null
  //   );

  //   return filteredProducts;
  // }),
});
