import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt = "gymme — la piattaforma multi-professionale per il benessere";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Piattaforma wellness multi-professionale",
    title: "L'ecosistema digitale per Personal Trainer, Nutrizionisti e Osteopati",
    subtitle: "Un health team, un ecosistema condiviso attorno allo stesso cliente.",
  });
}
