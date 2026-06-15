export type { ProfessionalContent, PillarContent, AccordionFeature } from "./types";
export { personalTrainer } from "./personal-trainer";
export { nutritionist } from "./nutritionist";
export { osteopath } from "./osteopath";

import { personalTrainer } from "./personal-trainer";
import { nutritionist } from "./nutritionist";
import { osteopath } from "./osteopath";
import type { ProfessionalContent } from "./types";

const registry: Record<string, ProfessionalContent> = {
  [personalTrainer.slug]: personalTrainer,
  [nutritionist.slug]: nutritionist,
  [osteopath.slug]: osteopath,
};

export function getProfessionalContent(slug: string): ProfessionalContent | null {
  return registry[slug] ?? null;
}

export function getAllSlugs(): string[] {
  return Object.keys(registry);
}
