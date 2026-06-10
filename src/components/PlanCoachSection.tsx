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
    icon: "/themes/gymme/assets2/images/homepage/plan-coach.svg",
    title: "Schede & Protocolli con AI",
    description:
      "Genera o crea schede e protocolli completi con un semplice prompt. L'AI produce una bozza strutturata e modificabile — il professionista approva sempre prima della pubblicazione. Assegna a uno o più clienti con un click.",
    screenshot: "/uploads/2025/08/schede.jpg",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/habit.svg",
    title: "Calendario & Sedute",
    description: "Pianifica sedute, invia inviti automatici via WhatsApp o email e gestisci il calendario multi-cliente con reminder proattivi.",
    screenshot: "/uploads/2025/08/engage-item.webp",
  },
  {
    icon: "/themes/gymme/assets2/images/homepage/running.svg",
    title: "CRM Clienti",
    description:
      "Tieni tutto il contesto del cliente in un unico posto: anamnesi clinica, misurazioni, storico pagamenti, progressi e documenti.",
    screenshot: "/uploads/2025/08/scale-item-1.webp",
  },
];

export default function PlanCoachSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
      <div
        className="mx-auto overflow-hidden p-6 md:p-10 lg:p-[48px_56px]"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          maxWidth: "1280px",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <div
              className="flex items-center"
              style={{ marginBottom: "20px", gap: "8px" }}
            >
              <Image
                src="/themes/gymme/assets2/images/homepage/plan-coach.svg"
                alt="Plan & Coach icon"
                width={24}
                height={24}
                style={{ width: "24px", height: "24px" }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  letterSpacing: "0.08em",
                  color: "#1b1b1b",
                  textTransform: "uppercase",
                }}
              >
                PIANIFICA &amp; GESTISCI
              </span>
            </div>

            <h2
              className="font-twk"
              style={{
                fontSize: "clamp(24px, 3.5vw, 44px)",
                fontWeight: 700,
                color: "#1b1b1b",
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                marginBottom: "32px",
              }}
            >
              Pianifica con Precisione, Allena con Fiducia.
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
                    marginRight: "20px",
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
                      fontSize: "15px",
                      fontWeight: 600,
                      fontFamily: "Plus Jakarta Sans, sans-serif",
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
                fontSize: "15px",
                fontFamily: "Plus Jakarta Sans, sans-serif",
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
              minHeight: "240px",
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
