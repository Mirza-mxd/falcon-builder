import Container from "@/components/ui/Container";
import FButton from "@/components/ui/FButton";
import { useIsRTL } from "@/lib/i18n";

const CONTENT = {
  en: {
    badge: "On-Premise ERP",
    h1: "Your Data. Your Servers. Your Rules.",
    heroLead: "Enterprise-grade ERP with full data sovereignty. ZATCA-compliant, Arabic-native, and deployed on your infrastructure, not someone else's cloud.",
    price: "Perpetual license from $550/user",
    ctaAssess: "Get Your Free ERP Assessment",
    ctaDemo: "Book a Live Demo",
    heroBullets: ["No data leaves your servers", "ZATCA Phase 2 certified", "Go live in 4-8 weeks"],
    problemKicker: "The Problem",
    problemTitle: "Why most MENA businesses regret their ERP choice",
    problemLink: "There is a better way →",
    modulesKicker: "Core Modules",
    modulesTitle: "Everything your business needs, nothing it does not",
    modulesLead: "Six integrated modules designed for MENA businesses. Arabic-native, ZATCA-certified, and ready to deploy on your servers.",
    modulesCta: "See all modules in action",
    howKicker: "How It Works",
    howTitle: "Go live in 3 simple steps",
    howLead: "From first call to full deployment in 4-8 weeks. No surprises, no hidden fees.",
    howCta: "Book your free consultation",
    midH2: "Stop overpaying for ERP. Start owning your data.",
    midLead: "Join 500+ MENA businesses that switched to Falcon and saved an average of 60% on ERP costs.",
    midCta: "Get a Custom Quote",
    indKicker: "Industries We Serve",
    indTitle: "Built for the industries that power the MENA economy",
    indCta: "See your industry solution",
    storyKicker: "Success Story",
    quote: "We evaluated SAP Business One and Oracle NetSuite before choosing Falcon. The savings were massive, 60% less than SAP, but the real win was going live in just 6 weeks with full ZATCA compliance. Our data stays on our servers in Riyadh, exactly where it should be.",
    quoteName: "Ahmed Al-Rashid",
    quoteRole: "Chief Financial Officer — Saudi Emar Developments",
    finalTitle: "Get Your Custom ERP Assessment",
    finalLead: "Tell us about your business and we will prepare a personalized ERP roadmap, free of charge.",
    finalCta: "Get My Free Assessment",
    finalNote: "We will respond within 24 hours. No spam, ever.",
    callPrefix: "Or call us directly:",
    problems: [
      { icon: "💸", title: "Paying SAP prices for basic features", desc: "Global ERPs charge $150K-$500K upfront with 12+ months of implementation. Most features go unused while your budget disappears." },
      { icon: "🌐", title: "Your data lives on foreign servers", desc: "Cloud-only ERPs store your financial records, employee data, and trade secrets on servers outside the Kingdom. That is a PDPL compliance risk." },
      { icon: "⏳", title: "Slow implementations that drain your team", desc: "6-12 month rollouts mean lost productivity, frustrated employees, and delayed ROI. Your business cannot wait that long." },
    ],
    modules: [
      { icon: "💰", title: "Financial Management", desc: "General ledger, AP/AR, fixed assets, budgeting, multi-currency, and bank reconciliation. Full Arabic financial reporting out of the box." },
      { icon: "📦", title: "Inventory & Warehouse", desc: "Real-time stock tracking across multiple warehouses. Barcode scanning, automated reordering, batch/serial tracking, and min-max alerts." },
      { icon: "👥", title: "HR & Payroll", desc: "Complete employee lifecycle management with GOSI integration, WPS compliance, leave management, and end-of-service calculations." },
      { icon: "📈", title: "CRM & Sales", desc: "Track every lead from first contact to closed deal. Sales pipeline, quotation builder, follow-up automation, and revenue forecasting." },
      { icon: "🏭", title: "Manufacturing", desc: "Bill of materials, production planning, work orders, quality control, and cost tracking. Built for factories and workshops across KSA." },
      { icon: "🧾", title: "Arabic E-Invoicing", desc: "Native ZATCA Phase 2 e-invoicing with QR code generation, XML submission, credit/debit notes, and full Arabic RTL support. No add-ons needed." },
    ],
    steps: [
      { n: "01", title: "Free Consultation", desc: "We analyze your current workflows, pain points, and requirements. You get a detailed project plan and fixed-price quote within 48 hours." },
      { n: "02", title: "4-8 Week Setup", desc: "Our team handles installation, data migration, customization, and integrations. Your staff receives hands-on training throughout the process." },
      { n: "03", title: "Go Live with Training", desc: "Launch with confidence. We provide on-site support during your first week live, plus 90 days of priority support to ensure a smooth transition." },
    ],
    industries: [
      { icon: "🏗️", name: "Construction & Contracting" },
      { icon: "🏭", name: "Manufacturing & Factories" },
      { icon: "📦", name: "Trading & Wholesale" },
      { icon: "🏢", name: "Real Estate & Property" },
      { icon: "🛒", name: "Retail & E-Commerce" },
      { icon: "🏥", name: "Healthcare & Clinics" },
    ],
    trust: ["ZATCA Certified", "Saudi Data Centers", "500+ Clients", "24/7 Support"],
  },
  ar: {
    badge: "نظام ERP محلي",
    h1: "بياناتك. خوادمك. قواعدك.",
    heroLead: "نظام ERP بمستوى المؤسسات مع سيادة كاملة على البيانات. متوافق مع هيئة الزكاة والضريبة، عربي بالكامل، ومنشور على بنيتك التحتية لا على سحابة شخص آخر.",
    price: "ترخيص دائم يبدأ من 550 دولار لكل مستخدم",
    ctaAssess: "احصل على تقييم مجاني لنظام ERP",
    ctaDemo: "احجز عرضاً تجريبياً مباشراً",
    heroBullets: ["لا تغادر بياناتك خوادمك", "معتمد لفوترة المرحلة الثانية ZATCA", "انطلق خلال 4-8 أسابيع"],
    problemKicker: "المشكلة",
    problemTitle: "لماذا تندم معظم شركات الشرق الأوسط على اختيارها لنظام ERP",
    problemLink: "← هناك طريقة أفضل",
    modulesKicker: "الوحدات الأساسية",
    modulesTitle: "كل ما تحتاجه شركتك، دون أي زيادة",
    modulesLead: "ست وحدات متكاملة مصممة لشركات الشرق الأوسط. عربية بالكامل، معتمدة من هيئة الزكاة، وجاهزة للنشر على خوادمك.",
    modulesCta: "شاهد كل الوحدات أثناء العمل",
    howKicker: "كيف يعمل",
    howTitle: "انطلق في 3 خطوات بسيطة",
    howLead: "من أول اتصال إلى النشر الكامل خلال 4-8 أسابيع. بلا مفاجآت، بلا رسوم مخفية.",
    howCta: "احجز استشارتك المجانية",
    midH2: "توقف عن دفع مبالغ زائدة لنظام ERP. ابدأ بامتلاك بياناتك.",
    midLead: "انضم إلى أكثر من 500 شركة في الشرق الأوسط تحولت إلى Falcon ووفرت 60٪ في المتوسط من تكاليف ERP.",
    midCta: "احصل على عرض سعر مخصص",
    indKicker: "القطاعات التي نخدمها",
    indTitle: "مصمم للقطاعات التي تقود اقتصاد الشرق الأوسط",
    indCta: "شاهد الحل المناسب لقطاعك",
    storyKicker: "قصة نجاح",
    quote: "قيمنا SAP Business One وOracle NetSuite قبل اختيار Falcon. كانت التوفيرات هائلة، أقل بنسبة 60٪ من SAP، لكن الفوز الحقيقي كان الانطلاق في 6 أسابيع فقط مع توافق كامل مع هيئة الزكاة. تبقى بياناتنا على خوادمنا في الرياض، حيث يجب أن تكون.",
    quoteName: "أحمد الراشد",
    quoteRole: "المدير المالي — تطوير سعودي إعمار",
    finalTitle: "احصل على تقييم ERP مخصص",
    finalLead: "أخبرنا عن شركتك وسنُعدّ خارطة طريق ERP مخصصة لك مجاناً.",
    finalCta: "احصل على تقييمي المجاني",
    finalNote: "سنرد خلال 24 ساعة. بلا إزعاج إطلاقاً.",
    callPrefix: "أو اتصل بنا مباشرة:",
    problems: [
      { icon: "💸", title: "تدفع أسعار SAP مقابل ميزات أساسية", desc: "تتقاضى أنظمة ERP العالمية من 150 إلى 500 ألف دولار مقدماً مع أكثر من 12 شهراً من التطبيق. معظم الميزات لا تُستخدم بينما تختفي ميزانيتك." },
      { icon: "🌐", title: "بياناتك تعيش على خوادم أجنبية", desc: "تخزن أنظمة ERP السحابية فقط سجلاتك المالية وبيانات موظفيك وأسرارك التجارية على خوادم خارج المملكة. وهذا يمثل خطراً على الامتثال لنظام حماية البيانات." },
      { icon: "⏳", title: "تطبيقات بطيئة تستنزف فريقك", desc: "تعني فترات التطبيق من 6 إلى 12 شهراً فقدان الإنتاجية وإحباط الموظفين وتأخر العائد على الاستثمار. شركتك لا تستطيع الانتظار كل هذا الوقت." },
    ],
    modules: [
      { icon: "💰", title: "الإدارة المالية", desc: "دفتر الأستاذ، الذمم الدائنة والمدينة، الأصول الثابتة، الموازنات، تعدد العملات، والتسوية البنكية. تقارير مالية عربية كاملة جاهزة." },
      { icon: "📦", title: "المخزون والمستودعات", desc: "تتبع المخزون في الوقت الفعلي عبر مستودعات متعددة. مسح الباركود، إعادة الطلب التلقائي، تتبع الدفعات والأرقام التسلسلية، وتنبيهات الحد الأدنى والأقصى." },
      { icon: "👥", title: "الموارد البشرية والرواتب", desc: "إدارة كاملة لدورة حياة الموظف مع تكامل التأمينات الاجتماعية، توافق نظام حماية الأجور، إدارة الإجازات، وحسابات نهاية الخدمة." },
      { icon: "📈", title: "إدارة العملاء والمبيعات", desc: "تتبع كل عميل محتمل من أول تواصل حتى إغلاق الصفقة. خط أنابيب المبيعات، أداة بناء عروض الأسعار، أتمتة المتابعة، وتوقع الإيرادات." },
      { icon: "🏭", title: "التصنيع", desc: "قوائم المواد، تخطيط الإنتاج، أوامر العمل، ضبط الجودة، وتتبع التكاليف. مصمم للمصانع وورش العمل في جميع أنحاء المملكة." },
      { icon: "🧾", title: "الفوترة الإلكترونية العربية", desc: "فوترة إلكترونية أصلية للمرحلة الثانية من هيئة الزكاة مع إنشاء رمز QR، إرسال XML، إشعارات الدائن والمدين، ودعم كامل للعربية من اليمين إلى اليسار. بدون إضافات." },
    ],
    steps: [
      { n: "01", title: "استشارة مجانية", desc: "نحلل سير عملك الحالي ونقاط الألم والمتطلبات. تحصل على خطة مشروع مفصلة وعرض سعر ثابت خلال 48 ساعة." },
      { n: "02", title: "إعداد خلال 4-8 أسابيع", desc: "يتولى فريقنا التركيب وترحيل البيانات والتخصيص والتكاملات. ويتلقى موظفوك تدريباً عملياً طوال العملية." },
      { n: "03", title: "الانطلاق مع التدريب", desc: "أطلق بثقة. نوفر دعماً ميدانياً خلال أسبوعك الأول، إضافة إلى 90 يوماً من الدعم ذي الأولوية لضمان انتقال سلس." },
    ],
    industries: [
      { icon: "🏗️", name: "الإنشاءات والمقاولات" },
      { icon: "🏭", name: "التصنيع والمصانع" },
      { icon: "📦", name: "التجارة والجملة" },
      { icon: "🏢", name: "العقارات" },
      { icon: "🛒", name: "التجزئة والتجارة الإلكترونية" },
      { icon: "🏥", name: "الرعاية الصحية والعيادات" },
    ],
    trust: ["معتمد من هيئة الزكاة", "مراكز بيانات سعودية", "أكثر من 500 عميل", "دعم على مدار الساعة"],
  },
} as const;

export default function FalconErpDesktopPage() {
  const isRTL = useIsRTL();
  const c = isRTL ? CONTENT.ar : CONTENT.en;
  return (
    <>
      <section className="bg-dark py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-semibold text-primary-400">
                {c.badge}
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                {c.h1}
              </h1>
              <p className="mt-6 text-lg text-text-on-dark/70">{c.heroLead}</p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <FButton variant="cta" size="lg" href="/contact?subject=quote">{c.ctaAssess}</FButton>
                <FButton variant="dark-outline" size="lg" href="/demo">{c.ctaDemo}</FButton>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-text-on-dark/80">
                {c.heroBullets.map((item) => (
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

      <section className="bg-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">{c.problemKicker}</p>
            <h2 className="mt-3 text-text-primary">{c.problemTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {c.problems.map((p) => (
              <div key={p.title} className="rounded-[var(--radius-card)] bg-surface p-8 shadow-card">
                <div className="mb-4 text-4xl">{p.icon}</div>
                <h3 className="mb-3 text-lg font-bold text-text-primary">{p.title}</h3>
                <p className="text-text-secondary">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#how-it-works" className="font-semibold text-primary-500 hover:text-primary-400">
              {c.problemLink}
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">{c.modulesKicker}</p>
            <h2 className="mt-3 text-text-primary">{c.modulesTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">{c.modulesLead}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.modules.map((m) => (
              <div key={m.title} className="rounded-[var(--radius-card)] bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="mb-4 text-4xl">{m.icon}</div>
                <h3 className="mb-3 text-lg font-bold text-text-primary">{m.title}</h3>
                <p className="text-text-secondary">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FButton variant="primary" href="/demo">{c.modulesCta}</FButton>
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="bg-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">{c.howKicker}</p>
            <h2 className="mt-3 text-text-primary">{c.howTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">{c.howLead}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {c.steps.map((s) => (
              <div key={s.n} className="relative rounded-[var(--radius-card)] bg-surface p-8">
                <div className="mb-4 text-5xl font-extrabold text-primary-500/30">{s.n}</div>
                <h3 className="mb-3 text-lg font-bold text-text-primary">{s.title}</h3>
                <p className="text-text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FButton variant="cta" href="/contact?subject=quote">{c.howCta}</FButton>
          </div>
        </Container>
      </section>

      <section className="bg-primary-900 py-16 text-center">
        <Container>
          <h2 className="text-white">{c.midH2}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-on-dark/70">{c.midLead}</p>
          <div className="mt-8">
            <FButton variant="cta" size="lg" href="/contact?subject=quote">{c.midCta}</FButton>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">{c.indKicker}</p>
            <h2 className="mt-3 text-text-primary">{c.indTitle}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {c.industries.map((i) => (
              <div key={i.name} className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] bg-white p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="text-4xl">{i.icon}</div>
                <p className="text-sm font-semibold text-text-primary">{i.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FButton variant="primary" href="/contact?subject=quote">{c.indCta}</FButton>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary-500">{c.storyKicker}</p>
            <blockquote className="text-2xl font-medium leading-relaxed text-text-primary md:text-3xl">
              “{c.quote}”
            </blockquote>
            <div className="mt-8">
              <p className="font-bold text-text-primary">{c.quoteName}</p>
              <p className="text-text-secondary">{c.quoteRole}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-dark py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">{c.finalTitle}</h2>
            <p className="mt-4 text-text-on-dark/70">{c.finalLead}</p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <FButton variant="cta" size="lg" href="/contact?subject=quote">{c.finalCta}</FButton>
              <p className="text-sm text-text-on-dark/60">{c.finalNote}</p>
              <p className="text-sm text-text-on-dark/60">
                {c.callPrefix} <a href="tel:+966568051090" className="font-semibold text-primary-400" dir="ltr">+966 56 805 1090</a>
              </p>
            </div>
            <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-text-on-dark/80">
              {c.trust.map((t) => (
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
