"use client";

import { useLayoutEffect, useRef, useCallback, ReactNode } from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

interface TransformState {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
}

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem = ({ children, itemClassName = "" }: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  // Cache initial absolute positions — computed once, not on every scroll frame.
  // Reading getBoundingClientRect() after transforms are applied would return wrong values.
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef<number>(0);
  const lastTransformsRef = useRef(new Map<number, TransformState>());

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const cacheOffsets = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    cardsRef.current.forEach((card, i) => {
      cardOffsetsRef.current[i] = useWindowScroll
        ? card.getBoundingClientRect().top + window.scrollY
        : card.offsetTop;
    });
    const endEl = scroller.querySelector<HTMLElement>(".scroll-stack-end");
    if (endEl) {
      endOffsetRef.current = useWindowScroll
        ? endEl.getBoundingClientRect().top + window.scrollY
        : endEl.offsetTop;
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(
    (scrollTop: number, containerHeight: number) => {
      if (!cardsRef.current.length) return;

      const stackPositionPx = parsePercentage(stackPosition, containerHeight);
      const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
      const endElementTop = endOffsetRef.current;

      cardsRef.current.forEach((card, i) => {
        const cardTop = cardOffsetsRef.current[i] ?? 0;

        const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
        const triggerEnd = cardTop - scaleEndPositionPx;
        const pinStart = triggerStart;
        const pinEnd = endElementTop - containerHeight / 2;

        const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
        const targetScale = baseScale + i * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);
        const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

        let blur = 0;
        if (blurAmount) {
          let topCardIndex = 0;
          for (let j = 0; j < cardsRef.current.length; j++) {
            const jTrigger = (cardOffsetsRef.current[j] ?? 0) - stackPositionPx - itemStackDistance * j;
            if (scrollTop >= jTrigger) topCardIndex = j;
          }
          if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }

        let translateY = 0;
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
        }

        const newT: TransformState = {
          translateY: Math.round(translateY * 10) / 10,
          scale: Math.round(scale * 10000) / 10000,
          rotation: Math.round(rotation * 10) / 10,
          blur: Math.round(blur * 10) / 10,
        };

        const last = lastTransformsRef.current.get(i);
        if (
          !last ||
          Math.abs(last.translateY - newT.translateY) > 0.05 ||
          Math.abs(last.scale - newT.scale) > 0.0005 ||
          Math.abs(last.rotation - newT.rotation) > 0.05 ||
          Math.abs(last.blur - newT.blur) > 0.05
        ) {
          card.style.transform = `translate3d(0, ${newT.translateY}px, 0) scale(${newT.scale})${
            rotation ? ` rotate(${newT.rotation}deg)` : ""
          }`;
          card.style.filter = newT.blur > 0 ? `blur(${newT.blur}px)` : "";
          lastTransformsRef.current.set(i, newT);
        }

        if (i === cardsRef.current.length - 1) {
          const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
          if (inView && !stackCompletedRef.current) {
            stackCompletedRef.current = true;
            onStackComplete?.();
          } else if (!inView && stackCompletedRef.current) {
            stackCompletedRef.current = false;
          }
        }
      });
    },
    [
      stackPosition, scaleEndPosition, itemStackDistance, baseScale, itemScale,
      rotationAmount, blurAmount, onStackComplete, calculateProgress, parsePercentage,
    ]
  );

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"));
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
    });

    if (useWindowScroll) {
      // Lerp loop: decouple the card transform from the raw scroll position.
      // window.scrollY has momentum/overshoot on trackpads which causes visible
      // bounce. We lerp a "smooth scroll" value toward the native target each RAF,
      // so the transform settles cleanly without following micro-oscillations.
      const target = { current: window.scrollY };
      const smooth = { current: window.scrollY };
      const LERP = 0.12;

      const handleScroll = () => {
        target.current = window.scrollY;
      };

      const handleResize = () => {
        cacheOffsets();
      };

      const loop = () => {
        const diff = target.current - smooth.current;
        if (Math.abs(diff) > 0.05) {
          smooth.current += diff * LERP;
          updateCardTransforms(smooth.current, window.innerHeight);
        }
        animationFrameRef.current = requestAnimationFrame(loop);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });

      // Double RAF: ensures getBoundingClientRect returns settled layout values.
      animationFrameRef.current = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          cacheOffsets();
          const y = window.scrollY;
          target.current = y;
          smooth.current = y;
          updateCardTransforms(y, window.innerHeight);
          animationFrameRef.current = requestAnimationFrame(loop);
        });
      });

      return () => {
        cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        cardsRef.current = [];
        transformsCache.clear();
        stackCompletedRef.current = false;
      };
    } else {
      // Container scroll: Lenis drives smooth scrolling inside the div.
      // Use the Lenis scroll event value (smooth) not scroller.scrollTop (native).
      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector(".scroll-stack-inner") as HTMLElement,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        lerp: 0.1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      lenisRef.current = lenis;

      lenis.on("scroll", ({ scroll }: { scroll: number }) => {
        updateCardTransforms(scroll, scroller.clientHeight);
      });

      const raf = (time: number) => {
        lenisRef.current?.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      cacheOffsets();
      updateCardTransforms(0, scroller.clientHeight);

      return () => {
        cancelAnimationFrame(animationFrameRef.current);
        lenis.destroy();
        lenisRef.current = null;
        cardsRef.current = [];
        transformsCache.clear();
        stackCompletedRef.current = false;
      };
    }
  // scaleDuration is declared in props but not used in logic — intentionally omitted.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemDistance, useWindowScroll, cacheOffsets, updateCardTransforms]);

  return (
    <div
      className={`scroll-stack-scroller${useWindowScroll ? " scroll-stack-window" : ""}${className ? ` ${className}` : ""}`}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
