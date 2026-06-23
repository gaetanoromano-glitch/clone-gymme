import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Richiedi una demo — Gymme",
  description: "Compila il form per ricevere una demo personalizzata di Gymme.",
};

export default function DemoPage() {
  return (
    <>
      <style>{`
        html, body { margin: 0; height: 100%; overflow: hidden; }
      `}</style>
      <iframe
        data-tally-src="https://tally.so/r/yPE9RB?transparentBackground=1&formEventsForwarding=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Gymme — Ricerca professionisti (3–5 minuti)"
        style={{ position: "fixed", inset: 0, border: 0, width: "100%", height: "100%" }}
        suppressHydrationWarning
      />
      <script async src="https://tally.so/widgets/embed.js" />
    </>
  );
}
