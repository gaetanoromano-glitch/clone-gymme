"use client";

import { FeatureAccordion, AccordionItem } from "@/components/FeatureAccordion";

const items: AccordionItem[] = [
  {
    icon: "/themes/everfit/assets2/images/homepage/icons/data-analytics-icon.svg",
    title: "Data Analytics",
    description: "Use powerful data to coach better and retain clients.",
    screenshot:
      "/themes/everfit/assets2/images/homepage/motivate/data-analytics.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/icons/goal-settings-icon.svg",
    title: "Goal Setting",
    description: "Help clients set and track meaningful fitness goals.",
    screenshot:
      "/themes/everfit/assets2/images/homepage/motivate/goal-setting.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/icons/adherence-icon.svg",
    title: "Fitness Challenges",
    description: "Boost engagement with group fitness challenges.",
    screenshot:
      "/themes/everfit/assets2/images/homepage/motivate/data-analytics.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/icons/check-ins-icon.svg",
    title: "Check-ins",
    description: "Regular client check-ins to track progress.",
    screenshot:
      "/themes/everfit/assets2/images/homepage/motivate/check-ins.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/icons/integrations-trackers-icon.svg",
    title: "Integrations",
    description: "Connect with popular fitness tracking apps and devices.",
    screenshot:
      "/themes/everfit/assets2/images/homepage/motivate/integrations.webp",
  },
];

export function MotivateSection() {
  return (
    <FeatureAccordion
      badgeIcon="/themes/everfit/assets2/images/homepage/icons/motivate-measure.svg"
      badgeText="MOTIVATE & MEASURE"
      headingLines={["Track, Analyze, Adapt.", "Every Session."]}
      items={items}
    />
  );
}
