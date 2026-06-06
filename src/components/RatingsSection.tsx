import Image from "next/image";

const stats = [
  { prefix: "+", value: "82%", label: "Free Trial\nConversion Rate" },
  { prefix: "+", value: "90%", label: "Client Retention" },
  { value: "5,000", label: "New Clients In 30 Days" },
  { bigText: "25+", label: "Hours Per Week Freed\nUp On Admin Tasks" },
  { value: "12x", label: "Increase In Revenue\nIn First 3 Months." },
];

const testimonials = [
  {
    quote:
      "Since using Everfit, our pipeline has strengthened significantly, and our free trial conversions have had a major impact on our top line.",
    name: "Scott Deakins",
    title: "Founder and CEO of Under Par Performance Golf",
    photo:
      "/themes/everfit/assets2/images/homepage/testimonial/testimonial-1-1.webp",
    bgColor: "#1a2744",
  },
  {
    quote:
      "Everfit has been the game-changer behind my growth from 50 to over 1900 clients.",
    name: "Cori Leftkowith",
    title: "Founder of Redefining Strength",
    photo:
      "/themes/everfit/assets2/images/homepage/testimonial/testimonial-1-2.webp",
    bgColor: "#4a5568",
  },
  {
    quote:
      "We ran our group program for the first time on Everfit, and it's been the most dreamy thing ever. The amount of retention is significantly higher than before.",
    name: "Rachel Henley",
    title: "Founder of Henley Fitness",
    photo:
      "/themes/everfit/assets2/images/homepage/testimonial/testimonial-1-3.webp",
    bgColor: "#2d5016",
  },
  {
    quote:
      "Everfit was integrating and constantly upgrading how we can make the experience better for clients and coaches.",
    name: "Brian Foley",
    title: "Founder of TRNDAY",
    photo:
      "/themes/everfit/assets2/images/homepage/testimonial/testimonial-1-4.webp",
    bgColor: "#1b1b1b",
  },
  {
    quote:
      "With Everfit, everything is all right there. It makes it easy to manage everything and see everything all in one platform.",
    name: "Brandon Woo",
    title: "Founder of Winning Mentality Fitness",
    photo:
      "/themes/everfit/assets2/images/homepage/testimonial/testimonial-1-5.webp",
    bgColor: "#3d3d5c",
  },
];

export function RatingsSection() {
  return (
    <section
      className="bg-white"
      style={{ padding: "80px 80px" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <h2
          className="font-twk"
          style={{
            fontSize: "56px",
            lineHeight: 1.1,
            color: "#1b1b1b",
            letterSpacing: "-1.5px",
          }}
        >
          <span style={{ fontWeight: 700 }}>#1 Rated </span>
          <span style={{ fontWeight: 400 }}>Personal Training Platform</span>
        </h2>

        <div
          className="flex flex-wrap"
          style={{ gap: "24px", marginTop: "48px", marginBottom: "64px" }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="font-inter flex flex-col justify-between"
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "16px",
                padding: "28px 24px",
                minWidth: "180px",
                flex: 1,
              }}
            >
              <div>
                {stat.bigText ? (
                  <span
                    className="font-twk block"
                    style={{
                      fontSize: "40px",
                      fontWeight: 800,
                      color: "#1b1b1b",
                      lineHeight: 1,
                    }}
                  >
                    {stat.bigText}
                  </span>
                ) : (
                  <span
                    className="font-twk block"
                    style={{
                      fontSize: "40px",
                      fontWeight: 800,
                      color: "#1b1b1b",
                      lineHeight: 1,
                    }}
                  >
                    {stat.prefix && (
                      <span style={{ fontSize: "28px", fontWeight: 700 }}>
                        {stat.prefix}
                      </span>
                    )}
                    {stat.value}
                  </span>
                )}
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(27,27,27,0.6)",
                    lineHeight: 1.4,
                    marginTop: "8px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex overflow-x-auto"
          style={{
            gap: "24px",
            scrollbarWidth: "none" as const,
            paddingBottom: "8px",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col flex-shrink-0 overflow-hidden"
              style={{
                width: "340px",
                borderRadius: "16px",
              }}
            >
              <div className="relative" style={{ height: "200px", width: "100%" }}>
                <Image
                  src={t.photo}
                  alt={t.name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div
                className="flex flex-col flex-1"
                style={{
                  padding: "24px",
                  backgroundColor: t.bgColor,
                }}
              >
                <p
                  className="font-inter"
                  style={{
                    color: "#ffffff",
                    fontSize: "16px",
                    lineHeight: 1.5,
                    fontWeight: 400,
                    flex: 1,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ marginTop: "20px" }}>
                  <p
                    className="font-inter"
                    style={{
                      color: "#ffffff",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-inter"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
