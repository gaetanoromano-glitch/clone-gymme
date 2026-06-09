import { cn } from "@/lib/utils";

interface ForEveryoneSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ForEveryoneSection({
  children,
  className,
}: ForEveryoneSectionProps) {
  return (
    <section
      className={cn("relative w-full", className)}
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('/themes/gymme/assets2/images/homepage/blueprint/blueprint-overlay.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-6 pb-10 pt-16 md:px-12 md:pb-10 md:pt-20 lg:px-20 lg:pb-10 lg:pt-20">
        <h2
          className="font-twk text-white"
          style={{
            fontSize: "clamp(36px, 5.625vw, 72px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          For Everyone{" "}
          <em
            style={{
              fontStyle: "italic",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            from
          </em>{" "}
          Inspiring Coaches
        </h2>
        <h2
          className="font-twk text-white"
          style={{
            fontSize: "clamp(36px, 5.625vw, 72px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          to Training Organizations
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: 1.6,
            marginTop: "16px",
            maxWidth: "600px",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          }}
        >
          A proven blueprint to scale effortlessly, inspire clients, and ignite
          your business growth.
        </p>
      </div>
      {children}
    </section>
  );
}
