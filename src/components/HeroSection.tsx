"use client";

import { useState, useEffect, useRef } from "react";
import StickerPeel from "@/components/StickerPeel";
import { AnimatedButton } from "@/components/AnimatedButton";

const slides = [
  { coachType: "Personal Trainer" },
  { coachType: "Nutrizionisti" },
  { coachType: "Osteopati" },
];

interface HeroProps {
  topOffset?: number;
}

export function HeroSection({ topOffset = 137 }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [collapsing, setCollapsing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!email.trim()) {
      inputRef.current?.focus();
      return;
    }
    setCollapsing(true);
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => setShowMessage(true), 80);
    }, 500);
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setTextVisible(false);
      timeout = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTextVisible(true);
      }, 400);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden h-[560px] md:h-[700px] lg:h-[849px] sticky top-0 z-[1]"
      style={{ backgroundColor: "#fafafa" }}
    >
      <p className="sr-only">Gymme — Piattaforma Wellness Multi-Professionale</p>

      {/* ── Background ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/themes/gymme/assets2/images/bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Centered content ── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-5 md:px-10 lg:px-[80px]"
        style={{ paddingTop: topOffset }}
      >
        <h2
          className="text-[30px] md:text-[48px] lg:text-[64px]"
          style={{
            fontFamily: '"Unbounded", sans-serif',
            fontWeight: 700,
            color: "#1b1b1b",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            margin: 0,
          }}
        >
          L&apos;ecosistema digitale per
        </h2>

        {/* Animated coach type */}
        <div
          style={{
            height: "clamp(42px, 8vw, 80px)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            className="text-[30px] md:text-[48px] lg:text-[64px]"
            style={{
              fontFamily: '"Unbounded", sans-serif',
              fontWeight: 700,
              color: "#1b1b1b",
              lineHeight: 1.1,
              letterSpacing: "-2.8px",
              display: "block",
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
            }}
          >
            {slides[currentSlide].coachType}
          </span>
        </div>

        <p
          style={{
            color: "rgba(27,27,27,0.6)",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 400,
            marginTop: "16px",
            maxWidth: "480px",
            fontSize: "clamp(14px, 1.4vw, 18px)",
            lineHeight: 1.55,
          }}
        >
          La prima piattaforma italiana che unisce PT, Nutrizionisti e Osteopati attorno allo stesso cliente. Un health team, un ecosistema condiviso.
        </p>

        {/* Pill input + button */}
        <div
          style={{
            marginTop: "32px",
            minHeight: "56px",
            width: "100%",
            maxWidth: "480px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: submitted ? "none" : "flex",
              alignItems: "center",
              height: "56px",
              borderRadius: "999px",
              backgroundColor: "rgba(0,0,0,0.04)",
              border: "1.5px solid rgba(0,0,0,0.12)",
              padding: "6px 6px 6px 20px",
              width: "100%",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              opacity: collapsing ? 0 : 1,
              transform: collapsing ? "scale(0.82)" : "scale(1)",
              transformOrigin: "center center",
            }}
          >
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Inserisci la tua email"
              className="placeholder:text-[rgba(0,0,0,0.35)]"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#1b1b1b",
                fontSize: "15px",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                minWidth: 0,
              }}
            />
            <AnimatedButton
              onClick={handleSubmit}
              style={{ flexShrink: 0, height: "44px", padding: "0 20px", fontSize: "14px" }}
            >
              Richiedi una demo
            </AnimatedButton>
          </div>

          {submitted && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                opacity: showMessage ? 1 : 0,
                transform: showMessage ? "scale(1) translateY(0)" : "scale(0.88) translateY(6px)",
                transition: "opacity 0.45s ease, transform 0.45s ease",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,0,0,0.06)",
                  border: "1.5px solid rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1b1b1b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                style={{
                  color: "#1b1b1b",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                Sarai ricontattato per schedulare la demo
              </p>
            </div>
          )}
        </div>
      </div>

      {/*
        ── Sticker playground ──
        Positioned as absolute inset-0 layer on top of the content.
        GSAP Draggable (built into StickerPeel) uses this div as bounds,
        so stickers can be freely dragged anywhere within the hero area.
        Hidden on mobile — stickers visible only on lg+ screens.
      */}
      <div className="hidden lg:block absolute inset-0" style={{ zIndex: 20, pointerEvents: "none" }}>
        <StickerPeel
          className="pointer-events-auto"
          imageSrc="/themes/gymme/assets2/images/mamozzi/ago.svg"
          width={110}
          rotate={-12}
          peelBackHoverPct={22}
          peelBackActivePct={42}
          shadowIntensity={0.3}
          lightingIntensity={0.0}
          left="25%"
          top="20%"
        />
        <StickerPeel
          className="pointer-events-auto"
          imageSrc="/themes/gymme/assets2/images/mamozzi/anna.svg"
          width={110}
          rotate={8}
          peelBackHoverPct={22}
          peelBackActivePct={42}
          shadowIntensity={0.3}
          lightingIntensity={0.0}
          left="18%"
          top="400px"
        />
        <StickerPeel
          className="pointer-events-auto"
          imageSrc="/themes/gymme/assets2/images/mamozzi/tanino.svg"
          width={110}
          rotate={-7}
          peelBackHoverPct={22}
          peelBackActivePct={42}
          shadowIntensity={0.3}
          lightingIntensity={0.0}
          left="75%"
          top="400px"
        />
        <StickerPeel
          className="pointer-events-auto"
          imageSrc="/themes/gymme/assets2/images/mamozzi/angelo.svg"
          width={110}
          rotate={14}
          peelBackHoverPct={22}
          peelBackActivePct={42}
          shadowIntensity={0.3}
          lightingIntensity={0.0}
          left="70%"
          top="200px"
        />
      </div>
    </section>
  );
}
