// import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { storeRouter } from "~/server/api/routers/store";
import { billboardRouter } from "~/server/api/routers/billboard";
import { typesRouter } from "~/server/api/routers/types";
import { tagRouter } from "./routers/tags";
import { productsRouter } from "./routers/products";
import { orderRouter } from "./routers/order";
import { vendorRouter } from "./routers/vendor";
import { userManagementRouter } from "./routers/users";
import { paymentRouter } from "./routers/payment";
import { storeAnalyticsRouter } from "./routers/storeAnalytics";
import { vendorAnalyticsRouter } from "./routers/vendorAnalytics";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userManagementRouter,
  store: storeRouter,
  billboard: billboardRouter,
  types: typesRouter,
  tag: tagRouter,
  product: productsRouter,
  order: orderRouter,
  vendor: vendorRouter,
  payment: paymentRouter,
  storeAnalytics: storeAnalyticsRouter,
  vendorAnalytics: vendorAnalyticsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
