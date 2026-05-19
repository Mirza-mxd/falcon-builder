import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const FEATURES = [
  { key: "feature1", imageStart: true, image: "/images/screens/desktop-invoice.png" },
  
  
];

export default function FeatureShowcase() {
  const t = useTranslations("features");
  return (
    <section>
      {FEATURES.map((f, i) => (
        <div key={f.key} className={cn("py-16 lg:py-24", i % 2 === 0 ? "bg-white" : "bg-surface")}>
          <Container>
            <div className={cn("flex flex-col items-center gap-12 lg:flex-row lg:gap-16", !f.imageStart && "lg:flex-row-reverse")}>
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-2xl shadow-card">
                  <img src={f.image} alt={t(`${f.key}.title`)} className="w-full object-cover" />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="text-text-primary">{t(`${f.key}.title`)}</h2>
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">{t(`${f.key}.description`)}</p>
              </div>
            </div>
          </Container>
        </div>
      ))}
    </section>
  );
}
