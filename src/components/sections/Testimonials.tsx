import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";
import SectionHeader from "@/components/shared/SectionHeader";

const TESTIMONIALS = [1, 2, 3, 4, 5];

export default function Testimonials() {
  const t = useTranslations("testimonials");
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeader title={t("heading")} />
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {TESTIMONIALS.map((idx) => (
            <FCard key={idx} className="min-w-[320px] shrink-0 snap-start p-8 sm:w-[350px]">
              <span className="mb-4 block text-6xl leading-none text-primary-100 select-none" aria-hidden="true">"</span>
              <blockquote className="-mt-6 text-text-primary">{t(`t${idx}Quote`)}</blockquote>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <p className="font-semibold text-text-primary">{t(`t${idx}Name`)}</p>
                <p className="text-sm text-text-secondary">{t(`t${idx}Role`)}</p>
              </div>
            </FCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
