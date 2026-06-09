import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { PlanKey } from "@/lib/pricing-plans";
import { useLocale, useLocalePath } from "@/lib/i18n";

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
.pricing-root .services-table th, .pricing-root .services-table td { padding: 20px 28px; text-align: start; border-bottom: 1px solid var(--border); vertical-align: middle; }
.pricing-root .services-table tr:last-child td { border-bottom: none; }
.pricing-root .services-table th { background: var(--surface-alt); color: var(--text-secondary); font-weight: 600; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; }
.pricing-root .services-table .svc-name { font-weight: 700; color: var(--navy-900); font-size: 15px; }
.pricing-root .services-table .svc-scope { color: var(--text-secondary); font-size: 14px; }
.pricing-root .services-table .svc-price { font-weight: 700; color: var(--navy-900); font-size: 15px; white-space: nowrap; }
.pricing-root .services-table .svc-cta { display: inline-block; background: var(--cta); color: white; padding: 10px 20px; border-radius: var(--radius-button); font-size: 13px; font-weight: 600; transition: background 0.15s, transform 0.15s; white-space: nowrap; }
.pricing-root .services-table .svc-cta:hover { background: var(--cta-hover); transform: translateY(-1px); }

.pricing-root .callout { background: var(--cyan-50); border-inline-start: 4px solid var(--cyan-500); border-radius: 0 12px 12px 0; padding: 20px 24px; margin-top: 32px; font-size: 14px; line-height: 1.7; color: var(--navy-900); }
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

type Strings = {
  sections: { id: string; label: string }[];
  heroEyebrow: string;
  heroH1a: string;
  heroH1b: string;
  heroLead: string;
  odooEyebrow: string;
  odooH2a: string;
  odooH2b: string;
  odooLead: string;
  odooCallout: React.ReactNode;
  falconEyebrow: string;
  falconH2a: string;
  falconH2b: string;
  falconLead: string;
  desktopHeading: string;
  desktopSub: string;
  cloudHeading: string;
  cloudSub: string;
  desktopCallout: React.ReactNode;
  servicesEyebrow: string;
  servicesH2a: string;
  servicesH2b: string;
  servicesLead: string;
  thService: string;
  thScope: string;
  thPrice: string;
  servicesCallout: React.ReactNode;
  bundlesH2a: string;
  bundlesH2b: string;
  bundlesLead: string;
  bundles: { what: string; save: string; full?: boolean }[];
  finalH2a: string;
  finalH2b: string;
  finalLead: string;
  finalCta: string;
  chooseCta: string;
  talkCta: string;
  quoteCta: string;
  buildOnce: string;
  yr1: string;
  basic: string;
  standard: string;
  pro: string;
  byScope: string;
  custom: string;
  mostPopular: string;
  bestValue: string;
  oneTime: string;
  perUserMonth: string;
  predictable: string;
  licenceImpl: string;
  scopedReq: string;
  setupTag: string;
  recurringTag: string;
  // plan cards
  esTitle: string; bzTitle: string; entTitle: string; cpTitle: string;
  setupTitle: string; perUserTitle: string;
  odooEs: string; odooBz: string; odooEnt: string; odooCp: string;
  fdEs: string; fdBz: string; fdEnt: string; fdCp: string;
  setupDesc: string; perUserDesc: string;
  inclEssentials: string; inclBusiness: string;
  // feature lines
  feats: {
    odooEs: string[]; odooBz: string[]; odooEnt: string[]; odooCp: string[];
    fdEs: string[]; fdBz: string[]; fdEnt: string[]; fdCp: string[];
    setup: string[]; perUser: string[];
  };
  // services rows
  svcRows: { name: string; scope: string; price: string }[];
};

const EN: Strings = {
  sections: [
    { id: "odoo", label: "Odoo Implementation" },
    { id: "falcon-erp", label: "Falcon ERP" },
    { id: "shared-services", label: "Support, Hosting & Services" },
    { id: "bundles", label: "Bundle Discounts" },
  ],
  heroEyebrow: "Pricing · 2026 · Kingdom of Saudi Arabia",
  heroH1a: "Transparent pricing for ",
  heroH1b: "every stage of growth",
  heroLead: "Recommended planning ranges for ERP implementations and Falcon ERP products, built for the Saudi market. All figures in SAR.",
  odooEyebrow: "The Destination",
  odooH2a: "",
  odooH2b: "Odoo",
  odooLead: "Three core tiers that map to company size, plus a Custom Plan for a tailored module mix. Each standard tier includes everything in the one before it.",
  odooCallout: (<><strong>What sits on top.</strong> The Odoo Enterprise licence is paid directly to Odoo at ~SAR 95 per user per month, separate from Falcon's implementation fee. Add-ons such as extra integrations, custom modules, multi-currency, and industry packs are quoted separately. These ranges are deliberately set at the affordable end to win Saudi SMEs.</>),
  falconEyebrow: "The Destination · Owned Products",
  falconH2a: "Falcon ERP ",
  falconH2b: "products",
  falconLead: "For clients who want to own their ERP outright. Falcon ERP Desktop is a perpetual licence; Falcon ERP Cloud is a fully managed SaaS with predictable monthly pricing.",
  desktopHeading: "Falcon ERP Desktop · perpetual licence",
  desktopSub: "Four tiers that scale with your business. Add annual maintenance at 15–20% of the licence.",
  cloudHeading: "Falcon ERP Cloud · fully managed SaaS",
  cloudSub: "Priced per user per month, with one fully managed plan that includes everything you need to run.",
  desktopCallout: (<><strong>The Desktop sell.</strong> Falcon ERP Desktop is a perpetual licence the client owns. No per-user fees running forever to a third party. Even at a slight premium upfront, ownership wins on total cost over two to three years. The pitch is ownership and zero recurring licence, not sticker price.</>),
  servicesEyebrow: "Shared Services",
  servicesH2a: "Support, hosting ",
  servicesH2b: "& services",
  servicesLead: "These apply across all our ERP implementations and products, on top of any engagement. Final pricing depends on scope. Get a tailored quote.",
  thService: "Service",
  thScope: "Scope",
  thPrice: "Price range",
  servicesCallout: (<><strong>How these rates flex.</strong> Customization sits at SAR 150–350 per hour depending on complexity (simple modifications at the lower end, advanced custom modules and ZATCA work at the upper end). Hosting flexes by deployment size, from a light single-environment setup up to a fully managed multi-branch one.</>),
  bundlesH2a: "Save more when you ",
  bundlesH2b: "bundle",
  bundlesLead: "Our standing discount policy. Apply automatically when you combine services on the same engagement.",
  bundles: [
    { what: "Implementation + monthly support", save: "20% off support" },
    { what: "Hosting + support", save: "15% off support" },
    { what: "Implementation + hosting + support · Gold", save: "25% off hosting & support" },
    { what: "Any service paid annually upfront", save: "10% off year total" },
    { what: "Refer a new client", save: "One free month for the referrer", full: true },
  ],
  finalH2a: "Not sure where to ",
  finalH2b: "start?",
  finalLead: "Tell us about your business: current systems, team size, and what you need. We'll build a tailored package and quote within 24 hours.",
  finalCta: "Get a Quote",
  chooseCta: "Choose this plan",
  talkCta: "Talk to our team",
  quoteCta: "Get a Quote",
  buildOnce: "build (one-time)",
  yr1: "Year-1 support:",
  basic: "Basic", standard: "Standard", pro: "Pro", byScope: "By scope",
  custom: "Custom",
  mostPopular: "Most popular",
  bestValue: "Best value",
  oneTime: "one-time",
  perUserMonth: "/ user / month",
  predictable: "Predictable monthly cost",
  licenceImpl: "Licence + implementation",
  scopedReq: "Scoped per requirements",
  setupTag: "Setup",
  recurringTag: "Recurring",
  esTitle: "Essentials", bzTitle: "Business", entTitle: "Enterprise", cpTitle: "Custom Plan",
  setupTitle: "One-time setup", perUserTitle: "Per user per month",
  odooEs: "Up to 10 users, single site. The starting point for businesses outgrowing basic accounting.",
  odooBz: "10–30 users, multi-branch. For mid-sized businesses running multiple departments.",
  odooEnt: "30+ users, multi-company. Manufacturing, multi-branch, complex operations.",
  odooCp: "Pick your own module mix with bespoke development, for businesses that need a tailored fit.",
  fdEs: "Up to 10 users, single site. Core accounting, sales, invoicing, inventory, ZATCA.",
  fdBz: "10–30 users, multi-branch. Adds purchasing, HR, payroll, projects, multi-warehouse.",
  fdEnt: "30+ users, multi-company. Adds manufacturing, maintenance, consolidation.",
  fdCp: "Tailored mix from 33+ modules, plus sector packs: clinics, real estate, tourism.",
  setupDesc: "Provisioning, configuration, data import, training, and go-live.",
  perUserDesc: "Fully managed SaaS. Hosting, updates, backups, and support all included.",
  inclEssentials: "Everything in Essentials, plus:",
  inclBusiness: "Everything in Business, plus:",
  feats: {
    odooEs: ["Accounting, Sales, Invoicing", "Inventory (single warehouse)", "CRM", "ZATCA Phase 2 e-invoicing"],
    odooBz: ["Purchasing, HR, Payroll", "Projects, Multi-warehouse", "Expenses, advanced dashboards"],
    odooEnt: ["Manufacturing, Quality, Maintenance", "Field Service, multi-location POS", "Business Intelligence dashboards"],
    odooCp: ["Tailored module selection", "Bespoke custom development", "Industry-specific configuration", "Scoped per your requirements"],
    fdEs: ["Core accounting & sales", "Invoicing & inventory", "ZATCA Phase 2 compliance", "Perpetual ownership, no recurring fees"],
    fdBz: ["Purchasing, HR, Payroll", "Projects, Multi-warehouse", "Perpetual ownership"],
    fdEnt: ["Manufacturing & maintenance", "Multi-company consolidation", "Advanced modules"],
    fdCp: ["Pick from 33+ modules", "Industry sector packs", "Bespoke configuration", "Perpetual ownership"],
    setup: ["Cloud environment provisioning", "Initial configuration & data import", "User training and go-live"],
    perUser: ["All modules included", "Fully managed hosting", "Automatic updates & backups", "Standard support included"],
  },
  svcRows: [
    { name: "Annual support", scope: "Tiered Basic to VIP. Response time, hours, channels", price: "SAR 350–3,500 / month" },
    { name: "Hosting", scope: "Managed cloud, backups, monitoring", price: "SAR 950–5,500 / year" },
    { name: "Customization", scope: "Reports, custom fields, bespoke modules", price: "SAR 150–350 / hour" },
    { name: "Data migration", scope: "From accounting tools or other ERPs", price: "SAR 6,000–45,000" },
  ],
};

const AR: Strings = {
  sections: [
    { id: "odoo", label: "تنفيذ أودو" },
    { id: "falcon-erp", label: "فالكون ERP" },
    { id: "shared-services", label: "الدعم والاستضافة والخدمات" },
    { id: "bundles", label: "خصومات الباقات" },
  ],
  heroEyebrow: "الأسعار · 2026 · المملكة العربية السعودية",
  heroH1a: "أسعار شفافة ",
  heroH1b: "لكل مرحلة من مراحل النمو",
  heroLead: "نطاقات تخطيط مقترحة لتنفيذ أنظمة ERP ومنتجات فالكون ERP، مصمّمة للسوق السعودي. جميع الأسعار بالريال السعودي.",
  odooEyebrow: "الوجهة",
  odooH2a: "تنفيذ ",
  odooH2b: "أودو",
  odooLead: "ثلاث فئات أساسية تتناسب مع حجم الشركة، بالإضافة إلى خطة مخصّصة لمزيج وحدات حسب الطلب. كل فئة قياسية تشمل كل ما في الفئة السابقة.",
  odooCallout: (<><strong>ما الذي يُضاف فوق ذلك.</strong> ترخيص Odoo Enterprise يُدفع مباشرةً لأودو بحوالي 95 ر.س لكل مستخدم شهريًا، منفصلًا عن رسوم التنفيذ من فالكون. الإضافات مثل التكاملات والوحدات المخصصة وتعدد العملات والباقات القطاعية تُسعَّر بشكل منفصل. هذه النطاقات مُحدَّدة عن قصد عند الحد المعقول لاستقطاب المنشآت السعودية الصغيرة والمتوسطة.</>),
  falconEyebrow: "الوجهة · منتجاتنا المملوكة",
  falconH2a: "منتجات ",
  falconH2b: "فالكون ERP",
  falconLead: "للعملاء الذين يريدون تملّك نظام ERP بالكامل. فالكون ERP ديسكتوب ترخيص دائم؛ وفالكون ERP كلاود خدمة SaaS مُدارة بالكامل بتسعير شهري ثابت.",
  desktopHeading: "فالكون ERP ديسكتوب · ترخيص دائم",
  desktopSub: "أربع فئات تتوسّع مع نمو شركتك. أضف صيانة سنوية بنسبة 15–20% من الترخيص.",
  cloudHeading: "فالكون ERP كلاود · SaaS مُدار بالكامل",
  cloudSub: "تسعير لكل مستخدم شهريًا، مع خطة واحدة مُدارة بالكامل تشمل كل ما تحتاجه للتشغيل.",
  desktopCallout: (<><strong>قيمة الديسكتوب.</strong> فالكون ERP ديسكتوب ترخيص دائم يملكه العميل. لا رسوم لكل مستخدم تستمر مدى الحياة لطرف ثالث. حتى بزيادة بسيطة في التكلفة المبدئية، يفوز التملّك على المدى الإجمالي خلال سنتين إلى ثلاث سنوات. القيمة في الملكية وعدم وجود ترخيص متكرر، لا في السعر المعلن فقط.</>),
  servicesEyebrow: "الخدمات المشتركة",
  servicesH2a: "الدعم والاستضافة ",
  servicesH2b: "والخدمات",
  servicesLead: "تنطبق على جميع تنفيذات ERP ومنتجاتنا، إضافةً إلى أي اتفاقية. السعر النهائي يعتمد على النطاق. احصل على عرض سعر مخصّص.",
  thService: "الخدمة",
  thScope: "النطاق",
  thPrice: "نطاق السعر",
  servicesCallout: (<><strong>كيف تتغيّر هذه الأسعار.</strong> التخصيص يتراوح بين 150–350 ر.س للساعة حسب التعقيد (التعديلات البسيطة في الحد الأدنى، والوحدات المتقدّمة وأعمال ZATCA في الحد الأعلى). الاستضافة تختلف بحسب حجم النشر، من إعداد بسيط ببيئة واحدة إلى نشر متعدد الفروع مُدار بالكامل.</>),
  bundlesH2a: "وفّر أكثر عند ",
  bundlesH2b: "الجمع بين الخدمات",
  bundlesLead: "سياسة الخصومات الدائمة لدينا. تُطبَّق تلقائيًا عند جمع الخدمات في الاتفاقية نفسها.",
  bundles: [
    { what: "التنفيذ + الدعم الشهري", save: "خصم 20% على الدعم" },
    { what: "الاستضافة + الدعم", save: "خصم 15% على الدعم" },
    { what: "التنفيذ + الاستضافة + الدعم · Gold", save: "خصم 25% على الاستضافة والدعم" },
    { what: "أي خدمة مدفوعة سنويًا مقدمًا", save: "خصم 10% على إجمالي السنة" },
    { what: "أحِل عميلًا جديدًا", save: "شهر مجاني للمُحيل", full: true },
  ],
  finalH2a: "غير متأكد من ",
  finalH2b: "أين تبدأ؟",
  finalLead: "أخبرنا عن شركتك: الأنظمة الحالية، حجم الفريق، وما تحتاجه. سنُعدّ لك باقة مخصّصة وعرض سعر خلال 24 ساعة.",
  finalCta: "اطلب عرض سعر",
  chooseCta: "اختر هذه الخطة",
  talkCta: "تواصل مع فريقنا",
  quoteCta: "اطلب عرض سعر",
  buildOnce: "تنفيذ (لمرة واحدة)",
  yr1: "دعم السنة الأولى:",
  basic: "Basic", standard: "Standard", pro: "Pro", byScope: "حسب النطاق",
  custom: "حسب الطلب",
  mostPopular: "الأكثر شيوعًا",
  bestValue: "الأفضل قيمةً",
  oneTime: "لمرة واحدة",
  perUserMonth: "/ مستخدم / شهر",
  predictable: "تكلفة شهرية ثابتة",
  licenceImpl: "الترخيص + التنفيذ",
  scopedReq: "حسب المتطلبات",
  setupTag: "الإعداد",
  recurringTag: "متكرر",
  esTitle: "الأساسية", bzTitle: "الأعمال", entTitle: "المؤسسات", cpTitle: "خطة مخصّصة",
  setupTitle: "إعداد لمرة واحدة", perUserTitle: "لكل مستخدم شهريًا",
  odooEs: "حتى 10 مستخدمين، موقع واحد. نقطة البداية للشركات التي تجاوزت المحاسبة الأساسية.",
  odooBz: "من 10 إلى 30 مستخدمًا، متعدد الفروع. للشركات المتوسطة بأقسام متعددة.",
  odooEnt: "أكثر من 30 مستخدمًا، متعدد الشركات. تصنيع، فروع متعددة، عمليات معقدة.",
  odooCp: "اختر مزيج الوحدات الخاص بك مع تطوير مخصّص، للشركات التي تحتاج حلًا مُفصّلًا.",
  fdEs: "حتى 10 مستخدمين، موقع واحد. محاسبة ومبيعات وفوترة ومخزون وفاتورة ZATCA.",
  fdBz: "من 10 إلى 30 مستخدمًا، متعدد الفروع. يضيف المشتريات والموارد البشرية والرواتب والمشاريع والمستودعات.",
  fdEnt: "أكثر من 30 مستخدمًا، متعدد الشركات. يضيف التصنيع والصيانة والتوحيد المالي.",
  fdCp: "مزيج مخصّص من أكثر من 33 وحدة، بالإضافة إلى باقات قطاعية: العيادات، العقارات، السياحة.",
  setupDesc: "الإعداد والتكوين واستيراد البيانات والتدريب والانطلاق.",
  perUserDesc: "SaaS مُدار بالكامل. الاستضافة والتحديثات والنسخ الاحتياطي والدعم مشمولة.",
  inclEssentials: "كل ما في الأساسية، بالإضافة إلى:",
  inclBusiness: "كل ما في الأعمال، بالإضافة إلى:",
  feats: {
    odooEs: ["المحاسبة والمبيعات والفوترة", "المخزون (مستودع واحد)", "إدارة علاقات العملاء CRM", "الفوترة الإلكترونية ZATCA المرحلة الثانية"],
    odooBz: ["المشتريات والموارد البشرية والرواتب", "المشاريع والمستودعات المتعددة", "المصاريف ولوحات تحكم متقدمة"],
    odooEnt: ["التصنيع والجودة والصيانة", "الخدمة الميدانية ونقاط بيع متعددة المواقع", "لوحات ذكاء الأعمال BI"],
    odooCp: ["اختيار وحدات مخصّص", "تطوير مخصّص حسب الطلب", "تكوين خاص بالقطاع", "محدّد حسب متطلباتك"],
    fdEs: ["المحاسبة والمبيعات الأساسية", "الفوترة والمخزون", "امتثال ZATCA المرحلة الثانية", "تملّك دائم بلا رسوم متكررة"],
    fdBz: ["المشتريات والموارد البشرية والرواتب", "المشاريع والمستودعات المتعددة", "تملّك دائم"],
    fdEnt: ["التصنيع والصيانة", "توحيد متعدد الشركات", "وحدات متقدمة"],
    fdCp: ["اختر من أكثر من 33 وحدة", "باقات قطاعية متخصصة", "تكوين مخصّص", "تملّك دائم"],
    setup: ["تهيئة بيئة سحابية", "التكوين الأولي واستيراد البيانات", "تدريب المستخدمين والانطلاق"],
    perUser: ["جميع الوحدات مشمولة", "استضافة مُدارة بالكامل", "تحديثات ونسخ احتياطي تلقائية", "دعم Standard مشمول"],
  },
  svcRows: [
    { name: "الدعم السنوي", scope: "فئات من Basic إلى VIP. وقت الاستجابة، الساعات، القنوات", price: "350–3,500 ر.س / شهر" },
    { name: "الاستضافة", scope: "سحابة مُدارة، نسخ احتياطي، مراقبة", price: "950–5,500 ر.س / سنة" },
    { name: "التخصيص", scope: "تقارير، حقول مخصّصة، وحدات مخصّصة", price: "150–350 ر.س / ساعة" },
    { name: "نقل البيانات", scope: "من أدوات المحاسبة أو أنظمة ERP أخرى", price: "6,000–45,000 ر.س" },
  ],
};

function useChoosePath() {
  const localePath = useLocalePath();
  return localePath("/pricing/choose");
}
function useContactPath() {
  const localePath = useLocalePath();
  return localePath("/contact");
}

function ChooseLink({ plan, variant, children }: { plan: PlanKey; variant: "primary" | "secondary"; children: React.ReactNode }) {
  const to = useChoosePath();
  return (
    <Link to={to} search={{ plan }} className={`card-cta ${variant}`}>
      {children}
    </Link>
  );
}

function TalkLink({ label }: { label: string }) {
  const to = useContactPath();
  return (
    <Link to={to} search={{ subject: "quote" }} className="card-cta outline">
      {label}
    </Link>
  );
}

function QuoteSvcLink({ label }: { label: string }) {
  const to = useContactPath();
  return (
    <Link to={to} search={{ subject: "quote" }} className="svc-cta">
      {label}
    </Link>
  );
}

export default function PricingPage() {
  const locale = useLocale();
  const s = locale === "ar" ? AR : EN;
  const localePath = useLocalePath();
  const [active, setActive] = useState<string>("odoo");

  useEffect(() => {
    function update() {
      let current = "odoo";
      for (const sec of s.sections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 160) current = sec.id;
      }
      setActive(current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [s.sections]);

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

      <section className="hero">
        <div className="container">
          <span className="eyebrow">{s.heroEyebrow}</span>
          <h1>{s.heroH1a}<span className="accent">{s.heroH1b}</span></h1>
          <p className="lead">{s.heroLead}</p>
        </div>
      </section>

      <nav className="subnav">
        <div className="container">
          <div className="subnav-inner">
            {s.sections.map((sec) => (
              <a key={sec.id} href={`#${sec.id}`} data-section={sec.id}
                onClick={(e) => jump(e, sec.id)}
                className={active === sec.id ? "active" : ""}>
                {sec.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ODOO */}
      <section className="section" id="odoo">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{s.odooEyebrow}</span>
            <h2>{s.odooH2a}<span className="accent">{s.odooH2b}</span>{locale === "en" ? " Implementation" : ""}</h2>
            <p>{s.odooLead}</p>
          </div>

          <div className="cards-grid">
            <article className="card">
              <h3>{s.esTitle}</h3>
              <p className="plan-desc">{s.odooEs}</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">{locale === "ar" ? "8,000 ر.س" : "SAR 8,000"}</span>
                  <span className="price-period">{s.buildOnce}</span>
                </div>
                <div className="price-sub">{s.yr1} <strong>{s.basic}</strong></div>
              </div>
              <ul className="features">
                {s.feats.odooEs.map((f, i) => <li key={i}><span className="check">✓</span><span>{f}</span></li>)}
              </ul>
              <ChooseLink plan="odoo-essentials" variant="secondary">{s.chooseCta}</ChooseLink>
            </article>

            <article className="card featured">
              <div className="card-badge">{s.mostPopular}</div>
              <h3>{s.bzTitle}</h3>
              <p className="plan-desc">{s.odooBz}</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">{locale === "ar" ? "15,000 ر.س" : "SAR 15,000"}</span>
                  <span className="price-period">{s.buildOnce}</span>
                </div>
                <div className="price-sub">{s.yr1} <strong>{s.standard}</strong></div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>{s.inclEssentials}</span></li>
                {s.feats.odooBz.map((f, i) => <li key={i}><span className="check">✓</span><span>{f}</span></li>)}
              </ul>
              <ChooseLink plan="odoo-business" variant="primary">{s.chooseCta}</ChooseLink>
            </article>

            <article className="card">
              <h3>{s.entTitle}</h3>
              <p className="plan-desc">{s.odooEnt}</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">{locale === "ar" ? "25,000 ر.س" : "SAR 25,000"}</span>
                  <span className="price-period">{s.buildOnce}</span>
                </div>
                <div className="price-sub">{s.yr1} <strong>{s.pro}</strong></div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>{s.inclBusiness}</span></li>
                {s.feats.odooEnt.map((f, i) => <li key={i}><span className="check">✓</span><span>{f}</span></li>)}
              </ul>
              <ChooseLink plan="odoo-enterprise" variant="secondary">{s.chooseCta}</ChooseLink>
            </article>

            <article className="card">
              <h3>{s.cpTitle}</h3>
              <p className="plan-desc">{s.odooCp}</p>
              <div className="price-row">
                <div className="price-main"><span className="price-amount">{s.custom}</span></div>
                <div className="price-sub">{s.yr1} <strong>{s.byScope}</strong></div>
              </div>
              <ul className="features">
                {s.feats.odooCp.map((f, i) => <li key={i}><span className="check">✓</span><span>{f}</span></li>)}
              </ul>
              <TalkLink label={s.talkCta} />
            </article>
          </div>

          <div className="callout">{s.odooCallout}</div>
        </div>
      </section>

      {/* FALCON ERP */}
      <section className="section" id="falcon-erp">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{s.falconEyebrow}</span>
            <h2>{s.falconH2a}<span className="accent">{s.falconH2b}</span></h2>
            <p>{s.falconLead}</p>
          </div>

          <h3 style={{ textAlign: "center", marginBottom: 8, color: "var(--navy-900)" }}>{s.desktopHeading}</h3>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: 15, marginBottom: 40 }}>{s.desktopSub}</p>

          <div className="cards-grid">
            <article className="card">
              <h3>{s.esTitle}</h3>
              <p className="plan-desc">{s.fdEs}</p>
              <div className="price-row">
                <div className="price-main"><span className="price-amount">{locale === "ar" ? "10,000 ر.س" : "SAR 10,000"}</span></div>
                <div className="price-sub">{s.licenceImpl}</div>
              </div>
              <ul className="features">
                {s.feats.fdEs.map((f, i) => <li key={i}><span className="check">✓</span><span>{f}</span></li>)}
              </ul>
              <ChooseLink plan="falcon-desktop-essentials" variant="secondary">{s.chooseCta}</ChooseLink>
            </article>

            <article className="card featured">
              <div className="card-badge">{s.mostPopular}</div>
              <h3>{s.bzTitle}</h3>
              <p className="plan-desc">{s.fdBz}</p>
              <div className="price-row">
                <div className="price-main"><span className="price-amount">{locale === "ar" ? "18,000 ر.س" : "SAR 18,000"}</span></div>
                <div className="price-sub">{s.licenceImpl}</div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>{s.inclEssentials}</span></li>
                {s.feats.fdBz.map((f, i) => <li key={i}><span className="check">✓</span><span>{f}</span></li>)}
              </ul>
              <ChooseLink plan="falcon-desktop-business" variant="primary">{s.chooseCta}</ChooseLink>
            </article>

            <article className="card">
              <h3>{s.entTitle}</h3>
              <p className="plan-desc">{s.fdEnt}</p>
              <div className="price-row">
                <div className="price-main"><span className="price-amount">{locale === "ar" ? "30,000 ر.س" : "SAR 30,000"}</span></div>
                <div className="price-sub">{s.licenceImpl}</div>
              </div>
              <ul className="features">
                <li><span className="check">✓</span><span>{s.inclBusiness}</span></li>
                {s.feats.fdEnt.map((f, i) => <li key={i}><span className="check">✓</span><span>{f}</span></li>)}
              </ul>
              <ChooseLink plan="falcon-desktop-enterprise" variant="secondary">{s.chooseCta}</ChooseLink>
            </article>

            <article className="card">
              <h3>{s.cpTitle}</h3>
              <p className="plan-desc">{s.fdCp}</p>
              <div className="price-row">
                <div className="price-main"><span className="price-amount">{s.custom}</span></div>
                <div className="price-sub">{s.scopedReq}</div>
              </div>
              <ul className="features">
                {s.feats.fdCp.map((f, i) => <li key={i}><span className="check">✓</span><span>{f}</span></li>)}
              </ul>
              <TalkLink label={s.talkCta} />
            </article>
          </div>

          <h3 style={{ textAlign: "center", margin: "64px 0 8px", color: "var(--navy-900)" }}>{s.cloudHeading}</h3>
          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: 15, marginBottom: 40 }}>{s.cloudSub}</p>

          <div className="cards-grid two-col">
            <article className="card">
              <span className="card-tag">{s.setupTag}</span>
              <h3>{s.setupTitle}</h3>
              <p className="plan-desc">{s.setupDesc}</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">{locale === "ar" ? "1,500 ر.س" : "SAR 1,500"}</span>
                  <span className="price-period">{s.oneTime}</span>
                </div>
              </div>
              <ul className="features">
                {s.feats.setup.map((f, i) => <li key={i}><span className="check">✓</span><span>{f}</span></li>)}
              </ul>
              <ChooseLink plan="falcon-cloud-setup" variant="secondary">{s.chooseCta}</ChooseLink>
            </article>

            <article className="card featured">
              <div className="card-badge">{s.bestValue}</div>
              <span className="card-tag">{s.recurringTag}</span>
              <h3>{s.perUserTitle}</h3>
              <p className="plan-desc">{s.perUserDesc}</p>
              <div className="price-row">
                <div className="price-main">
                  <span className="price-amount">{locale === "ar" ? "50 ر.س" : "SAR 50"}</span>
                  <span className="price-period">{s.perUserMonth}</span>
                </div>
                <div className="price-note">{s.predictable}</div>
              </div>
              <ul className="features">
                {s.feats.perUser.map((f, i) => <li key={i}><span className="check">✓</span><span>{f}</span></li>)}
              </ul>
              <ChooseLink plan="falcon-cloud-per-user" variant="primary">{s.chooseCta}</ChooseLink>
            </article>
          </div>

          <div className="callout">{s.desktopCallout}</div>
        </div>
      </section>

      {/* SHARED SERVICES */}
      <section className="section" id="shared-services">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{s.servicesEyebrow}</span>
            <h2>{s.servicesH2a}<span className="accent">{s.servicesH2b}</span></h2>
            <p>{s.servicesLead}</p>
          </div>

          <table className="services-table">
            <thead>
              <tr>
                <th>{s.thService}</th>
                <th>{s.thScope}</th>
                <th>{s.thPrice}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {s.svcRows.map((row, i) => (
                <tr key={i}>
                  <td><div className="svc-name">{row.name}</div></td>
                  <td className="svc-scope">{row.scope}</td>
                  <td className="svc-price">{row.price}</td>
                  <td><QuoteSvcLink label={s.quoteCta} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="callout">{s.servicesCallout}</div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="discounts" id="bundles">
        <div className="discounts-inner">
          <h2>{s.bundlesH2a}<span className="accent">{s.bundlesH2b}</span></h2>
          <p className="lead-dark">{s.bundlesLead}</p>
          <div className="discount-grid">
            {s.bundles.map((b, i) => (
              <div key={i} className="discount-row" style={b.full ? { gridColumn: "1 / -1" } : undefined}>
                <span className="what">{b.what}</span>
                <span className="save">{b.save}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>{s.finalH2a}<span className="accent">{s.finalH2b}</span></h2>
          <p>{s.finalLead}</p>
          <Link to={localePath("/contact")} search={{ subject: "quote" }} className="btn-primary-lg">{s.finalCta}</Link>
        </div>
      </section>
    </div>
  );
}
