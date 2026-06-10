"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  icon: string;
  title: string;
  description: string;
  screenshot: string;
  badge?: string;
}

interface FeatureAccordionProps {
  badgeIcon: string;
  badgeText: string;
  headingLines: string[];
  items: AccordionItem[];
}

export function FeatureAccordion({
  badgeIcon,
  badgeText,
  headingLines,
  items,
}: FeatureAccordionProps) {
  const N = items.length;
  const outerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
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

      // Update progress bars via direct DOM (no re-render on every frame)
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

      if (idx !== activeIndexRef.current) {
        activeIndexRef.current = idx;
        setActiveIndex(idx);
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
  }, [N]);

  // ── Shared accordion list (used in both layouts) ──────────────────
  const AccordionList = ({ clickable }: { clickable: boolean }) => (
    <div>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            onClick={clickable ? () => setActiveIndex(index) : undefined}
            style={{
              borderTop: "1px solid #e5e7eb",
              padding: "20px 0",
              cursor: clickable ? "pointer" : "default",
              position: "relative",
            }}
          >
            {/* Scroll progress bar — direct DOM ref, no state */}
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

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image
                src={item.icon}
                alt=""
                width={24}
                height={24}
                style={{ width: 24, height: 24, flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: 17,
                  fontWeight: isActive ? 700 : 500,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  color: isActive ? "#1b1b1b" : "rgba(27,27,27,0.45)",
                  transition: "color 0.3s ease",
                }}
              >
                {item.title}
              </span>
              {item.badge && (
                <span
                  style={{
                    backgroundColor: "#0370ff",
                    color: "#ffffff",
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 4,
                    padding: "2px 6px",
                    display: "inline-block",
                    marginLeft: 8,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(27,27,27,0.7)",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  lineHeight: 1.6,
                  paddingTop: 12,
                  paddingLeft: 36,
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>

            {/* Mobile inline screenshot */}
            <div
              className={cn(
                "lg:hidden overflow-hidden transition-all duration-300 mt-3",
                isActive ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 12,
                  overflow: "hidden",
                  height: 220,
                  position: "relative",
                }}
              >
                <Image
                  src={item.screenshot}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const CardHeader = () => (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <Image src={badgeIcon} alt="" width={24} height={24} style={{ width: 24, height: 24 }} />
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "Plus Jakarta Sans, sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#1b1b1b",
          }}
        >
          {badgeText}
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
        {headingLines.map((line, i) => (
          <span key={i} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </h2>
    </>
  );

  return (
    <>
      {/* ── MOBILE: click-driven accordion ── */}
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
          <CardHeader />
          <AccordionList clickable />
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
            <div className="grid grid-cols-[48%_52%] gap-12 items-start">
              {/* Left: accordion */}
              <div>
                <CardHeader />
                <AccordionList clickable={false} />
              </div>

              {/* Right: crossfading screenshot */}
              <div>
                <div
                  style={{
                    position: "relative",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 16,
                    overflow: "hidden",
                    height: 460,
                  }}
                >
                  {items.map((item, i) => (
                    <Image
                      key={i}
                      src={item.screenshot}
                      alt={item.title}
                      fill
                      style={{
                        objectFit: "cover",
                        opacity: i === activeIndex ? 1 : 0,
                        transition: "opacity 0.4s ease",
                      }}
                      priority={i === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
