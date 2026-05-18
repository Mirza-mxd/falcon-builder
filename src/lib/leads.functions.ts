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
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
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

    // Email notification (best-effort). Destination is info@falcon-it.sa.
    // When LOVABLE_API_KEY + a verified email domain are configured,
    // this will deliver to the Falcon inbox; otherwise it logs and returns ok.
    const NOTIFY_TO = "info@falcon-it.sa";
    const REPLY_TO = "info@falcon-it.sa";
    const apiKey = process.env.LOVABLE_API_KEY;
    if (apiKey) {
      try {
        await fetch("https://ai.gateway.lovable.dev/v1/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            to: NOTIFY_TO,
            reply_to: REPLY_TO,
            subject: `New ${data.type} lead — ${data.name ?? data.email}`,
            html: renderLeadEmail(data),
          }),
        });
      } catch (e) {
        console.warn("[leads] notify failed (non-fatal)", e);
      }
    } else {
      console.info("[leads] saved", { id: inserted?.id, type: data.type, email: data.email });
    }

    return { ok: true as const, id: inserted?.id };
  });

function renderLeadEmail(d: z.infer<typeof LeadSchema>) {
  const row = (k: string, v: unknown) =>
    v ? `<tr><td style="padding:6px 12px;color:#64748B">${k}</td><td style="padding:6px 12px;color:#0F1B3D"><b>${escapeHtml(String(v))}</b></td></tr>` : "";
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto">
    <h2 style="color:#0F1B3D">New ${d.type} lead</h2>
    <table style="border-collapse:collapse;width:100%;background:#F8FAFC;border-radius:12px">
      ${row("Name", d.name)}${row("Email", d.email)}${row("Phone", d.phone)}
      ${row("Company", d.company)}${row("Locale", d.locale)}
      ${d.message ? `<tr><td colspan="2" style="padding:12px;color:#0F1B3D">${escapeHtml(d.message).replace(/\n/g, "<br>")}</td></tr>` : ""}
    </table>
    <p style="color:#94A3B8;font-size:12px;margin-top:16px">Falcon Smart Solutions — falcon-it.sa</p>
  </div>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
