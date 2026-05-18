import { useState } from "react";
import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import FButton from "@/components/ui/FButton";
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("invalidEmail") || "Invalid email");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeader title={t("heading")} subtitle={t("subtitle")} />
        <div className="mx-auto max-w-xl">
          {submitted ? (
            <p className="text-center text-lg font-medium text-cta">{t("success")}</p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
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
              <FButton type="submit" variant="cta" size="md" className="shrink-0">
                {t("subscribe")}
              </FButton>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
