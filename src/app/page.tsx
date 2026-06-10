"use client";

import { useState } from "react";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { IndustrySolutionSection } from "@/components/IndustrySolutionSection";
import { ServiceTierSection } from "@/components/ServiceTierSection";
import { FiveYearsSection } from "@/components/FiveYearsSection";
import ForEveryoneSection from "@/components/ForEveryoneSection";
import PlanCoachSection from "@/components/PlanCoachSection";
import { MotivateSection } from "@/components/MotivateSection";
import { EngageSection } from "@/components/EngageSection";
import { ScaleSection } from "@/components/ScaleSection";
import { BrandingSection } from "@/components/BrandingSection";
import { RatingsSection } from "@/components/RatingsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import  ClickSpark  from "@/components/ClickSpark";

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <ClickSpark
        sparkColor="#000000"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
    >
      <Navbar bannerVisible={false} />
      <main>
        <HeroSection topOffset={bannerVisible ? 137 : 87} />
        <div className="relative z-[2]">
          <IndustrySolutionSection />
          <ServiceTierSection />
          <ForEveryoneSection>
            {/*<PlanCoachSection />*/}
            <MotivateSection />
            {/*<EngageSection />*/}
            {/*<ScaleSection />*/}
          </ForEveryoneSection>
          <RatingsSection />
          {/*<CTASection />*/}
        </div>
      </main>
      <Footer />
    </ClickSpark>
  );
}
