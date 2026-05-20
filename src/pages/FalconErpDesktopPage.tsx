import Container from "@/components/ui/Container";
import FButton from "@/components/ui/FButton";

const PROBLEMS = [
  { icon: "💸", title: "Paying SAP prices for basic features", desc: "Global ERPs charge $150K-$500K upfront with 12+ months of implementation. Most features go unused while your budget disappears." },
  { icon: "🌐", title: "Your data lives on foreign servers", desc: "Cloud-only ERPs store your financial records, employee data, and trade secrets on servers outside the Kingdom. That is a PDPL compliance risk." },
  { icon: "⏳", title: "Slow implementations that drain your team", desc: "6-12 month rollouts mean lost productivity, frustrated employees, and delayed ROI. Your business cannot wait that long." },
];

const MODULES = [
  { icon: "💰", title: "Financial Management", desc: "General ledger, AP/AR, fixed assets, budgeting, multi-currency, and bank reconciliation. Full Arabic financial reporting out of the box." },
  { icon: "📦", title: "Inventory & Warehouse", desc: "Real-time stock tracking across multiple warehouses. Barcode scanning, automated reordering, batch/serial tracking, and min-max alerts." },
  { icon: "👥", title: "HR & Payroll", desc: "Complete employee lifecycle management with GOSI integration, WPS compliance, leave management, and end-of-service calculations." },
  { icon: "📈", title: "CRM & Sales", desc: "Track every lead from first contact to closed deal. Sales pipeline, quotation builder, follow-up automation, and revenue forecasting." },
  { icon: "🏭", title: "Manufacturing", desc: "Bill of materials, production planning, work orders, quality control, and cost tracking. Built for factories and workshops across KSA." },
  { icon: "🧾", title: "Arabic E-Invoicing", desc: "Native ZATCA Phase 2 e-invoicing with QR code generation, XML submission, credit/debit notes, and full Arabic RTL support. No add-ons needed." },
];

const STEPS = [
  { n: "01", title: "Free Consultation", desc: "We analyze your current workflows, pain points, and requirements. You get a detailed project plan and fixed-price quote within 48 hours." },
  { n: "02", title: "4-8 Week Setup", desc: "Our team handles installation, data migration, customization, and integrations. Your staff receives hands-on training throughout the process." },
  { n: "03", title: "Go Live with Training", desc: "Launch with confidence. We provide on-site support during your first week live, plus 90 days of priority support to ensure a smooth transition." },
];

const INDUSTRIES = [
  { icon: "🏗️", name: "Construction & Contracting" },
  { icon: "🏭", name: "Manufacturing & Factories" },
  { icon: "📦", name: "Trading & Wholesale" },
  { icon: "🏢", name: "Real Estate & Property" },
  { icon: "🛒", name: "Retail & E-Commerce" },
  { icon: "🏥", name: "Healthcare & Clinics" },
];

const TRUST = ["ZATCA Certified", "Saudi Data Centers", "500+ Clients", "24/7 Support"];

export default function FalconErpDesktopPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-dark py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-400">
                On-Premise ERP
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Your Data. Your Servers. Your Rules.
              </h1>
              <p className="mt-6 text-lg text-text-on-dark/70">
                Enterprise-grade ERP with full data sovereignty. ZATCA-compliant, Arabic-native, and deployed on your infrastructure, not someone else's cloud.
              </p>
              <p className="mt-6 text-lg font-semibold text-primary-400">
                Perpetual license from $550/user
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <FButton variant="cta" size="lg" href="/contact">Get Your Free ERP Assessment</FButton>
                <FButton variant="dark-outline" size="lg" href="/demo">Book a Live Demo</FButton>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-text-on-dark/80">
                {["No data leaves your servers", "ZATCA Phase 2 certified", "Go live in 4-8 weeks"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-cta">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary-800/40 to-primary-900/40 ring-1 ring-white/10">
              <img
                src="/images/screens/falcon-desktop-hero.png"
                alt="Falcon Desktop ERP Dashboard"
                className="h-full w-full rounded-2xl object-cover"
                onError={(e) => { (e.currentTarget.style.display = "none"); }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* PROBLEM */}
      <section className="bg-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">The Problem</p>
            <h2 className="mt-3 text-text-primary">Why most MENA businesses regret their ERP choice</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="rounded-[var(--radius-card)] bg-surface p-8 shadow-card">
                <div className="mb-4 text-4xl">{p.icon}</div>
                <h3 className="mb-3 text-lg font-bold text-text-primary">{p.title}</h3>
                <p className="text-text-secondary">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#how-it-works" className="font-semibold text-primary-500 hover:text-primary-400">
              There is a better way →
            </a>
          </div>
        </Container>
      </section>

      {/* CORE MODULES */}
      <section className="bg-surface py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">Core Modules</p>
            <h2 className="mt-3 text-text-primary">Everything your business needs, nothing it does not</h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Six integrated modules designed for MENA businesses. Arabic-native, ZATCA-certified, and ready to deploy on your servers.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <div key={m.title} className="rounded-[var(--radius-card)] bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="mb-4 text-4xl">{m.icon}</div>
                <h3 className="mb-3 text-lg font-bold text-text-primary">{m.title}</h3>
                <p className="text-text-secondary">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FButton variant="primary" href="/demo">See all modules in action</FButton>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">How It Works</p>
            <h2 className="mt-3 text-text-primary">Go live in 3 simple steps</h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              From first call to full deployment in 4-8 weeks. No surprises, no hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="relative rounded-[var(--radius-card)] bg-surface p-8">
                <div className="mb-4 text-5xl font-extrabold text-primary-500/30">{s.n}</div>
                <h3 className="mb-3 text-lg font-bold text-text-primary">{s.title}</h3>
                <p className="text-text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FButton variant="cta" href="/contact">Book your free consultation</FButton>
          </div>
        </Container>
      </section>

      {/* MID CTA */}
      <section className="bg-primary-900 py-16 text-center">
        <Container>
          <h2 className="text-white">Stop overpaying for ERP. Start owning your data.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-on-dark/70">
            Join 500+ MENA businesses that switched to Falcon and saved an average of 60% on ERP costs.
          </p>
          <div className="mt-8">
            <FButton variant="cta" size="lg" href="/contact">Get a Custom Quote</FButton>
          </div>
        </Container>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-surface py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">Industries We Serve</p>
            <h2 className="mt-3 text-text-primary">Built for the industries that power the MENA economy</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {INDUSTRIES.map((i) => (
              <div key={i.name} className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] bg-white p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="text-4xl">{i.icon}</div>
                <p className="text-sm font-semibold text-text-primary">{i.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FButton variant="primary" href="/contact">See your industry solution</FButton>
          </div>
        </Container>
      </section>

      {/* SUCCESS STORY */}
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary-500">Success Story</p>
            <blockquote className="text-2xl font-medium leading-relaxed text-text-primary md:text-3xl">
              “We evaluated SAP Business One and Oracle NetSuite before choosing Falcon. The savings were massive, 60% less than SAP, but the real win was going live in just 6 weeks with full ZATCA compliance. Our data stays on our servers in Riyadh, exactly where it should be.”
            </blockquote>
            <div className="mt-8">
              <p className="font-bold text-text-primary">Ahmed Al-Rashid</p>
              <p className="text-text-secondary">Chief Financial Officer — Saudi Emar Developments</p>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA / ASSESSMENT */}
      <section className="bg-dark py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">Get Your Custom ERP Assessment</h2>
            <p className="mt-4 text-text-on-dark/70">
              Tell us about your business and we will prepare a personalized ERP roadmap, free of charge.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <FButton variant="cta" size="lg" href="/contact">Get My Free Assessment</FButton>
              <p className="text-sm text-text-on-dark/60">We will respond within 24 hours. No spam, ever.</p>
              <p className="text-sm text-text-on-dark/60">
                Or call us directly: <a href="tel:+966568051090" className="font-semibold text-primary-400">+966 56 805 1090</a>
              </p>
            </div>
            <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-text-on-dark/80">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-cta">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
