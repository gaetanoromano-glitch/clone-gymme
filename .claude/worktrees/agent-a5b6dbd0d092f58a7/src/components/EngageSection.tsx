"use client";

import { FeatureAccordion, AccordionItem } from "@/components/FeatureAccordion";

const items: AccordionItem[] = [
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/1-1-messages-icon.svg",
    title: "1-1 Messaging",
    description:
      "Stay close with clients using direct messages and voice notes.",
    screenshot: "/uploads/2025/08/engage-item.webp",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/scheduled-icon.svg",
    title: "Scheduled Messaging",
    description: "Automate check-in reminders and motivational messages.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/engage/scheduled.webp",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/community-forum-icon.svg",
    title: "Community Forum",
    description: "Build a community where clients support each other.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/engage/broadcast.webp",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/broadcast-icon.svg",
    title: "Broadcast Messaging",
    description: "Send announcements to all clients at once.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/engage/broadcast.webp",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/announcements-icon.svg",
    title: "Announcements",
    description: "Keep clients informed with program updates and news.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/engage/announcements.webp",
  },
];

export function EngageSection() {
  return (
    <FeatureAccordion
      badgeIcon="/themes/gymme/assets2/images/homepage/icons/engage.svg"
      badgeText="ENGAGE"
      headingLines={["Stay Connected.", "Anytime, Anywhere."]}
      items={items}
    />
  );
}
