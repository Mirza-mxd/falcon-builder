import { useTranslations, useLocale } from "@/lib/i18n";
import Container from "@/components/ui/Container";

const LOGOS = [
  "haddad-group.svg","capital-safety.png","business-capital.png",
  "elite-construction.png","benchmark.png",
  "echo-art.png","diar.webp","almada.png","habib-trading.png","la-verde.png",
  "mahara.png","lozom.png",
];

export default function TrustLogos() {
  const t = useTranslations("trust");
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary-500">{t("label")}</p>
        <h2 className="mb-12 text-center text-2xl font-bold text-text-primary sm:text-3xl">{t("heading")}</h2>
      </Container>
      <div className="group relative overflow-hidden" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
        <div
          className="flex w-max items-center gap-12 group-hover:[animation-play-state:paused]"
          style={{ animation: `${isRTL ? "marquee-reverse" : "marquee"} 60s linear infinite` }}
        >
          {[...LOGOS, ...LOGOS].map((file, i) => (
            <img
              key={i}
              src={`/images/clients/${file}`}
              alt=""
              className="h-10 w-auto shrink-0 object-contain opacity-60 transition-opacity duration-300 hover:opacity-90 [filter:grayscale(1)_brightness(0)]"
            />
          ))}
        </div>
      </div>
      <Container>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-text-primary">500+</p>
            <p className="mt-1 text-sm text-text-secondary">{t("stat1")}</p>
          </div>
          <div className="hidden h-10 w-px bg-slate-200 sm:block" />
          <div className="text-center">
            <p className="text-3xl font-extrabold text-text-primary">5,000+</p>
            <p className="mt-1 text-sm text-text-secondary">{t("stat2")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
