"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  bannerVisible: boolean;
}

const NAV_LINKS = [
  { label: "FEATURES +", href: "#" },
  { label: "RESOURCES +", href: "#" },
  { label: "PRICING", href: "#" },
];

export default function Navbar({ bannerVisible }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topOffset = bannerVisible ? 50 : 0;

  const linkColor = isScrolled ? "#1b1b1b" : "rgba(255,255,255,0.9)";

  return (
    <header
      style={{
        position: "fixed",
        top: topOffset,
        left: 0,
        width: "100%",
        height: "87px",
        display: "flex",
        alignItems: "center",
        backdropFilter: "blur(40px)",
        backgroundColor: "rgba(0,0,0,0)",
        zIndex: 40,
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        borderBottom: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
        }}
        className="max-lg:px-6"
      >
        <div style={{ flexShrink: 0, transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
          <Link href="/" aria-label="Everfit home">
            {isScrolled ? (
              <Image
                src="/themes/everfit/assets2/images/logo-sticky.svg"
                alt="Everfit"
                width={32}
                height={32}
                priority
              />
            ) : (
              <Image
                src="/themes/everfit/assets2/images/white-logo.svg"
                alt="Everfit"
                width={120}
                height={32}
                priority
              />
            )}
          </Link>
        </div>

        <nav
          className={cn(
            "hidden lg:flex items-center",
            "ml-auto mr-auto",
          )}
          style={{ gap: "40px" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: linkColor,
                textDecoration: "none",
                transition: "color 0.3s cubic-bezier(0.4,0,0.2,1)",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div
          className="hidden lg:flex items-center"
          style={{ gap: "24px", marginLeft: "auto" }}
        >
          <Link
            href="#"
            style={{
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: linkColor,
              textDecoration: "none",
              transition: "color 0.3s cubic-bezier(0.4,0,0.2,1)",
              whiteSpace: "nowrap",
            }}
          >
            SIGN IN
          </Link>

          <Link
            href="#"
            style={{
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "#ffffff",
              textDecoration: "none",
              padding: "12px 20px",
              borderRadius: "9999px",
              whiteSpace: "nowrap",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              ...(isScrolled
                ? {
                    backgroundColor: "#1b1b1b",
                    border: "none",
                  }
                : {
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255,255,255,0.9)",
                  }),
            }}
          >
            START FREE TRIAL →
          </Link>
        </div>

        <button
          className="lg:hidden ml-auto flex flex-col"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            gap: "5px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              backgroundColor: isScrolled ? "#1b1b1b" : "#ffffff",
              transition: "background-color 0.3s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              backgroundColor: isScrolled ? "#1b1b1b" : "#ffffff",
              transition: "background-color 0.3s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              backgroundColor: isScrolled ? "#1b1b1b" : "#ffffff",
              transition: "background-color 0.3s",
            }}
          />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{
            position: "absolute",
            top: "87px",
            left: 0,
            right: 0,
            backgroundColor: "#ffffff",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: "#1b1b1b",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "#1b1b1b",
              textDecoration: "none",
            }}
          >
            SIGN IN
          </Link>
          <Link
            href="#"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "#ffffff",
              backgroundColor: "#1b1b1b",
              textDecoration: "none",
              padding: "12px 20px",
              borderRadius: "9999px",
              textAlign: "center",
            }}
          >
            START FREE TRIAL →
          </Link>
        </div>
      )}
    </header>
  );
}
