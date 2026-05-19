import WhyChooseFalcon from "@/components/sections/WhyChooseFalcon";
import Hero from "@/components/sections/Hero";
import WhyErpFails from "@/components/sections/WhyErpFails";
import TrustLogos from "@/components/sections/TrustLogos";
import ComplianceBadges from "@/components/sections/ComplianceBadges";
import PainPoints from "@/components/sections/PainPoints";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import ProductTrio from "@/components/sections/ProductTrio";
import CtaBanner from "@/components/sections/CtaBanner";
import IndustryGrid from "@/components/sections/IndustryGrid";
import StatsCounter from "@/components/sections/StatsCounter";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Newsletter from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyErpFails />
      <ProductTrio />
      <WhyChooseFalcon />
      <TrustLogos />
      <ComplianceBadges />
      <PainPoints />
      <FeatureShowcase />
      <CtaBanner />
      <IndustryGrid />
      <StatsCounter />
      <Testimonials />
      <Faq />
      <Newsletter />
    </>
  );
}
