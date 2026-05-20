import Container from "@/components/ui/Container";
import FButton from "@/components/ui/FButton";

const PROBLEMS = [
  { icon: "🧩", title: "Generic consultants, generic results", desc: "Most Odoo partners copy-paste European workflows into MENA businesses. They do not understand ZATCA, WPS, GOSI, or how business actually works in the Gulf." },
  { icon: "💥", title: "Failed implementations that cost twice", desc: "60% of Odoo projects in the region go over budget or fail entirely. Companies end up paying a second firm to fix what the first one broke." },
  { icon: "🗣️", title: "No Arabic support when you need it", desc: "Your support ticket goes to a team in Europe who responds in 48 hours — in English. Meanwhile, your Arabic-speaking accountant is stuck and your invoices are late." },
];

const SERVICES = [
  { icon: "🚀", title: "End-to-End Implementation", desc: "Full Odoo deployment tailored for MENA. Requirements gathering, configuration, data migration, testing, and go-live in 4-8 weeks with hands-on training." },
  { icon: "⚙️", title: "Custom Development", desc: "Custom modules, workflows, reports, and integrations built to match your exact processes. From ZATCA e-invoicing to warehouse automation." },
  { icon: "🔀", title: "Migration Services", desc: "Seamless migration from SAP, Oracle, Microsoft Dynamics, or legacy systems to Odoo. Zero data loss guaranteed with full validation testing." },
  { icon: "🎓", title: "Training Programs", desc: "Hands-on Arabic and English training for every role — from end users to system administrators. On-site or remote, with recorded sessions for future reference." },
  { icon: "🛡️", title: "Managed Support", desc: "5 SLA tiers from basic to VIP. Arabic-speaking support team, dedicated account managers, WhatsApp support, and 1-hour response on critical issues." },
  { icon: "📋", title: "MENA Compliance", desc: "ZATCA Phase 2 e-invoicing, Arabic localization, PDPL data protection, GOSI/WPS payroll compliance, and region-specific tax configurations. All built in." },
];

const STEPS = [
  { n: "01", title: "Scope Assessment", desc: "We map your current processes, identify gaps, and define clear requirements. You receive a detailed project plan with fixed timeline and pricing — no surprises." },
  { n: "02", title: "Implementation & Testing", desc: "Our team configures Odoo, builds customizations, migrates your data, and runs thorough testing. You validate every module before go-live." },
  { n: "03", title: "Go Live & Ongoing Support", desc: "Launch with on-site support during week one. Then transition to your chosen SLA tier for ongoing support, updates, and continuous optimization." },
];

const AUDIENCE = [
  { icon: "🔧", name: "Already on Odoo, Need Better Support" },
  { icon: "🔄", name: "Migrating from SAP or Oracle" },
  { icon: "🌍", name: "Expanding to GCC Markets" },
  { icon: "📈", name: "Outgrowing QuickBooks or Spreadsheets" },
  { icon: "🏢", name: "Multi-Entity Organizations" },
  { icon: "🌐", name: "Companies Needing Arabic ERP" },
];

const TRUST = ["Certified Partner", "100+ Projects", "Arabic Support", "MENA Compliance"];

export default function OdooServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-dark py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-400">
                Official Odoo Partner
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Odoo Done Right. For the Middle East.
              </h1>
              <p className="mt-6 text-lg text-text-on-dark/70">
                Expert Odoo implementation, customization, and support from the only partner that truly understands MENA compliance, Arabic localization, and regional business culture.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <FButton variant="cta" size="lg" href="/contact">Get a Free Scope Assessment</FButton>
                <FButton variant="dark-outline" size="lg" href="/contact">Talk to an Odoo Expert</FButton>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-text-on-dark/80">
                {["Certified Odoo Partner", "100+ Odoo projects delivered", "MENA compliance experts"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-cta">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-primary-800/40 to-primary-900/40 ring-1 ring-white/10">
              <img
                src="/images/logos/odoo-logo.png"
                alt="Odoo ERP with Arabic localization"
                className="max-h-48 object-contain"
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
            <h2 className="mt-3 text-text-primary">Why most Odoo projects in the MENA region fail</h2>
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
              Work with MENA experts instead →
            </a>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="bg-surface py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">Our Services</p>
            <h2 className="mt-3 text-text-primary">Complete Odoo expertise for the Middle East</h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              From first assessment to ongoing support, we handle every aspect of your Odoo journey with deep MENA knowledge.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-[var(--radius-card)] bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="mb-4 text-4xl">{s.icon}</div>
                <h3 className="mb-3 text-lg font-bold text-text-primary">{s.title}</h3>
                <p className="text-text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FButton variant="primary" href="/contact">Explore our service packages</FButton>
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section id="how-it-works" className="bg-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">Our Process</p>
            <h2 className="mt-3 text-text-primary">A proven path to Odoo success</h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Our structured approach eliminates the guesswork and ensures your Odoo project delivers real results.
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
            <FButton variant="cta" href="/contact">Start with a free assessment</FButton>
          </div>
        </Container>
      </section>

      {/* MID CTA */}
      <section className="bg-primary-900 py-16 text-center">
        <Container>
          <h2 className="text-white">Your Odoo project deserves a partner who understands the region.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-on-dark/70">
            Over 100 successful Odoo implementations across KSA, UAE, and Egypt. Let us show you how we do it differently.
          </p>
          <div className="mt-8">
            <FButton variant="cta" size="lg" href="/contact">Talk to an Odoo Expert</FButton>
          </div>
        </Container>
      </section>

      {/* AUDIENCE */}
      <section className="bg-surface py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">Who We Help</p>
            <h2 className="mt-3 text-text-primary">The right partner for your Odoo journey</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {AUDIENCE.map((a) => (
              <div key={a.name} className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] bg-white p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="text-4xl">{a.icon}</div>
                <p className="text-sm font-semibold text-text-primary">{a.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FButton variant="primary" href="/contact">Tell us about your project</FButton>
          </div>
        </Container>
      </section>

      {/* SUCCESS STORY */}
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary-500">Client Success</p>
            <blockquote className="text-2xl font-medium leading-relaxed text-text-primary md:text-3xl">
              “We tried two different Odoo partners before finding Falcon. The difference was night and day. They understood our ZATCA requirements from day one, the Arabic localization was flawless, and our data stays in Saudi data centers. We finally have an ERP that works the way we do business.”
            </blockquote>
            <div className="mt-8">
              <p className="font-bold text-text-primary">Fatima Al-Dosari</p>
              <p className="text-text-secondary">Chief Executive Officer — Capital Safety Company</p>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="bg-dark py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">Get a Free Scope Assessment</h2>
            <p className="mt-4 text-text-on-dark/70">
              Tell us about your Odoo needs. We will deliver a detailed project plan within 48 hours — completely free.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <FButton variant="cta" size="lg" href="/contact">Get My Free Assessment</FButton>
              <p className="text-sm text-text-on-dark/60">No commitment required. We will respond within 24 hours.</p>
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
