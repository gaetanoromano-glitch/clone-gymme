"use client";

import { useState } from "react";
import type { ProfessionalContent } from "@/content/types";
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { IndustrySolutionSection } from "@/components/IndustrySolutionSection";
import { ServiceTierSection } from "@/components/ServiceTierSection";
import ForEveryoneSection from "@/components/ForEveryoneSection";
import { MotivateSection } from "@/components/MotivateSection";
import { WorkModesSection } from "@/components/WorkModesSection";
import { RatingsSection } from "@/components/RatingsSection";
import { Footer } from "@/components/Footer";
import ClickSpark from "@/components/ClickSpark";

interface LandingPageProps {
  content: ProfessionalContent;
}

export function LandingPage({ content }: LandingPageProps) {
  const [bannerVisible] = useState(false);

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
        <HeroSection
          topOffset={bannerVisible ? 137 : 87}
          subtitle={content.hero.subtitle}
          fixedCoachType={content.name}
        />
        <div className="relative z-[2]">
          <ServiceTierSection
            studioFeatures={content.serviceTier.studioFeatures}
            clientFeatures={content.serviceTier.clientFeatures}
          />
          <IndustrySolutionSection
            headingLines={content.pillarsSection.headingLines}
            pillars={content.pillarsSection.pillars}
          />
          <ForEveryoneSection
            heading={content.forEveryone.heading}
            subtitle={content.forEveryone.subtitle}
          >
            <MotivateSection
              badgeIcon={content.featuresSection.badgeIcon}
              badgeText={content.featuresSection.badgeText}
              headingLines={content.featuresSection.headingLines}
              features={content.featuresSection.features}
            />
          </ForEveryoneSection>
          {content.workModes && (
            <WorkModesSection
              headingLines={content.workModes.headingLines}
              subtitle={content.workModes.subtitle}
              modes={content.workModes.modes}
            />
          )}
          <RatingsSection
            heading={content.ratings.heading}
            stats={content.ratings.stats}
          />
        </div>
      </main>
      <Footer ctaText={content.footer.ctaText} />
    </ClickSpark>
  );
}
