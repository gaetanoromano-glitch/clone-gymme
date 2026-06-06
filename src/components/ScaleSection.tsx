"use client";

import { FeatureAccordion, AccordionItem } from "@/components/FeatureAccordion";

const items: AccordionItem[] = [
  {
    icon: "/themes/everfit/assets2/images/homepage/icons/automated.svg",
    title: "Streamline Onboarding",
    description:
      "Easily scale operations by automating client onboarding and admin tasks.",
    screenshot:
      "/themes/everfit/assets2/images/homepage/scale/automated.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/icons/autoflow-icon.svg",
    title: "Automate Workflows",
    description: "Create automated sequences for client journeys.",
    screenshot:
      "/themes/everfit/assets2/images/homepage/scale/autoflow.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/icons/integrated-payments-icon.svg",
    title: "Integrated Payments",
    description: "Accept payments directly in your coaching platform.",
    screenshot:
      "/themes/everfit/assets2/images/homepage/scale/payment.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/icons/business-analytics-icon.svg",
    title: "HSA/FSA",
    description: "Accept HSA and FSA payments from clients.",
    screenshot:
      "/themes/everfit/assets2/images/homepage/scale/hsa-fsa.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/icons/marketplace-for-acquisition-icon.svg",
    title: "Marketplace for Lead Generation",
    description: "Get discovered by new clients on the Everfit marketplace.",
    badge: "BETA",
    screenshot:
      "/themes/everfit/assets2/images/homepage/scale/marketplace.webp",
  },
];

export function ScaleSection() {
  return (
    <FeatureAccordion
      badgeIcon="/themes/everfit/assets2/images/homepage/icons/scale.svg"
      badgeText="SCALE"
      headingLines={["Personalize, Perfect, Perform."]}
      items={items}
    />
  );
}
