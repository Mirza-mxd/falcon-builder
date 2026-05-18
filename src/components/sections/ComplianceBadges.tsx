import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FCard from "@/components/ui/FCard";

const BADGES = [
  { key: "zatca", accent: "text-saudi-green", border: "border-t-saudi-green", iconBg: "bg-saudi-green/10", icon: true },
  { key: "saudiMade", accent: "text-gold", border: "border-t-gold", iconBg: "bg-gold/10", logo: "/images/logos/falcon-logo.png" },
  { key: "odooPartner", accent: "text-primary-500", border: "border-t-primary-500", iconBg: "bg-primary-500/10", logo: "/images/logos/odoo-partner.png" },
];

export default function ComplianceBadges() {
  const t = useTranslations("compliance");
  return (
    <section className="bg-surface section-padding">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {BADGES.map((b) => (
            <FCard key={b.key} className={`border-t-4 ${b.border} text-center`}>
              <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl ${b.iconBg}`}>
                {b.logo ? (
                  <img src={b.logo} alt={t(`${b.key}.title`)} className="h-14 w-14 object-contain" />
                ) : (
                  <svg className="h-10 w-10 text-saudi-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75M8.25 6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 011.123-.08" />
                  </svg>
                )}
              </div>
              <h3 className={`mb-2 text-lg font-bold ${b.accent}`}>{t(`${b.key}.title`)}</h3>
              <p className="text-sm text-text-secondary">{t(`${b.key}.description`)}</p>
            </FCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
