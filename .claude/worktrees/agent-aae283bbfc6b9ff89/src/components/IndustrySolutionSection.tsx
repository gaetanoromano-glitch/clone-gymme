"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Feature {
  num: number;
  badge?: string;
  title: string;
  description: string;
  icon: string;
  screenshot: string;
}

const features: Feature[] = [
  {
    num: 1,
    badge: "AI POWERED",
    title: "Workout Programming",
    description: "Deliver personalized training through workout planning, powered by AI.",
    icon: "/themes/gymme/assets2/images/homepage/industry/AI.svg",
    screenshot: "/uploads/2025/08/coach-item.webp",
  },
  {
    num: 2,
    badge: "AI POWERED",
    title: "Nutrition",
    description: "Provide guidance & accountability with flexible meal plan features.",
    icon: "/themes/gymme/assets2/images/homepage/industry/nutrition.svg",
    screenshot: "/uploads/2025/08/manage-item.webp",
  },
  {
    num: 3,
    title: "Habit Coaching",
    description: "Create routines that drive lasting results and longevity.",
    icon: "/themes/gymme/assets2/images/homepage/industry/habit.svg",
    screenshot: "/uploads/2025/08/engage-item.webp",
  },
  {
    num: 4,
    title: "Sport Coaching",
    description: "Go beyond workouts with skill-based drills, and performance analytics.",
    icon: "/themes/gymme/assets2/images/homepage/industry/sport.svg",
    screenshot: "/uploads/2025/08/scale-item-1.webp",
  },
];

const trustedLogos = [
  { name: "BSF", src: "/themes/gymme/assets2/images/homepage/industry/bsf.svg" },
  { name: "SquashSkills", src: "/themes/gymme/assets2/images/homepage/industry/squash-skills.svg" },
  { name: "Lyss", src: "/themes/gymme/assets2/images/homepage/industry/lyss.svg" },
  { name: "PhysioRx", src: "/themes/gymme/assets2/images/homepage/industry/physiorx.svg" },
  { name: "Drop Gym", src: "/themes/gymme/assets2/images/homepage/industry/drop-gym.svg" },
  { name: "Henley Fitness", src: "/themes/gymme/assets2/images/homepage/industry/henley-fitness.svg" },
  { name: "Winning Mentality", src: "/themes/gymme/assets2/images/homepage/industry/winning-mentality.svg" },
  { name: "Strength Base", src: "/themes/gymme/assets2/images/homepage/industry/strength-base.svg" },
  { name: "BoulayFit", src: "/themes/gymme/assets2/images/homepage/industry/boulay-fit.svg" },
  { name: "Integrit", src: "/themes/gymme/assets2/images/homepage/industry/integrit.svg" },
];

export function IndustrySolutionSection() {
  const [activeTab, setActiveTab] = useState(0);

  const active = features[activeTab];

  return (
    <section
      style={{ backgroundColor: "#ffffff", padding: "80px 80px" }}
      className="w-full"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12">
          <h2
            style={{
              fontSize: "56px",
              fontWeight: 700,
              fontFamily: '"TWK Everett", Inter, sans-serif',
              color: "#1b1b1b",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            The industry&apos;s{" "}
            <span style={{ fontStyle: "italic", fontFamily: "Inter, serif" }}>
              Premier Solution
            </span>
          </h2>
          <h2
            style={{
              fontSize: "56px",
              fontWeight: 700,
              fontFamily: '"TWK Everett", Inter, sans-serif',
              color: "#1b1b1b",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            for Health and Fitness Coaching
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 overflow-x-auto">
            {features.map((f, i) => (
              <button
                key={f.num}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "flex items-start gap-3 text-left p-4 rounded-xl transition-all duration-200 flex-1 min-w-[200px]",
                  activeTab === i
                    ? "bg-[rgba(0,0,0,0.05)]"
                    : "hover:bg-[rgba(0,0,0,0.03)]"
                )}
              >
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor:
                      activeTab === i
                        ? "rgba(0,0,0,0.3)"
                        : "rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1b1b1b",
                    flexShrink: 0,
                    transition: "background-color 0.2s",
                  }}
                >
                  {f.num}
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#1b1b1b",
                    lineHeight: 1.3,
                  }}
                >
                  {f.title}
                </span>
              </button>
            ))}
          </div>

          <div
            style={{
              borderRadius: "20px",
              backgroundColor: "#f5f5f5",
              overflow: "hidden",
              position: "relative",
              minHeight: "480px",
            }}
          >
            <div
              key={activeTab}
              style={{
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={active.icon}
                    alt={active.title}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>

                {active.badge && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#0370ff",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      padding: "4px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    <Image
                      src="/themes/gymme/assets2/images/icons/ai-badge-sm.png"
                      alt="AI"
                      width={14}
                      height={14}
                    />
                    {active.badge}
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  fontFamily: '"TWK Everett", Inter, sans-serif',
                  color: "#1b1b1b",
                  letterSpacing: "-0.5px",
                }}
              >
                {active.title}
              </h3>

              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(27,27,27,0.7)",
                  maxWidth: "480px",
                  lineHeight: 1.6,
                }}
              >
                {active.description}
              </p>
            </div>

            <div
              key={`screenshot-${activeTab}`}
              style={{
                position: "relative",
                width: "100%",
                height: "320px",
                animation: "fadeIn 0.35s ease",
              }}
            >
              <Image
                src={active.screenshot}
                alt={`${active.title} screenshot`}
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p
            style={{
              fontSize: "13px",
              color: "rgba(27,27,27,0.5)",
              marginBottom: "16px",
              fontWeight: 500,
            }}
          >
            Trusted by over 210,000 coaches
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "24px 32px",
            }}
          >
            {trustedLogos.map((logo) => (
              <div
                key={logo.name}
                style={{
                  position: "relative",
                  width: "80px",
                  height: "32px",
                  filter: "grayscale(100%)",
                  opacity: 0.5,
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
