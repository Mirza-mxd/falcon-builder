import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FButton from "@/components/ui/FButton";

export function SimpleCtaPage({ ns, ctaHref }: { ns: "careers" | "partners" | "webinars" | "help"; ctaHref: string }) {
  const t = useTranslations(ns);
  return (
    <section className="bg-dark py-24 text-center">
      <Container>
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{t("heroTitle")}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-text-on-dark/70">{t("heroSubtitle")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <FButton variant="cta" size="lg" href={ctaHref}>{t("cta")}</FButton>
        </div>
      </Container>
    </section>
  );
}

export const CareersPage = () => <SimpleCtaPage ns="careers" ctaHref="/contact" />;
export const PartnersPage = () => <SimpleCtaPage ns="partners" ctaHref="/contact" />;
export const WebinarsPage = () => <SimpleCtaPage ns="webinars" ctaHref="/demo" />;
export const HelpPage = () => <SimpleCtaPage ns="help" ctaHref="/contact" />;
