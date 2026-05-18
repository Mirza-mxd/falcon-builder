import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import LLink from "@/components/ui/LLink";

const PRODUCTS = [
  { key: "desktopErp", image: "/images/products/falcon-erp-logo.png", href: "/products/falcon-erp-desktop" },
  { key: "cloudErp", image: "/images/screens/web-modules-dark.png", href: "/products/falcon-cloud" },
  { key: "odooServices", image: "/images/logos/odoo-logo.png", href: "/products/odoo-services" },
];

export default function ProductTrio() {
  const t = useTranslations("products");
  return (
    <section className="bg-surface section-padding">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-text-primary">{t("heading")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">{t("subheading")}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <FCard key={p.key} className="flex flex-col">
              <div className="mb-5 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                <img src={p.image} alt={t(`${p.key}.name`)} className="h-full w-full object-contain p-2" />
              </div>
              <h3 className="mb-2 text-text-primary">{t(`${p.key}.name`)}</h3>
              <p className="mb-3 text-lg font-semibold text-primary-500">{t(`${p.key}.price`)}</p>
              <p className="mb-6 flex-1 text-text-secondary">{t(`${p.key}.description`)}</p>
              <LLink href={p.href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary-500 transition-colors hover:text-primary-400">
                {t("learnMore")} <span aria-hidden="true" className="rtl:rotate-180">→</span>
              </LLink>
            </FCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
