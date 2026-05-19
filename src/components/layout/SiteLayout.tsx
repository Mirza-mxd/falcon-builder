import { I18nProvider, useIsRTL } from "@/lib/i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/layout/WhatsAppWidget";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import { useEffect } from "react";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <DirEffect />
      <Navbar />
      <main className="pb-20 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <MobileBottomBar />
    </I18nProvider>
  );
}

function DirEffect() {
  const isRTL = useIsRTL();
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", isRTL ? "rtl" : "ltr");
    html.setAttribute("lang", isRTL ? "ar" : "en");
  }, [isRTL]);
  return null;
}
