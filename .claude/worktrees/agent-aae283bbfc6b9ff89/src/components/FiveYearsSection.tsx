import Image from "next/image";

export function FiveYearsSection() {
  return (
    <section
      style={{
        backgroundColor: "transparent",
        padding: "0 80px 90px",
        position: "relative",
      }}
      className="w-full"
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
                  fontFamily: '"TWK Everett", Inter, sans-serif',
                  color: "#1b1b1b",
                  lineHeight: 1.0,
                }}
              >
                <span
                  style={{
                    fontSize: "40px",
                    fontWeight: 900,
                    display: "block",
                  }}
                >
                  5 Years{" "}
                  <span style={{ fontSize: "16px", fontWeight: 400 }}>OF</span>
                </span>
                <span
                  style={{
                    fontSize: "40px",
                    fontWeight: 900,
                    display: "block",
                  }}
                >
                  gymme
                </span>
              </div>

              <div
                style={{
                  fontSize: "40px",
                  fontWeight: 900,
                  fontFamily: '"TWK Everett", Inter, sans-serif',
                  color: "#1b1b1b",
                  lineHeight: 1.0,
                  marginTop: "4px",
                }}
              >
                Never Not Building
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontFamily: "Inter, sans-serif",
                  color: "#1b1b1b",
                  letterSpacing: "0.05em",
                  lineHeight: 1.5,
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                FROM ONLINE TO OFFLINE, AI KEEPS EVERY MOVE CONNECTED, AND FIVE
                YEARS IN, gymme IS STILL PUSHING BOUNDARIES WITH SYSTEMS THAT
                ADAPT, SCALE, AND EVOLVE WITH YOU.
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
                <span>Explore the Highlights</span>
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
