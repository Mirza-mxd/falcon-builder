import { Coins, ShieldAlert, Lock, type LucideIcon } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";

const CARDS: { key: string; Icon: LucideIcon; accent: string; iconBg: string }[] = [
  { key: "overpay", Icon: Coins, accent: "text-cta", iconBg: "bg-cta/10" },
  { key: "zatca", Icon: ShieldAlert, accent: "text-saudi-green", iconBg: "bg-saudi-green/10" },
  { key: "data", Icon: Lock, accent: "text-primary-500", iconBg: "bg-primary-500/10" },
];

export default function WhyErpFails() {
  const t = useTranslations("whyErpFails");
  return (
    <section className="bg-white section-padding mx-0 py-[50px]">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-text-primary">{t("heading")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">{t("subheading")}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
          {CARDS.map(({ key, Icon, accent, iconBg }) => (
            <div
              key={key}
              className="flex h-full flex-col items-center rounded-[var(--radius-card)] bg-white p-8 text-center shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg}`}>
                <Icon className={`h-8 w-8 ${accent}`} strokeWidth={1.75} />
              </div>
              <h4 className="mb-3 font-bold text-text-primary">{t(`${key}.title`)}</h4>
              <p className="text-text-secondary">{t(`${key}.description`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
