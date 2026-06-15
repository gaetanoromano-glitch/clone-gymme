import type { ProfessionalContent } from "./types";

export const osteopath: ProfessionalContent = {
  slug: "osteopata",
  name: "Osteopata",

  hero: {
    subtitle:
      "La prima piattaforma italiana pensata per gli osteopati. Gestisci protocolli di trattamento, monitora il recupero dei tuoi pazienti e collabora con il loro team di professionisti.",
  },

  serviceTier: {
    studioFeatures: [
      "CRM pazienti con anamnesi posturale e storico trattamenti",
      "Protocolli di trattamento e piani di recovery personalizzati",
      "AI Protocol Builder e Business Dashboard per lo studio",
    ],
    clientFeatures: [
      "Visualizzazione del protocollo e esercizi domiciliari del giorno",
      "Check-in sintomi, progressi e foto posturali in tempo reale",
      "Comunicazione diretta con l'osteopata",
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
          "Collabora con il PT e il nutrizionista del tuo paziente in un contesto condiviso. Storico clinico, progressi e protocolli sempre allineati. La continuità terapeutica che i tuoi pazienti meritano.",
        icon: "/themes/gymme/assets2/images/homepage/industry/AI.svg",
        screenshot: "/videos/Multi_pro.mp4",
        accent: "#F2B6FF",
      },
      {
        num: 2,
        badge: "POTENZIATO DALL'AI",
        title: "AI Protocol Builder",
        description:
          "Genera bozze di protocolli di trattamento e piani di recovery in pochi secondi. Personalizza e condividi col paziente. Meno burocrazia, più tempo in studio.",
        icon: "/themes/gymme/assets2/images/homepage/industry/nutrition.svg",
        screenshot: "/videos/AI_Builder.mp4",
        accent: "#8CDEC0",
      },
      {
        num: 3,
        title: "Client Risk Radar",
        description:
          "Monitora i pazienti che si allontanano dal protocollo di esercizi domiciliari. Ricevi alert prima che la compliance crolli e intervieni con precisione.",
        icon: "/themes/gymme/assets2/images/homepage/industry/habit.svg",
        screenshot: "/videos/Client_Risk_Radar.mp4",
        accent: "#FFC86B",
      },
      {
        num: 4,
        title: "Business Dashboard",
        description:
          "Analizza rinnovi, cicli di trattamento e margini con dati certi. Trasforma il tuo studio in qualcosa di prevedibile e crescibile.",
        icon: "/themes/gymme/assets2/images/homepage/industry/sport.svg",
        screenshot: "/videos/Business_Dashboard.mp4",
        accent: "#AECBFF",
      },
    ],
  },

  forEveryone: {
    heading: "Per Osteopati e Studi Multidisciplinari",
    subtitle:
      "Una piattaforma progettata per chi vuole lavorare in sinergia con altri professionisti del benessere, garantire continuità terapeutica e fidelizzare i pazienti nel tempo.",
  },

  featuresSection: {
    badgeIcon: "/themes/gymme/assets2/images/homepage/icons/motivate-measure.svg",
    badgeText: "TRATTA & MONITORA",
    headingLines: ["Documenta, Monitora, Adatta.", "Ogni Protocollo."],
    features: [
      {
        iconName: "FirstAid",
        title: "Protocolli di trattamento",
        description:
          "Crea e condividi protocolli strutturati con esercizi domiciliari e note cliniche. Disponibili nell'app del paziente in tempo reale.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Monitoring progressi.png",
      },
      {
        iconName: "ClipboardText",
        title: "Anamnesi posturale",
        description:
          "Raccogli digitalmente la storia clinica, le disfunzioni, i sintomi e gli obiettivi di ogni paziente. Sempre accessibile durante la seduta.",
        screenshot: "/themes/gymme/assets2/images/foto_gymme/CRM.png",
      },
      {
        iconName: "Waveform",
        title: "Monitoraggio recovery",
        description:
          "Tieni traccia dell'aderenza agli esercizi domiciliari e dei feedback sintomatici. Adatta il protocollo in base ai dati reali.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Monitoring progressi.png",
      },
      {
        iconName: "CalendarCheck",
        title: "Gestione appuntamenti",
        description:
          "Elimina le telefonate per prenotare. Automatizza le sessioni di controllo e risparmia ore ogni settimana.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Gestione appuntamenti.png",
      },
      {
        iconName: "ChatCircleDots",
        title: "Comunicazione diretta",
        description:
          "Invia promemoria per gli esercizi, aggiornamenti di protocollo e messaggi di supporto. Sei presente anche tra una seduta e l'altra.",
        screenshot:
          "/themes/gymme/assets2/images/foto_gymme/Comunicazione diretta.png",
      },
      {
        iconName: "Pulse",
        title: "Live Mode",
        description:
          "Un cockpit intelligente per gestire più pazienti contemporaneamente, con una visione d'insieme di chi ha bisogno di attenzione.",
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
          "Collabora con PT e nutrizionisti della tua rete. Costruisci un network di professionisti che si supportano a vicenda per il benessere del paziente.",
        screenshot: "/themes/gymme/assets2/images/foto_gymme/Referral.png",
      },
      {
        iconName: "Camera",
        title: "Showcase social",
        description:
          "Trasforma i risultati di recovery dei tuoi pazienti in contenuti educativi. Autorevolezza che attira nuovi pazienti.",
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
      { value: "+35%", label: "Fatturato medio in più\nnel primo anno con Gymme" },
      { value: "6h", label: "Risparmiate ogni settimana\nsu documentazione e follow-up" },
      { value: "2×", label: "Pazienti seguiti\nsenza aumentare il carico" },
      { value: "−65%", label: "Tempo per documentare\nuna seduta e il protocollo" },
      { value: "1", label: "App al posto di cartelle,\nreminder e messaggi sparsi" },
    ],
  },

  footer: {
    ctaText: "Diamo forma al futuro dell'osteopatia, insieme.",
  },
};
