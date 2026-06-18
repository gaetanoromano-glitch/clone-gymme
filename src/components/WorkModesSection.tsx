"use client";

import Image from "next/image";
import SpotlightCard from "@/components/SpotLightCard";
import type { WorkMode } from "@/content/types";

interface WorkModesSectionProps {
  headingLines: string[];
  subtitle: string;
  modes: WorkMode[];
}

export function WorkModesSection({
  headingLines,
  subtitle,
  modes,
}: WorkModesSectionProps) {
  return (
    <section
      id="modalita"
      className="w-full px-5 py-10 md:px-10 md:py-16 lg:px-[40px] lg:py-[80px]"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-10 md:mb-12">
          {headingLines.map((line, i) => (
            <h2
              key={i}
              style={{
                fontSize: "clamp(28px, 4.5vw, 56px)",
                fontWeight: 700,
                fontFamily: '"Unbounded", sans-serif',
                color: "var(--text-primary)",
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
              }}
            >
              {line}
            </h2>
          ))}
          <p
            style={{
              marginTop: "16px",
              maxWidth: "640px",
              fontSize: "clamp(15px, 1.6vw, 18px)",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode) => {
            return (
              <SpotlightCard
                key={mode.title}
                spotlightColor="rgba(124, 92, 255, 0.18)"
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--stroke)" }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "200px",
                    }}
                  >
                    <Image
                      src={mode.illustration}
                      alt={mode.title}
                      width={150}
                      height={209}
                      unoptimized
                      style={{
                        height: "100%",
                        width: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "clamp(20px, 2.5vw, 26px)",
                      fontWeight: 700,
                      fontFamily: '"Unbounded", sans-serif',
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {mode.title}
                  </h3>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "15px",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {mode.description}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
