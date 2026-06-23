"use client";

import { FeatureAccordion, AccordionItem } from "@/components/FeatureAccordion";
import { UserPlus, ShareNetwork, CreditCard, Handshake, ChartBar } from "@phosphor-icons/react";

const items: AccordionItem[] = [
  {
    icon: UserPlus,
    title: "Onboarding Pro-Driven",
    description:
      "Invita i clienti via WhatsApp o email e gestisci l'intero lifecycle di onboarding direttamente dal CRM. Il cliente non si auto-registra — sei tu a portarlo dentro.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/scale/automated.webp",
  },
  {
    icon: ShareNetwork,
    title: "Referral & Network Growth",
    description: "Tre scenari di referral nativi: invita colleghi, consiglia professionisti ai tuoi clienti, collabora su clienti condivisi. Network effect difensivo a CAC basso.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/scale/autoflow.webp",
  },
  {
    icon: CreditCard,
    title: "Pagamenti Integrati",
    description: "Crea pacchetti, gestisci abbonamenti e accetta pagamenti in-app o in presenza. Stripe integrato, fatturazione italiana, PCI-DSS compliant.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/scale/payment.webp",
  },
  {
    icon: Handshake,
    title: "Collaborazione Multi-Pro",
    description: "Aggiungi PT, Nutrizionisti e Osteopati allo stesso cliente. Ognuno lavora nel proprio modulo con contesto condiviso e autonomia professionale preservata.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/scale/hsa-fsa.webp",
  },
  {
    icon: ChartBar,
    title: "Dashboard Business",
    description: "Monitora rinnovi, margini, aderenza clienti e metriche operative in un cockpit personalizzabile. Gestisci la tua attività con dati certi.",
    badge: "NUOVO",
    screenshot:
      "/themes/gymme/assets2/images/homepage/scale/marketplace.webp",
  },
];

export function ScaleSection() {
  return (
    <FeatureAccordion
      badgeIcon="/themes/gymme/assets2/images/homepage/icons/scale.svg"
      badgeText="SCALA"
      headingLines={["Scala il Tuo Studio.", "Senza Perdere la Qualità."]}
      items={items}
    />
  );
}
