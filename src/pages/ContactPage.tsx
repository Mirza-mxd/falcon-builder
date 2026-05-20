import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "@/lib/i18n";
import { useServerFn } from "@tanstack/react-start";
import { useSearch } from "@tanstack/react-router";
import { submitLead } from "@/lib/leads.functions";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import FButton from "@/components/ui/FButton";

const SUBJECT_KEYS = ["quote", "demo", "learn", "zatca", "general"] as const;
type SubjectKey = (typeof SUBJECT_KEYS)[number];

export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations("contact");
  const submit = useServerFn(submitLead);
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
          type: "contact",
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          company: "",
          message: String(fd.get("message") ?? ""),
          locale,
          payload: { subject: subjectValue },
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
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Get in Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-on-dark/70">
            Our team is ready to help you find the right ERP solution.
          </p>
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
                    <h3 className="text-text-primary">Message sent</h3>
                    <p className="mt-2 text-text-secondary">We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="name" label="Your Name" required />
                      <Field name="email" type="email" label="Email Address" required />
                      <Field name="phone" label="Phone Number" />
                      <Field name="subject" label="Subject" required />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">Your Message *</label>
                      <textarea name="message" required rows={6} className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none" />
                    </div>
                    {error && <p className="text-sm text-error">{error}</p>}
                    <FButton variant="cta" size="lg" type="submit" disabled={loading}>
                      {loading ? "..." : "Send Message"}
                    </FButton>
                  </form>
                )}
              </FCard>
            </div>

            <div className="space-y-6">
              <FCard>
                <h3 className="mb-3 font-bold text-text-primary">Saudi Arabia Office</h3>
                <p className="flex items-start gap-2 text-text-secondary">
                  <span>📍</span> Riyadh, Saudi Arabia
                </p>
                <p className="mt-2 flex items-start gap-2 text-text-secondary">
                  <span>📞</span>
                  <a href="tel:+966568051090" className="text-primary-500 hover:text-primary-400">+966 56 805 1090</a>
                </p>
                <p className="mt-2 flex items-start gap-2 text-text-secondary">
                  <span>✉️</span>
                  <a href="mailto:info@falcon-it.sa" className="text-primary-500 hover:text-primary-400">info@falcon-it.sa</a>
                </p>
              </FCard>
              <FCard>
                <h3 className="mb-2 font-bold text-text-primary">Prefer WhatsApp?</h3>
                <p className="mb-4 text-text-secondary">Chat with our team instantly for quick questions.</p>
                <FButton variant="cta" href="https://wa.me/966568051090?text=Hi!%20I%27m%20interested%20in%20Falcon%20ERP.%20Can%20you%20help%3F">
                  Chat on WhatsApp
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
