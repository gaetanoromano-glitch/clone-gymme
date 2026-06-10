"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Tab {
  icon: string;
  title: string;
  description: string;
  screenshot: string;
}

const tabs: Tab[] = [
  {
    icon: "/themes/gymme/assets2/images/homepage/plan-coach.svg",
    title: "Schede & Protocolli con AI",
    description:
      "Genera o crea schede e protocolli completi con un semplice prompt. L'AI produce una bozza strutturata e modificabile — il professionista approva sempre prima della pubblicazione. Assegna a uno o più clienti con un click.",
    screenshot: "/uploads/2025/08/schede.jpg",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/habit.svg",
    title: "Calendario & Sedute",
    description:
      "Pianifica sedute, invia inviti automatici via WhatsApp o email e gestisci il calendario multi-cliente con reminder proattivi.",
    screenshot: "/uploads/2025/08/engage-item.webp",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/running.svg",
    title: "CRM Clienti",
    description:
      "Tieni tutto il contesto del cliente in un unico posto: anamnesi clinica, misurazioni, storico pagamenti, progressi e documenti.",
    screenshot: "/uploads/2025/08/scale-item-1.webp",
  },
];

const N = tabs.length;
const PX_PER_ITEM = 400;

export default function PlanCoachSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef(0);
  const [activeTab, setActiveTab] = useState(0);
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sectionTopRef = useRef(0);
  const totalScrollRef = useRef(1);

  const measure = () => {
    const outer = outerRef.current;
    if (!outer) return;
    sectionTopRef.current = window.scrollY + outer.getBoundingClientRect().top;
    totalScrollRef.current = outer.offsetHeight - window.innerHeight;
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });

    let rafId = 0;

    const update = () => {
      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - sectionTopRef.current) / totalScrollRef.current)
      );
      const raw = progress * N;
      const idx = Math.min(Math.floor(raw), N - 1);

      progressBarRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const scale = i < idx ? 1 : i === idx ? raw - idx : 0;
        bar.style.transform = `scaleX(${scale})`;
      });

      if (idx !== activeTabRef.current) {
        activeTabRef.current = idx;
        setActiveTab(idx);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          rafId = requestAnimationFrame(update);
        } else {
          window.removeEventListener("scroll", onScroll);
          cancelAnimationFrame(rafId);
        }
      },
      { rootMargin: "100px 0px 100px 0px" }
    );

    const outer = outerRef.current;
    if (outer) observer.observe(outer);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* ── MOBILE ───────────────────────────────────────────────────── */}
      <div className="lg:hidden px-5 py-6 md:px-10 md:py-8">
        <div style={{ backgroundColor: "var(--surface)", borderRadius: 20, padding: "32px 24px", maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(22px, 5vw, 36px)", fontWeight: 700, fontFamily: '"Unbounded", sans-serif', color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 24 }}>
            Pianifica con Precisione, Allena con Fiducia.
          </h2>
          <div style={{ borderBottom: "1px solid var(--stroke)", marginBottom: 20 }}>
            <div style={{ display: "flex", overflowX: "auto", gap: 0 }}>
              {tabs.map((tab, index) => (
                <button key={index} onClick={() => setActiveTab(index)} type="button"
                  style={{ padding: "12px 0", marginRight: 20, gap: 8, display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", flexShrink: 0, position: "relative", marginBottom: -1 }}>
                  <Image src={tab.icon} alt="" width={20} height={20} style={{ width: 20, height: 20 }} />
                  <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "Plus Jakarta Sans, sans-serif", color: activeTab === index ? "var(--text-primary)" : "color-mix(in srgb, var(--text-primary) 40%, transparent)", whiteSpace: "nowrap", transition: "color 0.3s ease" }}>
                    {tab.title}
                  </span>
                  <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, backgroundColor: "var(--text-primary)", width: activeTab === index ? "100%" : "0%", transition: "width 0.3s ease" }} />
                </button>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 14, color: "color-mix(in srgb, var(--text-primary) 70%, transparent)", fontFamily: "Plus Jakarta Sans, sans-serif", lineHeight: 1.6, marginBottom: 16 }}>
            {tabs[activeTab].description}
          </p>
          <div style={{ position: "relative", backgroundColor: "var(--bg)", borderRadius: 10, overflow: "hidden", height: 220 }}>
            {tabs.map((tab, i) => (
              <Image key={i} src={tab.screenshot} alt={tab.title} fill style={{ objectFit: "cover", opacity: activeTab === i ? 1 : 0, transition: "opacity 0.4s ease" }} priority={i === 0} />
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: sticky scroll-driven runway ─────────────────────── */}
      <div
        ref={outerRef}
        className="hidden lg:block"
        style={{ height: `calc(100vh + ${N * PX_PER_ITEM}px)`, position: "relative" }}
      >
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", padding: "0 40px" }}>
          <div style={{ backgroundColor: "var(--surface)", borderRadius: 20, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "48px 56px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "48% 52%", gap: 48, alignItems: "start" }}>

              {/* Left */}
              <div>
                <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 700, fontFamily: '"Unbounded", sans-serif', color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 32 }}>
                  Pianifica con Precisione,<br />Allena con Fiducia.
                </h2>
                <div style={{ borderBottom: "1px solid var(--stroke)", marginBottom: 24 }}>
                  <div style={{ display: "flex", gap: 0 }}>
                    {tabs.map((tab, index) => (
                      <button key={index}
                        onClick={() => { activeTabRef.current = index; setActiveTab(index); }}
                        type="button"
                        style={{ padding: "12px 0", marginRight: 20, gap: 8, display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", flexShrink: 0, position: "relative", marginBottom: -1 }}>
                        <Image src={tab.icon} alt="" width={20} height={20} style={{ width: 20, height: 20 }} />
                        <span style={{ fontSize: 15, fontWeight: 600, fontFamily: "Plus Jakarta Sans, sans-serif", color: activeTab === index ? "var(--text-primary)" : "color-mix(in srgb, var(--text-primary) 40%, transparent)", whiteSpace: "nowrap", transition: "color 0.3s ease" }}>
                          {tab.title}
                        </span>
                        {/* scaleX progress bar — GPU composited, no layout reflow */}
                        <div
                          ref={(el) => { progressBarRefs.current[index] = el; }}
                          style={{ position: "absolute", bottom: 0, left: 0, height: 2, width: "100%", backgroundColor: "var(--text-primary)", transformOrigin: "left center", transform: "scaleX(0)" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 15, fontFamily: "Plus Jakarta Sans, sans-serif", color: "color-mix(in srgb, var(--text-primary) 70%, transparent)", lineHeight: 1.6, maxWidth: 400 }}>
                  {tabs[activeTab].description}
                </p>
              </div>

              {/* Right: crossfading screenshot */}
              <div style={{ position: "relative", backgroundColor: "var(--bg)", borderRadius: 16, overflow: "hidden", height: 460 }}>
                {tabs.map((tab, i) => (
                  <Image key={i} src={tab.screenshot} alt={tab.title} fill
                    style={{ objectFit: "cover", opacity: activeTab === i ? 1 : 0, transition: "opacity 0.4s ease" }}
                    priority={i === 0} />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
