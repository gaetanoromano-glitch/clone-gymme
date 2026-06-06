"use client";

import { cn } from "@/lib/utils";

interface Props {
  onClose: () => void;
}

export default function AnnouncementBanner({ onClose }: Props) {
  return (
    <div
      className={cn("fixed left-0 right-0 top-0 flex items-center justify-center px-6")}
      style={{
        height: "50px",
        backgroundColor: "#000000",
        zIndex: 60,
      }}
    >
      <p
        style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "14px",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 400,
          margin: 0,
        }}
      >
        Join us every Wednesday for{" "}
        <span style={{ fontWeight: 700, color: "#ffffff" }}>
          Everfit Foundations 101 Webinar
        </span>{" "}
        👉
        <a
          href="#"
          style={{
            color: "#ffffff",
            textDecoration: "underline",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Sign Up Here
        </a>
      </p>
      <button
        onClick={onClose}
        aria-label="Close announcement"
        style={{
          position: "absolute",
          right: "20px",
          color: "rgba(255,255,255,0.7)",
          fontSize: "20px",
          cursor: "pointer",
          background: "none",
          border: "none",
          lineHeight: 1,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
        }}
      >
        ×
      </button>
    </div>
  );
}
