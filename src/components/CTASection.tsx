import Image from "next/image";

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden flex items-center px-5 py-12 md:px-10 md:py-0 lg:px-[80px]"
      style={{
        minHeight: "360px",
        backgroundColor: "#0a0a0a",
      }}
    >
      <Image
        src="/themes/gymme/assets2/images/homepage/join-feature/join-feature.webp"
        alt="App mockup"
        width={800}
        height={604}
        className="absolute right-0 bottom-0 h-[70%] md:h-[90%] w-auto object-cover opacity-40 md:opacity-100"
        unoptimized
      />

      <div className="relative z-10 py-10 md:py-16 lg:py-20" style={{ maxWidth: "520px" }}>
        <h2
          className="font-twk"
          style={{
            fontSize: "clamp(28px, 5vw, 64px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          Porta il Tuo Studio
          <br />
          nel Futuro del Benessere
        </h2>

        <p
          className="font-inter"
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(15px, 1.5vw, 18px)",
            marginTop: "16px",
            lineHeight: 1.5,
          }}
        >
          Inizia oggi e scopri come Gymme trasforma il modo in cui lavori con i tuoi clienti. PT, Nutrizionisti e Osteopati — finalmente in un unico ecosistema.
        </p>

        <a
          href="#"
          className="inline-flex items-center font-inter hover:bg-white/90 transition-colors duration-200"
          style={{
            backgroundColor: "#ffffff",
            color: "#1b1b1b",
            borderRadius: "9999px",
            padding: "14px 28px",
            fontSize: "15px",
            fontWeight: 700,
            marginTop: "32px",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Prova Gymme Gratuitamente →
        </a>
      </div>
    </section>
  );
}
