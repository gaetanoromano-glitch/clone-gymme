"use client";

import { FeatureAccordion, type AccordionItem } from "@/components/FeatureAccordion";
import type { AccordionFeature } from "@/content/types";
import {
  ChartLineUp,
  CalendarCheck,
  AddressBook,
  Package,
  ChatCircleDots,
  Pulse,
  ShareNetwork,
  Camera,
  ForkKnife,
  ClipboardText,
  ChartBar,
  BookOpen,
  FirstAid,
  Waveform,
} from "@phosphor-icons/react";
import type { IconWeight } from "@phosphor-icons/react";

type IconComponent = React.ComponentType<{ size?: number; weight?: IconWeight; color?: string }>;

const ICON_MAP: Record<string, IconComponent> = {
  ChartLineUp,
  CalendarCheck,
  AddressBook,
  Package,
  ChatCircleDots,
  Pulse,
  ShareNetwork,
  Camera,
  ForkKnife,
  ClipboardText,
  ChartBar,
  BookOpen,
  FirstAid,
  Waveform,
};

const DEFAULT_FEATURES: AccordionFeature[] = [
  {
    iconName: "ChartLineUp",
    title: "Monitoraggio progressi",
    description: "Niente più dubbi sul valore del tuo lavoro: mostra progressi concreti e dati oggettivi che motivano il cliente a non mollare.",
    screenshot: "/themes/gymme/assets2/images/foto_gymme/Monitoring progressi.png",
  },
  {
    iconName: "CalendarCheck",
    title: "Gestione appuntamenti",
    description: "Elimina il caos dei messaggi infiniti su WhatsApp. Automatizza le prenotazioni e riprenditi il tuo tempo libero.",
    screenshot: "/themes/gymme/assets2/images/foto_gymme/Gestione appuntamenti.png",
  },
  {
    iconName: "AddressBook",
    title: "CRM",
    description: "Basta informazioni sparse tra fogli e chat. Accedi in un istante allo storico completo di ogni cliente. Gestione centralizzata per un servizio fluido e preciso.",
    screenshot: "/themes/gymme/assets2/images/foto_gymme/CRM.png",
  },
  {
    iconName: "Package",
    title: "Pacchetti",
    description: "Elimina lo stress e l'imbarazzo di rincorrere i pagamenti. Gestisci scadenze e vendite in automatico senza errori manuali.",
    screenshot: "/themes/gymme/assets2/images/foto_gymme/Pacchetti.png",
  },
  {
    iconName: "ChatCircleDots",
    title: "Comunicazione diretta",
    description: "Resta vicino ai tuoi clienti con promemoria automatici che mantengono alto il coinvolgimento e la presenza.",
    screenshot: "/themes/gymme/assets2/images/foto_gymme/Comunicazione diretta.png",
  },
  {
    iconName: "Pulse",
    title: "Live Mode",
    description: "Un cockpit intelligente per gestire più clienti contemporaneamente, senza perdere un battito.",
    screenshot: "/themes/gymme/assets2/images/foto_gymme/Live mode.png",
  },
  {
    iconName: "ShareNetwork",
    title: "Referral & Network Growth",
    description: "Tre scenari di referral nativi: invita colleghi, consiglia professionisti ai tuoi clienti, collabora su clienti condivisi.",
    screenshot: "/themes/gymme/assets2/images/foto_gymme/Referral.png",
  },
  {
    iconName: "Camera",
    title: "Showcase social",
    description: "Trasforma i progressi reali dei tuoi clienti in contenuti social pronti in pochi tap.",
    screenshot: "/themes/gymme/assets2/images/foto_gymme/Social Story Mode.png",
  },
];

interface MotivateSectionProps {
  badgeIcon?: string;
  badgeText?: string;
  headingLines?: string[];
  features?: AccordionFeature[];
}

export function MotivateSection({
  badgeIcon = "/themes/gymme/assets2/images/homepage/icons/motivate-measure.svg",
  badgeText = "MOTIVA & MISURA",
  headingLines = ["Traccia, Analizza, Adatta.", "Ogni Sessione."],
  features = DEFAULT_FEATURES,
}: MotivateSectionProps) {
  const items: AccordionItem[] = features.map((f) => ({
    icon: ICON_MAP[f.iconName] ?? ChartLineUp,
    title: f.title,
    description: f.description,
    screenshot: f.screenshot,
  }));

  return (
    <FeatureAccordion
      badgeIcon={badgeIcon}
      badgeText={badgeText}
      headingLines={headingLines}
      items={items}
    />
  );
}
