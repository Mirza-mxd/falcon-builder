import { useLocation, useNavigate } from "@tanstack/react-router";
import { stripLocale, useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const navigate = useNavigate();
  const location = useLocation();

  const isArabic = locale === "ar";
  const label = isArabic ? "English" : "العربية";

  function handleToggle() {
    const stripped = stripLocale(location.pathname);
    const next = isArabic
      ? stripped
      : stripped === "/"
        ? "/ar"
        : `/ar${stripped}`;
    navigate({ to: next });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5",
        "text-sm font-medium text-text-secondary",
        "transition-colors duration-200",
        "hover:bg-primary-50 hover:text-primary-500",
        "cursor-pointer select-none",
        className
      )}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
        <path fillRule="evenodd" d="M7.171 4.146l1.947 4.5a.75.75 0 01-1.376.596L7.05 7.75H4.95l-.692 1.492a.75.75 0 11-1.376-.596l1.947-4.5a.75.75 0 011.342 0zM6 5.588L5.28 7.25h1.44L6 5.588z" clipRule="evenodd" />
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM1.5 10a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0z" />
      </svg>
      {label}
    </button>
  );
}
