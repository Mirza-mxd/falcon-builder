import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const SpamFields = {
  hp: z.string().max(200).optional().nullable(),
  ts: z.number().int().optional(),
};

function isSpam(hp?: string | null, ts?: number) {
  if (hp && hp.trim().length > 0) return true;
  if (typeof ts === "number" && Date.now() - ts < 1500) return true;
  return false;
}

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().nullable(),
  subject: z.string().max(60).optional().nullable(),
  message: z.string().min(1).max(4000),
  locale: z.enum(["en", "ar"]).optional().default("en"),
  ...SpamFields,
});

export const submitContactLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    if (isSpam(data.hp, data.ts)) return { ok: true as const, id: null };
    const { error, data: row } = await supabaseAdmin
      .from("contact_leads")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        subject: data.subject ?? null,
        message: data.message,
        locale: data.locale ?? "en",
      })
      .select("id")
      .single();
    if (error) {
      console.error("[contact_leads] insert failed", error);
      return { ok: false as const, error: "Failed to submit. Please try again." };
    }
    return { ok: true as const, id: row?.id };
  });

const PricingSchema = z.object({
  plan_key: z.string().max(80).optional().nullable(),
  plan_name: z.string().max(200).optional().nullable(),
  full_name: z.string().min(1).max(120),
  job_title: z.string().max(120).optional().nullable(),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
  industry: z.string().max(80).optional().nullable(),
  company_size: z.string().max(40).optional().nullable(),
  current_system: z.string().max(80).optional().nullable(),
  timeline: z.string().max(40).optional().nullable(),
  needs: z.string().max(4000).optional().nullable(),
  locale: z.enum(["en", "ar"]).optional().default("en"),
  ...SpamFields,
});

export const submitPricingLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => PricingSchema.parse(input))
  .handler(async ({ data }) => {
    if (isSpam(data.hp, data.ts)) return { ok: true as const, id: null };
    const { error, data: row } = await supabaseAdmin
      .from("pricing_leads")
      .insert({
        plan_key: data.plan_key ?? null,
        plan_name: data.plan_name ?? null,
        full_name: data.full_name,
        job_title: data.job_title ?? null,
        email: data.email,
        phone: data.phone ?? null,
        company: data.company ?? null,
        industry: data.industry ?? null,
        company_size: data.company_size ?? null,
        current_system: data.current_system ?? null,
        timeline: data.timeline ?? null,
        needs: data.needs ?? null,
        locale: data.locale ?? "en",
      })
      .select("id")
      .single();
    if (error) {
      console.error("[pricing_leads] insert failed", error);
      return { ok: false as const, error: "Failed to submit. Please try again." };
    }
    return { ok: true as const, id: row?.id };
  });
