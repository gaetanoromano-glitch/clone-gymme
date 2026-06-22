"use client";

import { useEffect } from "react";
import { useClarity } from "@/hooks/useClarity";

const MILESTONES = [25, 50, 75, 100];

export function ScrollMilestones() {
  const { trackEvent } = useClarity();

  useEffect(() => {
    const reached = new Set<number>();

    const check = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = (scrolled / total) * 100;

      for (const milestone of MILESTONES) {
        if (!reached.has(milestone) && pct >= milestone) {
          reached.add(milestone);
          trackEvent(`scroll_${milestone}`);
        }
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [trackEvent]);

  return null;
}
