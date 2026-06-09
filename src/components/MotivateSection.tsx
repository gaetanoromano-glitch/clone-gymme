"use client";

import { FeatureAccordion, AccordionItem } from "@/components/FeatureAccordion";

const items: AccordionItem[] = [
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/data-analytics-icon.svg",
    title: "Client Risk Radar",
    description: "Identifica i clienti a rischio abbandono prima che sia troppo tardi. Aderenza al piano, frequenza login, pattern di pagamento: tutto in un unico segnale predittivo.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/motivate/data-analytics.webp",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/goal-settings-icon.svg",
    title: "Progressi & Misurazioni",
    description: "Storico completo di misurazioni antropometriche, foto progresso affiancate per confronto prima/dopo e grafici di evoluzione forza e peso nel tempo.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/motivate/goal-setting.webp",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/adherence-icon.svg",
    title: "Monitoraggio Aderenza",
    description: "Tieni traccia di completamenti, sedute residue e cancellazioni per ogni cliente. Dashboard aderenza sempre aggiornata per non perdere nessun segnale.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/motivate/data-analytics.webp",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/check-ins-icon.svg",
    title: "Check-in Giornalieri",
    description: "Il cliente registra umore e benessere dall'app ogni giorno. I dati arrivano direttamente al professionista per un coaching più informato e proattivo.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/motivate/check-ins.webp",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/icons/integrations-trackers-icon.svg",
    title: "Report Automatici",
    description: "Genera report progressi automatici da condividere col cliente. Grafici, foto e milestone raggiunte in un documento professionale pronto in un click.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/motivate/integrations.webp",
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
