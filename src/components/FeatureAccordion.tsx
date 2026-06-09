"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  icon: string;
  title: string;
  description: string;
  screenshot: string;
  badge?: string;
}

interface FeatureAccordionProps {
  badgeIcon: string;
  badgeText: string;
  headingLines: string[];
  items: AccordionItem[];
}

export function FeatureAccordion({
  badgeIcon,
  badgeText,
  headingLines,
  items,
}: FeatureAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: "48px 56px",
        marginTop: 8,
        marginRight: "auto",
        marginBottom: 0,
        marginLeft: "auto",
        maxWidth: 1280,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "48% 52%",
          gap: 48,
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <Image
              src={badgeIcon}
              alt=""
              width={24}
              height={24}
              style={{ width: 24, height: 24 }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Plus Jakarta Sans, sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#1b1b1b",
              }}
            >
              {badgeText}
            </span>
          </div>

          <h2
            style={{
              fontSize: 44,
              fontWeight: 700,
              fontFamily:
                '"Unbounded", sans-serif',
              color: "#1b1b1b",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              marginBottom: 40,
            }}
          >
            {headingLines.map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </h2>

          <div>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    borderTop: "1px solid #e5e7eb",
                    borderBottom: isActive ? "2px solid #1b1b1b" : undefined,
                    padding: "20px 0",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={24}
                      height={24}
                      style={{ width: 24, height: 24, flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: isActive ? 700 : 600,
                        fontFamily:
                          "Plus Jakarta Sans, sans-serif",
                        color: "#1b1b1b",
                      }}
                    >
                      {item.title}
                    </span>
                    {item.badge && (
                      <span
                        style={{
                          backgroundColor: "#0370ff",
                          color: "#ffffff",
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 4,
                          padding: "2px 6px",
                          display: "inline-block",
                          marginLeft: 8,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isActive
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <p
                      style={{
                        fontSize: 15,
                        color: "rgba(27,27,27,0.7)",
                        fontFamily:
                          "Plus Jakarta Sans, sans-serif",
                        lineHeight: 1.6,
                        paddingTop: 12,
                        paddingLeft: 36,
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div
            style={{
              position: "sticky",
              top: 120,
              backgroundColor: "#f5f5f5",
              borderRadius: 16,
              overflow: "hidden",
              height: 500,
            }}
          >
            <Image
              src={items[activeIndex].screenshot}
              alt={items[activeIndex].title}
              fill
              style={{ objectFit: "cover" }}
              priority={activeIndex === 0}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
