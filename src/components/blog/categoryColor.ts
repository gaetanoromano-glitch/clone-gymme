// Pastel accent per category, from the design tokens. Unknown categories fall
// back to sky so a new category never breaks the layout.
const CATEGORY_COLORS: Record<string, string> = {
  Collaborazione: "var(--pastel-pink)",
  Fidelizzazione: "var(--pastel-butter)",
  Nutrizione: "var(--pastel-mint)",
  Recupero: "var(--pastel-purple)",
};

export function categoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "var(--pastel-sky)";
}
