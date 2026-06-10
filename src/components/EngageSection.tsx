"use client";

import { FeatureAccordion, AccordionItem } from "@/components/FeatureAccordion";
import { ChatText, Clock, UsersThree, BellRinging, Files } from "@phosphor-icons/react";

const items: AccordionItem[] = [
  {
    icon: ChatText,
    title: "Messaggi 1-a-1",
    description:
      "Comunicazione diretta tra professionista e cliente con storico completo e notifiche push. La relazione quotidiana che fa la differenza.",
    screenshot: "/uploads/2025/08/engage-item.webp",
  },
  {
    icon: Clock,
    title: "Messaggi Programmati",
    description: "Automatizza i promemoria di seduta e i messaggi motivazionali. Nessun cliente dimentica, nessun appuntamento saltato.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/engage/scheduled.webp",
  },
  {
    icon: UsersThree,
    title: "Health Team Collaborativo",
    description: "PT, Nutrizionista e Osteopata condividono il contesto del cliente in un unico spazio. Ogni professionista lavora nel suo modulo, tutti vedono il quadro completo.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/engage/broadcast.webp",
  },
  {
    icon: BellRinging,
    title: "Alert Anti-Dropout",
    description: "Reminder automatici basati sul comportamento del cliente. Il sistema segnala i rischi, tu intervieni prima che sia troppo tardi.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/engage/broadcast.webp",
  },
  {
    icon: Files,
    title: "Gestione Documenti",
    description: "Richiedi e ricevi documenti clinici dal cliente — certificati medici, analisi del sangue, prescrizioni. Scadenze automatiche e notifiche di rinnovo incluse.",
    screenshot:
      "/themes/gymme/assets2/images/homepage/engage/announcements.webp",
  },
];

export function EngageSection() {
  return (
    <FeatureAccordion
      badgeIcon="/themes/gymme/assets2/images/homepage/icons/engage.svg"
      badgeText="COINVOLGI"
      headingLines={["Resta Connesso.", "Sempre, Ovunque."]}
      items={items}
    />
  );
}
