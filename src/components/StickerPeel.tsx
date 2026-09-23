"use client";

import { useRef, useEffect, useMemo, CSSProperties } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "./StickerPeel.css";

gsap.registerPlugin(Draggable);

type InitialPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | { x: number; y: number };

interface StickerPeelProps {
  imageSrc: string;
  rotate?: number;
  /** @deprecated kept for API compatibility — no longer used (peel effect was replaced by a lift/attach effect) */
  peelBackHoverPct?: number;
  /** @deprecated kept for API compatibility — no longer used (peel effect was replaced by a lift/attach effect) */
  peelBackActivePct?: number;
  /** @deprecated kept for API compatibility — no longer used */
  peelEasing?: string;
  /** @deprecated kept for API compatibility — no longer used */
  peelHoverEasing?: string;
  width?: number;
  /** Controls the opacity of the shadow that appears while the sticker is lifted */
  shadowIntensity?: number;
  /** @deprecated kept for API compatibility — no longer used */
  lightingIntensity?: number;
  /** How far (px) the sticker lifts off the surface on hover/touch */
  liftPx?: number;
  initialPosition?: InitialPosition;
  peelDirection?: number;
  className?: string;
  left?: string | number;
  top?: string | number;
}

const StickerPeel = ({
  imageSrc,
  rotate = 30,
  width = 200,
  shadowIntensity = 0.3,
  liftPx = 16,
  initialPosition = "center",
  peelDirection = 0,
  className = "",
  left,
  top,
}: StickerPeelProps) => {
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggableInstanceRef = useRef<Draggable | null>(null);

  const defaultPadding = 10;

  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target || initialPosition === "center") return;

    let startX = 0;
    let startY = 0;

    if (typeof initialPosition === "object") {
      startX = initialPosition.x;
      startY = initialPosition.y;
    }

    gsap.set(target, { x: startX, y: startY });
  }, [initialPosition]);

  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;
    const boundsEl = target.parentNode as HTMLElement;

    draggableInstanceRef.current = Draggable.create(target, {
      type: "x,y",
      bounds: boundsEl,
      inertia: true,
      onDrag(this: Draggable) {
        const rot = gsap.utils.clamp(-24, 24, (this as Draggable & { deltaX: number }).deltaX * 0.4);
        gsap.to(target, { rotation: rot, duration: 0.15, ease: "power1.out" });
      },
      onDragEnd() {
        gsap.to(target, { rotation: 0, duration: 0.8, ease: "power2.out" });
      },
    })[0];

    const handleResize = () => {
      if (!draggableInstanceRef.current) return;
      draggableInstanceRef.current.update();

      const currentX = gsap.getProperty(target, "x") as number;
      const currentY = gsap.getProperty(target, "y") as number;

      const boundsRect = boundsEl.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const maxX = boundsRect.width - targetRect.width;
      const maxY = boundsRect.height - targetRect.height;

      const newX = Math.max(0, Math.min(currentX, maxX));
      const newY = Math.max(0, Math.min(currentY, maxY));

      if (newX !== currentX || newY !== currentY) {
        gsap.to(target, { x: newX, y: newY, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      draggableInstanceRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onStart = () => container.classList.add("touch-active");
    const onEnd = () => container.classList.remove("touch-active");

    container.addEventListener("touchstart", onStart);
    container.addEventListener("touchend", onEnd);
    container.addEventListener("touchcancel", onEnd);

    return () => {
      container.removeEventListener("touchstart", onStart);
      container.removeEventListener("touchend", onEnd);
      container.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  const cssVars = useMemo(
    () =>
      ({
        "--sticker-rotate": `${rotate}deg`,
        "--sticker-p": `${defaultPadding}px`,
        "--sticker-width": `${width}px`,
        "--sticker-shadow-opacity": shadowIntensity,
        "--sticker-lift": `${liftPx}px`,
        "--peel-direction": `${peelDirection}deg`,
        ...(left !== undefined ? { left } : {}),
        ...(top !== undefined ? { top } : {}),
      } as CSSProperties),
    [rotate, width, shadowIntensity, liftPx, peelDirection, left, top]
  );

  return (
    <div className={`draggable ${className}`} ref={dragTargetRef} style={cssVars}>
      <div className="sticker-container" ref={containerRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          className="sticker-image"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
};

export default StickerPeel;
