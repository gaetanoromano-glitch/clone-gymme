"use client";

import Image from "next/image";
import StickerPeel from "./StickerPeel";
import { AnimatedButton } from "./AnimatedButton";

const socialIcons = [
  { src: "/themes/gymme/assets2/images/homepage/footer/fb-icon.svg", alt: "Facebook", href: "https://www.facebook.com/gymmeapp" },
  { src: "/themes/gymme/assets2/images/homepage/footer/ig-icon.svg", alt: "Instagram", href: "https://www.instagram.com/gymmeapp" },
  { src: "/themes/gymme/assets2/images/homepage/footer/ytb-icon.svg", alt: "YouTube", href: "https://www.youtube.com/gymme" },
  { src: "/themes/gymme/assets2/images/homepage/footer/linkedin-icon.svg", alt: "LinkedIn", href: "https://www.linkedin.com/company/gymme" },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#fafafa" }}>
      {/* ── Main hero-like area ── */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ minHeight: "520px", padding: "100px 24px 80px" }}
      >
        {/* Stickers — desktop only */}
        <div className="hidden lg:block absolute inset-0" style={{ zIndex: 2, pointerEvents: "none" }}>
          <StickerPeel
            className="pointer-events-auto"
            imageSrc="/themes/gymme/assets2/images/mamozzi/ago.svg"
            width={110}
            rotate={-10}
            peelBackHoverPct={22}
            peelBackActivePct={42}
            shadowIntensity={0.3}
            lightingIntensity={0.0}
            left="6%"
            top="80px"
          />
          <StickerPeel
            className="pointer-events-auto"
            imageSrc="/themes/gymme/assets2/images/mamozzi/anna.svg"
            width={100}
            rotate={8}
            peelBackHoverPct={22}
            peelBackActivePct={42}
            shadowIntensity={0.3}
            lightingIntensity={0.01}
            left="14%"
            top="220px"
          />
          <StickerPeel
            className="pointer-events-auto"
            imageSrc="/themes/gymme/assets2/images/mamozzi/tanino.svg"
            width={100}
            rotate={-6}
            peelBackHoverPct={22}
            peelBackActivePct={42}
            shadowIntensity={0.3}
            lightingIntensity={0.01}
            left="74%"
            top="220px"
          />
          <StickerPeel
            className="pointer-events-auto"
            imageSrc="/themes/gymme/assets2/images/mamozzi/angelo.svg"
            width={110}
            rotate={12}
            peelBackHoverPct={22}
            peelBackActivePct={42}
            shadowIntensity={0.3}
            lightingIntensity={0.08}
            left="80%"
            top="80px"
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center" style={{ zIndex: 3, maxWidth: "720px" }}>
          <h2
            style={{
              fontSize: "clamp(32px, 5.5vw, 72px)",
              fontWeight: 700,
              fontFamily: '"Unbounded", sans-serif',
              color: "#1b1b1b",
              lineHeight: 1.08,
              letterSpacing: "-2px",
              margin: 0,
            }}
          >
            Diamo forma al futuro del fitness, insieme.
          </h2>

          <AnimatedButton
            href="#demo"
            style={{ marginTop: "40px", height: "52px", padding: "0 32px", fontSize: "15px" }}
          >
            Richiedi una demo
          </AnimatedButton>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="flex flex-col items-center gap-5"
        style={{
          borderTop: "1px solid rgba(27,27,27,0.10)",
          padding: "36px 24px 40px",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "rgba(27,27,27,0.45)",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            margin: 0,
          }}
        >
          © Gymme 2026
        </p>
      </div>
    </footer>
  );
}
