import { useState } from "react";
import { useTranslations } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import FButton from "@/components/ui/FButton";
import { cn } from "@/lib/utils";

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7] as const;

export default function Faq() {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<number | null>(1);
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeader title={t("heading")} />
        <div className="mx-auto max-w-3xl">
          {FAQ_KEYS.map((n) => {
            const isOpen = openId === n;
            return (
              <div key={n} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : n)}
                  className="flex w-full items-center justify-between py-5 text-start text-lg font-semibold text-text-primary transition-colors hover:text-primary-500"
                >
                  <span>{t(`q${n}`)}</span>
                  <svg className={cn("size-5 text-text-secondary transition-transform", isOpen && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {isOpen && <div className="pb-5 text-text-secondary">{t(`a${n}`)}</div>}
              </div>
            );
          })}
          <div className="mt-12 text-center">
            <p className="mb-4 text-lg font-medium text-text-primary">{t("stillHaveQuestions")}</p>
            <FButton variant="primary" size="md" href="/contact">{t("contactUs")}</FButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
