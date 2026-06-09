"use client";

import Image from "next/image";
import StickerPeel from "./StickerPeel";

const columns = [
  {
    label: "FUNZIONALITÀ",
    links: [
      { label: "Protocolli & Schede" },
      { label: "AI Protocol Builder" },
      { label: "CRM Clienti" },
      { label: "Calendario & Sedute" },
      { label: "Messaggistica" },
      { label: "Progressi & Misurazioni" },
      { label: "Client Risk Radar" },
      { label: "Collaborazione Multi-Pro" },
      { label: "Referral & Network" },
    ],
  },
  {
    label: "PIANI",
    links: [
      { label: "Prezzi" },
      { label: "Early Access" },
    ],
  },
  {
    label: "RISORSE",
    links: [
      { label: "Documentazione" },
      { label: "Casi Studio" },
      { label: "Webinar" },
      { label: "Blog" },
      { label: "Assistenza" },
    ],
  },
  {
    label: "AZIENDA",
    links: [
      { label: "Chi Siamo" },
      { label: "Carriere" },
    ],
  },
];

const socialIcons = [
  { src: "/themes/gymme/assets2/images/homepage/footer/fb-icon.svg", alt: "Facebook", href: "https://www.facebook.com/gymmeapp" },
  { src: "/themes/gymme/assets2/images/homepage/footer/ig-icon.svg", alt: "Instagram", href: "https://www.instagram.com/gymmeapp" },
  { src: "/themes/gymme/assets2/images/homepage/footer/ytb-icon.svg", alt: "YouTube", href: "https://www.youtube.com/gymme" },
  { src: "/themes/gymme/assets2/images/homepage/footer/linkedin-icon.svg", alt: "LinkedIn", href: "https://www.linkedin.com/company/gymme" },
];

export function Footer() {
  return (
    <footer
      className="px-5 pt-10 md:px-10 md:pt-16 lg:px-[80px] lg:pt-[80px]"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: "28px 24px", marginBottom: "40px" }}
        >
          {columns.map((col) => (
            <div key={col.label}>
              <p
                className="font-inter"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "rgba(27,27,27,0.4)",
                  marginBottom: "14px",
                }}
              >
                {col.label}
              </p>
              <ul className="flex flex-col">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href="#"
                      className="font-inter block hover:opacity-70 transition-opacity duration-200"
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#1b1b1b",
                        textDecoration: "none",
                        marginBottom: "10px",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex" style={{ gap: "16px", marginBottom: "32px" }}>
          {socialIcons.map((icon) => (
            <a
              key={icon.alt}
              href={icon.href}
              aria-label={icon.alt}
              className="flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
              style={{ width: "36px", height: "36px" }}
            >
              <Image src={icon.src} alt={icon.alt} width={36} height={36} unoptimized />
            </a>
          ))}
        </div>

        {/* Sticker playground — full bleed, responsive height */}
        <div
          className="relative overflow-hidden"
          style={{ margin: "0 -20px", height: "220px" }}
        >
          {/* Mobile: just center the logo */}
          <div className="lg:hidden flex items-center justify-center h-full">
            <StickerPeel
              imageSrc="/themes/gymme/assets2/images/mamozzi/logo.svg"
              width={140}
              rotate={0}
              peelBackHoverPct={28}
              peelBackActivePct={48}
              shadowIntensity={0.4}
              lightingIntensity={0.01}
              left="calc(50% - 70px)"
              top="40px"
            />
          </div>

          {/* Desktop: full sticker set */}
          <div className="hidden lg:block" style={{ position: "absolute", inset: 0 }}>
            <StickerPeel
              imageSrc="/themes/gymme/assets2/images/mamozzi/ago.svg"
              width={110}
              rotate={-8}
              peelBackHoverPct={22}
              peelBackActivePct={42}
              shadowIntensity={0.35}
              lightingIntensity={0.0}
              left="4%"
              top="40px"
            />
            <StickerPeel
              imageSrc="/themes/gymme/assets2/images/mamozzi/anna.svg"
              width={100}
              rotate={6}
              peelBackHoverPct={22}
              peelBackActivePct={42}
              shadowIntensity={0.35}
              lightingIntensity={0.01}
              left="14%"
              top="100px"
            />
            <StickerPeel
              imageSrc="/themes/gymme/assets2/images/mamozzi/logo.svg"
              width={160}
              rotate={0}
              peelBackHoverPct={28}
              peelBackActivePct={48}
              shadowIntensity={0.4}
              lightingIntensity={0.01}
              left="calc(50% - 80px)"
              top="60px"
            />
            <StickerPeel
              imageSrc="/themes/gymme/assets2/images/mamozzi/tanino.svg"
              width={100}
              rotate={-6}
              peelBackHoverPct={22}
              peelBackActivePct={42}
              shadowIntensity={0.35}
              lightingIntensity={0.01}
              left="72%"
              top="100px"
            />
            <StickerPeel
              imageSrc="/themes/gymme/assets2/images/mamozzi/angelo.svg"
              width={110}
              rotate={10}
              peelBackHoverPct={22}
              peelBackActivePct={42}
              shadowIntensity={0.35}
              lightingIntensity={0.08}
              left="82%"
              top="40px"
            />
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center font-inter"
          style={{
            borderTop: "1px solid rgba(27,27,27,0.1)",
            padding: "20px 0",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px", color: "rgba(27,27,27,0.5)" }}>
            &copy; 2026 Gymme. Tutti i diritti riservati
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
              style={{ fontSize: "13px", color: "rgba(27,27,27,0.5)", textDecoration: "none" }}
            >
              Privacy Policy
            </a>
            <span style={{ color: "rgba(27,27,27,0.3)" }}>|</span>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
              style={{ fontSize: "13px", color: "rgba(27,27,27,0.5)", textDecoration: "none" }}
            >
              Termini &amp; Condizioni
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
