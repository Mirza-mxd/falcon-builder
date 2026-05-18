import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import enMessages from "@/i18n/en.json";
import arMessages from "@/i18n/ar.json";

export type Locale = "en" | "ar";

type Messages = Record<string, any>;

const MESSAGES: Record<Locale, Messages> = {
  en: enMessages as Messages,
  ar: arMessages as Messages,
};

interface I18nContextValue {
  locale: Locale;
  isRTL: boolean;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  isRTL: false,
  messages: MESSAGES.en,
});

export function useLocale(): Locale {
  return useContext(I18nContext).locale;
}

export function useIsRTL(): boolean {
  return useContext(I18nContext).isRTL;
}

/** Get translated string by dot path, with optional template params */
export function useTranslations(namespace?: string) {
  const { messages } = useContext(I18nContext);
  return useMemo(() => {
    return function t(key: string, params?: Record<string, string | number>): string {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      const parts = fullKey.split(".");
      let node: any = messages;
      for (const p of parts) {
        if (node == null) return fullKey;
        node = node[p];
      }
      if (typeof node !== "string") return fullKey;
      if (params) {
        return node.replace(/\{(\w+)\}/g, (_: string, k: string) =>
          params[k] !== undefined ? String(params[k]) : `{${k}}`
        );
      }
      return node;
    };
  }, [messages, namespace]);
}

/** Locale-aware path: prepends /ar when locale is ar */
export function useLocalePath() {
  const { locale } = useContext(I18nContext);
  return function localePath(href: string): string {
    if (locale === "ar") {
      if (href === "/") return "/ar";
      return `/ar${href}`;
    }
    return href;
  };
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const locale: Locale =
    location.pathname === "/ar" || location.pathname.startsWith("/ar/") ? "ar" : "en";
  const value = useMemo<I18nContextValue>(
    () => ({ locale, isRTL: locale === "ar", messages: MESSAGES[locale] }),
    [locale]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Strip current locale prefix from a path; returns "/path" form */
export function stripLocale(pathname: string): string {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

/** Add locale prefix to a stripped path */
export function withLocale(path: string, locale: Locale): string {
  if (locale === "ar") {
    if (path === "/") return "/ar";
    return `/ar${path}`;
  }
  return path;
}
