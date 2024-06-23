import {
  adminOrVendorProcedure,
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { vendor } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { stripe } from "~/lib/stripe";

export const vendorRouter = createTRPCRouter({
  createVendorApplication: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;

      const existingVendor = await ctx.db.query.vendor.findFirst({
        where: (table) => eq(table.userId, userId),
      });

      if (existingVendor) {
        switch (existingVendor.status) {
          case "approved":
            return { res: "You are already an approved vendor." };
          case "pending":
            return {
              res: "Your previous vendor application is still pending approval. Please wait for the approval process.",
            };
          case "denied":
            return {
              res: "Your previous vendor application was denied. Please contact support for more information.",
            };
        }
      } else {
        await ctx.db.insert(vendor).values({
          userId: userId,
          stripeConnected: false,
          stripeConnectedId: "",
          status: "pending",
        });

        return {
          res: "Your vendor application has been submitted successfully. Please wait for the approval process.",
        };
      }
    }),

  getVendors: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.vendor.findMany();
  }),

  getVendorById: adminOrVendorProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      return await ctx.db.query.vendor.findFirst({
        where: (table) => eq(table.userId, userId),
      });
    }),

  updateVendorStatus: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        status: z.enum(["approved", "pending", "denied"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, status } = input;
      const user = await clerkClient.users.getUser(userId);

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          ...user.publicMetadata,
          role: status === "approved" ? "vendor" : "customer",
        },
      });

      await ctx.db
        .update(vendor)
        .set({ status: status })
        .where(eq(vendor.userId, userId));

      if (status === "approved") {
        const account = await stripe.accounts.create({
          email: user.emailAddresses[0]?.emailAddress,
          controller: {
            losses: {
              payments: "application",
            },
            fees: {
              payer: "application",
            },
            stripe_dashboard: {
              type: "express",
            },
          },
        });

        await ctx.db
          .update(vendor)
          .set({ stripeConnectedId: account.id })
          .where(eq(vendor.userId, userId));
      }
    }),
});
