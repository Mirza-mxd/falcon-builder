import { useLocale } from "@/lib/i18n";

// Per-logo display height (px) calibrated so the visible content height
// looks uniform across logos with varying internal padding/whitespace.
const LOGOS: { file: string; h: number }[] = [
  { file: "haddad-group.svg", h: 48 },
  { file: "capital-safety.png", h: 72 },
  { file: "business-capital.png", h: 88 },
  { file: "elite-construction.png", h: 40 },
  { file: "benchmark.png", h: 32 },
  { file: "echo-art.png", h: 68 },
  { file: "diar.webp", h: 44 },
  { file: "almada.png", h: 40 },
  { file: "habib-trading.png", h: 36 },
  { file: "la-verde.png", h: 96 },
  { file: "mahara.png", h: 80 },
  { file: "lozom.png", h: 64 },
];

export default function TrustLogos() {
  const t = useTranslations("trust");
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="group relative overflow-hidden" dir="ltr">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
        <div
          className="flex w-max items-center gap-12 group-hover:[animation-play-state:paused]"
          style={{ animation: `${isRTL ? "marquee-reverse" : "marquee"} 60s linear infinite` }}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={i} className="flex h-24 w-32 shrink-0 items-center justify-center sm:w-40">
              <img
                src={`/images/clients/${logo.file}`}
                alt=""
                style={{ height: `${logo.h}px` }}
                className="w-auto max-w-full object-contain opacity-60 transition-opacity duration-300 hover:opacity-90 [filter:grayscale(1)_brightness(0)]"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
