export interface PillarContent {
  num: number;
  badge?: string;
  title: string;
  description: string;
  icon: string;
  screenshot: string;
  accent: string;
}

export interface AccordionFeature {
  iconName: string;
  title: string;
  description: string;
  screenshot: string;
}

export interface WorkMode {
  illustration: string;
  title: string;
  description: string;
  accent: string;
}

export interface ProfessionalContent {
  slug: string;
  name: string;

  hero: {
    subtitle: string;
  };

  serviceTier: {
    studioFeatures: string[];
    clientFeatures: string[];
  };

  pillarsSection: {
    headingLines: string[];
    pillars: PillarContent[];
  };

  forEveryone: {
    heading: string;
    subtitle: string;
  };

  featuresSection: {
    badgeIcon: string;
    badgeText: string;
    headingLines: string[];
    features: AccordionFeature[];
  };

  /** Optional — only professionals that opt in render the usage-modes section. */
  workModes?: {
    headingLines: string[];
    subtitle: string;
    modes: WorkMode[];
  };

  ratings: {
    heading: { bold: string; regular: string };
    /** Exactly 5 stats — positions map to the fixed bento grid layout. */
    stats: Array<{ value: string; label: string }>;
  };

  footer: {
    ctaText: string;
  };
}
