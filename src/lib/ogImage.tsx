import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

// Shared social card, matching the hero's palette.
export function renderOgImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #fafafa 0%, #EEEDFB 55%, #E3DBFF 100%)",
          color: "#1b1b1b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: "-1px" }}>gymme</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#7C5CFF", textTransform: "uppercase", letterSpacing: "2px" }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.4, color: "rgba(27,27,27,0.65)", maxWidth: 960 }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
