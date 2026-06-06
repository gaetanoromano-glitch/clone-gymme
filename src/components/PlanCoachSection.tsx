"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Tab {
  icon: string;
  title: string;
  description: string;
  screenshot: string;
}

const tabs: Tab[] = [
  {
    icon: "/themes/everfit/assets2/images/homepage/plan-coach.svg",
    title: "Client Programming",
    description:
      "Create structured, progressive workout plans in minutes, assisted by AI.",
    screenshot: "/uploads/2025/08/coach-item.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/meal-plans.svg",
    title: "Macros Tracking",
    description:
      "Build macro-based meal plans and give clients flexible ways to log meals. Now powered by AI with instant meal scanning through MacroSnap.",
    screenshot: "/uploads/2025/08/manage-item.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/habit.svg",
    title: "Habit Tracking",
    description: "Boost and refine client motivation with daily insights.",
    screenshot: "/uploads/2025/08/engage-item.webp",
  },
  {
    icon: "/themes/everfit/assets2/images/homepage/running.svg",
    title: "On-Demand Training",
    description:
      "Enable client access to workout programs and resources, anytime.",
    screenshot: "/uploads/2025/08/scale-item-1.webp",
  },
];

export default function PlanCoachSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
      <div
        className="mx-auto overflow-hidden"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "48px 56px",
          maxWidth: "1280px",
        }}
      >
        <div
          className="grid grid-cols-1 gap-10 md:grid-cols-2"
          style={{ gap: "60px" }}
        >
          <div className="flex flex-col">
            <div
              className="flex items-center"
              style={{ marginBottom: "20px", gap: "8px" }}
            >
              <Image
                src="/themes/everfit/assets2/images/homepage/plan-coach.svg"
                alt="Plan & Coach icon"
                width={24}
                height={24}
                style={{ width: "24px", height: "24px" }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                  letterSpacing: "0.08em",
                  color: "#1b1b1b",
                  textTransform: "uppercase",
                }}
              >
                PLAN &amp; COACH
              </span>
            </div>

            <h2
              className="font-twk"
              style={{
                fontSize: "44px",
                fontWeight: 700,
                color: "#1b1b1b",
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                marginBottom: "32px",
              }}
            >
              Plan With Precision, Coach With Confidence.
            </h2>

            <div
              className="flex overflow-x-auto"
              style={{
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "24px",
                gap: 0,
              }}
            >
              {tabs.map((tab, index) => (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "flex shrink-0 cursor-pointer items-center border-none bg-transparent",
                    "transition-colors duration-200"
                  )}
                  style={{
                    padding: "12px 0",
                    marginRight: "24px",
                    gap: "8px",
                    borderBottom:
                      activeTab === index
                        ? "2px solid #1b1b1b"
                        : "2px solid transparent",
                    marginBottom: "-1px",
                  }}
                  type="button"
                >
                  <Image
                    src={tab.icon}
                    alt={tab.title}
                    width={20}
                    height={20}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                      color:
                        activeTab === index
                          ? "#1b1b1b"
                          : "rgba(27,27,27,0.4)",
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tab.title}
                  </span>
                </button>
              ))}
            </div>

            <p
              style={{
                fontSize: "16px",
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                color: "rgba(27,27,27,0.7)",
                lineHeight: 1.6,
                maxWidth: "400px",
              }}
            >
              {tabs[activeTab].description}
            </p>
          </div>

          <div
            className="relative flex items-center justify-center"
            style={{
              overflow: "hidden",
              borderRadius: "12px",
              backgroundColor: "#f5f5f5",
            }}
          >
            {tabs.map((tab, index) => (
              <div
                key={tab.title}
                className="transition-opacity duration-300"
                style={{
                  opacity: activeTab === index ? 1 : 0,
                  position: activeTab === index ? "relative" : "absolute",
                  inset: 0,
                  width: "100%",
                }}
              >
                <Image
                  src={tab.screenshot}
                  alt={tab.title}
                  width={640}
                  height={480}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    display: "block",
                  }}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
