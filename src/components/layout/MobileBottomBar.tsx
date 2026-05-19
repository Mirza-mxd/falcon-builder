import { useTranslations } from "@/lib/i18n";
import { COMPANY } from "@/lib/constants";
import FButton from "@/components/ui/FButton";

export default function MobileBottomBar() {
  const t = useTranslations();
  const whatsappHref = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(t("common.whatsappMessage"))}`;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-100 bg-white shadow-navbar md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center gap-3 p-3">
        <FButton variant="primary" href="/demo" className="flex-1">
          {t("common.bookDemo")}
        </FButton>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("common.whatsappChat")}
          className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
          </svg>
        </a>
      </div>
    </div>
  );
}
