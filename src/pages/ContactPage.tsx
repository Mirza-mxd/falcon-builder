import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "@/lib/i18n";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import FButton from "@/components/ui/FButton";
import { COMPANY } from "@/lib/constants";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const submit = useServerFn(submitLead);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const tsRef = useRef<number>(0);
  useEffect(() => { tsRef.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await submit({
        data: {
          type: "contact",
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          company: String(fd.get("company") ?? ""),
          message: String(fd.get("message") ?? ""),
          locale,
          hp: String(fd.get("company_website") ?? ""),
          ts: tsRef.current,
        },
      });
      if (res.ok) setSubmitted(true);
      else setError(res.error ?? "Failed");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="bg-dark py-20 text-center">
        <Container>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{t("heroTitle")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-on-dark/70">{t("heroSubtitle")}</p>
        </Container>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-6">
              <FCard>
                <h3 className="mb-1 font-bold text-text-primary">{t("emailLabel")}</h3>
                <a href={`mailto:${COMPANY.email}`} className="text-primary-500">{COMPANY.email}</a>
              </FCard>
              <FCard>
                <h3 className="mb-1 font-bold text-text-primary">{t("phoneLabel")}</h3>
                <p className="text-text-secondary">KSA: {COMPANY.phone.ksa}</p>
                <p className="text-text-secondary">Egypt: {COMPANY.phone.egypt}</p>
              </FCard>
              <FCard>
                <h3 className="mb-1 font-bold text-text-primary">{t("officeLabel")}</h3>
                <p className="text-text-secondary">{COMPANY.address.ksa[locale]}</p>
                <p className="text-text-secondary">{COMPANY.address.egypt[locale]}</p>
              </FCard>
            </div>

            <div className="lg:col-span-2">
              <FCard>
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mb-4 text-5xl">✅</div>
                    <h3 className="text-text-primary">{t("successTitle")}</h3>
                    <p className="mt-2 text-text-secondary">{t("successText")}</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="name" label={t("nameLabel")} required />
                      <Field name="email" type="email" label={t("emailLabel")} required />
                      <Field name="phone" label={t("phoneLabel")} />
                      <Field name="company" label={t("companyLabel")} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">{t("messageLabel")}</label>
                      <textarea name="message" required rows={5} className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none" />
                    </div>
                    {error && <p className="text-sm text-error">{error}</p>}
                    <FButton variant="cta" size="lg" type="submit" disabled={loading}>
                      {loading ? "..." : t("submit")}
                    </FButton>
                  </form>
                )}
              </FCard>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-text-primary">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none" />
    </div>
  );
}
