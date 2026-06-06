import Image from "next/image";

const columns = [
  {
    label: "FEATURES",
    links: [
      { label: "Workout Programming" },
      { label: "Meal Plans & Recipe Books" },
      { label: "Habit Coaching" },
      { label: "Sport Coaching" },
      { label: "Messaging" },
      { label: "Forms & Questionnaires" },
      { label: "Sports Coaching" },
      { label: "AI Workout Builder" },
      { label: "Marketplace" },
    ],
  },
  {
    label: "BILLING",
    links: [
      { label: "Pricing" },
      { label: "HSA/FSA" },
    ],
  },
  {
    label: "RESOURCES",
    links: [
      { label: "Academy" },
      { label: "Case Studies" },
      { label: "Webinars" },
      { label: "Blog" },
      { label: "Help" },
    ],
  },
  {
    label: "COMPANY",
    links: [
      { label: "Fitness Intelligence" },
      { label: "Careers" },
    ],
  },
];

const socialIcons = [
  {
    src: "/themes/everfit/assets2/images/homepage/footer/fb-icon.svg",
    alt: "Facebook",
    href: "https://www.facebook.com/everfitapp",
  },
  {
    src: "/themes/everfit/assets2/images/homepage/footer/ig-icon.svg",
    alt: "Instagram",
    href: "https://www.instagram.com/everfitapp",
  },
  {
    src: "/themes/everfit/assets2/images/homepage/footer/ytb-icon.svg",
    alt: "YouTube",
    href: "https://www.youtube.com/everfit",
  },
  {
    src: "/themes/everfit/assets2/images/homepage/footer/linkedin-icon.svg",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/company/everfit",
  },
];

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f5f5f5",
        padding: "80px 80px 0",
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: "48px", marginBottom: "60px" }}
        >
          {columns.map((col) => (
            <div key={col.label}>
              <p
                className="font-inter"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "rgba(27,27,27,0.4)",
                  marginBottom: "16px",
                }}
              >
                {col.label}
              </p>
              <ul className="flex flex-col">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href="#"
                      className="font-inter block hover:opacity-70 hover:underline transition-opacity duration-200"
                      style={{
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#1b1b1b",
                        textDecoration: "none",
                        marginBottom: "12px",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex"
          style={{ gap: "16px", marginTop: "32px", marginBottom: "48px" }}
        >
          {socialIcons.map((icon) => (
            <a
              key={icon.alt}
              href={icon.href}
              aria-label={icon.alt}
              className="flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
              style={{
                width: "36px",
                height: "36px",
              }}
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={36}
                height={36}
                unoptimized
              />
            </a>
          ))}
        </div>

        <div style={{ margin: "0 -80px", overflow: "hidden" }}>
          <p
            className="font-twk select-none"
            aria-hidden="true"
            style={{
              fontSize: "clamp(120px, 15vw, 200px)",
              fontWeight: 900,
              letterSpacing: "-5px",
              lineHeight: 0.85,
              background:
                "linear-gradient(90deg, #8ab4f8 0%, #6b9dee 20%, #9b8fef 40%, #7b6ed4 60%, #4a5a9a 80%, #1a2560 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
              paddingLeft: "80px",
              paddingRight: "80px",
            }}
          >
            everfit
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center font-inter"
          style={{
            borderTop: "1px solid rgba(27,27,27,0.1)",
            padding: "24px 0",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "rgba(27,27,27,0.5)",
            }}
          >
            &copy; 2026 Everfit. All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
              style={{
                fontSize: "14px",
                color: "rgba(27,27,27,0.5)",
                textDecoration: "none",
              }}
            >
              Privacy Policy
            </a>
            <span style={{ color: "rgba(27,27,27,0.3)" }}>|</span>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-200"
              style={{
                fontSize: "14px",
                color: "rgba(27,27,27,0.5)",
                textDecoration: "none",
              }}
            >
              Terms &amp; Condition
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
