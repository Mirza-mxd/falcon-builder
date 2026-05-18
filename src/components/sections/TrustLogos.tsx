import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";

const LOGOS = [
  "haddad-group.svg","capital-safety.png","business-capital.png","diamond-home.jpg",
  "elite-construction.png","global-conveyor.png","geodesy.png","benchmark.png",
  "echo-art.png","diar.webp","almada.png","habib-trading.png","la-verde.png",
  "mahara.png","lozom.png",
];

export default function TrustLogos() {
  const t = useTranslations("trust");
  return (
    <section className="bg-surface py-16 lg:py-24">
      <Container>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary-500">{t("label")}</p>
        <h2 className="mb-12 text-center text-2xl font-bold text-text-primary sm:text-3xl">{t("heading")}</h2>
      </Container>
      <div className="group relative overflow-hidden" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
        <div className="flex w-max animate-marquee items-center gap-6 group-hover:[animation-play-state:paused]">
          {[...LOGOS, ...LOGOS].map((file, i) => (
            <div key={i} className="flex h-32 w-[220px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <img src={`/images/clients/${file}`} alt="" className="max-h-20 max-w-[170px] object-contain opacity-85 transition-all hover:opacity-100" />
            </div>
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
