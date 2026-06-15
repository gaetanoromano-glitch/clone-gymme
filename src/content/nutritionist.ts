import type { ProfessionalContent } from "./types";

export const nutritionist: ProfessionalContent = {
  slug: "nutrizionista",
  name: "Nutrizionista",

  hero: {
    subtitle:
      "La prima piattaforma italiana pensata per i nutrizionisti. Gestisci piani alimentari, monitora la compliance dei tuoi clienti e collabora con il loro team di professionisti.",
  },

  serviceTier: {
    studioFeatures: [
      "CRM clienti con anamnesi alimentare e misurazioni",
      "Piani nutrizionali, protocolli dietetici e recovery",
      "AI Protocol Builder e Business Dashboard",
    ],
    clientFeatures: [
      "Visualizzazione del piano alimentare e pasti del giorno",
      "Diario alimentare, progressi e foto in tempo reale",
      "Comunicazione diretta con il nutrizionista",
    ],
  },

  pillarsSection: {
    headingLines: [
      "I 4 Pillar che nessun competitor",
      "offre insieme nel mercato italiano",
    ],
    pillars: [
      {
        num: 1,
        badge: "INNOVAZIONE GYMME",
        title: "Multi-Professionale",
        description:
          "Collabora con il PT e l'osteopata del tuo cliente in un ecosistema condiviso. Anamnesi, progressi e protocolli sempre sincronizzati. Il lavoro di squadra che i tuoi clienti meritano.",
        icon: "/themes/gymme/assets2/images/homepage/industry/AI.svg",
        screenshot: "/videos/Multi_pro.mp4",
        accent: "#F2B6FF",
      },
      {
        num: 2,
        badge: "POTENZIATO DALL'AI",
        title: "AI Protocol Builder",
        description:
          "Genera piani nutrizionali completi in pochi secondi con l'AI. Personalizza, adatta e invia al cliente in tempo reale. Meno burocrazia, più valore clinico.",
        icon: "/themes/gymme/assets2/images/homepage/industry/nutrition.svg",
        screenshot: "/videos/AI_Builder.mp4",
        accent: "#8CDEC0",
      },
      {
        num: 3,
        title: "Client Risk Radar",
        description:
          "Individua i clienti che si discostano dal piano alimentare prima che sia troppo tardi. Intervieni con un messaggio mirato e proteggi la loro compliance — e il tuo fatturato.",
        icon: "/themes/gymme/assets2/images/homepage/industry/habit.svg",
        screenshot: "/videos/Client_Risk_Radar.mp4",
        accent: "#FFC86B",
      },
      {
        num: 4,
        title: "Business Dashboard",
        description:
          "Monitora rinnovi, pacchetti attivi e margini con dati precisi. Costruisci uno studio nutrizionale prevedibile e scalabile.",
        icon: "/themes/gymme/assets2/images/homepage/industry/sport.svg",
        screenshot: "/videos/Business_Dashboard.mp4",
        accent: "#AECBFF",
      },
    ],
  },

  forEveryone: {
    heading: "Per Nutrizionisti Liberi Professionisti e Studi Multidisciplinari",
    subtitle:
      "Una piattaforma progettata per chi vuole collaborare con altri professionisti del benessere, crescere e fidelizzare i propri clienti nel tempo.",
  },

  featuresSection: {
    badgeIcon: "/themes/gymme/assets2/images/homepage/icons/motivate-measure.svg",
    badgeText: "MONITORA & ADATTA",
    headingLines: ["Pianifica, Monitora, Ottimizza.", "Ogni Piano Alimentare."],
    features: [
      {
        iconName: "ForkKnife",
        title: "Piani nutrizionali",
        description:
          "Crea e condividi piani alimentari dettagliati direttamente nell'app del cliente. Strutturati, chiari e sempre aggiornabili in tempo reale.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Monitoring progressi.png",
      },
      {
        iconName: "ClipboardText",
        title: "Anamnesi alimentare",
        description:
          "Raccogli digitalmente la storia alimentare, le intolleranze, gli obiettivi e le abitudini di ogni cliente. Tutto accessibile in un click durante la seduta.",
        screenshot: "/themes/gymme/assets2/images/foto_gymme/CRM.png",
      },
      {
        iconName: "ChartBar",
        title: "Monitoraggio compliance",
        description:
          "Tieni traccia di quanto i tuoi clienti seguono il piano. Ricevi alert automatici quando qualcosa non va e intervieni prima che mollino.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Monitoring progressi.png",
      },
      {
        iconName: "CalendarCheck",
        title: "Gestione appuntamenti",
        description:
          "Elimina il caos delle prenotazioni via messaggio. Automatizza le sessioni di follow-up e risparmia ore ogni settimana.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Gestione appuntamenti.png",
      },
      {
        iconName: "ChatCircleDots",
        title: "Comunicazione diretta",
        description:
          "Invia promemoria, aggiornamenti di piano e messaggi motivazionali direttamente dall'app. Sempre vicino ai tuoi clienti, anche tra una seduta e l'altra.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Comunicazione diretta.png",
      },
      {
        iconName: "BookOpen",
        title: "Diario alimentare",
        description:
          "I clienti registrano i pasti, le foto e le sensazioni direttamente dall'app. Tu ricevi tutto in tempo reale senza dover chiedere.",
        screenshot: "/themes/gymme/assets2/images/foto_gymme/Live mode.png",
      },
      {
        iconName: "Package",
        title: "Pacchetti",
        description:
            "Elimina lo stress e l'imbarazzo di rincorrere i pagamenti. Gestisci scadenze e vendite in automatico senza errori manuali.",
        screenshot: "/themes/gymme/assets2/images/foto_gymme/Pacchetti.png",
      },
      {
        iconName: "ShareNetwork",
        title: "Referral & Network Growth",
        description:
          "Collabora con PT e osteopati della tua rete. Consiglia professionisti ai clienti e ricevi clienti qualificati in cambio.",
        screenshot: "/themes/gymme/assets2/images/foto_gymme/Referral.png",
      },
      {
        iconName: "Camera",
        title: "Showcase social",
        description:
          "Trasforma i risultati reali dei tuoi clienti in contenuti social pronti in pochi tap. Testimonianze che parlano per te.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Social Story Mode.png",
      },
    ],
  },

  ratings: {
    heading: {
      bold: "La Prima Piattaforma ",
      regular: "Multi-Pro per il Benessere in Italia",
    },
    stats: [
      { value: "+42%", label: "Compliance media dei clienti\nnel primo anno con Gymme" },
      { value: "8h", label: "Risparmiate ogni settimana\nsu piani, report e follow-up" },
      { value: "2.5×", label: "Clienti seguiti\nsenza aumentare il carico" },
      { value: "−70%", label: "Tempo per costruire\nun piano nutrizionale completo" },
      { value: "1", label: "App al posto di Excel,\nWhatsApp e PDF sparsi" },
    ],
  },

  footer: {
    ctaText: "Diamo forma al futuro della nutrizione, insieme.",
  },
};
