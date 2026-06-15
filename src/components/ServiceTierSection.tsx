import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import SpotlightCard from "@/components/SpotLightCard";

const DEFAULT_STUDIO_FEATURES = [
  "CRM clienti con anamnesi e misurazioni",
  "Protocolli Training, Nutrition e Recovery",
  "AI Protocol Builder e Business Dashboard",
];

const DEFAULT_CLIENT_FEATURES = [
  "Visualizzazione scheda e allenamenti del giorno",
  "Check-in, progressi e foto in tempo reale",
  "Comunicazione diretta col professionista",
];

interface ServiceTierSectionProps {
  studioFeatures?: string[];
  clientFeatures?: string[];
}

export function ServiceTierSection({
  studioFeatures = DEFAULT_STUDIO_FEATURES,
  clientFeatures = DEFAULT_CLIENT_FEATURES,
}: ServiceTierSectionProps) {
  return (
    <section
      id="ecosistema"
      className="w-full px-5 py-10 md:px-10 md:py-16 lg:px-[40px] lg:py-[80px]"
      style={{ backgroundColor: "var(--surface)",
          borderRadius: "48px 48px 0 0"}}
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
            spotlightColor="rgba(255, 255, 255, 0.25)"
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
                {studioFeatures.map((label) => (
                  <li
                    key={label}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <CheckCircle
                      size={20}
                      weight="fill"
                      color="var(--surface)"
                      style={{ flexShrink: 0 }}
                    />
                    <span style={{ color: "color-mix(in srgb, var(--surface) 85%, transparent)", fontSize: "15px" }}>{label}</span>
                  </li>
                ))}
              </ul>
            </div>


          </SpotlightCard>

          <SpotlightCard

            className="custom-spotlight-card
            bg-[var(--bg)]"
            spotlightColor="rgba(0, 0, 0, 0.25)"
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
                {clientFeatures.map((label) => (
                  <li
                    key={label}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <CheckCircle
                      size={20}
                      weight="fill"
                      color="var(--gymme-purple)"
                      style={{ flexShrink: 0 }}
                    />
                    <span style={{ color: "var(--text-primary)", fontSize: "15px" }}>{label}</span>
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
