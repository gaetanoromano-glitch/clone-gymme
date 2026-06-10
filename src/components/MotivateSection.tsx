"use client";

import { FeatureAccordion, AccordionItem } from "@/components/FeatureAccordion";

const items: AccordionItem[] = [
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/data-analytics-icon.svg",
    title: "Monitoraggio progressi",
    description: "Niente più dubbi sul valore del tuo lavoro: mostra progressi concreti e dati oggettivi che motivano il cliente a non mollare.",
    screenshot:
      "/themes/gymme/assets2/images/foto_gymme/Monitoring progressi.png",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/goal-settings-icon.svg",
    title: "Gestione appuntamenti",
    description: "Elimina il caos dei messaggi infiniti su WhatsApp. Automatizza le prenotazioni e riprenditi il tuo tempo libero.",
    screenshot:
        "/themes/gymme/assets2/images/foto_gymme/Gestione appuntamenti.png",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/adherence-icon.svg",
    title: "CRM",
    description: "Basta informazioni sparse tra fogli e chat. Accedi in un istante allo storico completo di ogni cliente. Gestione centralizzata per un servizio fluido e preciso.",
    screenshot:
        "/themes/gymme/assets2/images/foto_gymme/CRM.png",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/check-ins-icon.svg",
    title: "Pacchetti",
    description: "Elimina lo stress e l'imbarazzo di rincorrere i pagamenti. Gestisci scadenze e vendite in automatico senza errori manuali.",
    screenshot:
        "/themes/gymme/assets2/images/foto_gymme/Pacchetti.png",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/integrations-trackers-icon.svg",
    title: "Comunicazione diretta",
    description: "Resta vicino ai tuoi clienti con promemoria automatici che mantengono alto il coinvolgimento e la presenza.",
    screenshot:
        "/themes/gymme/assets2/images/foto_gymme/Comunicazione diretta.png",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/data-analytics-icon.svg",
    title: "Live Mode",
    description: "Un cockpit intelligente per gestire più clienti contemporaneamente, senza perdere un battito.",
    screenshot:
        "/themes/gymme/assets2/images/foto_gymme/Live mode.png",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/goal-settings-icon.svg",
    title: "Referral & Network Growth",
    description: "Tre scenari di referral nativi: invita colleghi, consiglia professionisti ai tuoi clienti, collabora su clienti condivisi.",
    screenshot:
        "/themes/gymme/assets2/images/foto_gymme/Referral.png",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/goal-settings-icon.svg",
    title: "Showcase social",
    description: "Trasforma i progressi reali dei tuoi clienti in contenuti social pronti in pochi tap.",
    screenshot:
        "/themes/gymme/assets2/images/foto_gymme/Social Story Mode.png",
  },
];

export function MotivateSection() {
  return (
    <FeatureAccordion
      badgeIcon="/themes/gymme/assets2/images/homepage/icons/motivate-measure.svg"
      badgeText="MOTIVA & MISURA"
      headingLines={["Traccia, Analizza, Adatta.", "Ogni Sessione."]}
      items={items}
    />
  );
}
