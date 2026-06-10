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
      id="funzionalita"
      className={cn("relative w-full", className)}
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('/themes/gymme/assets2/images/bg.svg')",
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
            Per Tutti, dai Personal Trainer
            agli Studi Multidisciplinari

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
          Una piattaforma progettata per chi vuole collaborare, crescere e fidelizzare i propri clienti nel tempo.
        </p>
      </div>
      {children}
    </section>
  );
}
