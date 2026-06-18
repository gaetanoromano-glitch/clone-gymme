import type { ProfessionalContent } from "./types";

export const personalTrainer: ProfessionalContent = {
  slug: "personal-trainer",
  name: "Personal Trainer",

  hero: {
    subtitle:
      "La prima piattaforma italiana che unisce personal trainer, nutrizionistə e osteopatə attorno allo stesso cliente. Un health team, un ecosistema condiviso.",
  },

  serviceTier: {
    studioFeatures: [
      "CRM clienti con anamnesi e misurazioni",
      "Protocolli Training, Nutrition e Recovery",
      "AI Protocol Builder e Business Dashboard",
    ],
    clientFeatures: [
      "Visualizzazione scheda e allenamenti del giorno",
      "Check-in, progressi e foto in tempo reale",
      "Comunicazione diretta col professionista",
    ],
  },

  pillarsSection: {
    headingLines: [
      "I 4 Pillar che nessun competitor",
      "offre insieme nel mercato italiano.",
    ],
    pillars: [
      {
        num: 1,
        badge: "INNOVAZIONE GYMME",
        title: "Multi-Professionale",
        description:
          "PT, Nutrizionista e Osteopata collaborano sullo stesso cliente con autonomia professionale preservata e contesto condiviso. Nessun competitor single-role lo abilita.",
        icon: "/themes/gymme/assets2/images/homepage/industry/AI.svg",
        screenshot: "/videos/Multi_pro.mp4",
        accent: "#F2B6FF",
      },
      {
        num: 2,
        badge: "POTENZIATO DALL'AI",
        title: "AI Builder",
        description:
          "Meno compiti meccanici, più valore umano. Genera schede e protocolli solidi in pochi istanti con l'AI. Dedica il tuo tempo a ciò che conta: il rapporto con il cliente.",
        icon: "/themes/gymme/assets2/images/homepage/industry/nutrition.svg",
        screenshot: "/videos/AI_Builder.mp4",
        accent: "#8CDEC0",
      },
      {
        num: 3,
        title: "Client Risk Radar",
        description:
          "Non farti sorprendere dai clienti che spariscono. Intervieni subito sui segnali di crisi e salva il tuo fatturato mensile.",
        icon: "/themes/gymme/assets2/images/homepage/industry/habit.svg",
        screenshot: "/videos/Client_Risk_Radar.mp4",
        accent: "#FFC86B",
      },
      {
        num: 4,
        title: "Business Dashboard",
        description:
          "Smetti di indovinare: analizza rinnovi e margini con dati certi. Trasforma la tua attività in una macchina prevedibile che cresce insieme a te.",
        icon: "/themes/gymme/assets2/images/homepage/industry/sport.svg",
        screenshot: "/videos/Business_Dashboard.mp4",
        accent: "#AECBFF",
      },
    ],
  },

  forEveryone: {
    heading: "Per tuttə, Personal Trainer e Studi Multidisciplinari.",
    subtitle:
      "Una piattaforma progettata per chi vuole collaborare, crescere e fidelizzare i propri clienti nel tempo.",
  },

  featuresSection: {
    badgeIcon: "/themes/gymme/assets2/images/homepage/icons/motivate-measure.svg",
    badgeText: "MOTIVA & MISURA",
    headingLines: ["Traccia, Analizza, Adatta.", "Ogni Sessione."],
    features: [
      {
        iconName: "ChartLineUp",
        title: "Monitoraggio progressi",
        description:
          "Niente più dubbi sul valore del tuo lavoro: mostra progressi concreti e dati oggettivi che motivano il cliente a non mollare.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Monitoring progressi.png",
      },
      {
        iconName: "CalendarCheck",
        title: "Gestione appuntamenti",
        description:
          "Elimina il caos dei messaggi infiniti su WhatsApp. Automatizza le prenotazioni e riprenditi il tuo tempo libero.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Gestione appuntamenti.png",
      },
      {
        iconName: "AddressBook",
        title: "CRM",
        description:
          "Basta informazioni sparse tra fogli e chat. Accedi in un istante allo storico completo di ogni cliente. Gestione centralizzata per un servizio fluido e preciso.",
        screenshot: "/themes/gymme/assets2/images/foto_gymme/CRM.png",
      },
      {
        iconName: "Package",
        title: "Pacchetti",
        description:
          "Elimina lo stress e l'imbarazzo di rincorrere i pagamenti. Gestisci scadenze e vendite in automatico senza errori manuali.",
        screenshot: "/themes/gymme/assets2/images/foto_gymme/Pacchetti.png",
      },
      {
        iconName: "ChatCircleDots",
        title: "Comunicazione diretta",
        description:
          "Resta vicino ai tuoi clienti con promemoria automatici che mantengono alto il coinvolgimento e la presenza.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Comunicazione diretta.png",
      },
      {
        iconName: "Pulse",
        title: "Live Mode",
        description:
          "Un cockpit intelligente per gestire più clienti contemporaneamente, senza perdere un battito.",
        screenshot: "/themes/gymme/assets2/images/foto_gymme/Live mode.png",
      },
      {
        iconName: "ShareNetwork",
        title: "Referral & Network Growth",
        description:
          "Tre scenari di referral nativi: invita colleghi, consiglia professionisti ai tuoi clienti, collabora su clienti condivisi.",
        screenshot: "/themes/gymme/assets2/images/foto_gymme/Referral.png",
      },
      {
        iconName: "Camera",
        title: "Showcase social",
        description:
          "Trasforma i progressi reali dei tuoi clienti in contenuti social pronti in pochi tap.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Social Story Mode.png",
      },
    ],
  },

  ratings: {
    heading: {
      bold: "La prima piattaforma in Italia ",
      regular: "multi-professionale per il benessere.",
    },
    stats: [
      { value: "45%", label: "Di nuovi clienti con l'utilizzo di piattaforme digitali" },
      { value: "10h", label: "Risparmiate ogni settimana\nsu schede, report e messaggi" },
      { value: "3×", label: "Clienti seguiti\nsenza aumentare lo stress" },
      { value: "−75%", label: "Tempo per creare\nun protocollo completo" },
      { value: "1", label: "App al posto di Excel,\nchat e PDF sparsi" },
    ],
  },

  footer: {
    ctaText: "Diamo forma al futuro del fitness, insieme.",
  },
};
