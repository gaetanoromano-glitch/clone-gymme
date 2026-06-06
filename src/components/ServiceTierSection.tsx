import Image from "next/image";

interface FeatureItem {
  label: string;
  checkmarkSrc: string;
  labelColor: string;
}

const highTicketFeatures: FeatureItem[] = [
  { label: "Customized training plans", checkmarkSrc: "/themes/everfit/assets2/images/homepage/icons/checkmark-icon-1.svg", labelColor: "rgba(255,255,255,0.85)" },
  { label: "Personal check-ins", checkmarkSrc: "/themes/everfit/assets2/images/homepage/icons/checkmark-icon-1.svg", labelColor: "rgba(255,255,255,0.85)" },
  { label: "Direct communication", checkmarkSrc: "/themes/everfit/assets2/images/homepage/icons/checkmark-icon-1.svg", labelColor: "rgba(255,255,255,0.85)" },
];

const lowTicketFeatures: FeatureItem[] = [
  { label: "On-demand training content", checkmarkSrc: "/themes/everfit/assets2/images/homepage/icons/checkmark-icon.svg", labelColor: "#1b1b1b" },
  { label: "Group check-ins", checkmarkSrc: "/themes/everfit/assets2/images/homepage/icons/checkmark-icon.svg", labelColor: "#1b1b1b" },
  { label: "Community forums & Online fitness challenges", checkmarkSrc: "/themes/everfit/assets2/images/homepage/icons/checkmark-icon.svg", labelColor: "#1b1b1b" },
];

export function ServiceTierSection() {
  return (
    <section
      style={{ backgroundColor: "#ffffff", padding: "80px 80px" }}
      className="w-full"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12">
          <h2
            style={{
              fontSize: "56px",
              fontWeight: 700,
              fontFamily: '"TWK Everett", Inter, sans-serif',
              color: "#1b1b1b",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            Offer All Your Training Services
          </h2>
          <h2
            style={{
              fontSize: "56px",
              fontWeight: 700,
              fontFamily: '"TWK Everett", Inter, sans-serif',
              color: "#1b1b1b",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            Seamlessly In One Place
          </h2>
        </div>

        <div
          style={{
            marginTop: "48px",
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div
            style={{
              backgroundColor: "#1b1b1b",
              borderRadius: "20px",
              padding: "40px",
              overflow: "hidden",
              position: "relative",
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "16px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                One-To-One. Personalized.
              </p>

              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "28px",
                  fontWeight: 700,
                  fontFamily: '"TWK Everett", Inter, sans-serif',
                  marginBottom: "24px",
                  lineHeight: 1.2,
                }}
              >
                High Ticket Clients
              </h3>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {highTicketFeatures.map((item) => (
                  <li
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div style={{ position: "relative", width: "20px", height: "20px", flexShrink: 0 }}>
                      <Image
                        src={item.checkmarkSrc}
                        alt="check"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <span style={{ color: item.labelColor, fontSize: "16px" }}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "60%",
                height: "60%",
              }}
            >
              <Image
                src="/themes/everfit/assets2/images/homepage/revolutionary/1-1-2xl.webp"
                alt="One-to-one coaching app"
                fill
                style={{ objectFit: "contain", objectPosition: "bottom right" }}
              />
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: "20px",
              padding: "40px",
              overflow: "hidden",
              position: "relative",
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "rgba(27,27,27,0.6)",
                  fontSize: "16px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                One-To-Many. Community Focused.
              </p>

              <h3
                style={{
                  color: "#1b1b1b",
                  fontSize: "28px",
                  fontWeight: 700,
                  fontFamily: '"TWK Everett", Inter, sans-serif',
                  marginBottom: "24px",
                  lineHeight: 1.2,
                }}
              >
                Low Ticket Clients
              </h3>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {lowTicketFeatures.map((item) => (
                  <li
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div style={{ position: "relative", width: "20px", height: "20px", flexShrink: 0 }}>
                      <Image
                        src={item.checkmarkSrc}
                        alt="check"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <span style={{ color: item.labelColor, fontSize: "16px" }}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "60%",
                height: "60%",
              }}
            >
              <Image
                src="/themes/everfit/assets2/images/homepage/revolutionary/1-many-2xl.webp"
                alt="One-to-many coaching app"
                fill
                style={{ objectFit: "contain", objectPosition: "bottom right" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
