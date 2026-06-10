"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

export default function PlanCoachSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef(0);
  const [activeTab, setActiveTab] = useState(0);
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    let rafId = 0;

    const update = () => {
      if (window.innerWidth < 1024) return;
      const rect = outer.getBoundingClientRect();
      const totalScroll = outer.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      const raw = progress * N;
      const idx = Math.min(Math.floor(raw), N - 1);

      progressBarRefs.current.forEach((bar, i) => {
        if (!bar) return;
        if (i < idx) {
          bar.style.width = "100%";
        } else if (i === idx) {
          bar.style.width = `${(raw - idx) * 100}%`;
        } else {
          bar.style.width = "0%";
        }
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

    window.addEventListener("scroll", onScroll, { passive: true });
    const initId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(initId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const CardContent = ({ clickable }: { clickable: boolean }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left */}
      <div className="flex flex-col">
        <div className="flex items-center" style={{ marginBottom: 20, gap: 8 }}>
          <Image
            src="/themes/gymme/assets2/images/homepage/plan-coach.svg"
            alt="Plan & Coach icon"
            width={24}
            height={24}
            style={{ width: 24, height: 24 }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "Plus Jakarta Sans, sans-serif",
              letterSpacing: "0.08em",
              color: "#1b1b1b",
              textTransform: "uppercase",
            }}
          >
            PIANIFICA &amp; GESTISCI
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(24px, 3.5vw, 44px)",
            fontWeight: 700,
            fontFamily: '"Unbounded", sans-serif',
            color: "#1b1b1b",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            marginBottom: 32,
          }}
        >
          Pianifica con Precisione, Allena con Fiducia.
        </h2>

        {/* Tab bar */}
        <div style={{ borderBottom: "1px solid #e5e7eb", marginBottom: 24, position: "relative" }}>
          <div className="flex overflow-x-auto" style={{ gap: 0 }}>
            {tabs.map((tab, index) => (
              <button
                key={tab.title}
                onClick={clickable ? () => setActiveTab(index) : undefined}
                className={cn("flex shrink-0 items-center border-none bg-transparent", clickable ? "cursor-pointer" : "cursor-default")}
                style={{
                  padding: "12px 0",
                  marginRight: 20,
                  gap: 8,
                  position: "relative",
                  marginBottom: -1,
                }}
                type="button"
              >
                <Image src={tab.icon} alt={tab.title} width={20} height={20} style={{ width: 20, height: 20 }} />
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    color: activeTab === index ? "#1b1b1b" : "rgba(27,27,27,0.4)",
                    transition: "color 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.title}
                </span>
                {/* Per-tab progress bar */}
                <div
                  ref={(el) => { progressBarRefs.current[index] = el; }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: 2,
                    backgroundColor: "#1b1b1b",
                    width: "0%",
                    transition: "width 0.12s linear",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <p
          style={{
            fontSize: 15,
            fontFamily: "Plus Jakarta Sans, sans-serif",
            color: "rgba(27,27,27,0.7)",
            lineHeight: 1.6,
            maxWidth: 400,
          }}
        >
          {tabs[activeTab].description}
        </p>
      </div>

      {/* Right: crossfading screenshot */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 12,
          backgroundColor: "#f5f5f5",
          minHeight: 300,
        }}
      >
        {tabs.map((tab, index) => (
          <Image
            key={tab.title}
            src={tab.screenshot}
            alt={tab.title}
            fill
            style={{
              objectFit: "cover",
              opacity: activeTab === index ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
            priority={index === 0}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* ── MOBILE: click-driven ── */}
      <div className="lg:hidden px-5 py-6 md:px-10 md:py-8">
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 20,
            padding: "32px 24px",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <CardContent clickable />
        </div>
      </div>

      {/* ── DESKTOP: scroll-driven sticky ── */}
      <div
        ref={outerRef}
        className="hidden lg:block"
        style={{ height: `${N * 100}vh`, position: "relative" }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "0 40px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 20,
              width: "100%",
              maxWidth: 1280,
              margin: "0 auto",
              padding: "48px 56px",
            }}
          >
            <CardContent clickable={false} />
          </div>
        </div>
      </div>
    </>
  );
}
