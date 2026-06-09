"use client";

import { useRef, useEffect, useMemo, useId, CSSProperties } from "react";
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
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  peelEasing?: string;
  peelHoverEasing?: string;
  width?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  initialPosition?: InitialPosition;
  peelDirection?: number;
  className?: string;
  left?: string | number;
  top?: string | number;
}

const StickerPeel = ({
  imageSrc,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = "power3.out",
  peelHoverEasing = "power2.out",
  width = 200,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  initialPosition = "center",
  peelDirection = 0,
  className = "",
  left,
  top,
}: StickerPeelProps) => {
  const uid = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const pointLightRef = useRef<SVGFEPointLightElement>(null);
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);
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
    const updateLight = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.set(pointLightRef.current, { attr: { x, y } });

      const normalizedAngle = Math.abs(peelDirection % 360);
      if (normalizedAngle !== 180) {
        gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });
      } else {
        gsap.set(pointLightFlippedRef.current, { attr: { x: -1000, y: -1000 } });
      }
    };

    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", updateLight);
    return () => container.removeEventListener("mousemove", updateLight);
  }, [peelDirection]);

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
        "--sticker-peelback-hover": `${peelBackHoverPct}%`,
        "--sticker-peelback-active": `${peelBackActivePct}%`,
        "--sticker-peel-easing": peelEasing,
        "--sticker-peel-hover-easing": peelHoverEasing,
        "--sticker-width": `${width}px`,
        "--sticker-shadow-opacity": shadowIntensity,
        "--sticker-lighting-constant": lightingIntensity,
        "--peel-direction": `${peelDirection}deg`,
        ...(left !== undefined ? { left } : {}),
        ...(top !== undefined ? { top } : {}),
      } as CSSProperties),
    [rotate, peelBackHoverPct, peelBackActivePct, peelEasing, peelHoverEasing, width, shadowIntensity, lightingIntensity, peelDirection]
  );

  return (
    <div className={`draggable ${className}`} ref={dragTargetRef} style={cssVars}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id={`pointLight-${uid}`}>
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting result="spec" in="blur" specularExponent={100} specularConstant={lightingIntensity} lightingColor="white">
              <fePointLight ref={pointLightRef} x={100} y={100} z={300} />
            </feSpecularLighting>
            <feBlend in="SourceGraphic" in2="spec" mode="screen" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={`pointLightFlipped-${uid}`}>
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting result="spec" in="blur" specularExponent={100} specularConstant={lightingIntensity * 7} lightingColor="white">
              <fePointLight ref={pointLightFlippedRef} x={100} y={100} z={300} />
            </feSpecularLighting>
            <feBlend in="SourceGraphic" in2="spec" mode="screen" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={`dropShadow-${uid}`}>
            <feDropShadow dx={2} dy={4} stdDeviation={3 * shadowIntensity} floodColor="black" floodOpacity={shadowIntensity} />
          </filter>

          <filter id={`expandAndFill-${uid}`}>
            <feOffset dx={0} dy={0} in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div className="sticker-container" ref={containerRef} style={{
        "--filter-point-light": `url(#pointLight-${uid})`,
        "--filter-point-light-flipped": `url(#pointLightFlipped-${uid})`,
        "--filter-drop-shadow": `url(#dropShadow-${uid})`,
        "--filter-expand-fill": `url(#expandAndFill-${uid})`,
      } as CSSProperties}>
        <div className="sticker-main">
          <div className="sticker-lighting">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt="" className="sticker-image" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          </div>
        </div>

        <div className="flap">
          <div className="flap-lighting">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt="" className="flap-image" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerPeel;
