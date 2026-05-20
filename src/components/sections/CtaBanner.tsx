import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FButton from "@/components/ui/FButton";

export default function CtaBanner() {
  const t = useTranslations("ctaBanner");
  return (
    <section className="bg-dark py-20 lg:py-28">
      <Container>
        <div className="text-center">
          <h2 className="text-white">{t("headline")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-on-dark/70">{t("subtitle")}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <FButton variant="cta" size="lg" href="/contact?subject=quote">{t("ctaPrimary")}</FButton>
            <FButton variant="dark-outline" size="lg" href="/demo">{t("ctaSecondary")}</FButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
