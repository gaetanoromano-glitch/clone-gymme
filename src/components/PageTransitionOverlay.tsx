"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const onStart = (e: Event) => {
      const href = (e as CustomEvent<{ href: string }>).detail.href;
      gsap.killTweensOf(overlay);
      gsap.set(overlay, { pointerEvents: "all" });
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => router.push(href),
        }
      );
    };

    const onEnd = () => {
      gsap.killTweensOf(overlay);
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => gsap.set(overlay, { pointerEvents: "none" }),
      });
    };

    window.addEventListener("page-transition-start", onStart);
    window.addEventListener("page-transition-end", onEnd);
    return () => {
      window.removeEventListener("page-transition-start", onStart);
      window.removeEventListener("page-transition-end", onEnd);
    };
  }, [router]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#fafafa",
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
