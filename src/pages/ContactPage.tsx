import { useEffect, useRef, useState } from "react";
import { useIsRTL, useLocale, useTranslations } from "@/lib/i18n";
import { useServerFn } from "@tanstack/react-start";
import { useSearch } from "@tanstack/react-router";
import { submitContactLead } from "@/lib/form-leads.functions";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import FButton from "@/components/ui/FButton";

const SUBJECT_KEYS = ["quote", "demo", "learn", "zatca", "general"] as const;
type SubjectKey = (typeof SUBJECT_KEYS)[number];

const C = {
  en: {
    heroTitle: "Get in Touch",
    heroSubtitle: "Our team is ready to help you find the right ERP solution.",
    name: "Your Name",
    email: "Email Address",
    phone: "Phone Number",
    message: "Your Message",
    submit: "Send Message",
    sending: "...",
    sent: "Message sent",
    sentBody: "We will get back to you shortly.",
    officeTitle: "Saudi Arabia Office",
    officeCity: "Riyadh, Saudi Arabia",
    waTitle: "Prefer WhatsApp?",
    waBody: "Chat with our team instantly for quick questions.",
    waCta: "Chat on WhatsApp",
  },
  ar: {
    heroTitle: "تواصل معنا",
    heroSubtitle: "فريقنا جاهز لمساعدتك في إيجاد حل ERP المناسب.",
    name: "اسمك",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    message: "رسالتك",
    submit: "إرسال الرسالة",
    sending: "...",
    sent: "تم إرسال الرسالة",
    sentBody: "سنرد عليك قريباً.",
    officeTitle: "مكتب المملكة العربية السعودية",
    officeCity: "الرياض، المملكة العربية السعودية",
    waTitle: "تفضل واتساب؟",
    waBody: "تحدث مع فريقنا فوراً للأسئلة السريعة.",
    waCta: "محادثة عبر واتساب",
  },
} as const;

export default function ContactPage() {
  const locale = useLocale();
  const isRTL = useIsRTL();
  const c = isRTL ? C.ar : C.en;
  const t = useTranslations("contact");
  const submit = useServerFn(submitContactLead);
  const search = useSearch({ strict: false }) as { subject?: string };
  const initialSubject: SubjectKey | "" = search.subject === "quote" ? "quote" : "";
  const [subject, setSubject] = useState<SubjectKey | "">(initialSubject);
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
    const subjectValue = String(fd.get("subject") ?? "");
    try {
      const res = await submit({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          subject: subjectValue,
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
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{c.heroTitle}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-on-dark/70">{c.heroSubtitle}</p>
        </Container>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FCard>
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mb-4 text-5xl">✅</div>
                    <h3 className="text-text-primary">{c.sent}</h3>
                    <p className="mt-2 text-text-secondary">{c.sentBody}</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="name" label={c.name} required />
                      <Field name="email" type="email" label={c.email} required />
                      <Field name="phone" label={c.phone} />
                      <div>
                        <label className="mb-1 block text-sm font-medium text-text-primary">
                          {t("subjectLabel")} *
                        </label>
                        <select
                          name="subject"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value as SubjectKey | "")}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:border-primary-500 focus:outline-none"
                        >
                          <option value="" disabled>{t("subjectPlaceholder")}</option>
                          {SUBJECT_KEYS.map((k) => (
                            <option key={k} value={k}>{t(`subjectOptions.${k}`)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">{c.message} *</label>
                      <textarea name="message" required rows={6} className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none" />
                    </div>
                    {error && <p className="text-sm text-error">{error}</p>}
                    <FButton variant="cta" size="lg" type="submit" disabled={loading}>
                      {loading ? c.sending : c.submit}
                    </FButton>
                  </form>
                )}
              </FCard>
            </div>

            <div className="space-y-6">
              <FCard>
                <h3 className="mb-3 font-bold text-text-primary">{c.officeTitle}</h3>
                <p className="flex items-start gap-2 text-text-secondary">
                  <span>📍</span> {c.officeCity}
                </p>
                <p className="mt-2 flex items-start gap-2 text-text-secondary">
                  <span>📞</span>
                  <a href="tel:+966568051090" className="text-primary-500 hover:text-primary-400" dir="ltr">+966 56 805 1090</a>
                </p>
                <p className="mt-2 flex items-start gap-2 text-text-secondary">
                  <span>✉️</span>
                  <a href="mailto:info@falcon-it.sa" className="text-primary-500 hover:text-primary-400" dir="ltr">info@falcon-it.sa</a>
                </p>
              </FCard>
              <FCard>
                <h3 className="mb-2 font-bold text-text-primary">{c.waTitle}</h3>
                <p className="mb-4 text-text-secondary">{c.waBody}</p>
                <FButton variant="cta" href="https://wa.me/966568051090?text=Hi!%20I%27m%20interested%20in%20Falcon%20ERP.%20Can%20you%20help%3F">
                  {c.waCta}
                </FButton>
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
