import { useEffect, useRef, useState } from "react";
import { useIsRTL, useLocale } from "@/lib/i18n";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import FButton from "@/components/ui/FButton";

const C = {
  en: {
    heroTitle: "Book Your Free Demo",
    heroSubtitle: "See how Falcon ERP can transform your business in 30 minutes.",
    name: "Full Name",
    email: "Business Email",
    phone: "Phone Number",
    company: "Company Name",
    jobTitle: "Job Title",
    country: "Country",
    size: "Company Size",
    industry: "Industry",
    currentErp: "Current ERP System",
    notes: "Message / Requirements",
    agree: "I agree to Falcon's Privacy Policy *",
    newsletter: "Subscribe to ERP insights newsletter",
    submit: "Book My Free Demo",
    sending: "...",
    sent: "Demo request received",
    sentBody: "Our team will reach out within 24 hours.",
    asideTitle: "What your demo includes",
    asideLead: "A 30-minute session tailored to your business needs.",
    badge1: "Trusted by 500+ MENA businesses",
    badge2: "Average demo-to-go-live time: 6 weeks",
    jobTitles: ["CEO / Owner", "CFO / Finance Director", "CTO / IT Director", "COO / Operations Director", "Accountant", "IT Manager", "Other"],
    countries: ["Saudi Arabia", "UAE", "Egypt", "Qatar", "Bahrain", "Kuwait", "Oman", "Jordan", "Other"],
    sizes: ["1-10", "11-50", "51-200", "201-500", "500+"],
    industries: ["Retail & E-Commerce", "Manufacturing", "Construction", "Real Estate", "Hospitality & F&B", "Healthcare", "Education", "Logistics", "Trading & Wholesale", "Other"],
    includes: [
      { icon: "🎯", title: "Live product walkthrough", desc: "See Falcon ERP in action with your industry's workflow." },
      { icon: "💡", title: "Custom ROI analysis", desc: "Get a personalized cost comparison vs. your current system." },
      { icon: "📋", title: "Implementation roadmap", desc: "Receive a tailored go-live plan with timeline and milestones." },
    ],
  },
  ar: {
    heroTitle: "احجز عرضك التجريبي المجاني",
    heroSubtitle: "اكتشف كيف يمكن لـ Falcon ERP تحويل أعمالك في 30 دقيقة.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني للعمل",
    phone: "رقم الهاتف",
    company: "اسم الشركة",
    jobTitle: "المسمى الوظيفي",
    country: "الدولة",
    size: "حجم الشركة",
    industry: "القطاع",
    currentErp: "نظام ERP الحالي",
    notes: "الرسالة / المتطلبات",
    agree: "أوافق على سياسة الخصوصية الخاصة بـ Falcon *",
    newsletter: "اشترك في نشرة رؤى ERP",
    submit: "احجز عرضي التجريبي المجاني",
    sending: "...",
    sent: "تم استلام طلب العرض",
    sentBody: "سيتواصل معك فريقنا خلال 24 ساعة.",
    asideTitle: "ما يتضمنه العرض التجريبي",
    asideLead: "جلسة مدتها 30 دقيقة مصممة لاحتياجات أعمالك.",
    badge1: "موثوق من أكثر من 500 شركة في الشرق الأوسط",
    badge2: "متوسط الوقت من العرض إلى الإطلاق: 6 أسابيع",
    jobTitles: ["الرئيس التنفيذي / المالك", "المدير المالي", "مدير التقنية", "مدير العمليات", "محاسب", "مدير تقنية المعلومات", "أخرى"],
    countries: ["المملكة العربية السعودية", "الإمارات", "مصر", "قطر", "البحرين", "الكويت", "عُمان", "الأردن", "أخرى"],
    sizes: ["1-10", "11-50", "51-200", "201-500", "+500"],
    industries: ["التجزئة والتجارة الإلكترونية", "التصنيع", "الإنشاءات", "العقارات", "الضيافة والأغذية", "الرعاية الصحية", "التعليم", "الخدمات اللوجستية", "التجارة والجملة", "أخرى"],
    includes: [
      { icon: "🎯", title: "جولة مباشرة في المنتج", desc: "شاهد Falcon ERP أثناء العمل مع سير عمل قطاعك." },
      { icon: "💡", title: "تحليل عائد الاستثمار المخصص", desc: "احصل على مقارنة تكاليف مخصصة مقابل نظامك الحالي." },
      { icon: "📋", title: "خارطة طريق التطبيق", desc: "احصل على خطة إطلاق مخصصة مع جدول زمني ومراحل." },
    ],
  },
} as const;

export default function DemoPage() {
  const locale = useLocale();
  const isRTL = useIsRTL();
  const c = isRTL ? C.ar : C.en;
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
                    <div className="mb-4 text-5xl">🎉</div>
                    <h3 className="text-text-primary">{c.sent}</h3>
                    <p className="mt-2 text-text-secondary">{c.sentBody}</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="name" label={c.name} required />
                      <Field name="email" type="email" label={c.email} required />
                      <Field name="phone" label={c.phone} required />
                      <Field name="company" label={c.company} required />
                      <Select name="jobTitle" label={c.jobTitle} placeholder={c.jobTitle} options={c.jobTitles} required />
                      <Select name="country" label={c.country} placeholder={c.country} options={c.countries} required />
                      <Select name="companySize" label={c.size} options={c.sizes} required />
                      <Select name="industry" label={c.industry} placeholder={c.industry} options={c.industries} required />
                    </div>
                    <Field name="currentErp" label={c.currentErp} />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-text-primary">{c.notes}</label>
                      <textarea name="notes" rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <label className="flex items-start gap-2 text-sm text-text-secondary">
                        <input type="checkbox" name="agree" required className="mt-1" />
                        <span>{c.agree}</span>
                      </label>
                      <label className="flex items-start gap-2 text-sm text-text-secondary">
                        <input type="checkbox" name="newsletter" className="mt-1" />
                        <span>{c.newsletter}</span>
                      </label>
                    </div>
                    {error && <p className="text-sm text-error">{error}</p>}
                    <FButton variant="cta" size="lg" type="submit" disabled={loading}>
                      {loading ? c.sending : c.submit}
                    </FButton>
                  </form>
                )}
              </FCard>
            </div>

            <aside className="space-y-6">
              <FCard>
                <h3 className="mb-2 font-bold text-text-primary">{c.asideTitle}</h3>
                <p className="mb-6 text-sm text-text-secondary">{c.asideLead}</p>
                <ul className="space-y-5">
                  {c.includes.map((i) => (
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
                  <li className="flex items-center gap-2"><span className="text-cta">✓</span>{c.badge1}</li>
                  <li className="flex items-center gap-2"><span className="text-cta">✓</span>{c.badge2}</li>
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

function Select({ name, label, options, placeholder, required }: { name: string; label: string; options: readonly string[]; placeholder?: string; required?: boolean }) {
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
