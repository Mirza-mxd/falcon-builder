import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const t = useTranslations("legal");
  const titleKey = kind === "privacy" ? "privacyTitle" : "termsTitle";
  const introKey = kind === "privacy" ? "privacyIntro" : "termsIntro";
  const sections = kind === "privacy"
    ? [["dataCollection", "dataCollectionText"], ["dataUsage", "dataUsageText"], ["dataSecurity", "dataSecurityText"], ["contact", "contactText"]]
    : [["useOfService", "useOfServiceText"], ["intellectualProperty", "intellectualPropertyText"], ["limitation", "limitationText"], ["contact", "contactText"]];
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-extrabold text-text-primary sm:text-4xl">{t(titleKey)}</h1>
          <div className="text-text-secondary">
            <p className="text-lg leading-relaxed">{t(introKey)}</p>
            {sections.map(([h, p]) => (
              <div key={h}>
                <h2 className="mt-8 text-xl font-bold text-text-primary">{t(h)}</h2>
                <p className="mt-2">{t(p)}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
