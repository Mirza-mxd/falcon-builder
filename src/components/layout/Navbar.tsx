import { useState, useEffect, useCallback } from "react";
import { useLocation } from "@tanstack/react-router";
import { NAV_ITEMS } from "@/lib/constants";
import { useTranslations, useLocalePath, stripLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import FButton from "@/components/ui/FButton";
import LLink from "@/components/ui/LLink";
import LanguageToggle from "@/components/layout/LanguageToggle";

export default function Navbar() {
  const t = useTranslations();
  const location = useLocation();
  const path = stripLocale(location.pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow duration-300",
        scrolled && "shadow-navbar"
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:h-[72px]">
        <LLink href="/" className="shrink-0">
          <img
            src="/images/logos/falcon-logo.png"
            alt="Falcon Smart Solutions"
            className="h-10 w-auto lg:h-12"
          />
        </LLink>

        {/* Desktop nav */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {NAV_ITEMS.map((item) =>
            "children" in item ? (
              <div key={item.key} className="group relative">
                <LLink
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                    path.startsWith(item.href)
                      ? "text-primary-500"
                      : "text-text-primary hover:text-primary-500"
                  )}
                >
                  {t(`nav.${item.key}`)}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 transition-transform group-hover:rotate-180" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </LLink>
                <div className="pointer-events-none invisible absolute start-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[220px] rounded-2xl bg-white p-2 shadow-card">
                    {item.children.map((child) => (
                      <LLink
                        key={child.key}
                        href={child.href}
                        className={cn(
                          "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                          path === child.href
                            ? "bg-primary-50 text-primary-500"
                            : "text-text-primary hover:bg-primary-50 hover:text-primary-500"
                        )}
                      >
                        {t(`nav.${child.key}`)}
                      </LLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <LLink
                key={item.key}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors",
                  path === item.href
                    ? "text-primary-500"
                    : "text-text-primary hover:text-primary-500"
                )}
              >
                {t(`nav.${item.key}`)}
              </LLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-2">
          <LanguageToggle />
          <LLink
            href="/login"
            className="px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-primary-500"
          >
            {t("nav.login")}
          </LLink>
          <FButton variant="cta" size="sm" href="/demo">
            {t("nav.startTrial")}
          </FButton>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-lg p-2 text-text-primary hover:bg-gray-100 lg:hidden"
          aria-label={t("nav.openMenu")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6">
            {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </Container>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white shadow-card">
          <Container className="py-4">
            <nav>
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.key}>
                    <LLink
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        path === item.href
                          ? "bg-primary-50 text-primary-500"
                          : "text-text-primary hover:bg-gray-50"
                      )}
                    >
                      {t(`nav.${item.key}`)}
                    </LLink>
                    {"children" in item &&
                      item.children.map((child) => (
                        <LLink
                          key={child.key}
                          href={child.href}
                          className={cn(
                            "block rounded-xl py-2.5 ps-8 pe-4 text-sm font-medium transition-colors",
                            path === child.href
                              ? "text-primary-500"
                              : "text-text-secondary hover:text-primary-500"
                          )}
                        >
                          {t(`nav.${child.key}`)}
                        </LLink>
                      ))}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 space-y-3 border-t pt-4">
              <LanguageToggle className="w-full justify-center" />
              <FButton variant="outline" href="/login" className="w-full">
                {t("nav.login")}
              </FButton>
              <FButton variant="cta" href="/demo" className="w-full">
                {t("nav.startTrial")}
              </FButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
