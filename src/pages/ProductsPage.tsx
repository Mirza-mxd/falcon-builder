import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import FButton from "@/components/ui/FButton";

const PRODUCTS = [
  { key: "desktopErp", href: "/products/falcon-erp-desktop", icon: "🖥️" },
  { key: "cloudErp", href: "/products/falcon-cloud", icon: "☁️" },
  { key: "odooServices", href: "/products/odoo-services", icon: "⚙️" },
];

export default function ProductsPage() {
  const t = useTranslations("products");
  return (
    <>
      <section className="bg-dark py-20 text-center">
        <Container>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{t("heading")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-on-dark/70">{t("subheading")}</p>
        </Container>
      </section>
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <FCard key={p.key} className="flex flex-col text-center">
                <div className="mb-4 text-5xl">{p.icon}</div>
                <h3 className="mb-2 text-text-primary">{t(`${p.key}.name`)}</h3>
                <p className="mb-3 font-semibold text-primary-500">{t(`${p.key}.price`)}</p>
                <p className="mb-6 flex-1 text-text-secondary">{t(`${p.key}.description`)}</p>
                <FButton variant="primary" href={p.href}>{t("learnMore")}</FButton>
              </FCard>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
