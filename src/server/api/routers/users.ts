import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

export const userManagementRouter = createTRPCRouter({
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.users.findMany();

    return users;
  }),

  changeUserRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["admin", "vendor", "customer"]),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await clerkClient.users.getUser(input.userId);
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }
      await clerkClient.users.updateUser(input.userId, {
        publicMetadata: {
          ...user.publicMetadata,
          role: input.role,
        },
      });
      return user;
    }),
});
