import Image from "next/image";
import SpotlightCard from "@/components/SpotLightCard";

interface FeatureItem {
  label: string;
  checkmarkSrc: string;
  labelColor: string;
}

const highTicketFeatures: FeatureItem[] = [
  { label: "CRM clienti con anamnesi e misurazioni", checkmarkSrc: "/themes/gymme/assets2/images/homepage/icons/checkmark-icon-1.svg", labelColor: "color-mix(in srgb, var(--surface) 85%, transparent)" },
  { label: "Protocolli Training, Nutrition e Recovery", checkmarkSrc: "/themes/gymme/assets2/images/homepage/icons/checkmark-icon-1.svg", labelColor: "color-mix(in srgb, var(--surface) 85%, transparent)" },
  { label: "AI Protocol Builder e Business Dashboard", checkmarkSrc: "/themes/gymme/assets2/images/homepage/icons/checkmark-icon-1.svg", labelColor: "color-mix(in srgb, var(--surface) 85%, transparent)" },
];

const lowTicketFeatures: FeatureItem[] = [
  { label: "Visualizzazione scheda e allenamenti del giorno", checkmarkSrc: "/themes/gymme/assets2/images/homepage/icons/checkmark-icon.svg", labelColor: "var(--text-primary)" },
  { label: "Check-in, progressi e foto in tempo reale", checkmarkSrc: "/themes/gymme/assets2/images/homepage/icons/checkmark-icon.svg", labelColor: "var(--text-primary)" },
  { label: "Comunicazione diretta col professionista", checkmarkSrc: "/themes/gymme/assets2/images/homepage/icons/checkmark-icon.svg", labelColor: "var(--text-primary)" },
];

export function ServiceTierSection() {
  return (
    <section
      id="ecosistema"
      className="w-full px-5 py-10 md:px-10 md:py-16 lg:px-[80px] lg:py-[80px]"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12">
          <h2
            style={{
              fontSize: "clamp(28px, 4.5vw, 56px)",
              fontWeight: 700,
              fontFamily: '"Unbounded", sans-serif',
              color: "var(--text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            Gymme Studio e App Cliente:
          </h2>
          <h2
            style={{
              fontSize: "clamp(28px, 4.5vw, 56px)",
              fontWeight: 700,
              fontFamily: '"Unbounded", sans-serif',
              color: "var(--text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            un Ecosistema Connesso
          </h2>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <SpotlightCard

            className="
            bg-[var(--text-primary)]"
            spotlightColor="color-mix(in srgb, var(--surface) 25%, transparent)"
          >
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "color-mix(in srgb, var(--surface) 70%, transparent)",
                  fontSize: "16px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                Per i Professionisti. Potente.
              </p>

              <h3
                style={{
                  color: "var(--surface)",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 700,
                  fontFamily: '"Unbounded", sans-serif',
                  marginBottom: "24px",
                  lineHeight: 1.2,
                }}
              >
                Gymme Studio
              </h3>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {highTicketFeatures.map((item) => (
                  <li
                    key={item.label}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <div style={{ position: "relative", width: "20px", height: "20px", flexShrink: 0 }}>
                      <Image src={item.checkmarkSrc} alt="check" fill style={{ objectFit: "contain" }} />
                    </div>
                    <span style={{ color: item.labelColor, fontSize: "15px" }}>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>


          </SpotlightCard>

          <SpotlightCard

            className="custom-spotlight-card
            bg-[var(--bg)]"
            spotlightColor="color-mix(in srgb, var(--ink) 25%, transparent)"
          >
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "color-mix(in srgb, var(--text-primary) 60%, transparent)",
                  fontSize: "16px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                Per i Clienti. Semplice.
              </p>

              <h3
                style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 700,
                  fontFamily: '"Unbounded", sans-serif',
                  marginBottom: "24px",
                  lineHeight: 1.2,
                }}
              >
                App Cliente
              </h3>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {lowTicketFeatures.map((item) => (
                  <li
                    key={item.label}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <div style={{ position: "relative", width: "20px", height: "20px", flexShrink: 0 }}>
                      <Image src={item.checkmarkSrc} alt="check" fill style={{ objectFit: "contain" }} />
                    </div>
                    <span style={{ color: item.labelColor, fontSize: "15px" }}>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>


          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
