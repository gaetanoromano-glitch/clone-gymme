import Image from "next/image";

const stats = [
  { value: "50K+", label: "Professionisti Wellness\nin Italia" },
  { prefix: "+", value: "30%", label: "Retention Media\ndei Clienti" },
  { value: "3", label: "Discipline in\nun'Unica Piattaforma" },
  { bigText: "25+", label: "Ore a Settimana\nRisparmiate" },
  { value: "0", label: "Competitor Italiani\nMulti-Professionale" },
];

const testimonials = [
  {
    quote:
      "Finalmente posso collaborare con la nutrizionista dei miei clienti senza gestire mille chat su WhatsApp. Gymme ha cambiato il modo in cui lavoro ogni giorno.",
    name: "Marco Ferretti",
    title: "Personal Trainer, Milano",
    photo:
      "/themes/gymme/assets2/images/homepage/testimonial/testimonial-1-1.webp",
    bgColor: "#1a2744",
  },
  {
    quote:
      "L'AI Protocol Builder mi fa risparmiare ore ogni settimana. Genero la bozza, la personalizzo e la mando al cliente in dieci minuti. Prima ci voleva una mattinata.",
    name: "Giulia Esposito",
    title: "Personal Trainer & Coach, Roma",
    photo:
      "/themes/gymme/assets2/images/homepage/testimonial/testimonial-1-2.webp",
    bgColor: "#4a5568",
  },
  {
    quote:
      "Il Client Risk Radar mi ha segnalato tre clienti a rischio in un mese. Li ho contattati in anticipo e tutti e tre hanno rinnovato il pacchetto. Non avrei mai potuto accorgermene da solo.",
    name: "Luca Bianchi",
    title: "Personal Trainer, Napoli",
    photo:
      "/themes/gymme/assets2/images/homepage/testimonial/testimonial-1-3.webp",
    bgColor: "#2d5016",
  },
  {
    quote:
      "Ho uno studio con due PT e una nutrizionista. Con Gymme lavoriamo tutti sullo stesso cliente senza duplicare le informazioni. I clienti lo percepiscono e apprezzano.",
    name: "Sara Mancini",
    title: "Fondatrice Studio Wellness, Torino",
    photo:
      "/themes/gymme/assets2/images/homepage/testimonial/testimonial-1-4.webp",
    bgColor: "#1b1b1b",
  },
  {
    quote:
      "Gymme mi ha permesso di gestire 40 clienti attivi senza impazzire con fogli Excel e messaggi su tre app diverse. Tutto in un posto, finalmente.",
    name: "Andrea Romano",
    title: "Personal Trainer, Firenze",
    photo:
      "/themes/gymme/assets2/images/homepage/testimonial/testimonial-1-5.webp",
    bgColor: "#3d3d5c",
  },
];

export function RatingsSection() {
  return (
    <section
      id="risultati"
      className="bg-white"
      style={{ padding: "80px 80px" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <h2
          className="font-twk"
          style={{
            fontSize: "56px",
            lineHeight: 1.1,
            color: "#1b1b1b",
            letterSpacing: "-1.5px",
          }}
        >
          <span style={{ fontWeight: 700 }}>La Prima Piattaforma </span>
          <span style={{ fontWeight: 400 }}>Multi-Pro per il Benessere in Italia</span>
        </h2>

        <div
          className="flex flex-wrap"
          style={{ gap: "24px", marginTop: "48px", marginBottom: "64px" }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="font-inter flex flex-col justify-between"
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "16px",
                padding: "28px 24px",
                minWidth: "180px",
                flex: 1,
              }}
            >
              <div>
                {stat.bigText ? (
                  <span
                    className="font-twk block"
                    style={{
                      fontSize: "40px",
                      fontWeight: 800,
                      color: "#1b1b1b",
                      lineHeight: 1,
                    }}
                  >
                    {stat.bigText}
                  </span>
                ) : (
                  <span
                    className="font-twk block"
                    style={{
                      fontSize: "40px",
                      fontWeight: 800,
                      color: "#1b1b1b",
                      lineHeight: 1,
                    }}
                  >
                    {stat.prefix && (
                      <span style={{ fontSize: "28px", fontWeight: 700 }}>
                        {stat.prefix}
                      </span>
                    )}
                    {stat.value}
                  </span>
                )}
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(27,27,27,0.6)",
                    lineHeight: 1.4,
                    marginTop: "8px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex overflow-x-auto"
          style={{
            gap: "24px",
            scrollbarWidth: "none" as const,
            paddingBottom: "8px",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col flex-shrink-0 overflow-hidden"
              style={{
                width: "340px",
                borderRadius: "16px",
              }}
            >
              <div className="relative" style={{ height: "200px", width: "100%" }}>
                <Image
                  src={t.photo}
                  alt={t.name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div
                className="flex flex-col flex-1"
                style={{
                  padding: "24px",
                  backgroundColor: t.bgColor,
                }}
              >
                <p
                  className="font-inter"
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    lineHeight: 1.5,
                    fontWeight: 400,
                    flex: 1,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ marginTop: "20px" }}>
                  <p
                    className="font-inter"
                    style={{
                      color: "#ffffff",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-inter"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
