// ═══════════════════════════════════════════════════════════════
//   🏗️ LELLA — Landing Page Premium
//   Édition : magazine de luxe algérien
// ═══════════════════════════════════════════════════════════════

import { HeroSection } from "@/components/sections/hero";
import { BrandManifesto } from "@/components/sections/brand-manifesto";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { CategoriesSection } from "@/components/sections/categories-section";
import { FeaturedSection } from "@/components/sections/featured-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { StatsSection } from "@/components/sections/stats-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { CTASection } from "@/components/sections/cta-section";
import { SectionDivider } from "@/components/ui/section-divider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider variant="gold" />
      <BrandManifesto />
      <SectionDivider variant="bordeaux" />
      <HowItWorksSection />
      <SectionDivider variant="gold" />
      <StatsSection />
      <SectionDivider variant="bordeaux" />
      <CategoriesSection />
      <SectionDivider variant="gold" />
      <FeaturedSection />
      <SectionDivider variant="bordeaux" />
      <FeaturesSection />
      <SectionDivider variant="gold" />
      <TestimonialsSection />
      <SectionDivider variant="bordeaux" />
      <CTASection />
    </>
  );
}
