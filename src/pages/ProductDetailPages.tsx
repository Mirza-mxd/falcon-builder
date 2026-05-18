import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FButton from "@/components/ui/FButton";
import FCard from "@/components/ui/FCard";

export function ProductDetailPage({ ns, hero, screens }: { ns: "desktopPage" | "cloudPage" | "odooPage"; hero: string; screens: string[] }) {
  const t = useTranslations(ns);
  return (
    <>
      <section className="bg-dark py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{t("heroTitle")}</h1>
              <p className="mt-6 text-lg text-text-on-dark/70">{t("heroSubtitle")}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <FButton variant="cta" size="lg" href="/demo">{t("ctaPrimary")}</FButton>
                <FButton variant="dark-outline" size="lg" href="/contact">{t("ctaSecondary")}</FButton>
              </div>
            </div>
            <img src={hero} alt="" className="rounded-2xl shadow-2xl ring-1 ring-white/10" />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <Container>
          <h2 className="mb-12 text-center text-text-primary">{t("featuresTitle")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map((i) => (
              <FCard key={i}>
                <h3 className="mb-2 text-lg font-bold text-text-primary">{t(`feature${i}.title`)}</h3>
                <p className="text-sm text-text-secondary">{t(`feature${i}.description`)}</p>
              </FCard>
            ))}
          </div>
        </Container>
      </section>

      {screens.length > 0 && (
        <section className="bg-surface py-16">
          <Container>
            <h2 className="mb-10 text-center text-text-primary">{t("screensTitle")}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {screens.map((s) => (
                <img key={s} src={s} alt="" className="rounded-xl shadow-card" />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-primary-900 py-16 text-center">
        <Container>
          <h2 className="text-white">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-text-on-dark/70">{t("ctaText")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <FButton variant="cta" size="lg" href="/demo">{t("ctaPrimary")}</FButton>
            <FButton variant="dark-outline" size="lg" href="/contact">{t("ctaSecondary")}</FButton>
          </div>
        </Container>
      </section>
    </>
  );
}

export const DesktopErpPage = () => <ProductDetailPage ns="desktopPage" hero="/images/screens/falcon-desktop-hero.png" screens={["/images/screens/desktop/screen-01.png","/images/screens/desktop/screen-02.png","/images/screens/desktop/screen-03.png","/images/screens/desktop/screen-04.png","/images/screens/desktop/screen-05.png","/images/screens/desktop/screen-06.png"]} />;
export const CloudErpPage = () => <ProductDetailPage ns="cloudPage" hero="/images/screens/web-overview.png" screens={["/images/screens/cloud/screen-01.png","/images/screens/cloud/screen-02.png","/images/screens/cloud/screen-03.png","/images/screens/cloud/screen-04.png","/images/screens/cloud/screen-05.png","/images/screens/cloud/screen-06.png"]} />;
export const OdooServicesPage = () => <ProductDetailPage ns="odooPage" hero="/images/logos/odoo-partner.png" screens={[]} />;
