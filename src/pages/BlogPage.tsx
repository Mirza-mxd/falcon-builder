import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";

const POSTS = [
  { slug: "zatca-phase-2-guide", image: "/images/sections/full-section-1.jpg", category: "compliance", date: "2025-12-15" },
  { slug: "erp-vs-spreadsheets", image: "/images/sections/full-section-2.jpg", category: "insights", date: "2025-11-20" },
  { slug: "cloud-vs-desktop-erp", image: "/images/sections/full-section-3.jpg", category: "products", date: "2025-10-08" },
  { slug: "saudi-vision-2030", image: "/images/sections/section-bg-1.jpg", category: "insights", date: "2025-09-12" },
];

export default function BlogPage() {
  const t = useTranslations("blog");
  return (
    <>
      <section className="bg-dark py-20 text-center">
        <Container>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{t("heroTitle")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-on-dark/70">{t("heroSubtitle")}</p>
        </Container>
      </section>
      <section className="bg-surface py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p) => (
              <FCard key={p.slug} className="flex flex-col overflow-hidden p-0">
                <img src={p.image} alt="" className="h-48 w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-2 text-xs font-bold uppercase text-primary-500">{t(`categories.${p.category}`)}</span>
                  <h3 className="mb-2 text-lg font-bold text-text-primary">{t(`posts.${p.slug}.title`)}</h3>
                  <p className="mb-4 flex-1 text-sm text-text-secondary">{t(`posts.${p.slug}.excerpt`)}</p>
                  <span className="text-xs text-text-muted">{p.date}</span>
                </div>
              </FCard>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
