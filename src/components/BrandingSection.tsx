import Image from "next/image";
import { cn } from "@/lib/utils";

const accordionItems = [
  {
    title: "Custom Branded App",
    description:
      "Keep your branding front and center with customizable color theme and logo as unique as your workouts.",
  },
  {
    title: "White Label Solution",
    description:
      "Launch the custom branded fitness app of your dreams on iOS and Android.",
  },
];

export function BrandingSection() {
  return (
    <section className="px-4 md:px-10 py-2 max-w-[1280px] mx-auto w-full">
      <div
        className="bg-white rounded-2xl"
        style={{ padding: "48px 56px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 mb-6">
              <Image
                src="/themes/everfit/assets2/images/homepage/branding.svg"
                alt="Branding icon"
                width={18}
                height={18}
                unoptimized
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: "#1b1b1b",
                }}
              >
                BRANDING
              </span>
            </div>

            <h2
              className="font-twk"
              style={{
                fontSize: "44px",
                fontWeight: 700,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                color: "#1b1b1b",
              }}
            >
              Elevate Your Presence,
              <br />
              Expand Your Reach.
            </h2>

            <div className="mt-8 flex flex-col gap-4">
              {accordionItems.map((item, index) => (
                <div
                  key={item.title}
                  className={cn(
                    "rounded-xl p-5 border",
                    index === 0
                      ? "border-[#e5e7eb] bg-[#f5f5f5]"
                      : "border-transparent bg-transparent"
                  )}
                >
                  <h3
                    className="font-inter"
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "#1b1b1b",
                    }}
                  >
                    {item.title}
                  </h3>
                  {index === 0 && (
                    <p
                      className="font-inter mt-2"
                      style={{
                        fontSize: "15px",
                        color: "rgba(27,27,27,0.6)",
                        lineHeight: 1.55,
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center self-start font-inter hover:bg-[#333333] transition-colors duration-200"
              style={{
                backgroundColor: "#1b1b1b",
                color: "#ffffff",
                borderRadius: "9999px",
                padding: "14px 28px",
                fontSize: "15px",
                fontWeight: 600,
                marginTop: "32px",
                textDecoration: "none",
              }}
            >
              Contact Sales
            </a>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative" style={{ minHeight: "420px" }}>
              <Image
                src="/themes/everfit/assets2/images/homepage/branding/branding-1-2xl.webp"
                alt="Branded app mockup 1"
                fill
                className="object-cover"
                style={{ borderRadius: "12px" }}
                unoptimized
              />
            </div>
            <div className="flex-1 relative" style={{ minHeight: "420px" }}>
              <Image
                src="/themes/everfit/assets2/images/homepage/branding/branding-2-2xl.webp"
                alt="Branded app mockup 2"
                fill
                className="object-cover"
                style={{ borderRadius: "12px" }}
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
