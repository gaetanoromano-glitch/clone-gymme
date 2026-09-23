"use client";

import Image from "next/image";
import StickerPeel from "./StickerPeel";
import { AnimatedButton } from "./AnimatedButton";
import SplitText from "@/components/SplitText";
import { useClarity } from "@/hooks/useClarity";



interface FooterProps {
  ctaText?: string;
}

export function Footer({ ctaText = "Diamo forma al futuro del fitness, insieme." }: FooterProps) {
  const { trackEvent } = useClarity();
  return (
    <footer style={{ backgroundColor: "#ffffff" }} className='h-screen flex flex-col items-center justify-center'>
      {/* ── Main hero-like area ── */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center text-center  h-full w-full"
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
            <SplitText
                text={ctaText}
                tag="h1"
                className="text-[30px] md:text-[48px] lg:text-[64px] font-bold leading-[1.1] tracking-[-2px]"
                splitType="words"
                delay={40}
                duration={0.9}
            />

          <AnimatedButton
            href="/demo"
            onClick={() => trackEvent("footer_demo_click")}
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
