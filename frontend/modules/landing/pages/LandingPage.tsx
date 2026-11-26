import { ClosingCta } from "../components/ClosingCta";
import { Comparison } from "../components/Comparison";
import { FeaturedRestaurants } from "../components/FeaturedRestaurants";
import { Hero } from "../components/Hero";
import { ImpactSection } from "../components/ImpactSection";
import { PartnerSection } from "../components/PartnerSection";
import { PilotZone } from "../components/PilotZone";
import { TrustStrip } from "../components/TrustStrip";

export function LandingPage() {
  return (
    <div className="bg-cream">
      <Hero />
      <TrustStrip />
      <FeaturedRestaurants />
      <ImpactSection />
      <Comparison />
      <PilotZone />
      <PartnerSection />
      <ClosingCta />
    </div>
  );
}
