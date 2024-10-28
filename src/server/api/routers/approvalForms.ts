import { z } from "zod";
import { createTRPCRouter, adminOrVendorProcedure, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { formQuestions, formResponses, requestApprovals } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";
import { sendCustomerApprovalForListing, sendVendorApprovalFormResponse } from "~/app/_actions/emails";

export const formRouter = createTRPCRouter({
  getQuestions: adminOrVendorProcedure
    .input(z.object({ productId: z.string(), vendorId: z.string() }))
    .query(async ({ input, ctx }) => {
      const questions = await ctx.db.query.formQuestions.findMany({
        where: (table) => eq(table.productId, input.productId)
      })
      return questions;
    }),

  createOrUpdateQuestion: adminOrVendorProcedure
    .input(
      z.object({
        id: z.string().nullable(),
        productId: z.string(),
        vendorId: z.string(),
        question: z.string(),
        type: z.enum(["short", "long"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.id) {
        await ctx.db
          .update(formQuestions)
          .set({
            question: input.question,
            type: input.type,
          })
          .where(eq(formQuestions.id, input.id));
      } else {
        await ctx.db.insert(formQuestions).values({
          productId: input.productId,
          vendorId: input.vendorId,
          question: input.question,
          type: input.type,
        });
      }
    }),

  deleteQuestion: adminOrVendorProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.delete(formQuestions).where(eq(formQuestions.id, input.id));
    }),

  submitResponses: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        vendorId: z.string(),
        responses: z.array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { productId, vendorId, responses } = input;
      const customerId = ctx.session.userId;   

    const submitResponsesRes= await ctx.db.transaction(async (trx) => {
        for (const response of responses) {
          await trx.insert(formResponses).values({
            customerId,
            productId,
            vendorId,
            question: response.question,
            answer: response.answer,
          });
        }

        await trx.insert(requestApprovals).values({
          productId,
          vendorId,
          customerId,
          status: "pending",
        });

        return { success: true, responses, customerId, vendorId, productId };
      });

      if (submitResponsesRes.success) {
        const vendorUser = await clerkClient.users.getUser(vendorId);
        const vendorEmail = vendorUser.emailAddresses[0]?.emailAddress ?? "";
        const vendorFirstName = vendorUser.firstName ?? "User";

        sendVendorApprovalFormResponse(customerId, productId, responses, vendorEmail, vendorFirstName)
      }
    }),

    checkExistingRequest: publicProcedure
    .input(z.object({
        productId: z.string(),
        // customerId: z.string(),
    }))
    .query(async ({ input, ctx }) => {
        const userId = ctx.session.userId;

        if (!userId) {
          return { exists: false, status: null };
        }
        
        const existingRequest = await ctx.db.query.requestApprovals.findFirst({
        where: (table) => 
            and(
            eq(table.productId, input.productId),
            eq(table.customerId, userId)
            )
        });

        if (existingRequest) {
        return { exists: true, status: existingRequest.status };
        }

        return { exists: false, status: null };
    }),

    getApprovalsByVendor: adminOrVendorProcedure
    .input(
      z.object({
        vendorId: z.string(), 
      })
    )
    .query(async ({ input, ctx }) => {
      const approvals = await ctx.db.query.requestApprovals.findMany({
        where: (table) => eq(table.vendorId, input.vendorId),
      });

      return approvals;
    }),

    approveRequest: adminOrVendorProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const requestDetails = await ctx.db.update(requestApprovals).set({
        status: "approved",
      }).where(eq(requestApprovals.id, input.id)).returning();

      if (requestDetails[0] && requestDetails[0].status === "approved") {
        const customer = await clerkClient.users.getUser(requestDetails[0]?.customerId);
        const customerEmail = customer.emailAddresses[0]?.emailAddress ?? "";
        const customerName = customer.firstName ?? "User";

        sendCustomerApprovalForListing(requestDetails[0].productId, customerEmail, customerName, requestDetails[0].status)
      }

      return { success: true };
    }),

    // denyRequest: adminOrVendorProcedure
    // .input(z.object({ id: z.string() }))
    // .mutation(async ({ input, ctx }) => {
    //   await ctx.db.delete(requestApprovals).where(eq(requestApprovals.id, input.id));

    //   return { success: true };
    // }),

  denyRequest: adminOrVendorProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const approvalRecord = await ctx.db.query.requestApprovals.findFirst({
      where: (table) => eq(table.id, input.id),
    });

    if (!approvalRecord) {
      throw new Error("Request approval record not found.");
    }

    const { customerId, vendorId, productId } = approvalRecord;

    const denyRequestRes =  await ctx.db.transaction(async (trx) => {
      await trx.delete(formResponses).where(
        and(
          eq(formResponses.customerId, customerId),
          eq(formResponses.vendorId, vendorId),
          eq(formResponses.productId, productId)
        )
      );

      await trx.delete(requestApprovals).where(eq(requestApprovals.id, input.id));

      return { success: true };
    });

    if (denyRequestRes.success) {  
    const customer = await clerkClient.users.getUser(customerId);
    const customerEmail = customer.emailAddresses[0]?.emailAddress ?? "";
    const customerName = customer.firstName ?? "User";

    sendCustomerApprovalForListing(productId, customerEmail, customerName, "denied");    
    }
  }),

  getFormResponses: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        customerId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const responses = await ctx.db.query.formResponses.findMany({
        where: (table) =>
          and(
            eq(table.productId, input.productId),
            eq(table.customerId, input.customerId)
          ),
      });

      return responses;
    }),

});