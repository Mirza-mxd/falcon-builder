import Container from "@/components/ui/Container";
import FButton from "@/components/ui/FButton";
import { useIsRTL } from "@/lib/i18n";

const CONTENT = {
  en: {
    badge: "Official Odoo Partner",
    h1: "Odoo Done Right. For the Middle East.",
    heroLead: "Expert Odoo implementation, customization, and support from the only partner that truly understands MENA compliance, Arabic localization, and regional business culture.",
    ctaScope: "Get a Free Scope Assessment",
    ctaExpert: "Talk to an Odoo Expert",
    heroBullets: ["Certified Odoo Partner", "100+ Odoo projects delivered", "MENA compliance experts"],
    problemKicker: "The Problem",
    problemTitle: "Why most Odoo projects in the MENA region fail",
    problemLink: "Work with MENA experts instead →",
    servicesKicker: "Our Services",
    servicesTitle: "Complete Odoo expertise for the Middle East",
    servicesLead: "From first assessment to ongoing support, we handle every aspect of your Odoo journey with deep MENA knowledge.",
    servicesCta: "Explore our service packages",
    processKicker: "Our Process",
    processTitle: "A proven path to Odoo success",
    processLead: "Our structured approach eliminates the guesswork and ensures your Odoo project delivers real results.",
    processCta: "Start with a free assessment",
    midH2: "Your Odoo project deserves a partner who understands the region.",
    midLead: "Over 100 successful Odoo implementations across KSA, UAE, and Egypt. Let us show you how we do it differently.",
    midCta: "Talk to an Odoo Expert",
    audKicker: "Who We Help",
    audTitle: "The right partner for your Odoo journey",
    audCta: "Tell us about your project",
    storyKicker: "Client Success",
    quote: "We tried two different Odoo partners before finding Falcon. The difference was night and day. They understood our ZATCA requirements from day one, the Arabic localization was flawless, and our data stays in Saudi data centers. We finally have an ERP that works the way we do business.",
    quoteName: "Fatima Al-Dosari",
    quoteRole: "Chief Executive Officer — Capital Safety Company",
    finalTitle: "Get a Free Scope Assessment",
    finalLead: "Tell us about your Odoo needs. We will deliver a detailed project plan within 48 hours — completely free.",
    finalCta: "Get My Free Assessment",
    finalNote: "No commitment required. We will respond within 24 hours.",
    callPrefix: "Or call us directly:",
    problems: [
      { icon: "🧩", title: "Generic consultants, generic results", desc: "Most Odoo partners copy-paste European workflows into MENA businesses. They do not understand ZATCA, WPS, GOSI, or how business actually works in the Gulf." },
      { icon: "💥", title: "Failed implementations that cost twice", desc: "60% of Odoo projects in the region go over budget or fail entirely. Companies end up paying a second firm to fix what the first one broke." },
      { icon: "🗣️", title: "No Arabic support when you need it", desc: "Your support ticket goes to a team in Europe who responds in 48 hours — in English. Meanwhile, your Arabic-speaking accountant is stuck and your invoices are late." },
    ],
    services: [
      { icon: "🚀", title: "End-to-End Implementation", desc: "Full Odoo deployment tailored for MENA. Requirements gathering, configuration, data migration, testing, and go-live in 4-8 weeks with hands-on training." },
      { icon: "⚙️", title: "Custom Development", desc: "Custom modules, workflows, reports, and integrations built to match your exact processes. From ZATCA e-invoicing to warehouse automation." },
      { icon: "🔀", title: "Migration Services", desc: "Seamless migration from SAP, Oracle, Microsoft Dynamics, or legacy systems to Odoo. Zero data loss guaranteed with full validation testing." },
      { icon: "🎓", title: "Training Programs", desc: "Hands-on Arabic and English training for every role — from end users to system administrators. On-site or remote, with recorded sessions for future reference." },
      { icon: "🛡️", title: "Managed Support", desc: "5 SLA tiers from basic to VIP. Arabic-speaking support team, dedicated account managers, WhatsApp support, and 1-hour response on critical issues." },
      { icon: "📋", title: "MENA Compliance", desc: "ZATCA Phase 2 e-invoicing, Arabic localization, PDPL data protection, GOSI/WPS payroll compliance, and region-specific tax configurations. All built in." },
    ],
    steps: [
      { n: "01", title: "Scope Assessment", desc: "We map your current processes, identify gaps, and define clear requirements. You receive a detailed project plan with fixed timeline and pricing — no surprises." },
      { n: "02", title: "Implementation & Testing", desc: "Our team configures Odoo, builds customizations, migrates your data, and runs thorough testing. You validate every module before go-live." },
      { n: "03", title: "Go Live & Ongoing Support", desc: "Launch with on-site support during week one. Then transition to your chosen SLA tier for ongoing support, updates, and continuous optimization." },
    ],
    audience: [
      { icon: "🔧", name: "Already on Odoo, Need Better Support" },
      { icon: "🔄", name: "Migrating from SAP or Oracle" },
      { icon: "🌍", name: "Expanding to GCC Markets" },
      { icon: "📈", name: "Outgrowing QuickBooks or Spreadsheets" },
      { icon: "🏢", name: "Multi-Entity Organizations" },
      { icon: "🌐", name: "Companies Needing Arabic ERP" },
    ],
    trust: ["Certified Partner", "100+ Projects", "Arabic Support", "MENA Compliance"],
  },
  ar: {
    badge: "شريك Odoo الرسمي",
    h1: "Odoo بالشكل الصحيح. للشرق الأوسط.",
    heroLead: "تطبيق وتخصيص ودعم احترافي لـ Odoo من الشريك الوحيد الذي يفهم حقاً متطلبات الامتثال في الشرق الأوسط والتعريب وثقافة الأعمال الإقليمية.",
    ctaScope: "احصل على تقييم مجاني للنطاق",
    ctaExpert: "تحدث إلى خبير Odoo",
    heroBullets: ["شريك Odoo معتمد", "أكثر من 100 مشروع Odoo منجز", "خبراء الامتثال في الشرق الأوسط"],
    problemKicker: "المشكلة",
    problemTitle: "لماذا تفشل معظم مشاريع Odoo في منطقة الشرق الأوسط",
    problemLink: "← اعمل مع خبراء الشرق الأوسط بدلاً من ذلك",
    servicesKicker: "خدماتنا",
    servicesTitle: "خبرة كاملة في Odoo للشرق الأوسط",
    servicesLead: "من التقييم الأول حتى الدعم المستمر، نتولى كل جانب من رحلة Odoo الخاصة بك بمعرفة عميقة للشرق الأوسط.",
    servicesCta: "استكشف باقات خدماتنا",
    processKicker: "منهجيتنا",
    processTitle: "مسار مجرب لنجاح Odoo",
    processLead: "تُلغي منهجيتنا المنظمة التخمين وتضمن أن مشروع Odoo الخاص بك يحقق نتائج حقيقية.",
    processCta: "ابدأ بتقييم مجاني",
    midH2: "مشروع Odoo الخاص بك يستحق شريكاً يفهم المنطقة.",
    midLead: "أكثر من 100 تطبيق ناجح لـ Odoo في السعودية والإمارات ومصر. دعنا نريك كيف نقوم بذلك بشكل مختلف.",
    midCta: "تحدث إلى خبير Odoo",
    audKicker: "من نساعد",
    audTitle: "الشريك المناسب لرحلتك مع Odoo",
    audCta: "حدثنا عن مشروعك",
    storyKicker: "نجاح العميل",
    quote: "جربنا شريكي Odoo مختلفين قبل أن نجد Falcon. كان الفرق كبيراً. فهموا متطلبات هيئة الزكاة منذ اليوم الأول، وكان التعريب مثالياً، وبياناتنا تبقى في مراكز بيانات سعودية. لدينا أخيراً نظام ERP يعمل بالطريقة التي ندير بها أعمالنا.",
    quoteName: "فاطمة الدوسري",
    quoteRole: "الرئيس التنفيذي — شركة كابيتال للسلامة",
    finalTitle: "احصل على تقييم مجاني للنطاق",
    finalLead: "حدثنا عن احتياجاتك في Odoo. سنقدم خطة مشروع مفصلة خلال 48 ساعة — مجاناً بالكامل.",
    finalCta: "احصل على تقييمي المجاني",
    finalNote: "لا التزام مطلوب. سنرد خلال 24 ساعة.",
    callPrefix: "أو اتصل بنا مباشرة:",
    problems: [
      { icon: "🧩", title: "استشاريون عامون، نتائج عامة", desc: "ينسخ معظم شركاء Odoo سير العمل الأوروبي لشركات الشرق الأوسط. لا يفهمون هيئة الزكاة أو نظام حماية الأجور أو التأمينات الاجتماعية أو كيف تسير الأعمال فعلياً في الخليج." },
      { icon: "💥", title: "تطبيقات فاشلة تكلف ضعف المبلغ", desc: "60٪ من مشاريع Odoo في المنطقة تتجاوز الميزانية أو تفشل تماماً. تنتهي الشركات بدفع مبالغ لشركة ثانية لإصلاح ما أفسدته الأولى." },
      { icon: "🗣️", title: "لا يوجد دعم عربي عند الحاجة", desc: "تذهب تذكرة الدعم إلى فريق في أوروبا يرد خلال 48 ساعة — بالإنجليزية. وفي الوقت نفسه، يبقى محاسبك الناطق بالعربية عالقاً وفواتيرك متأخرة." },
    ],
    services: [
      { icon: "🚀", title: "تطبيق شامل", desc: "نشر كامل لـ Odoo مصمم للشرق الأوسط. جمع المتطلبات، التهيئة، ترحيل البيانات، الاختبار، والانطلاق خلال 4-8 أسابيع مع تدريب عملي." },
      { icon: "⚙️", title: "التطوير المخصص", desc: "وحدات وسير عمل وتقارير وتكاملات مخصصة مبنية لتطابق عملياتك بدقة. من الفوترة الإلكترونية لهيئة الزكاة إلى أتمتة المستودعات." },
      { icon: "🔀", title: "خدمات الترحيل", desc: "ترحيل سلس من SAP أو Oracle أو Microsoft Dynamics أو الأنظمة القديمة إلى Odoo. ضمان عدم فقدان البيانات مع اختبار تحقق كامل." },
      { icon: "🎓", title: "برامج التدريب", desc: "تدريب عملي بالعربية والإنجليزية لكل دور — من المستخدمين النهائيين إلى مديري النظام. في الموقع أو عن بُعد، مع جلسات مسجلة للرجوع إليها مستقبلاً." },
      { icon: "🛡️", title: "الدعم المُدار", desc: "5 مستويات اتفاقية خدمة من الأساسي إلى كبار الشخصيات. فريق دعم ناطق بالعربية، مديرو حسابات مخصصون، دعم عبر واتساب، واستجابة خلال ساعة للقضايا الحرجة." },
      { icon: "📋", title: "الامتثال للشرق الأوسط", desc: "الفوترة الإلكترونية للمرحلة الثانية، التعريب، حماية البيانات PDPL، توافق رواتب التأمينات وحماية الأجور، وإعدادات ضريبية إقليمية. كل ذلك مدمج." },
    ],
    steps: [
      { n: "01", title: "تقييم النطاق", desc: "نرسم خريطة لعملياتك الحالية، نحدد الفجوات، ونعرّف متطلبات واضحة. تتلقى خطة مشروع مفصلة بجدول زمني وتسعير ثابتين — بدون مفاجآت." },
      { n: "02", title: "التطبيق والاختبار", desc: "يقوم فريقنا بتهيئة Odoo، بناء التخصيصات، ترحيل بياناتك، وإجراء اختبارات شاملة. تتحقق من كل وحدة قبل الانطلاق." },
      { n: "03", title: "الانطلاق والدعم المستمر", desc: "أطلق مع دعم ميداني خلال الأسبوع الأول. ثم انتقل إلى مستوى اتفاقية الخدمة الذي اخترته للدعم والتحديثات والتحسين المستمر." },
    ],
    audience: [
      { icon: "🔧", name: "تستخدم Odoo بالفعل وتحتاج دعماً أفضل" },
      { icon: "🔄", name: "تنتقل من SAP أو Oracle" },
      { icon: "🌍", name: "تتوسع إلى أسواق الخليج" },
      { icon: "📈", name: "تتجاوز QuickBooks أو الجداول" },
      { icon: "🏢", name: "مؤسسات متعددة الكيانات" },
      { icon: "🌐", name: "شركات تحتاج نظام ERP عربي" },
    ],
    trust: ["شريك معتمد", "أكثر من 100 مشروع", "دعم عربي", "امتثال للشرق الأوسط"],
  },
} as const;

export default function OdooServicesPage() {
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
                <FButton variant="cta" size="lg" href="/contact?subject=quote">{c.ctaScope}</FButton>
                <FButton variant="dark-outline" size="lg" href="/contact">{c.ctaExpert}</FButton>
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
                src="/images/logos/odoo-logo.png"
                alt="Odoo ERP with Arabic localization"
                className="max-h-48 object-contain"
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
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">{c.servicesKicker}</p>
            <h2 className="mt-3 text-text-primary">{c.servicesTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">{c.servicesLead}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.services.map((s) => (
              <div key={s.title} className="rounded-[var(--radius-card)] bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="mb-4 text-4xl">{s.icon}</div>
                <h3 className="mb-3 text-lg font-bold text-text-primary">{s.title}</h3>
                <p className="text-text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FButton variant="primary" href="/contact">{c.servicesCta}</FButton>
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="bg-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">{c.processKicker}</p>
            <h2 className="mt-3 text-text-primary">{c.processTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">{c.processLead}</p>
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
            <FButton variant="cta" href="/contact?subject=quote">{c.processCta}</FButton>
          </div>
        </Container>
      </section>

      <section className="bg-primary-900 py-16 text-center">
        <Container>
          <h2 className="text-white">{c.midH2}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-on-dark/70">{c.midLead}</p>
          <div className="mt-8">
            <FButton variant="cta" size="lg" href="/contact">{c.midCta}</FButton>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">{c.audKicker}</p>
            <h2 className="mt-3 text-text-primary">{c.audTitle}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {c.audience.map((a) => (
              <div key={a.name} className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] bg-white p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="text-4xl">{a.icon}</div>
                <p className="text-sm font-semibold text-text-primary">{a.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FButton variant="primary" href="/contact">{c.audCta}</FButton>
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
