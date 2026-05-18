import { useState } from "react";
import { useTranslations, useLocale } from "@/lib/i18n";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import FButton from "@/components/ui/FButton";

const SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];

export default function DemoPage() {
  const t = useTranslations("demo");
  const locale = useLocale();
  const submit = useServerFn(submitLead);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => { payload[k] = String(v); });
    try {
      const res = await submit({
        data: {
          type: "demo",
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          company: String(fd.get("company") ?? ""),
          message: String(fd.get("notes") ?? ""),
          locale,
          payload,
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
          <div className="mx-auto max-w-3xl">
            <FCard>
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mb-4 text-5xl">🎉</div>
                  <h3 className="text-text-primary">{t("successTitle")}</h3>
                  <p className="mt-2 text-text-secondary">{t("successText")}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field name="name" label={t("nameLabel")} required />
                    <Field name="email" type="email" label={t("emailLabel")} required />
                    <Field name="phone" label={t("phoneLabel")} required />
                    <Field name="company" label={t("companyLabel")} required />
                    <Field name="jobTitle" label={t("jobTitleLabel")} />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">{t("companySizeLabel")}</label>
                      <select name="companySize" className="w-full rounded-xl border border-gray-200 px-4 py-3">
                        {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-text-primary">{t("notesLabel")}</label>
                    <textarea name="notes" rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
                  </div>
                  {error && <p className="text-sm text-error">{error}</p>}
                  <FButton variant="cta" size="lg" type="submit" disabled={loading}>
                    {loading ? "..." : t("submit")}
                  </FButton>
                </form>
              )}
            </FCard>
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
