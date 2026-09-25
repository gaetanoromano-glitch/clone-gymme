import { Plus } from "@phosphor-icons/react/dist/ssr";
import type { FaqItem } from "@/content/types";

interface FaqSectionProps {
  items: FaqItem[];
}

// Native <details> keeps every answer in the server HTML, so crawlers and
// generative engines can read it without running any JavaScript.
export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section id="faq" className="w-full bg-bg px-5 py-10 md:px-10 md:py-16 lg:px-[80px] lg:py-[80px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <h2 className="text-[clamp(28px,4.5vw,56px)] font-bold leading-[1.1] tracking-[-1.5px] text-text-primary">
            Domande frequenti
          </h2>
          <p className="mt-4 max-w-[440px] text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-text-secondary">
            Tutto quello che c&apos;è da sapere su gymme prima di iniziare.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-[20px] border border-stroke bg-surface transition-colors open:border-gymme-purple/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[20px] px-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gymme-purple/40 [&::-webkit-details-marker]:hidden">
                <h3 className="font-inter text-[16px] font-semibold leading-[1.4] text-text-primary md:text-[17px]">
                  {item.question}
                </h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-bg text-text-primary transition-transform duration-300 group-open:rotate-45 group-open:bg-gymme-purple group-open:text-white">
                  <Plus size={16} weight="bold" aria-hidden="true" />
                </span>
              </summary>
              <p className="font-inter px-6 pb-6 text-[15px] leading-[1.65] text-text-secondary">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
