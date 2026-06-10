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

// px of scroll runway per item — keeps page height reasonable
const PX_PER_ITEM = 400;

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

  // Cached absolute position — recomputed only on mount + resize
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

      // scaleX — GPU layer, zero layout reflow
      progressBarRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const scale = i < idx ? 1 : i === idx ? raw - idx : 0;
        bar.style.transform = `scaleX(${scale})`;
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
  }, [N]);

  return (
    <>
      {/* ── MOBILE: click-driven, natural height ─────────────────────── */}
      <div className="lg:hidden px-5 py-6 md:px-10 md:py-8">
        <div style={{ backgroundColor: "#fff", borderRadius: 20, padding: "32px 24px", maxWidth: 1280, margin: "0 auto" }}>

          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={index} onClick={() => setActiveIndex(index)} style={{ borderBottom: "1px solid #e5e7eb", padding: "18px 0", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Image src={item.icon} alt="" width={22} height={22} style={{ width: 22, height: 22, flexShrink: 0 }} />
                  <span style={{ fontSize: 16, fontWeight: isActive ? 700 : 500, fontFamily: "Plus Jakarta Sans, sans-serif", color: isActive ? "#1b1b1b" : "rgba(27,27,27,0.45)", transition: "color 0.3s" }}>
                    {item.title}
                  </span>
                  {item.badge && <span style={{ backgroundColor: "#0370ff", color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 4, padding: "2px 6px", marginLeft: 8 }}>{item.badge}</span>}
                </div>
                <div className={cn("overflow-hidden transition-all duration-300", isActive ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0")}>
                  {/* Text box */}
                  <p style={{ fontSize: 14, color: "rgba(27,27,27,0.7)", fontFamily: "Plus Jakarta Sans, sans-serif", lineHeight: 1.6, paddingTop: 10, paddingLeft: 34, margin: 0 }}>
                    {item.description}
                  </p>
                  {/* Image box — separate, fixed height, image centered & cover */}
                  <div style={{ backgroundColor: "#f5f5f5", borderRadius: 10, overflow: "hidden", position: "relative", marginTop: 12, height: 300 }}>
                    <Image src={item.screenshot} alt={item.title} fill style={{ objectFit: "cover", objectPosition: "center" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── DESKTOP: sticky scroll-driven runway ─────────────────────── */}
      {/*
        Height = 100vh (for initial sticky entry) + N * PX_PER_ITEM (scroll runway).
        Much shorter than N * 100vh — avoids the enormous page height that caused lag.
      */}
      <div
        ref={outerRef}
        className="hidden lg:block"
        style={{ height: `calc(100vh + ${N * PX_PER_ITEM}px)`, position: "relative" }}
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
          <div style={{ backgroundColor: "#fff", borderRadius: 20, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "48px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 48fr) minmax(0, 52fr)", gap: 48, alignItems: "start" }}>

              {/* Left */}
              <div>
                {items.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div key={index} style={{ borderBottom: "1px solid #e5e7eb", padding: "20px 0", position: "relative", overflow: "hidden" }}>
                      {/* Progress bar: scaleX transform — zero layout reflow, GPU-composited */}
                      <div
                        ref={(el) => { progressBarRefs.current[index] = el; }}
                        style={{
                          position: "absolute",
                          bottom: 0, left: 0,
                          height: 2, width: "100%",
                          backgroundColor: "#1b1b1b",
                          transformOrigin: "left center",
                          transform: "scaleX(0)",
                        }}
                      />
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Image src={item.icon} alt="" width={24} height={24} style={{ width: 24, height: 24, flexShrink: 0 }} />
                        <span style={{ fontSize: 17, fontWeight: isActive ? 700 : 500, fontFamily: "Plus Jakarta Sans, sans-serif", color: isActive ? "#1b1b1b" : "rgba(27,27,27,0.45)", transition: "color 0.3s ease" }}>
                          {item.title}
                        </span>
                        {item.badge && <span style={{ backgroundColor: "#0370ff", color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 4, padding: "2px 6px", marginLeft: 8 }}>{item.badge}</span>}
                      </div>
                      <div
                        style={{
                          overflow: "hidden",
                          height: isActive ? 80 : 0,
                          opacity: isActive ? 1 : 0,
                          transition: "height 0.3s ease, opacity 0.3s ease",
                        }}
                      >
                        <p style={{ fontSize: 15, color: "rgba(27,27,27,0.7)", fontFamily: "Plus Jakarta Sans, sans-serif", lineHeight: 1.6, paddingTop: 12, paddingLeft: 36, margin: 0 }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: crossfading screenshot */}
              <div style={{ position: "relative", backgroundColor: "#f5f5f5", borderRadius: 16, overflow: "hidden", height: '100%' }}>
                {items.map((item, i) => (
                  <Image
                    key={i}
                    src={item.screenshot}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover", opacity: i === activeIndex ? 1 : 0, transition: "opacity 0.4s ease" }}
                    priority={i === 0}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
