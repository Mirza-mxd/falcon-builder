import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import FButton from "@/components/ui/FButton";
import { Factory, Store, HardHat, Truck, UtensilsCrossed, Package, Hotel } from "lucide-react";

const ITEMS = [
  { key: "manufacturing", Icon: Factory },
  { key: "retail", Icon: Store },
  { key: "contracting", Icon: HardHat },
  { key: "distribution", Icon: Package },
  { key: "restaurants", Icon: UtensilsCrossed },
  { key: "logistics", Icon: Truck },
  { key: "hospitality", Icon: Hotel },
] as const;

export default function IndustryGrid() {
  const t = useTranslations("industries");
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-500">
                {t("label")}
              </p>
              <h2 className="text-text-primary">{t("heading")}</h2>
              <p className="mt-5 text-text-secondary">{t("subheading")}</p>
              <div className="mt-8">
                <FButton variant="primary" size="md" href="/demo">
                  {t("cta")}
                </FButton>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ul className="border-t border-gray-200">
              {ITEMS.map(({ key, Icon }) => (
                <li key={key} className="border-b border-gray-200 py-6">
                  <div className="flex items-start gap-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-text-primary">
                        {t(`${key}.title`)}
                      </h3>
                      <p className="mt-1 text-text-secondary">
                        {t(`${key}.description`)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
