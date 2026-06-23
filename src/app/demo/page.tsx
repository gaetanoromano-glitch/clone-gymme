import type { Metadata } from "next";
import { DemoContent } from "./DemoContent";

export const metadata: Metadata = {
  title: "Richiedi una demo — Gymme",
  description: "Compila il form per ricevere una demo personalizzata di Gymme.",
};

export default function DemoPage() {
  return <DemoContent />;
}
