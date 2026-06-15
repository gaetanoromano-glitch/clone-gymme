import { cn } from "@/lib/utils";

interface ForEveryoneSectionProps {
  children: React.ReactNode;
  className?: string;
  heading?: string;
  subtitle?: string;
}

const DEFAULT_HEADING = "Per Tutti, dai Personal Trainer agli Studi Multidisciplinari";
const DEFAULT_SUBTITLE =
  "Una piattaforma progettata per chi vuole collaborare, crescere e fidelizzare i propri clienti nel tempo.";

export default function ForEveryoneSection({
  children,
  className,
  heading = DEFAULT_HEADING,
  subtitle = DEFAULT_SUBTITLE,
}: ForEveryoneSectionProps) {
  return (
    <section
      id="funzionalita"
      className={cn("relative w-full", className)}
      style={{
          backgroundColor:'#A99CFF',
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
            {heading}
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: 1.6,
            marginTop: "16px",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  );
}
