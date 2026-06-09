import Image from "next/image";

export function FiveYearsSection() {
  return (
    <section
      className="w-full px-5 pb-10 md:px-10 md:pb-16 lg:px-[80px] lg:pb-[90px]"
      style={{ backgroundColor: "transparent", position: "relative" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div
          style={{
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
          className="flex flex-col md:flex-row md:h-[312px]"
        >
          <div
            style={{
              backgroundColor: "#CBFF11",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
            className="w-full md:w-[326px]"
          >
            <div>
              <div
                style={{
                  fontFamily: '"Unbounded", sans-serif',
                  color: "#1b1b1b",
                  lineHeight: 1.0,
                }}
              >
                <span style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 900, display: "block" }}>
                  Gymme{" "}
                  <span style={{ fontSize: "16px", fontWeight: 400 }}>IL TUO</span>
                </span>
                <span style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 900, display: "block" }}>
                  Studio
                </span>
              </div>

              <div
                style={{
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  fontWeight: 900,
                  fontFamily: '"Unbounded", sans-serif',
                  color: "#1b1b1b",
                  lineHeight: 1.0,
                  marginTop: "4px",
                }}
              >
                Sempre con Te
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  color: "#1b1b1b",
                  letterSpacing: "0.05em",
                  lineHeight: 1.5,
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                DALL&apos;ONLINE ALL&apos;OFFLINE, L&apos;AI MANTIENE OGNI MOSSA CONNESSA. GYMME
                CRESCE CON TE: SISTEMI CHE SI ADATTANO, SCALANO ED EVOLVONO
                CON LA TUA ATTIVITÀ.
              </p>

              <button
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.08)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1b1b1b",
                  cursor: "pointer",
                  border: "none",
                  width: "100%",
                }}
              >
                <span>Scopri Gymme Studio</span>
                <span style={{ fontSize: "16px" }}>→</span>
              </button>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "1fr",
              gap: "2px",
              position: "relative",
              backgroundColor: "#ffffff",
              overflow: "hidden",
              minHeight: "200px",
            }}
          >
            <div style={{ position: "relative" }}>
              <Image
                src="/themes/gymme/assets2/images/homepage/five-years/banner-1.webp"
                alt="gymme 5 years banner 1"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <Image
                src="/themes/gymme/assets2/images/homepage/five-years/banner-2.webp"
                alt="gymme 5 years banner 2"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
