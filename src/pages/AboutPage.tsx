import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import FButton from "@/components/ui/FButton";

const STATS = ["clients", "experience", "users", "industries"] as const;
const VALUES = [
  { key: "menaNative", icon: "🌍" },
  { key: "affordable", icon: "💰" },
  { key: "compliant", icon: "📋" },
  { key: "dataSovereign", icon: "🏛️" },
] as const;

export default function AboutPage() {
  const t = useTranslations("about");
  return (
    <>
      <section className="bg-dark py-20 lg:py-28">
        <Container className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{t("heroTitle")}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-on-dark/70">{t("heroSubtitle")}</p>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s} className="text-center">
                <div className="text-3xl font-extrabold text-primary-500 sm:text-4xl">{t(`stats.${s}.value`)}</div>
                <div className="mt-2 text-sm text-text-secondary">{t(`stats.${s}.label`)}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-text-primary">{t("missionTitle")}</h2>
            <p className="mt-4 text-text-secondary">{t("missionText")}</p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <Container>
          <h2 className="mb-12 text-center text-text-primary">{t("valuesTitle")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <FCard key={v.key} className="text-center">
                <div className="mb-4 text-4xl">{v.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-text-primary">{t(`values.${v.key}.title`)}</h3>
                <p className="text-sm text-text-secondary">{t(`values.${v.key}.description`)}</p>
              </FCard>
            ))}
          </div>
        </Container>
      </section>

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
