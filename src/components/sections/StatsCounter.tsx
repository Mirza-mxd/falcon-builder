import { useTranslations } from "@/lib/i18n";
import { STATS } from "@/lib/constants";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

export default function StatsCounter() {
  const t = useTranslations("stats");
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeader title={t("heading")} />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STATS.map((s) => (
            <AnimatedCounter key={s.key} value={s.value} suffix={s.suffix} label={t(s.key)} />
          ))}
        </div>
      </Container>
    </section>
  );
}
