"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

import type { PillarContent } from "@/content/types";

const DEFAULT_HEADING_LINES = [
  "I 4 Pillar che nessun competitor",
  "offre insieme nel mercato italiano.",
];

const DEFAULT_PILLARS: PillarContent[] = [
  {
    num: 1,
    badge: "INNOVAZIONE GYMME",
    title: "Multi-Professionale",
    description:
      "PT, Nutrizionista e Osteopata collaborano sullo stesso cliente con autonomia professionale preservata e contesto condiviso. Nessun competitor single-role lo abilita.",
    icon: "/themes/gymme/assets2/images/homepage/industry/AI.svg",
    screenshot: "/videos/Multi_pro.mp4",
    accent: "#F2B6FF",
  },
  {
    num: 2,
    badge: "POTENZIATO DALL'AI",
    title: "AI Builder",
    description:
      "Meno compiti meccanici, più valore umano. Genera schede e protocolli solidi in pochi istanti con l'AI. Dedica il tuo tempo a ciò che conta: il rapporto con il cliente.",
    icon: "/themes/gymme/assets2/images/homepage/industry/nutrition.svg",
    screenshot: "/videos/AI_Builder.mp4",
    accent: "#8CDEC0",
  },
  {
    num: 3,
    title: "Client Risk Radar",
    description:
      "Non farti sorprendere dai clienti che spariscono. Intervieni subito sui segnali di crisi e salva il tuo fatturato mensile.",
    icon: "/themes/gymme/assets2/images/homepage/industry/habit.svg",
    screenshot: "/videos/Client_Risk_Radar.mp4",
    accent: "#FFC86B",
  },
  {
    num: 4,
    title: "Business Dashboard",
    description:
      "Smetti di indovinare: analizza rinnovi e margini con dati certi. Trasforma la tua attività in una macchina prevedibile che cresce insieme a te.",
    icon: "/themes/gymme/assets2/images/homepage/industry/sport.svg",
    screenshot: "/videos/Business_Dashboard.mp4",
    accent: "#AECBFF",
  },
];

// Card width as a % of the 1280px box. The leftover width is the span the fan
// opens across: the first card hugs the left edge, the last hugs the right.
const CARD_WIDTH_PCT = 60;
// Vertical step between consecutive cards — gives the diagonal fan look
// (first card lowest, last card highest).
const STEP_Y = 40;

function isVideo(src: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

function MediaDisplay({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  style?: React.CSSProperties;
}) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{
          inset: 0,
          height: "100%",
          // contain: no cropping — full video always visible.
          // transparent: letterbox areas show the card's accent colour below.
          // borderRadius: inherit avoids relying on ancestor overflow:hidden clipping
          // which breaks under willChange:transform compositing layers (Safari).
          objectFit: "contain",
          objectPosition: "top center",
          background: "transparent",
          display: "block",
          borderRadius: "32px",
          padding: "4px",
        }}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      style={style}
    />
  );
}

function SectionHeader({ headingLines }: { headingLines: string[] }) {
  return (
    <div>
      {headingLines.map((line, i) => (
        <h2
          key={i}
          style={{
            fontSize: "clamp(26px, 4.5vw, 56px)",
            fontWeight: 700,
            fontFamily: '"Unbounded", sans-serif',
            color: "#1b1b1b",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
          }}
        >
          {line}
        </h2>
      ))}
    </div>
  );
}

interface IndustrySolutionSectionProps {
  headingLines?: string[];
  pillars?: PillarContent[];
}

export function IndustrySolutionSection({
  headingLines = DEFAULT_HEADING_LINES,
  pillars = DEFAULT_PILLARS,
}: IndustrySolutionSectionProps) {
  const N = pillars.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;

    let rafId = 0;
    let stageW = stage.offsetWidth;
    const measure = () => { stageW = stage.offsetWidth; };

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const totalScroll = outer.offsetHeight - window.innerHeight;
      const progress = clamp01(-rect.top / totalScroll);

      const cardW = (stageW * CARD_WIDTH_PCT) / 100;
      const stepX = (stageW - cardW) / (N - 1); // horizontal fan step
      const centerLeft = (stageW - cardW) / 2; // resting spot before the fan opens
      const centerTop = ((N - 1) * STEP_Y) / 2;
      // Fan openness: 0 = all cards stacked in the centre, 1 = fully fanned out.
      const open = easeInOut(progress);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        // Each card slides in from the right across its own scroll segment.
        const enter = easeOut(clamp01((progress - i / N) * N));
        const slotLeft = i * stepX; // final fan slot (i=0 left edge … last right edge)
        const slotTop = (N - 1 - i) * STEP_Y; // first card lowest, last highest

        const restX = centerLeft + (slotLeft - centerLeft) * open;
        const restY = centerTop + (slotTop - centerTop) * open;
        // First card starts already centred (no off-screen parking);
        // the rest stay fully off to the right until their segment enters.
        const parkDist = (i === 0 ? 0 : 1) * stageW;
        const x = restX + (1 - enter) * parkDist;

        card.style.transform = `translate(${x}px, ${restY}px)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const initId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(initId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      id="soluzioni"
      className="w-full relative z-[2]"
      style={{
        backgroundColor: "#ffffff",
      }}
    >

      {/* ── MOBILE: simple vertical card list (hidden on lg+) ── */}
      <div className="lg:hidden px-5 pt-10 pb-6 md:px-10 md:pt-16">
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader headingLines={headingLines} />
          <div className="flex flex-col gap-6 mt-8">
            {pillars.map((f) => (
              <div
                key={f.num}
                style={{
                  backgroundColor: f.accent,
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                {/* Screenshot / Video */}
                <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
                  <MediaDisplay
                    src={f.screenshot}
                    alt={f.title}
                    style={{ objectFit: "cover", objectPosition: "top left" }}
                  />
                </div>
                {/* Text */}
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                     {f.badge && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          backgroundColor: "#0370ff",
                          color: "#fff",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          padding: "3px 8px",
                          borderRadius: "999px",
                        }}
                      >
                        {f.badge}
                      </span>
                    )}
                    <span
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(27,27,27,0.10)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#1b1b1b",
                        flexShrink: 0,
                        marginLeft: "auto",
                      }}
                    >
                      {f.num}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      fontFamily: '"Unbounded", sans-serif',
                      color: "#1b1b1b",
                      letterSpacing: "-0.5px",
                      lineHeight: 1.2,
                      marginBottom: "8px",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(27,27,27,0.65)", lineHeight: 1.6, margin: 0 }}>
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: sticky animated card stack (hidden below lg) ── */}
      <div className="hidden lg:block">
        {/* Header */}
        <div style={{ padding: "60px 60px 0" }}>
          <div className="max-w-[1280px] mx-auto">
            <SectionHeader headingLines={headingLines} />
          </div>
        </div>

        {/* Scroll runway */}
        <div ref={outerRef} style={{ height: `${N * 120}vh` }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              backgroundColor: "#ffffff",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              padding: "0 40px",
            }}
          >
            <div ref={stageRef} style={{ position: "relative", width: "100%", maxWidth: "1280px", margin: "0 auto", height: "min(82vh, 720px)" }}>
              {pillars.map((f, i) => (
                <div
                  key={f.num}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: `calc(100% - ${(N - 1) * STEP_Y}px)`,
                    width: `${CARD_WIDTH_PCT}%`,
                    zIndex: i + 1,
                    transform: "translateX(120%)",
                    willChange: "transform",
                  }}
                >
                    <div
                      style={{
                        backgroundColor: f.accent,
                        borderRadius: "20px",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        padding: "32px",
                        gap: "20px",
                        boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
                      }}
                    >
                      {/* Top: screenshot / video */}
                      <div style={{ flex: "1 1 auto", minHeight: 0, position: "relative", overflow: "hidden", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <MediaDisplay
                          src={f.screenshot}
                          alt={`${f.title} screenshot`}
                          style={{ objectFit: "cover", objectPosition: "top center" }}
                        />
                      </div>

                      {/* Bottom: text */}
                      <div
                        style={{
                          flex: "0 0 auto",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          maxWidth: "760px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(27,27,27,0.10)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "13px",
                              fontWeight: 700,
                              color: "#1b1b1b",
                              flexShrink: 0,
                            }}
                          >
                            {f.num}
                          </div>
                          <h3
                            style={{
                              fontSize: "28px",
                              fontWeight: 700,
                              fontFamily: '"Unbounded", sans-serif',
                              color: "#1b1b1b",
                              letterSpacing: "-0.8px",
                              lineHeight: 1.15,
                              margin: 0,
                            }}
                          >
                            {f.title}
                          </h3>
                          {f.badge && (
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                backgroundColor: "#7C5CFF",
                                color: "#ffffff",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                padding: "4px 10px",
                                borderRadius: "999px",
                                whiteSpace: "nowrap",
                                marginLeft: "auto",
                              }}
                            >
                              {f.badge}
                            </span>
                          )}
                        </div>

                        <p
                          style={{
                            fontSize: "15px",
                            color: "rgba(27,27,27,0.65)",
                            lineHeight: 1.65,
                            margin: 0,
                          }}
                        >
                          {f.description}
                        </p>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
