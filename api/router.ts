import { authRouter } from "./auth-router";
import { leadRouter } from "./routers/lead";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  lead: leadRouter,
});

export type AppRouter = typeof appRouter;
