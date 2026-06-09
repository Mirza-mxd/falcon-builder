import { useEffect, useRef, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { PLAN_DETAILS, isPlanKey, type PlanKey } from "@/lib/pricing-plans";
import { submitPricingLead } from "@/lib/form-leads.functions";

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
.choose-root .plan-card::before { content: "✓"; position: absolute; top: 24px; right: 32px; width: 32px; height: 32px; background: var(--cta); color: white; border-radius: 50%; display: grid; place-items: center; font-size: 16px; font-weight: 700; }
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
.choose-root .form-field label .req { color: var(--cta); margin-left: 2px; }
.choose-root .form-field label .opt { color: var(--text-muted); font-weight: 400; font-size: 13px; margin-left: 6px; }
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
.choose-root .phone-country { flex: 0 0 25%; width: 25%; min-width: 0; appearance: none; border: none; background: var(--surface-alt); color: var(--text-primary); font-family: inherit; font-size: 15px; font-weight: 500; padding: 12px 28px 12px 12px; border-right: 1px solid var(--border); cursor: pointer; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%2364748B' d='M6 8L0 0h12z'/></svg>"); background-repeat: no-repeat; background-position: right 10px center; text-overflow: ellipsis; }
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
.choose-root .next-steps { text-align: left; max-width: 440px; margin: 0 auto 36px; background: var(--surface); border-radius: var(--radius-card); padding: 24px 28px; }
.choose-root .next-steps h4 { font-size: 13px; font-weight: 600; letter-spacing: 0.08em; color: var(--cyan-500); text-transform: uppercase; margin-bottom: 16px; }
.choose-root .next-steps ol { counter-reset: step; }
.choose-root .next-steps li { counter-increment: step; display: flex; gap: 14px; padding: 8px 0; font-size: 14px; color: var(--text-primary); line-height: 1.5; }
.choose-root .next-steps li::before { content: counter(step); flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--cyan-500); color: white; display: grid; place-items: center; font-size: 13px; font-weight: 700; }
.choose-root .btn-home { display: inline-block; background: white; color: var(--navy-900); border: 1.5px solid var(--navy-900); padding: 12px 28px; border-radius: var(--radius-button); font-weight: 600; font-size: 14px; transition: all 0.15s; }
.choose-root .btn-home:hover { background: var(--navy-900); color: white; }
.choose-root .error { color: #EF4444; font-size: 14px; margin-top: 8px; }

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

const INDUSTRY_OPTS = [
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

const SIZE_OPTS = [
  ["1-10", "1–10"],
  ["11-30", "11–30"],
  ["31-80", "31–80"],
  ["81-200", "81–200"],
  ["200+", "200+"],
] as const;

const SYSTEM_OPTS = [
  ["excel", "Excel / spreadsheets"],
  ["qoyod", "Qoyod or similar accounting software"],
  ["another-erp", "Another ERP"],
  ["custom", "Custom in-house system"],
  ["nothing", "Nothing yet"],
  ["other", "Other"],
] as const;

const TIMELINE_OPTS = [
  ["immediate", "Within 1 month"],
  ["short", "1–3 months"],
  ["medium", "3–6 months"],
  ["researching", "Just researching"],
] as const;

export default function PricingChoosePage() {
  const search = useSearch({ strict: false }) as { plan?: string };
  const planKey: PlanKey | null = isPlanKey(search.plan) ? search.plan : null;
  const plan = planKey ? PLAN_DETAILS[planKey] : null;

  const submit = useServerFn(submitPricingLead);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tsRef = useRef<number>(0);
  useEffect(() => { tsRef.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) { e.currentTarget.reportValidity(); return; }
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
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
          locale: "en",
          hp: String(fd.get("company_website") ?? ""),
          ts: tsRef.current,
        },
      });
      if (res.ok) setSubmitted(true);
      else setError(res.error ?? "Failed to submit. Please try again.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

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
              <h2>Thank you, we've got it.</h2>
              <p>A Falcon representative will be in touch within 24 hours to walk you through the next steps and prepare your tailored quote.</p>
              <div className="next-steps">
                <h4>What happens next</h4>
                <ol>
                  <li>We review your request and the plan you selected.</li>
                  <li>We reach out to book a discovery call at a time that suits you.</li>
                  <li>You receive a tailored quote built around your business.</li>
                </ol>
              </div>
              <Link to="/pricing" className="btn-home">Back to pricing</Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <section className="form-intro">
            <div className="container-narrow">
              <span className="eyebrow">Confirm your plan</span>
              <h1>One step from your <span className="accent">tailored quote</span></h1>
              <p>Share a few details about your business and a Falcon representative will be in touch within 24 hours.</p>
              <div><Link to="/pricing" className="back-link">← Back to pricing</Link></div>
            </div>
          </section>

          <div className="container-narrow">
            {plan ? (
              <div className="plan-card">
                <div className="plan-label">Your selected plan</div>
                <h2>{plan.name}</h2>
                <div className="plan-tier">{plan.desc}</div>
                <div className="plan-price-row">
                  <span className="plan-price">{plan.price}</span>
                  <span className="plan-period">{plan.period}</span>
                </div>
              </div>
            ) : (
              <div className="plan-card">
                <div className="plan-label">No plan selected</div>
                <h2>Pick a plan first</h2>
                <div className="plan-tier">Head back to pricing and choose the plan you want a quote for.</div>
              </div>
            )}

            <form className="form-card" onSubmit={onSubmit} noValidate>
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }} />

              <div className="form-section">
                <h3>About you</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="fullName">Full name<span className="req">*</span></label>
                    <input type="text" id="fullName" name="fullName" placeholder="Your full name" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="jobTitle">Job title or role<span className="req">*</span></label>
                    <input type="text" id="jobTitle" name="jobTitle" placeholder="e.g. Finance Manager" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="email">Work email<span className="req">*</span></label>
                    <input type="email" id="email" name="email" placeholder="you@company.com" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">Phone<span className="req">*</span></label>
                    <div className="phone-wrap">
                      <select className="phone-country" id="phoneCountry" name="phoneCountry" defaultValue="+966" aria-label="Country code">
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <input type="tel" id="phone" name="phone" placeholder="5X XXX XXXX" required />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>About your business</h3>
                <div className="form-row single">
                  <div className="form-field">
                    <label htmlFor="company">Company name<span className="req">*</span></label>
                    <input type="text" id="company" name="company" placeholder="Your company's legal name" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="industry">Industry<span className="req">*</span></label>
                    <select id="industry" name="industry" required defaultValue="">
                      <option value="" disabled>Select your industry</option>
                      {INDUSTRY_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="size">Company size<span className="req">*</span></label>
                    <select id="size" name="size" required defaultValue="">
                      <option value="" disabled>Number of employees</option>
                      {SIZE_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-field">
                    <label htmlFor="currentSystem">Current system<span className="req">*</span></label>
                    <select id="currentSystem" name="currentSystem" required defaultValue="">
                      <option value="" disabled>What are you using today?</option>
                      {SYSTEM_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>About your project</h3>
                <div className="form-row single">
                  <div className="form-field">
                    <label htmlFor="timeline">When are you looking to start? <span className="opt">Optional</span></label>
                    <select id="timeline" name="timeline" defaultValue="">
                      <option value="" disabled>Select a timeline</option>
                      {TIMELINE_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-field">
                    <label htmlFor="needs">What are you hoping the new system will solve? <span className="opt">Optional</span></label>
                    <textarea id="needs" name="needs" rows={3} placeholder="A few lines about the problems you're trying to fix, or what's driving the change..." />
                    <span className="helper">The more we know now, the more productive our first call will be.</span>
                  </div>
                </div>
              </div>

              {error && <p className="error">{error}</p>}

              <div className="submit-row">
                <p className="submit-note">By submitting, you agree to be contacted by Falcon about your inquiry. We respond within 24 hours.</p>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit and request quote"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
