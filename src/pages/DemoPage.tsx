import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import FButton from "@/components/ui/FButton";

const JOB_TITLES = [
  "CEO / Owner",
  "CFO / Finance Director",
  "CTO / IT Director",
  "COO / Operations Director",
  "Accountant",
  "IT Manager",
  "Other",
];

const COUNTRIES = [
  "Saudi Arabia",
  "UAE",
  "Egypt",
  "Qatar",
  "Bahrain",
  "Kuwait",
  "Oman",
  "Jordan",
  "Other",
];

const SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];

const INDUSTRIES = [
  "Retail & E-Commerce",
  "Manufacturing",
  "Construction",
  "Real Estate",
  "Hospitality & F&B",
  "Healthcare",
  "Education",
  "Logistics",
  "Trading & Wholesale",
  "Other",
];

const INCLUDES = [
  { icon: "🎯", title: "Live product walkthrough", desc: "See Falcon ERP in action with your industry's workflow." },
  { icon: "💡", title: "Custom ROI analysis", desc: "Get a personalized cost comparison vs. your current system." },
  { icon: "📋", title: "Implementation roadmap", desc: "Receive a tailored go-live plan with timeline and milestones." },
];

export default function DemoPage() {
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
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Book Your Free Demo</h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-on-dark/70">
            See how Falcon ERP can transform your business in 30 minutes.
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
                    <div className="mb-4 text-5xl">🎉</div>
                    <h3 className="text-text-primary">Demo request received</h3>
                    <p className="mt-2 text-text-secondary">Our team will reach out within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="name" label="Full Name" required />
                      <Field name="email" type="email" label="Business Email" required />
                      <Field name="phone" label="Phone Number" required />
                      <Field name="company" label="Company Name" required />
                      <Select name="jobTitle" label="Job Title" placeholder="Job Title" options={JOB_TITLES} required />
                      <Select name="country" label="Country" placeholder="Country" options={COUNTRIES} required />
                      <Select name="companySize" label="Company Size" options={SIZES} required />
                      <Select name="industry" label="Industry" placeholder="Industry" options={INDUSTRIES} required />
                    </div>
                    <Field name="currentErp" label="Current ERP System" />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">Message / Requirements</label>
                      <textarea name="notes" rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <label className="flex items-start gap-2 text-sm text-text-secondary">
                        <input type="checkbox" name="agree" required className="mt-1" />
                        <span>I agree to Falcon's Privacy Policy *</span>
                      </label>
                      <label className="flex items-start gap-2 text-sm text-text-secondary">
                        <input type="checkbox" name="newsletter" className="mt-1" />
                        <span>Subscribe to ERP insights newsletter</span>
                      </label>
                    </div>
                    {error && <p className="text-sm text-error">{error}</p>}
                    <FButton variant="cta" size="lg" type="submit" disabled={loading}>
                      {loading ? "..." : "Book My Free Demo"}
                    </FButton>
                  </form>
                )}
              </FCard>
            </div>

            <aside className="space-y-6">
              <FCard>
                <h3 className="mb-2 font-bold text-text-primary">What your demo includes</h3>
                <p className="mb-6 text-sm text-text-secondary">
                  A 30-minute session tailored to your business needs.
                </p>
                <ul className="space-y-5">
                  {INCLUDES.map((i) => (
                    <li key={i.title} className="flex gap-3">
                      <span className="text-2xl leading-none">{i.icon}</span>
                      <div>
                        <p className="font-semibold text-text-primary">{i.title}</p>
                        <p className="text-sm text-text-secondary">{i.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </FCard>
              <FCard>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2"><span className="text-cta">✓</span>Trusted by 500+ MENA businesses</li>
                  <li className="flex items-center gap-2"><span className="text-cta">✓</span>Average demo-to-go-live time: 6 weeks</li>
                </ul>
              </FCard>
            </aside>
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

function Select({ name, label, options, placeholder, required }: { name: string; label: string; options: string[]; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-text-primary">{label}{required && " *"}</label>
      <select name={name} required={required} defaultValue="" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:border-primary-500 focus:outline-none">
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
