"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const slides = [
  {
    coachType: "Fitness Coaches",
    bg: "/themes/gymme/assets2/images/homepage/hero-animation/fitness-coaches-xl.webp",
  },
  {
    coachType: "Gyms & Studios",
    bg: "/themes/gymme/assets2/images/homepage/hero-animation/gym-studio-xl.webp",
  }, 
  {
    coachType: "Sport Coaches",
    bg: "/themes/gymme/assets2/images/homepage/hero-animation/sport-coaches-xl.webp",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setTextVisible(false);
      timeout = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTextVisible(true);
      }, 400);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
      className="h-[560px] md:h-[600px] lg:h-[849px]"
    >
      <p className="sr-only">gymme Coaching Platform</p>

      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.bg}
            className="absolute inset-0"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <Image
              src={slide.bg}
              alt={slide.coachType}
              fill
              priority={index === 0}
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)",
              }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingTop: "137px",
        }}
        className="px-5 pb-10 md:px-10 md:pb-12 lg:px-[80px] lg:pb-[80px]"
      >
        <div>
          <h2
            style={{
              fontFamily: '"TWK Everett", Inter, sans-serif',
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              margin: 0,
            }}
            className="text-[36px] md:text-[48px] lg:text-[64px]"
          >
            The All-In-One Platform for
          </h2>

          <div
            style={{
              height: "67px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: '"TWK Everett", Inter, sans-serif',
                fontWeight: 700,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.1,
                letterSpacing: "-2.8px",
                display: "block",
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? "translateY(0)" : "translateY(-8px)",
                transition:
                  "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
              }}
              className="text-[36px] md:text-[48px] lg:text-[64px]"
            >
              {slides[currentSlide].coachType}
            </span>
          </div>

          <h2
            style={{
              fontFamily: '"TWK Everett", Inter, sans-serif',
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              margin: 0,
            }}
            className="text-[36px] md:text-[48px] lg:text-[64px]"
          >
            To Level Up Your Business
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              marginTop: "16px",
              maxWidth: "520px",
              fontSize: "18px",
              lineHeight: 1.5,
            }}
            className="text-base md:text-[18px]"
          >
            Unlock your full potential with the #1 platform to coach, scale,
            and win.
          </p>

          <div
            className={cn(
              "flex flex-col gap-3 mt-8 items-start",
              "sm:flex-row sm:items-center sm:gap-[12px] sm:mt-[32px]"
            )}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                height: "56px",
                padding: "0 20px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                color: "white",
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
                outline: "none",
              }}
              className={cn(
                "w-full sm:w-[360px]",
                "placeholder:text-[rgba(255,255,255,0.6)]"
              )}
            />
            <button
              type="button"
              style={{
                height: "56px",
                padding: "0 28px",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                color: "#1b1b1b",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              className="w-full sm:w-auto hover:bg-white/90"
            >
              Start free trial
            </button>
          </div>

          <p
            style={{
              marginTop: "12px",
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Trusted by over 210,000 coaches
          </p>
        </div>
      </div>
    </section>
  );
}
