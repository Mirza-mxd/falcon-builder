import { useTranslations } from "@/lib/i18n";
import { INDUSTRIES } from "@/lib/constants";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";

const IMAGES: Record<string, string> = {
  retail: "/images/industries/retail.jpg",
  manufacturing: "/images/industries/manufacturing.jpg",
  construction: "/images/industries/construction.jpg",
  hospitality: "/images/industries/hospitality.jpg",
  healthcare: "/images/industries/healthcare.jpg",
  logistics: "/images/industries/logistics.jpg",
};

export default function IndustryGrid() {
  const t = useTranslations("industries");
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeader title={t("heading")} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => (
            <div key={ind} className="group relative flex items-end overflow-hidden rounded-2xl aspect-[4/3] bg-dark transition-transform duration-300 hover:scale-[1.03]">
              {IMAGES[ind] && (
                <img src={IMAGES[ind]} alt={t(ind)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="relative z-10 w-full p-6">
                <h3 className="text-lg font-bold text-white sm:text-xl">{t(ind)}</h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
