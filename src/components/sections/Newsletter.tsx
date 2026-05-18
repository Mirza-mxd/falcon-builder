import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "@/lib/i18n";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import FButton from "@/components/ui/FButton";
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const submit = useServerFn(submitLead);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const tsRef = useRef<number>(0);
  useEffect(() => { tsRef.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("invalidEmail") || "Invalid email");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await submit({
        data: { type: "newsletter", email, locale, hp, ts: tsRef.current },
      });
      if (res.ok) setStatus("ok");
      else { setStatus("error"); setError(res.error || "Failed"); }
    } catch {
      setStatus("error");
      setError("Network error");
    }
  }

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeader title={t("heading")} subtitle={t("subtitle")} />
        <div className="mx-auto max-w-xl">
          {status === "ok" ? (
            <p className="text-center text-lg font-medium text-cta">{t("success")}</p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
              {/* Honeypot field — hidden from users, bots will fill it */}
              <input
                type="text"
                name="company_website"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("placeholder")}
                  className={cn(
                    "h-12 w-full rounded-xl border bg-white px-4 text-text-primary",
                    "transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-500",
                    error ? "border-error" : "border-gray-300"
                  )}
                />
                {error && <p className="mt-1 text-sm text-error">{error}</p>}
              </div>
              <FButton type="submit" variant="cta" size="md" className="shrink-0" disabled={status === "loading"}>
                {status === "loading" ? "…" : t("subscribe")}
              </FButton>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
