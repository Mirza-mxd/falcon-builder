import { useEffect, useRef, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { PLAN_DETAILS, PLAN_DETAILS_AR, isPlanKey, type PlanKey } from "@/lib/pricing-plans";
import { submitPricingLead } from "@/lib/form-leads.functions";
import { useLocale, useLocalePath } from "@/lib/i18n";

const CSS = `
.choose-root {
  --navy-900: #0F1B3D; --navy-800: #162A54; --navy-700: #1B3A6B;
  --cyan-500: #29ABD4; --cyan-100: #D6F1FA;
  --cta: #10B981; --cta-hover: #059669; --cta-light: #D1FAE5;
  --surface: #F8FAFC; --surface-alt: #F1F5F9;
  --text-primary: #0F1B3D; --text-secondary: #64748B; --text-muted: #94A3B8;
  --border: #E2E8F0; --border-focus: #29ABD4;
  --shadow-card: 0 4px 24px rgba(15, 23, 42, 0.06);
  --radius-card: 16px; --radius-button: 12px; --radius-input: 10px;
  font-family: "Inter", "Helvetica Neue", system-ui, sans-serif;
  color: var(--text-primary);
  background: var(--surface);
  padding-bottom: 64px;
  min-height: calc(100vh - 80px);
}
.choose-root h1, .choose-root h2, .choose-root h3, .choose-root h4 { color: var(--text-primary); letter-spacing: -0.01em; }
.choose-root p { color: var(--text-secondary); }
.choose-root a { color: inherit; text-decoration: none; }
.choose-root ol, .choose-root ul { list-style: none; padding: 0; margin: 0; }
.choose-root button { font-family: inherit; cursor: pointer; border: none; background: none; }

.choose-root .container-narrow { max-width: 760px; margin: 0 auto; padding: 0 24px; }
.choose-root .eyebrow { display: inline-block; font-size: 13px; font-weight: 600; letter-spacing: 0.12em; color: var(--cyan-500); text-transform: uppercase; margin-bottom: 20px; }

.choose-root .form-intro { padding: 56px 0 32px; text-align: center; }
.choose-root .form-intro h1 { font-size: 36px; font-weight: 800; margin-bottom: 12px; line-height: 1.15; }
.choose-root .form-intro h1 .accent { color: var(--cyan-500); }
.choose-root .form-intro p { font-size: 17px; max-width: 560px; margin: 0 auto; }
.choose-root .back-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; font-size: 14px; font-weight: 500; color: var(--text-secondary); transition: color 0.15s; }
.choose-root .back-link:hover { color: var(--cyan-500); }

.choose-root .plan-card { background: white; border: 2px solid var(--cyan-500); border-radius: var(--radius-card); padding: 28px 32px; margin-bottom: 32px; box-shadow: 0 10px 30px rgba(41, 171, 212, 0.12); position: relative; }
.choose-root .plan-card::before { content: "✓"; position: absolute; top: 24px; inset-inline-end: 32px; width: 32px; height: 32px; background: var(--cta); color: white; border-radius: 50%; display: grid; place-items: center; font-size: 16px; font-weight: 700; }
.choose-root .plan-card .plan-label { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; color: var(--cyan-500); text-transform: uppercase; margin-bottom: 8px; }
.choose-root .plan-card h2 { color: var(--navy-900); margin-bottom: 6px; font-size: 24px; }
.choose-root .plan-card .plan-tier { color: var(--text-secondary); font-size: 15px; margin-bottom: 16px; }
.choose-root .plan-card .plan-price-row { padding-top: 16px; border-top: 1px solid var(--border); display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.choose-root .plan-card .plan-price { font-size: 28px; font-weight: 800; color: var(--navy-900); letter-spacing: -0.02em; }
.choose-root .plan-card .plan-period { font-size: 14px; color: var(--text-secondary); }

.choose-root .form-card { background: white; border: 1px solid var(--border); border-radius: var(--radius-card); padding: 36px 32px; box-shadow: var(--shadow-card); }
.choose-root .form-section + .form-section { margin-top: 32px; padding-top: 32px; border-top: 1px solid var(--border); }
.choose-root .form-section h3 { font-size: 14px; font-weight: 600; letter-spacing: 0.06em; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 20px; }
.choose-root .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.choose-root .form-row.single { grid-template-columns: 1fr; }
.choose-root .form-field { display: flex; flex-direction: column; }
.choose-root .form-field label { font-size: 14px; font-weight: 500; color: var(--text-primary); margin-bottom: 6px; }
.choose-root .form-field label .req { color: var(--cta); margin-inline-start: 2px; }
.choose-root .form-field label .opt { color: var(--text-muted); font-weight: 400; font-size: 13px; margin-inline-start: 6px; }
.choose-root .form-field input, .choose-root .form-field select, .choose-root .form-field textarea {
  width: 100%; padding: 12px 14px; border: 1.5px solid var(--border); border-radius: var(--radius-input);
  font-family: inherit; font-size: 15px; color: var(--text-primary); background: white;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.choose-root .form-field input::placeholder, .choose-root .form-field textarea::placeholder { color: var(--text-muted); }
.choose-root .form-field input:focus, .choose-root .form-field select:focus, .choose-root .form-field textarea:focus { outline: none; border-color: var(--border-focus); box-shadow: 0 0 0 3px var(--cyan-100); }
.choose-root .form-field select { appearance: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%2364748B' d='M6 8L0 0h12z'/></svg>"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 38px; }
.choose-root .form-field textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
.choose-root .form-field .helper { margin-top: 6px; font-size: 12px; color: var(--text-muted); }

.choose-root .phone-wrap { display: flex; align-items: stretch; border: 1.5px solid var(--border); border-radius: var(--radius-input); overflow: hidden; background: white; transition: border-color 0.15s, box-shadow 0.15s; }
.choose-root .phone-wrap:focus-within { border-color: var(--border-focus); box-shadow: 0 0 0 3px var(--cyan-100); }
.choose-root .phone-country { flex: 0 0 25%; width: 25%; min-width: 0; appearance: none; border: none; background: var(--surface-alt); color: var(--text-primary); font-family: inherit; font-size: 15px; font-weight: 500; padding: 12px 28px 12px 12px; border-inline-end: 1px solid var(--border); cursor: pointer; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%2364748B' d='M6 8L0 0h12z'/></svg>"); background-repeat: no-repeat; background-position: right 10px center; text-overflow: ellipsis; }
.choose-root .phone-country:focus { outline: none; }
.choose-root .phone-wrap input { flex: 1 1 75%; width: 75%; min-width: 0; border: none; padding: 12px 14px; font-family: inherit; font-size: 15px; color: var(--text-primary); outline: none; background: transparent; }

.choose-root .submit-row { margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.choose-root .submit-note { font-size: 13px; color: var(--text-muted); flex: 1; min-width: 220px; }
.choose-root .btn-submit { background: var(--cta); color: white; padding: 14px 36px; border-radius: var(--radius-button); font-weight: 600; font-size: 15px; transition: background 0.15s, transform 0.15s, box-shadow 0.15s; }
.choose-root .btn-submit:hover:not(:disabled) { background: var(--cta-hover); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(16,185,129,0.25); }
.choose-root .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

.choose-root .thankyou-card { background: white; border: 1px solid var(--border); border-radius: var(--radius-card); padding: 64px 48px; box-shadow: var(--shadow-card); text-align: center; }
.choose-root .thank-icon { width: 72px; height: 72px; margin: 0 auto 24px; border-radius: 50%; background: var(--cta-light); color: var(--cta-hover); display: grid; place-items: center; font-size: 32px; font-weight: 700; }
.choose-root .thankyou-card h2 { font-size: 28px; color: var(--navy-900); margin-bottom: 12px; }
.choose-root .thankyou-card > p { font-size: 16px; max-width: 480px; margin: 0 auto 32px; color: var(--text-secondary); }
.choose-root .next-steps { text-align: start; max-width: 440px; margin: 0 auto 36px; background: var(--surface); border-radius: var(--radius-card); padding: 24px 28px; }
.choose-root .next-steps h4 { font-size: 13px; font-weight: 600; letter-spacing: 0.08em; color: var(--cyan-500); text-transform: uppercase; margin-bottom: 16px; }
.choose-root .next-steps ol { counter-reset: step; }
.choose-root .next-steps li { counter-increment: step; display: flex; gap: 14px; padding: 8px 0; font-size: 14px; color: var(--text-primary); line-height: 1.5; }
.choose-root .next-steps li::before { content: counter(step); flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--cyan-500); color: white; display: grid; place-items: center; font-size: 13px; font-weight: 700; }
.choose-root .btn-home { display: inline-block; background: white; color: var(--navy-900); border: 1.5px solid var(--navy-900); padding: 12px 28px; border-radius: var(--radius-button); font-weight: 600; font-size: 14px; transition: all 0.15s; }
.choose-root .btn-home:hover { background: var(--navy-900); color: white; }
.choose-root .error { color: #EF4444; font-size: 14px; margin-top: 8px; }
.choose-root .field-error { display: block; margin-top: 6px; color: #DC2626; font-size: 13px; font-weight: 500; }
.choose-root .form-field input.is-error, .choose-root .form-field select.is-error, .choose-root .form-field textarea.is-error { border-color: #EF4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }
.choose-root .form-field input.is-error:focus, .choose-root .form-field select.is-error:focus, .choose-root .form-field textarea.is-error:focus { border-color: #EF4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.2); }
.choose-root .phone-wrap.is-error { border-color: #EF4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }
.choose-root .phone-wrap.is-error:focus-within { border-color: #EF4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.2); }

@media (max-width: 640px) {
  .choose-root .form-row { grid-template-columns: 1fr; }
  .choose-root .form-intro h1 { font-size: 28px; }
}
`;

const COUNTRIES = [
  { code: "+966", flag: "🇸🇦" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+965", flag: "🇰🇼" },
  { code: "+974", flag: "🇶🇦" },
  { code: "+973", flag: "🇧🇭" },
  { code: "+968", flag: "🇴🇲" },
];

const INDUSTRY_OPTS_EN = [
  ["manufacturing", "Manufacturing"],
  ["retail", "Retail / Multi-branch"],
  ["contracting", "Contracting / Construction"],
  ["distribution", "Distribution"],
  ["restaurants", "Restaurants & F&B"],
  ["logistics", "Logistics"],
  ["hospitality", "Hospitality"],
  ["services", "Services"],
  ["other", "Other"],
] as const;
const INDUSTRY_OPTS_AR = [
  ["manufacturing", "التصنيع"],
  ["retail", "التجزئة / متعدد الفروع"],
  ["contracting", "المقاولات / الإنشاءات"],
  ["distribution", "التوزيع"],
  ["restaurants", "المطاعم والأغذية والمشروبات"],
  ["logistics", "الخدمات اللوجستية"],
  ["hospitality", "الضيافة"],
  ["services", "الخدمات"],
  ["other", "أخرى"],
] as const;

const SIZE_OPTS = [
  ["1-10", "1–10"],
  ["11-30", "11–30"],
  ["31-80", "31–80"],
  ["81-200", "81–200"],
  ["200+", "200+"],
] as const;

const SYSTEM_OPTS_EN = [
  ["excel", "Excel / spreadsheets"],
  ["qoyod", "Qoyod or similar accounting software"],
  ["another-erp", "Another ERP"],
  ["custom", "Custom in-house system"],
  ["nothing", "Nothing yet"],
  ["other", "Other"],
] as const;
const SYSTEM_OPTS_AR = [
  ["excel", "إكسل / جداول بيانات"],
  ["qoyod", "قيود أو برنامج محاسبي مشابه"],
  ["another-erp", "نظام ERP آخر"],
  ["custom", "نظام داخلي مخصّص"],
  ["nothing", "لا يوجد حتى الآن"],
  ["other", "أخرى"],
] as const;

const TIMELINE_OPTS_EN = [
  ["immediate", "Within 1 month"],
  ["short", "1–3 months"],
  ["medium", "3–6 months"],
  ["researching", "Just researching"],
] as const;
const TIMELINE_OPTS_AR = [
  ["immediate", "خلال شهر"],
  ["short", "1–3 أشهر"],
  ["medium", "3–6 أشهر"],
  ["researching", "في مرحلة البحث فقط"],
] as const;

const STRINGS = {
  en: {
    eyebrow: "Confirm your plan",
    h1a: "One step from your ", h1b: "tailored quote",
    intro: "Share a few details about your business and a Falcon representative will be in touch within 24 hours.",
    back: "← Back to pricing",
    selectedLabel: "Your selected plan",
    noPlanLabel: "No plan selected",
    noPlanTitle: "Pick a plan first",
    noPlanDesc: "Head back to pricing and choose the plan you want a quote for.",
    secAboutYou: "About you",
    secAboutBiz: "About your business",
    secAboutProject: "About your project",
    fullName: "Full name", fullNamePh: "Your full name",
    jobTitle: "Job title or role", jobTitlePh: "e.g. Finance Manager",
    email: "Work email", emailPh: "you@company.com",
    phone: "Phone", phonePh: "5X XXX XXXX",
    company: "Company name", companyPh: "Your company's legal name",
    industry: "Industry", industryPh: "Select your industry",
    size: "Company size", sizePh: "Number of employees",
    currentSystem: "Current system", currentSystemPh: "What are you using today?",
    timeline: "When are you looking to start?", optional: "Optional", timelinePh: "Select a timeline",
    needs: "What are you hoping the new system will solve?",
    needsPh: "A few lines about the problems you're trying to fix, or what's driving the change...",
    needsHelper: "The more we know now, the more productive our first call will be.",
    submitNote: "By submitting, you agree to be contacted by Falcon about your inquiry. We respond within 24 hours.",
    submit: "Submit and request quote",
    submitting: "Submitting...",
    fixErrors: "Please fix the highlighted fields before submitting.",
    thankH2: "Thank you, we've got it.",
    thankP: "A Falcon representative will be in touch within 24 hours to walk you through the next steps and prepare your tailored quote.",
    nextStepsH: "What happens next",
    nextSteps: [
      "We review your request and the plan you selected.",
      "We reach out to book a discovery call at a time that suits you.",
      "You receive a tailored quote built around your business.",
    ],
    backHome: "Back to pricing",
    req: [
      ["fullName", "Please enter your full name."],
      ["jobTitle", "Please enter your job title or role."],
      ["email", "Please enter your work email."],
      ["phone", "Please enter your phone number."],
      ["company", "Please enter your company name."],
      ["industry", "Please select your industry."],
      ["size", "Please select your company size."],
      ["currentSystem", "Please select your current system."],
    ] as [string, string][],
    invalidEmail: "Please enter a valid email address.",
    invalidPhone: "Please enter a valid phone number.",
  },
  ar: {
    eyebrow: "أكّد خطتك",
    h1a: "خطوة واحدة للحصول على ", h1b: "عرض السعر المخصّص",
    intro: "شارك بعض التفاصيل عن شركتك، وسيتواصل معك ممثل فالكون خلال 24 ساعة.",
    back: "→ العودة إلى الأسعار",
    selectedLabel: "الخطة المختارة",
    noPlanLabel: "لم يتم اختيار خطة",
    noPlanTitle: "اختر خطة أولًا",
    noPlanDesc: "عُد إلى صفحة الأسعار واختر الخطة التي تريد عرض سعرٍ لها.",
    secAboutYou: "نبذة عنك",
    secAboutBiz: "نبذة عن شركتك",
    secAboutProject: "نبذة عن مشروعك",
    fullName: "الاسم الكامل", fullNamePh: "اسمك الكامل",
    jobTitle: "المسمى الوظيفي", jobTitlePh: "مثال: المدير المالي",
    email: "البريد الإلكتروني للعمل", emailPh: "you@company.com",
    phone: "رقم الجوال", phonePh: "5X XXX XXXX",
    company: "اسم الشركة", companyPh: "الاسم القانوني لشركتك",
    industry: "القطاع", industryPh: "اختر قطاعك",
    size: "حجم الشركة", sizePh: "عدد الموظفين",
    currentSystem: "النظام الحالي", currentSystemPh: "ما الذي تستخدمه حاليًا؟",
    timeline: "متى تخطّط للبدء؟", optional: "اختياري", timelinePh: "اختر الإطار الزمني",
    needs: "ما المشاكل التي تأمل أن يحلّها النظام الجديد؟",
    needsPh: "أسطر قليلة عن المشاكل التي تحاول حلّها أو ما الذي يدفع نحو التغيير...",
    needsHelper: "كلما عرفنا أكثر الآن، كانت مكالمتنا الأولى أكثر إنتاجية.",
    submitNote: "بإرسال النموذج، توافق على أن يتواصل معك فريق فالكون بشأن استفسارك. نرد خلال 24 ساعة.",
    submit: "إرسال وطلب عرض السعر",
    submitting: "جارٍ الإرسال...",
    fixErrors: "يرجى تصحيح الحقول المُحدَّدة قبل الإرسال.",
    thankH2: "شكرًا، استلمنا طلبك.",
    thankP: "سيتواصل معك ممثل من فالكون خلال 24 ساعة لإرشادك إلى الخطوات التالية وإعداد عرض السعر المخصّص.",
    nextStepsH: "ما الذي يحدث بعد ذلك",
    nextSteps: [
      "نراجع طلبك والخطة التي اخترتها.",
      "نتواصل معك لحجز مكالمة استكشاف في وقت يناسبك.",
      "تستلم عرض سعر مخصّصًا مصمّمًا لاحتياجات شركتك.",
    ],
    backHome: "العودة إلى الأسعار",
    req: [
      ["fullName", "يرجى إدخال اسمك الكامل."],
      ["jobTitle", "يرجى إدخال مسمّاك الوظيفي."],
      ["email", "يرجى إدخال بريدك الإلكتروني للعمل."],
      ["phone", "يرجى إدخال رقم جوالك."],
      ["company", "يرجى إدخال اسم شركتك."],
      ["industry", "يرجى اختيار قطاعك."],
      ["size", "يرجى اختيار حجم شركتك."],
      ["currentSystem", "يرجى اختيار نظامك الحالي."],
    ] as [string, string][],
    invalidEmail: "يرجى إدخال بريد إلكتروني صالح.",
    invalidPhone: "يرجى إدخال رقم جوال صالح.",
  },
} as const;

export default function PricingChoosePage() {
  const locale = useLocale();
  const t = STRINGS[locale];
  const localePath = useLocalePath();
  const search = useSearch({ strict: false }) as { plan?: string };
  const planKey: PlanKey | null = isPlanKey(search.plan) ? search.plan : null;
  const planTable = locale === "ar" ? PLAN_DETAILS_AR : PLAN_DETAILS;
  const plan = planKey ? planTable[planKey] : null;
  const INDUSTRY_OPTS = locale === "ar" ? INDUSTRY_OPTS_AR : INDUSTRY_OPTS_EN;
  const SYSTEM_OPTS = locale === "ar" ? SYSTEM_OPTS_AR : SYSTEM_OPTS_EN;
  const TIMELINE_OPTS = locale === "ar" ? TIMELINE_OPTS_AR : TIMELINE_OPTS_EN;

  const submit = useServerFn(submitPricingLead);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const tsRef = useRef<number>(0);
  useEffect(() => { tsRef.current = Date.now(); }, []);

  function validate(fd: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    for (const [name, msg] of t.req) {
      if (!String(fd.get(name) ?? "").trim()) errs[name] = msg;
    }
    const email = String(fd.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = t.invalidEmail;
    }
    const phone = String(fd.get("phone") ?? "").trim();
    if (phone && !/^[0-9 +()-]{6,}$/.test(phone)) {
      errs.phone = t.invalidPhone;
    }
    return errs;
  }

  function clearFieldError(name: string) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs = validate(fd);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setError(null);
      const firstName = Object.keys(errs)[0];
      const el = form.querySelector<HTMLElement>(`[name="${firstName}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => el.focus({ preventScroll: true }), 350);
      }
      return;
    }
    setFieldErrors({});
    setLoading(true);
    setError(null);
    const phoneCountry = String(fd.get("phoneCountry") ?? "");
    const phoneNumber = String(fd.get("phone") ?? "");
    try {
      const res = await submit({
        data: {
          plan_key: planKey ?? null,
          plan_name: plan?.name ?? null,
          full_name: String(fd.get("fullName") ?? ""),
          job_title: String(fd.get("jobTitle") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: `${phoneCountry} ${phoneNumber}`.trim(),
          company: String(fd.get("company") ?? ""),
          industry: String(fd.get("industry") ?? ""),
          company_size: String(fd.get("size") ?? ""),
          current_system: String(fd.get("currentSystem") ?? ""),
          timeline: String(fd.get("timeline") ?? ""),
          needs: String(fd.get("needs") ?? ""),
          locale,
          hp: String(fd.get("company_website") ?? ""),
          ts: tsRef.current,
        },
      });
      if (res.ok) setSubmitted(true);
      else setError(res.error ?? (locale === "ar" ? "فشل الإرسال. يرجى المحاولة مرة أخرى." : "Failed to submit. Please try again."));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const pricingPath = localePath("/pricing");

  return (
    <div className="choose-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {submitted ? (
        <>
          <section className="form-intro">
            <div className="container-narrow" />
          </section>
          <div className="container-narrow">
            <div className="thankyou-card">
              <div className="thank-icon">✓</div>
              <h2>{t.thankH2}</h2>
              <p>{t.thankP}</p>
              <div className="next-steps">
                <h4>{t.nextStepsH}</h4>
                <ol>
                  {t.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>
              <Link to={pricingPath} className="btn-home">{t.backHome}</Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <section className="form-intro">
            <div className="container-narrow">
              <span className="eyebrow">{t.eyebrow}</span>
              <h1>{t.h1a}<span className="accent">{t.h1b}</span></h1>
              <p>{t.intro}</p>
              <div><Link to={pricingPath} className="back-link">{t.back}</Link></div>
            </div>
          </section>

          <div className="container-narrow">
            {plan ? (
              <div className="plan-card">
                <div className="plan-label">{t.selectedLabel}</div>
                <h2>{plan.name}</h2>
                <div className="plan-tier">{plan.desc}</div>
                <div className="plan-price-row">
                  <span className="plan-price">{plan.price}</span>
                  <span className="plan-period">{plan.period}</span>
                </div>
              </div>
            ) : (
              <div className="plan-card">
                <div className="plan-label">{t.noPlanLabel}</div>
                <h2>{t.noPlanTitle}</h2>
                <div className="plan-tier">{t.noPlanDesc}</div>
              </div>
            )}

            <form ref={formRef} className="form-card" onSubmit={onSubmit} action="#" method="post" noValidate>
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }} />

              <div className="form-section">
                <h3>{t.secAboutYou}</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="fullName">{t.fullName}<span className="req">*</span></label>
                    <input type="text" id="fullName" name="fullName" placeholder={t.fullNamePh} required aria-invalid={!!fieldErrors.fullName} className={fieldErrors.fullName ? "is-error" : ""} onChange={() => clearFieldError("fullName")} />
                    {fieldErrors.fullName && <span className="field-error">{fieldErrors.fullName}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="jobTitle">{t.jobTitle}<span className="req">*</span></label>
                    <input type="text" id="jobTitle" name="jobTitle" placeholder={t.jobTitlePh} required aria-invalid={!!fieldErrors.jobTitle} className={fieldErrors.jobTitle ? "is-error" : ""} onChange={() => clearFieldError("jobTitle")} />
                    {fieldErrors.jobTitle && <span className="field-error">{fieldErrors.jobTitle}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="email">{t.email}<span className="req">*</span></label>
                    <input type="email" id="email" name="email" placeholder={t.emailPh} required aria-invalid={!!fieldErrors.email} className={fieldErrors.email ? "is-error" : ""} onChange={() => clearFieldError("email")} dir="ltr" />
                    {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">{t.phone}<span className="req">*</span></label>
                    <div className={`phone-wrap${fieldErrors.phone ? " is-error" : ""}`} dir="ltr">
                      <select className="phone-country" id="phoneCountry" name="phoneCountry" defaultValue="+966" aria-label="Country code">
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <input type="tel" id="phone" name="phone" placeholder={t.phonePh} required aria-invalid={!!fieldErrors.phone} onChange={() => clearFieldError("phone")} />
                    </div>
                    {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>{t.secAboutBiz}</h3>
                <div className="form-row single">
                  <div className="form-field">
                    <label htmlFor="company">{t.company}<span className="req">*</span></label>
                    <input type="text" id="company" name="company" placeholder={t.companyPh} required aria-invalid={!!fieldErrors.company} className={fieldErrors.company ? "is-error" : ""} onChange={() => clearFieldError("company")} />
                    {fieldErrors.company && <span className="field-error">{fieldErrors.company}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="industry">{t.industry}<span className="req">*</span></label>
                    <select id="industry" name="industry" required defaultValue="" aria-invalid={!!fieldErrors.industry} className={fieldErrors.industry ? "is-error" : ""} onChange={() => clearFieldError("industry")}>
                      <option value="" disabled>{t.industryPh}</option>
                      {INDUSTRY_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                    {fieldErrors.industry && <span className="field-error">{fieldErrors.industry}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="size">{t.size}<span className="req">*</span></label>
                    <select id="size" name="size" required defaultValue="" aria-invalid={!!fieldErrors.size} className={fieldErrors.size ? "is-error" : ""} onChange={() => clearFieldError("size")}>
                      <option value="" disabled>{t.sizePh}</option>
                      {SIZE_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                    {fieldErrors.size && <span className="field-error">{fieldErrors.size}</span>}
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-field">
                    <label htmlFor="currentSystem">{t.currentSystem}<span className="req">*</span></label>
                    <select id="currentSystem" name="currentSystem" required defaultValue="" aria-invalid={!!fieldErrors.currentSystem} className={fieldErrors.currentSystem ? "is-error" : ""} onChange={() => clearFieldError("currentSystem")}>
                      <option value="" disabled>{t.currentSystemPh}</option>
                      {SYSTEM_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                    {fieldErrors.currentSystem && <span className="field-error">{fieldErrors.currentSystem}</span>}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>{t.secAboutProject}</h3>
                <div className="form-row single">
                  <div className="form-field">
                    <label htmlFor="timeline">{t.timeline} <span className="opt">{t.optional}</span></label>
                    <select id="timeline" name="timeline" defaultValue="">
                      <option value="" disabled>{t.timelinePh}</option>
                      {TIMELINE_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-field">
                    <label htmlFor="needs">{t.needs} <span className="opt">{t.optional}</span></label>
                    <textarea id="needs" name="needs" rows={3} placeholder={t.needsPh} />
                    <span className="helper">{t.needsHelper}</span>
                  </div>
                </div>
              </div>

              {error && <p className="error">{error}</p>}
              {Object.keys(fieldErrors).length > 0 && (
                <p className="error">{t.fixErrors}</p>
              )}

              <div className="submit-row">
                <p className="submit-note">{t.submitNote}</p>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? t.submitting : t.submit}
                </button>
              </div>
            </form>

          </div>
        </>
      )}
    </div>
  );
}
