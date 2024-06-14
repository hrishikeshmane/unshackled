import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { vendor, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

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
            return {res: "You are already an approved vendor."};
          case "pending":
            return {res: "Your previous vendor application is still pending approval. Please wait for the approval process."};
          case "denied":
            return {res: "Your previous vendor application was denied. Please contact support for more information."};
        }
      } else {
        await ctx.db.insert(vendor).values({
          userId: userId,
          stripeConnected: false,
          status: "pending",
        });

        return {res: "Your vendor application has been submitted successfully. Please wait for the approval process."};
      }
    }),
});