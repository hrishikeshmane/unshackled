// import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { storeRouter } from "~/server/api/routers/store";
import { billboardRouter } from "~/server/api/routers/billboard";
import { typesRouter } from "~/server/api/routers/types";
import { tagRouter } from "./routers/tags";
import { productsRouter } from "./routers/products";
import { orderRouter } from "./routers/order";
import { vendorRouter } from "./routers/vendor";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  store: storeRouter,
  billboard: billboardRouter,
  types: typesRouter,
  tag: tagRouter,
  product: productsRouter,
  order: orderRouter,
  vendor: vendorRouter,
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
