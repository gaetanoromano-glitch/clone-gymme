"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PillNav.css";
import { AnimatedButton } from "./AnimatedButton";

interface Props {
  bannerVisible: boolean;
}

const NAV_LINKS = [
  { label: "Soluzioni", href: "#soluzioni" },
  { label: "Ecosistema", href: "#ecosistema" },
  { label: "Funzionalità", href: "#funzionalita" },
  { label: "Risultati", href: "#risultati" },
];

const EASE = "power3.out";

export default function Navbar({ bannerVisible }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);

  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);

  /* ── GSAP circle layout + initial animation ───────────────────── */
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const { width: w, height: h } = pill.getBoundingClientRect();
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const hoverLabel = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: EASE, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease: EASE, overwrite: "auto" }, 0);
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease: EASE, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready?.then(layout).catch(() => {});

    // Hide mobile menu initially
    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0 });
    }

    return () => window.removeEventListener("resize", layout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Pill hover handlers ──────────────────────────────────────── */
  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto",
    }) as unknown as gsap.core.Tween;
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.45,
      ease: "power2.inOut",
      overwrite: "auto",
    }) as unknown as gsap.core.Tween;
  };

  /* ── Logo spin ────────────────────────────────────────────────── */


  /* ── Mobile menu toggle ───────────────────────────────────────── */
  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll<HTMLElement>(".hamburger-line");
      if (next) {
        gsap.to(lines[0], { rotation: 45, y: 4, duration: 0.3, ease: EASE });
        gsap.to(lines[1], { rotation: -45, y: -4, duration: 0.3, ease: EASE });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: EASE });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: EASE });
      }
    }

    if (menu) {
      if (next) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: EASE }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: EASE,
          onComplete: () => gsap.set(menu, { visibility: "hidden" }),
        });
      }
    }
  };

  /* ── CSS variables (always light/scrolled style) ─────────────── */
  const cssVars = {
    ["--pill-bg" as string]: "rgba(255,255,255,0.96)",
    ["--pill-border" as string]: "1px solid rgba(0,0,0,0.08)",
    ["--pill-shadow" as string]: "0 4px 32px rgba(0,0,0,0.12)",
    ["--base" as string]: "#1b1b1b",
    ["--pill-text" as string]: "#1b1b1b",
    ["--hover-text" as string]: "#ffffff",
  };

  const topOffset = bannerVisible ? 66 : 16;

  return (
    <div className="pill-nav-container" style={{ top: topOffset }}>
      <nav className="pill-nav" aria-label="Primary" style={cssVars}>

        {/* Logo */}
        <a
          className="pill-logo"
          href="/"
          aria-label="gymme home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/themes/gymme/assets2/images/logo-all-black.svg"
            alt="gymme"
            style={{ height: "26px", width: "auto", display: "block" }}
          />
        </a>

        {/* Desktop nav items */}
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {NAV_LINKS.map((item, i) => (
              <li key={item.href} role="none">
                <a
                  role="menuitem"
                  href={item.href}
                  className="pill"
                  aria-label={item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(el) => { circleRefs.current[i] = el; }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA — desktop */}
        <AnimatedButton
          href="#demo"
          className="desktop-only"
          style={{ padding: "9px 18px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.01em", marginLeft: "4px" }}
        >
          Richiedi una demo
        </AnimatedButton>

        {/* Hamburger — mobile */}
        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className="mobile-menu-popover mobile-only"
        ref={mobileMenuRef}
        style={cssVars}
      >
        <ul className="mobile-menu-list">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="mobile-menu-link"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const menu = mobileMenuRef.current;
                  const hamburger = hamburgerRef.current;
                  if (menu) gsap.set(menu, { visibility: "hidden", opacity: 0 });
                  if (hamburger) {
                    const lines = hamburger.querySelectorAll<HTMLElement>(".hamburger-line");
                    gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.2 });
                    gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.2 });
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#demo"
              className="mobile-menu-link mobile-cta"
              onClick={() => {
                setIsMobileMenuOpen(false);
                const menu = mobileMenuRef.current;
                if (menu) gsap.set(menu, { visibility: "hidden", opacity: 0 });
              }}
            >
              Richiedi una demo
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
