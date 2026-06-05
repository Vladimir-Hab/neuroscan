import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { leads } from "../../db/schema";

export const leadRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        company: z.string().max(255).optional(),
        email: z.string().email().optional(),
        phone: z.string().max(50).optional(),
        audience: z.enum(["accountant", "franchisee", "other"]),
        message: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ input }: { input: { name: string; company?: string; email?: string; phone?: string; audience: "accountant" | "franchisee" | "other"; message?: string } }) => {
      const db = getDb();
      const result = await db.insert(leads).values({
        name: input.name,
        company: input.company || null,
        email: input.email || null,
        phone: input.phone || null,
        audience: input.audience,
        message: input.message || null,
      });
      return { success: true, id: Number(result[0].insertId) };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(leads).orderBy(leads.createdAt);
  }),
});
