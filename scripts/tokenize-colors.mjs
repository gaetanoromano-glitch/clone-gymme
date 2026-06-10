// One-off: replace hardcoded colors with theme tokens (var()/color-mix).
// Excludes canvas/SVG/effect contexts that can't take CSS vars.
import { readFileSync, writeFileSync } from "node:fs";

const EXCLUDE = new Set([
  "src/app/page.tsx",          // sparkColor -> canvas
  "src/components/ClickSpark.tsx",   // sparkColor default -> canvas
  "src/components/SpotLightCard.tsx", // spotlightColor -> effect + typed literal
  "src/components/StickerPeel.tsx",   // feFlood -> SVG filter
]);

const FILES = [
  "src/app/layout.tsx",
  "src/components/AnimatedButton.tsx",
  "src/components/AnnouncementBanner.tsx",
  "src/components/BrandingSection.tsx",
  "src/components/CTASection.tsx",
  "src/components/FeatureAccordion.tsx",
  "src/components/FiveYearsSection.tsx",
  "src/components/Footer.tsx",
  "src/components/ForEveryoneSection.tsx",
  "src/components/HeroSection.tsx",
  "src/components/IndustrySolutionSection.tsx",
  "src/components/Navbar.tsx",
  "src/components/PlanCoachSection.tsx",
  "src/components/RatingsSection.tsx",
  "src/components/ServiceTierSection.tsx",
].filter((f) => !EXCLUDE.has(f));

// Solid hex -> token. Longest/6-digit first; word-boundary via negative lookahead.
const HEX = [
  ["1b1b1b", "var(--text-primary)"],
  ["ffffff", "var(--surface)"],
  ["f5f5f5", "var(--bg)"],
  ["fafafa", "var(--bg)"],
  ["e5e7eb", "var(--stroke)"],
  ["7c5cff", "var(--gymme-purple)"],
  ["cbff11", "var(--ef-neon)"],
  ["0a0a0a", "var(--ef-dark)"],
  ["0370ff", "var(--badge)"],
  ["e8f0ff", "var(--tint-sky)"],
  ["e8f7ee", "var(--tint-mint)"],
  ["fff3e8", "var(--tint-butter)"],
  ["f3eeff", "var(--tint-purple)"],
  ["eeedfb", "var(--tint-lilac)"],
  ["000000", "var(--ink)"],
  // 3-digit (after 6-digit so #ffffff/#000000 already consumed)
  ["fff", "var(--surface)"],
  ["000", "var(--ink)"],
];

// rgba(base) -> color-mix with token
const RGBA_BASE = [
  [[27, 27, 27], "var(--text-primary)"],
  [[255, 255, 255], "var(--surface)"],
  [[0, 0, 0], "var(--ink)"],
];

let total = 0;
for (const file of FILES) {
  let src;
  try {
    src = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const before = src;

  for (const [hex, token] of HEX) {
    const re = new RegExp(`#${hex}(?![0-9a-fA-F])`, "gi");
    src = src.replace(re, token);
  }

  for (const [[r, g, b], token] of RGBA_BASE) {
    const re = new RegExp(
      `rgba\\(\\s*${r}\\s*,\\s*${g}\\s*,\\s*${b}\\s*,\\s*([0-9.]+)\\s*\\)`,
      "g"
    );
    src = src.replace(re, (_m, a) => {
      const pct = Math.round(parseFloat(a) * 100);
      return `color-mix(in srgb, ${token} ${pct}%, transparent)`;
    });
  }

  if (src !== before) {
    writeFileSync(file, src);
    const changes = before.split("\n").length; // rough
    console.log(`updated ${file}`);
    total++;
  }
}
console.log(`\nDone — ${total} file(s) updated.`);
