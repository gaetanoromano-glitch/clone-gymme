"use client";

import { useRef, useEffect, ReactNode, CSSProperties } from "react";
import { gsap } from "gsap";

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  style?: CSSProperties;
}

export function AnimatedButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  style,
}: AnimatedButtonProps) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const hoverLabelRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const label = labelRef.current;
    const hoverLabel = hoverLabelRef.current;
    if (!label || !hoverLabel) return;

    const h = label.getBoundingClientRect().height;
    gsap.set(label, { y: 0 });
    gsap.set(hoverLabel, { y: h + 10, opacity: 0 });

    tlRef.current = gsap
      .timeline({ paused: true })
      .to(label, { y: -(h + 8), duration: 2, ease: "power2.out" }, 0)
      .to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease: "power2.out" }, 0);

    return () => { tlRef.current?.kill(); };
  }, []);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tweenRef.current?.kill();
    tweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto",
    }) as unknown as gsap.core.Tween;
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tweenRef.current?.kill();
    tweenRef.current = tl.tweenTo(0, {
      duration: 0.45,
      ease: "power2.inOut",
      overwrite: "auto",
    }) as unknown as gsap.core.Tween;
  };

  const baseStyle: CSSProperties = {
    borderRadius: "999px",
    backgroundColor: "#1b1b1b",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    fontWeight: 700,
    whiteSpace: "nowrap",
    userSelect: "none",
    ...style,
    // non-overridable: required for text clip animation
    position: "relative",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const inner = (
    <span style={{ position: "relative", display: "block" }}>
      <span ref={labelRef} style={{ display: "block" }}>{children}</span>
      <span ref={hoverLabelRef} style={{ position: "absolute", left: 0, top: 0, display: "block" }}>
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={baseStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      style={baseStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {inner}
    </button>
  );
}
