"use client";

import { useRef, useEffect, useCallback, ReactNode } from "react";

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children?: ReactNode;
}

const ClickSpark = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}: ClickSparkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationIdRef = useRef<number>(0);
  // true while the draw loop is active. Lets us start it on demand and
  // stop it the moment there are no sparks left to animate.
  const runningRef = useRef(false);

  const easeFunc = useCallback(
    (t: number): number => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        case "ease-out":
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  // ── Canvas sized to the VIEWPORT only (position: fixed), not the whole
  //    page. Page height no longer affects canvas cost. ────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationIdRef.current);
      runningRef.current = false;
    };
  }, []);

  // ── Draw loop: ONLY runs while sparks exist. Stops itself when empty,
  //    so the page isn't repainting a full-screen canvas 60fps at idle. ─
  const startLoop = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      if (sparksRef.current.length > 0) {
        animationIdRef.current = requestAnimationFrame(draw);
      } else {
        // Nothing left to draw — clear once and idle (no more frames).
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        runningRef.current = false;
      }
    };

    animationIdRef.current = requestAnimationFrame(draw);
  }, [duration, easeFunc, sparkRadius, extraScale, sparkSize, sparkColor]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Canvas is fixed at (0,0), so viewport coords map directly.
    const x = e.clientX;
    const y = e.clientY;

    const now = performance.now();
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);
    startLoop();
  };

  return (
    <div style={{ position: "relative", width: "100%" }} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
