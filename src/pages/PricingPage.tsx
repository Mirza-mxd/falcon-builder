import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { PlanKey } from "@/lib/pricing-plans";

const PRICING_CSS = `
.pricing-root {
  --navy-900: #0F1B3D; --navy-800: #162A54; --navy-700: #1B3A6B; --navy-600: #1E4D8C;
  --cyan-500: #29ABD4; --cyan-400: #4DBFE0; --cyan-300: #7DD3EC; --cyan-200: #B0E4F4;
  --cyan-100: #D6F1FA; --cyan-50: #EBF8FD;
  --cta: #10B981; --cta-hover: #059669; --cta-light: #D1FAE5;
  --surface: #F8FAFC; --surface-alt: #F1F5F9; --card: #FFFFFF;
  --text-primary: #0F1B3D; --text-secondary: #64748B; --text-muted: #94A3B8; --text-on-dark: #F8FAFC;
  --gold: #D4A843; --border: #E2E8F0; --border-focus: #29ABD4;
  --shadow-card: 0 4px 24px rgba(15, 23, 42, 0.06);
  --shadow-card-hover: 0 20px 40px rgba(15, 23, 42, 0.1);
  --radius-card: 16px; --radius-button: 12px; --radius-input: 10px;
  font-family: "Inter", "Helvetica Neue", system-ui, sans-serif;
  color: var(--text-primary);
  scroll-padding-top: 140px;
}
.pricing-root h1, .pricing-root h2, .pricing-root h3, .pricing-root h4 { color: var(--text-primary); letter-spacing: -0.01em; }
.pricing-root h1 { font-size: 48px; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; }
.pricing-root h2 { font-size: 32px; font-weight: 700; line-height: 1.25; }
.pricing-root h3 { font-size: 20px; font-weight: 600; line-height: 1.35; }
.pricing-root p { color: var(--text-secondary); }
.pricing-root ul { list-style: none; padding: 0; margin: 0; }
.pricing-root a { color: inherit; text-decoration: none; }
.pricing-root button { font-family: inherit; cursor: pointer; border: none; background: none; }

.pricing-root .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

.pricing-root .hero { padding: 80px 0 56px; background: linear-gradient(180deg, #fff 0%, var(--surface) 100%); text-align: center; }
.pricing-root .eyebrow { display: inline-block; font-size: 13px; font-weight: 600; letter-spacing: 0.12em; color: var(--cyan-500); text-transform: uppercase; margin-bottom: 20px; }
.pricing-root .hero h1 { max-width: 800px; margin: 0 auto 20px; }
.pricing-root .hero h1 .accent { color: var(--cyan-500); }
.pricing-root .hero p.lead { max-width: 640px; margin: 0 auto; font-size: 18px; color: var(--text-secondary); }

.pricing-root .subnav { position: sticky; top: 80px; z-index: 30; background: white; border-bottom: 1px solid var(--border); box-shadow: 0 4px 12px rgba(15,23,42,0.03); }
.pricing-root .subnav-inner { display: flex; gap: 4px; justify-content: center; overflow-x: auto; scrollbar-width: none; }
.pricing-root .subnav-inner::-webkit-scrollbar { display: none; }
.pricing-root .subnav a { padding: 18px 20px; font-size: 14px; font-weight: 500; color: var(--text-secondary); white-space: nowrap; border-bottom: 2px solid transparent; transition: all 0.15s; cursor: pointer; }
.pricing-root .subnav a:hover { color: var(--navy-900); }
.pricing-root .subnav a.active { color: var(--cyan-500); border-bottom-color: var(--cyan-500); font-weight: 600; }

.pricing-root .section { padding: 80px 0; border-bottom: 1px solid var(--border); scroll-margin-top: 140px; }
.pricing-root .section:nth-of-type(even) { background: var(--surface); }
.pricing-root .section-head { text-align: center; max-width: 720px; margin: 0 auto 56px; }
.pricing-root .section-head h2 { margin-bottom: 12px; }
.pricing-root .section-head h2 .accent { color: var(--cyan-500); }
.pricing-root .section-head p { font-size: 17px; }

.pricing-root .cards-grid { display: grid; gap: 20px; grid-template-columns: repeat(4, 1fr); align-items: stretch; }
.pricing-root .cards-grid.two-col { grid-template-columns: repeat(2, 1fr); max-width: 760px; margin: 0 auto; }
.pricing-root .card { background: white; border-radius: var(--radius-card); padding: 28px 24px; box-shadow: var(--shadow-card); position: relative; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; border: 1px solid var(--border); }
.pricing-root .card:hover { box-shadow: var(--shadow-card-hover); transform: translateY(-4px); }
.pricing-root .card.featured { border: 2px solid var(--cyan-500); box-shadow: 0 20px 50px rgba(41, 171, 212, 0.15); }
.pricing-root .card-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--gold); color: white; font-size: 11px; font-weight: 700; padding: 5px 14px; border-radius: 999px; letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap; }
.pricing-root .card-tag { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: var(--cyan-500); text-transform: uppercase; margin-bottom: 10px; }
.pricing-root .card h3 { margin-bottom: 8px; font-size: 19px; }
.pricing-root .card .plan-desc { font-size: 14px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6; min-height: 65px; }
.pricing-root .price-row { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
.pricing-root .price-main { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
.pricing-root .price-amount { font-size: 30px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; }
.pricing-root .price-period { font-size: 13px; color: var(--text-secondary); }
.pricing-root .price-sub { margin-top: 6px; font-size: 13px; color: var(--text-secondary); }
.pricing-root .price-sub strong { color: var(--text-primary); font-weight: 600; }
.pricing-root .price-note { margin-top: 8px; font-size: 12px; color: var(--cta); font-weight: 500; }
.pricing-root .features { flex: 1; margin-bottom: 24px; }
.pricing-root .features li { display: flex; align-items: flex-start; gap: 10px; padding: 6px 0; font-size: 13px; color: var(--text-primary); line-height: 1.5; }
.pricing-root .features .check { flex-shrink: 0; margin-top: 2px; width: 16px; height: 16px; border-radius: 50%; background: var(--cta); color: white; display: grid; place-items: center; font-size: 10px; font-weight: 700; }
.pricing-root .card-cta { display: block; width: 100%; padding: 13px; border-radius: var(--radius-button); font-weight: 600; font-size: 14px; text-align: center; text-decoration: none; transition: all 0.15s; cursor: pointer; }
.pricing-root .card-cta.primary { background: var(--cta); color: white; }
.pricing-root .card-cta.primary:hover { background: var(--cta-hover); transform: translateY(-1px); }
.pricing-root .card-cta.secondary { background: var(--navy-900); color: white; }
.pricing-root .card-cta.secondary:hover { background: var(--navy-800); transform: translateY(-1px); }
.pricing-root .card-cta.outline { background: white; color: var(--navy-900); border: 1.5px solid var(--navy-900); }
.pricing-root .card-cta.outline:hover { background: var(--navy-900); color: white; }

.pricing-root .services-table { width: 100%; border-collapse: collapse; background: white; border-radius: var(--radius-card); border: 1px solid var(--border); box-shadow: var(--shadow-card); overflow: hidden; }
.pricing-root .services-table th, .pricing-root .services-table td { padding: 20px 28px; text-align: left; border-bottom: 1px solid var(--border); vertical-align: middle; }
.pricing-root .services-table tr:last-child td { border-bottom: none; }
.pricing-root .services-table th { background: var(--surface-alt); color: var(--text-secondary); font-weight: 600; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; }
.pricing-root .services-table .svc-name { font-weight: 700; color: var(--navy-900); font-size: 15px; }
.pricing-root .services-table .svc-scope { color: var(--text-secondary); font-size: 14px; }
.pricing-root .services-table .svc-price { font-weight: 700; color: var(--navy-900); font-size: 15px; white-space: nowrap; }
.pricing-root .services-table .svc-cta { display: inline-block; background: var(--cta); color: white; padding: 10px 20px; border-radius: var(--radius-button); font-size: 13px; font-weight: 600; transition: background 0.15s, transform 0.15s; white-space: nowrap; }
.pricing-root .services-table .svc-cta:hover { background: var(--cta-hover); transform: translateY(-1px); }

.pricing-root .callout { background: var(--cyan-50); border-left: 4px solid var(--cyan-500); border-radius: 0 12px 12px 0; padding: 20px 24px; margin-top: 32px; font-size: 14px; line-height: 1.7; color: var(--navy-900); }
.pricing-root .callout strong { color: var(--navy-900); font-weight: 700; }

.pricing-root .discounts { padding: 80px 0; background: linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 100%); color: white; position: relative; overflow: hidden; scroll-margin-top: 140px; }
.pricing-root .discounts::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
.pricing-root .discounts-inner { position: relative; max-width: 980px; margin: 0 auto; padding: 0 24px; }
.pricing-root .discounts h2 { color: white; text-align: center; margin-bottom: 12px; }
.pricing-root .discounts h2 .accent { color: var(--cyan-300); }
.pricing-root .lead-dark { color: var(--cyan-200); text-align: center; max-width: 600px; margin: 0 auto 40px; position: relative; }
.pricing-root .discount-grid { display: grid; gap: 12px; grid-template-columns: repeat(2, 1fr); }
.pricing-root .discount-row { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
.pricing-root .discount-row .what { color: rgba(255,255,255,0.85); font-size: 14px; }
.pricing-root .discount-row .save { color: var(--cyan-300); font-weight: 700; font-size: 15px; white-space: nowrap; }

.pricing-root .final-cta { padding: 96px 0; background: white; text-align: center; }
.pricing-root .final-cta h2 { margin-bottom: 16px; }
.pricing-root .final-cta h2 .accent { color: var(--cyan-500); }
.pricing-root .final-cta p { max-width: 560px; margin: 0 auto 32px; font-size: 17px; }
.pricing-root .btn-primary-lg { display: inline-block; background: var(--cta); color: white; padding: 16px 36px; border-radius: var(--radius-button); font-weight: 700; font-size: 16px; transition: transform 0.15s, box-shadow 0.15s; }
.pricing-root .btn-primary-lg:hover { background: var(--cta-hover); transform: translateY(-2px); box-shadow: 0 12px 30px rgba(16,185,129,0.3); }

@media (max-width: 1100px) { .pricing-root .cards-grid { grid-template-columns: repeat(2, 1fr); max-width: 760px; margin: 0 auto; } }
@media (max-width: 720px) {
  .pricing-root .cards-grid, .pricing-root .cards-grid.two-col { grid-template-columns: 1fr; max-width: 440px; }
  .pricing-root .discount-grid { grid-template-columns: 1fr; }
  .pricing-root h1 { font-size: 36px; }
  .pricing-root h2 { font-size: 26px; }
  .pricing-root .services-table { display: block; overflow-x: auto; }
  .pricing-root .services-table th, .pricing-root .services-table td { padding: 14px 16px; }
}
`;

const SECTIONS = [
  { id: "odoo", label: "Odoo Implementation" },
  { id: "falcon-erp", label: "Falcon ERP" },
  { id: "shared-services", label: "Support, Hosting & Services" },
  { id: "bundles", label: "Bundle Discounts" },
];

function ChooseLink({ plan, variant, children }: { plan: PlanKey; variant: "primary" | "secondary"; children: React.ReactNode }) {
  return (
    <Link
      to="/pricing/choose"
      search={{ plan }}
      className={`card-cta ${variant}`}
    >
      {children}
    </Link>
  );
}

function TalkLink() {
  return (
    <Link to="/contact" search={{ subject: "quote" }} className="card-cta outline">
      Talk to our team
    </Link>
  );
}

function QuoteSvcLink() {
  return (
    <Link to="/contact" search={{ subject: "quote" }} className="svc-cta">
      Get a Quote
    </Link>
  );
}

export default function PricingPage() {
  const [active, setActive] = useState<string>("odoo");

  useEffect(() => {
    function update() {
      let current = "odoo";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 160) current = s.id;
      }
      setActive(current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function jump(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <div className="pricing-root">
      <style dangerouslySetInnerHTML={{ __html: PRICING_CSS }} />

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1>Clear pricing for your <span className="accent">ERP journey</span></h1>
          <p className="lead">From Odoo implementations to Falcon ERP products, plus shared services and bundle discounts. Pick a starting point, or talk to us for a tailored quote.</p>
        </div>
      </section>

      {/* SUB-NAV */}
      <nav className="subnav">
        <div className="container">
          <div className="subnav-inner">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-section={s.id}
                onClick={(e) => jump(e, s.id)}
                className={active === s.id ? "active" : ""}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ODOO */}
      <section className="section" id="odoo">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The Destination</span>
            <h2><span className="accent">Odoo</span> Implementation</h2>
            <p>Three core tiers that map to company size, plus a Custom Plan for a tailored module mix. Each standard tier includes everything in the one before it.</p>
          </div>

          <div className="cards-grid">
            <article className="card">
              <h3>Essentials</h3>
              <p className="plan-desc">Up to 10 users, single site. The starting point for businesses outgrowing basic accounting.</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">SAR 8,000</span>
                  <span className="price-period">build (one-time)</span>
                </div>
                <div className="price-sub">Year-1 support: <strong>Basic</strong></div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>Accounting, Sales, Invoicing</span></li>
                <li><span className="check">✓</span><span>Inventory (single warehouse)</span></li>
                <li><span className="check">✓</span><span>CRM</span></li>
                <li><span className="check">✓</span><span>ZATCA Phase 2 e-invoicing</span></li>
              </ul>
              <ChooseLink plan="odoo-essentials" variant="secondary">Choose this plan</ChooseLink>
            </article>

            <article className="card featured">
              <div className="card-badge">Most popular</div>
              <h3>Business</h3>
              <p className="plan-desc">10–30 users, multi-branch. For mid-sized businesses running multiple departments.</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">SAR 15,000</span>
                  <span className="price-period">build (one-time)</span>
                </div>
                <div className="price-sub">Year-1 support: <strong>Standard</strong></div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>Everything in Essentials, plus:</span></li>
                <li><span className="check">✓</span><span>Purchasing, HR, Payroll</span></li>
                <li><span className="check">✓</span><span>Projects, Multi-warehouse</span></li>
                <li><span className="check">✓</span><span>Expenses, advanced dashboards</span></li>
              </ul>
              <ChooseLink plan="odoo-business" variant="primary">Choose this plan</ChooseLink>
            </article>

            <article className="card">
              <h3>Enterprise</h3>
              <p className="plan-desc">30+ users, multi-company. Manufacturing, multi-branch, complex operations.</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">SAR 25,000</span>
                  <span className="price-period">build (one-time)</span>
                </div>
                <div className="price-sub">Year-1 support: <strong>Pro</strong></div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>Everything in Business, plus:</span></li>
                <li><span className="check">✓</span><span>Manufacturing, Quality, Maintenance</span></li>
                <li><span className="check">✓</span><span>Field Service, multi-location POS</span></li>
                <li><span className="check">✓</span><span>Business Intelligence dashboards</span></li>
              </ul>
              <ChooseLink plan="odoo-enterprise" variant="secondary">Choose this plan</ChooseLink>
            </article>

            <article className="card">
              <h3>Custom Plan</h3>
              <p className="plan-desc">Pick your own module mix with bespoke development, for businesses that need a tailored fit.</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">Custom</span>
                </div>
                <div className="price-sub">Year-1 support: <strong>By scope</strong></div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>Tailored module selection</span></li>
                <li><span className="check">✓</span><span>Bespoke custom development</span></li>
                <li><span className="check">✓</span><span>Industry-specific configuration</span></li>
                <li><span className="check">✓</span><span>Scoped per your requirements</span></li>
              </ul>
              <TalkLink />
            </article>
          </div>

          <div className="callout">
            <strong>What sits on top.</strong> The Odoo Enterprise licence is paid directly to Odoo at ~SAR 95 per user per month, separate from Falcon's implementation fee. Add-ons such as extra integrations, custom modules, multi-currency, and industry packs are quoted separately. These ranges are deliberately set at the affordable end to win Saudi SMEs.
          </div>
        </div>
      </section>

      {/* FALCON ERP */}
      <section className="section" id="falcon-erp">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The Destination · Owned Products</span>
            <h2>Falcon ERP <span className="accent">products</span></h2>
            <p>For clients who want to own their ERP outright. Falcon ERP Desktop is a perpetual licence; Falcon ERP Cloud is a fully managed SaaS with predictable monthly pricing.</p>
          </div>

          <h3 style={{ textAlign: "center", marginBottom: 8, color: "var(--navy-900)" }}>Falcon ERP Desktop · perpetual licence</h3>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: 15, marginBottom: 40 }}>Four tiers that scale with your business. Add annual maintenance at 15–20% of the licence.</p>

          <div className="cards-grid">
            <article className="card">
              <h3>Essentials</h3>
              <p className="plan-desc">Up to 10 users, single site. Core accounting, sales, invoicing, inventory, ZATCA.</p>
              <div className="price-row">
                <div className="price-main"><span className="price-amount">SAR 10,000</span></div>
                <div className="price-sub">Licence + implementation</div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>Core accounting & sales</span></li>
                <li><span className="check">✓</span><span>Invoicing & inventory</span></li>
                <li><span className="check">✓</span><span>ZATCA Phase 2 compliance</span></li>
                <li><span className="check">✓</span><span>Perpetual ownership, no recurring fees</span></li>
              </ul>
              <ChooseLink plan="falcon-desktop-essentials" variant="secondary">Choose this plan</ChooseLink>
            </article>

            <article className="card featured">
              <div className="card-badge">Most popular</div>
              <h3>Business</h3>
              <p className="plan-desc">10–30 users, multi-branch. Adds purchasing, HR, payroll, projects, multi-warehouse.</p>
              <div className="price-row">
                <div className="price-main"><span className="price-amount">SAR 18,000</span></div>
                <div className="price-sub">Licence + implementation</div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>Everything in Essentials, plus:</span></li>
                <li><span className="check">✓</span><span>Purchasing, HR, Payroll</span></li>
                <li><span className="check">✓</span><span>Projects, Multi-warehouse</span></li>
                <li><span className="check">✓</span><span>Perpetual ownership</span></li>
              </ul>
              <ChooseLink plan="falcon-desktop-business" variant="primary">Choose this plan</ChooseLink>
            </article>

            <article className="card">
              <h3>Enterprise</h3>
              <p className="plan-desc">30+ users, multi-company. Adds manufacturing, maintenance, consolidation.</p>
              <div className="price-row">
                <div className="price-main"><span className="price-amount">SAR 30,000</span></div>
                <div className="price-sub">Licence + implementation</div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>Everything in Business, plus:</span></li>
                <li><span className="check">✓</span><span>Manufacturing & maintenance</span></li>
                <li><span className="check">✓</span><span>Multi-company consolidation</span></li>
                <li><span className="check">✓</span><span>Advanced modules</span></li>
              </ul>
              <ChooseLink plan="falcon-desktop-enterprise" variant="secondary">Choose this plan</ChooseLink>
            </article>

            <article className="card">
              <h3>Custom Plan</h3>
              <p className="plan-desc">Tailored mix from 33+ modules, plus sector packs: clinics, real estate, tourism.</p>
              <div className="price-row">
                <div className="price-main"><span className="price-amount">Custom</span></div>
                <div className="price-sub">Scoped per requirements</div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>Pick from 33+ modules</span></li>
                <li><span className="check">✓</span><span>Industry sector packs</span></li>
                <li><span className="check">✓</span><span>Bespoke configuration</span></li>
                <li><span className="check">✓</span><span>Perpetual ownership</span></li>
              </ul>
              <TalkLink />
            </article>
          </div>

          <h3 style={{ textAlign: "center", margin: "64px 0 8px", color: "var(--navy-900)" }}>Falcon ERP Cloud · fully managed SaaS</h3>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: 15, marginBottom: 40 }}>Priced per user per month, with one fully managed plan that includes everything you need to run.</p>

          <div className="cards-grid two-col">
            <article className="card">
              <span className="card-tag">Setup</span>
              <h3>One-time setup</h3>
              <p className="plan-desc">Provisioning, configuration, data import, training, and go-live.</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">SAR 1,500</span>
                  <span className="price-period">one-time</span>
                </div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>Cloud environment provisioning</span></li>
                <li><span className="check">✓</span><span>Initial configuration & data import</span></li>
                <li><span className="check">✓</span><span>User training and go-live</span></li>
              </ul>
              <ChooseLink plan="falcon-cloud-setup" variant="secondary">Choose this plan</ChooseLink>
            </article>

            <article className="card featured">
              <div className="card-badge">Best value</div>
              <span className="card-tag">Recurring</span>
              <h3>Per user per month</h3>
              <p className="plan-desc">Fully managed SaaS. Hosting, updates, backups, and support all included.</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">SAR 50</span>
                  <span className="price-period">/ user / month</span>
                </div>
                <div className="price-note">Predictable monthly cost</div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>All modules included</span></li>
                <li><span className="check">✓</span><span>Fully managed hosting</span></li>
                <li><span className="check">✓</span><span>Automatic updates & backups</span></li>
                <li><span className="check">✓</span><span>Standard support included</span></li>
              </ul>
              <ChooseLink plan="falcon-cloud-per-user" variant="primary">Choose this plan</ChooseLink>
            </article>
          </div>

          <div className="callout">
            <strong>The Desktop sell.</strong> Falcon ERP Desktop is a perpetual licence the client owns. No per-user fees running forever to a third party. Even at a slight premium upfront, ownership wins on total cost over two to three years. The pitch is ownership and zero recurring licence, not sticker price.
          </div>
        </div>
      </section>

      {/* SHARED SERVICES */}
      <section className="section" id="shared-services">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Shared Services</span>
            <h2>Support, hosting <span className="accent">& services</span></h2>
            <p>These apply across all our ERP implementations and products, on top of any engagement. Final pricing depends on scope. Get a tailored quote.</p>
          </div>

          <table className="services-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Scope</th>
                <th>Price range</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div className="svc-name">Annual support</div></td>
                <td className="svc-scope">Tiered Basic to VIP. Response time, hours, channels</td>
                <td className="svc-price">SAR 350–3,500 / month</td>
                <td><QuoteSvcLink /></td>
              </tr>
              <tr>
                <td><div className="svc-name">Hosting</div></td>
                <td className="svc-scope">Managed cloud, backups, monitoring</td>
                <td className="svc-price">SAR 950–5,500 / year</td>
                <td><QuoteSvcLink /></td>
              </tr>
              <tr>
                <td><div className="svc-name">Customization</div></td>
                <td className="svc-scope">Reports, custom fields, bespoke modules</td>
                <td className="svc-price">SAR 150–350 / hour</td>
                <td><QuoteSvcLink /></td>
              </tr>
              <tr>
                <td><div className="svc-name">Data migration</div></td>
                <td className="svc-scope">From accounting tools or other ERPs</td>
                <td className="svc-price">SAR 6,000–45,000</td>
                <td><QuoteSvcLink /></td>
              </tr>
            </tbody>
          </table>

          <div className="callout">
            <strong>How these rates flex.</strong> Customization sits at SAR 150–350 per hour depending on complexity (simple modifications at the lower end, advanced custom modules and ZATCA work at the upper end). Hosting flexes by deployment size, from a light single-environment setup up to a fully managed multi-branch one.
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="discounts" id="bundles">
        <div className="discounts-inner">
          <h2>Save more when you <span className="accent">bundle</span></h2>
          <p className="lead-dark">Our standing discount policy. Apply automatically when you combine services on the same engagement.</p>
          <div className="discount-grid">
            <div className="discount-row"><span className="what">Implementation + monthly support</span><span className="save">20% off support</span></div>
            <div className="discount-row"><span className="what">Hosting + support</span><span className="save">15% off support</span></div>
            <div className="discount-row"><span className="what">Implementation + hosting + support · Gold</span><span className="save">25% off hosting & support</span></div>
            <div className="discount-row"><span className="what">Any service paid annually upfront</span><span className="save">10% off year total</span></div>
            <div className="discount-row" style={{ gridColumn: "1 / -1" }}><span className="what">Refer a new client</span><span className="save">One free month for the referrer</span></div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Not sure where to <span className="accent">start?</span></h2>
          <p>Tell us about your business: current systems, team size, and what you need. We'll build a tailored package and quote within 24 hours.</p>
          <Link to="/contact" search={{ subject: "quote" }} className="btn-primary-lg">Get a Quote</Link>
        </div>
      </section>
    </div>
  );
}
