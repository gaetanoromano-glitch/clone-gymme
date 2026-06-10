"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

interface Feature {
  num: number;
  badge?: string;
  title: string;
  description: string;
  icon: string;
  screenshot: string;
  accent: string;
}

const features: Feature[] = [
  {
    num: 1,
    badge: "INNOVAZIONE GYMME",
    title: "Multi-Professionale",
    description:
      "PT, Nutrizionista e Osteopata collaborano sullo stesso cliente con autonomia professionale preservata e contesto condiviso. Nessun competitor single-role lo abilita.",
    icon: "/themes/gymme/assets2/images/homepage/industry/AI.svg",
    screenshot: "/videos/Multi_pro.mp4",
    accent: "#e8f0ff",
  },
  {
    num: 2,
    badge: "POTENZIATO DALL'AI",
    title: "AI Builder",
    description:
      "Meno compiti meccanici, più valore umano. Genera schede e protocolli solidi in pochi istanti con l'AI. Dedica il tuo tempo a ciò che conta: il rapporto con il cliente.",
    icon: "/themes/gymme/assets2/images/homepage/industry/nutrition.svg",
      screenshot: "/videos/AI_Builder.mp4",
    accent: "#e8f7ee",
  },
  {
    num: 3,
    title: "Client Risk Radar",
    description:
      "Non farti sorprendere dai clienti che spariscono. Intervieni subito sui segnali di crisi e salva il tuo fatturato mensile.",
    icon: "/themes/gymme/assets2/images/homepage/industry/habit.svg",
      screenshot: "/videos/Client_Risk_Radar.mp4",
    accent: "#fff3e8",
  },
  {
    num: 4,
    title: "Business Dashboard",
    description:
      "Smetti di indovinare: analizza rinnovi e margini con dati certi. Trasforma la tua attività in una macchina prevedibile che cresce insieme a te.",
    icon: "/themes/gymme/assets2/images/homepage/industry/sport.svg",
      screenshot: "/videos/Business_Dashboard.mp4",
    accent: "#f3eeff",
  },
];

const N = features.length;
const ENTRY_FRACTION = 0.5;

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
          borderRadius: "40px",
            padding:'16px'
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

// Shared section header
function SectionHeader() {
  return (
    <div>
      <h2
        style={{
          fontSize: "clamp(26px, 4.5vw, 56px)",
          fontWeight: 700,
          fontFamily: '"Unbounded", sans-serif',
          color: "#1b1b1b",
          lineHeight: 1.1,
          letterSpacing: "-1.5px",
        }}
      >
        I{" "}
        <span style={{ fontStyle: "italic", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
          4 Pillar
        </span>{" "}
        che nessun competitor
      </h2>
      <h2
        style={{
          fontSize: "clamp(26px, 4.5vw, 56px)",
          fontWeight: 700,
          fontFamily: '"Unbounded", sans-serif',
          color: "#1b1b1b",
          lineHeight: 1.1,
          letterSpacing: "-1.5px",
        }}
      >
        offre insieme nel mercato italiano
      </h2>
    </div>
  );
}

export function IndustrySolutionSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    let rafId = 0;

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const totalScroll = outer.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        if (i === 0) {
          card.style.transform = "translateY(0)";
          return;
        }
        const entryStart = i / N;
        const entryEnd = entryStart + (1 / N) * ENTRY_FRACTION;
        const t = Math.max(0, Math.min(1, (progress - entryStart) / (entryEnd - entryStart)));
        card.style.transform = `translateY(${(1 - t) * 100}vh)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const initId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(initId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="soluzioni"
      className="w-full relative z-[2]"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "24px 24px 0 0",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.10)",
      }}
    >

      {/* ── MOBILE: simple vertical card list (hidden on lg+) ── */}
      <div className="lg:hidden px-5 pt-10 pb-6 md:px-10 md:pt-16">
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader />
          <div className="flex flex-col gap-6 mt-8">
            {features.map((f) => (
              <div
                key={f.num}
                style={{
                  backgroundColor: f.accent,
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                {/* Screenshot / Video */}
                <div style={{ position: "relative", height: "200px", width: "100%", overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
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
            <SectionHeader />
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
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "480px" }}>
              {features.map((f, i) => (
                <div
                  key={f.num}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    padding: "0 80px",
                    zIndex: i + 1,
                    transform: i === 0 ? "translateY(0)" : "translateY(100vh)",
                    willChange: "transform",
                  }}
                >
                  <div className="max-w-[1280px] mx-auto" style={{ height: "100%" }}>
                    <div
                      style={{
                        backgroundColor: f.accent,
                        borderRadius: "20px",
                        height: "100%",
                        display: "flex",
                        overflow: "hidden",
                      }}
                    >
                      {/* Left: text */}
                      <div
                        style={{
                          flex: "0 0 45%",
                          padding: "48px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: "20px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          {f.badge && (
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                backgroundColor: "#0370ff",
                                color: "#ffffff",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                padding: "4px 10px",
                                borderRadius: "999px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <Image src="/themes/gymme/assets2/images/icons/ai-badge-sm.png" alt="AI" width={14} height={14} />
                              {f.badge}
                            </span>
                          )}
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
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
                        </div>

                        <p
                          style={{
                            fontSize: "15px",
                            color: "rgba(27,27,27,0.65)",
                            lineHeight: 1.65,
                            margin: 0,
                            maxWidth: "360px",
                          }}
                        >
                          {f.description}
                        </p>
                      </div>

                      {/* Right: screenshot / video */}
                      <div style={{ flex: "0 0 55%", position: "relative", overflow: "hidden", borderRadius: "0 20px 20px 0", display:'flex', justifyContent:'right' }}>
                        <MediaDisplay
                          src={f.screenshot}
                          alt={`${f.title} screenshot`}
                          style={{ objectFit: "cover", objectPosition: "top left" }}
                        />
                      </div>
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
