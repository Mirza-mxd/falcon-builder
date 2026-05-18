import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  type: z.enum(["contact", "demo", "trial", "partner", "newsletter"]),
  name: z.string().min(1).max(120).optional().nullable(),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
  message: z.string().max(4000).optional().nullable(),
  locale: z.enum(["en", "ar"]).optional().default("en"),
  payload: z.record(z.string(), z.any()).optional().nullable(),
  // Spam protection (not persisted)
  hp: z.string().max(200).optional().nullable(), // honeypot — must stay empty
  ts: z.number().int().optional(), // client-side render timestamp (ms)
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    // --- Spam protection ---
    // 1) Honeypot: real users leave this empty; bots fill every field.
    if (data.hp && data.hp.trim().length > 0) {
      // Pretend success so bots don't retry.
      return { ok: true as const, id: null };
    }
    // 2) Minimum time-on-form: humans take >2s; instant submits are bots.
    if (typeof data.ts === "number") {
      const elapsed = Date.now() - data.ts;
      if (elapsed < 1500) {
        return { ok: true as const, id: null };
      }
    }
    // 3) Obvious junk in message (link-spam heuristic)
    if (data.message && (data.message.match(/https?:\/\//gi)?.length ?? 0) > 4) {
      return { ok: true as const, id: null };
    }

    const { error, data: inserted } = await supabaseAdmin
      .from("leads")
      .insert({
        type: data.type,
        name: data.name ?? null,
        email: data.email,
        phone: data.phone ?? null,
        company: data.company ?? null,
        message: data.message ?? null,
        locale: data.locale ?? "en",
        payload: data.payload ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[leads] insert failed", error);
      return { ok: false as const, error: "Failed to submit. Please try again." };
    }

    // Email notification is intentionally deferred until the falcon-it.sa
    // sender domain is verified. Leads are reviewed in the database meanwhile.
    console.info("[leads] saved", { id: inserted?.id, type: data.type });

    return { ok: true as const, id: inserted?.id };
  });
