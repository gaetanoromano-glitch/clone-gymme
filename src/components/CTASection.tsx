import Image from "next/image";

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        height: "604px",
        backgroundColor: "#0a0a0a",
        padding: "0 80px",
      }}
    >
      <Image
        src="/themes/gymme/assets2/images/homepage/join-feature/join-feature.webp"
        alt="App mockup"
        width={800}
        height={604}
        className="absolute right-0 bottom-0 h-[90%] w-auto object-cover"
        unoptimized
      />

      <div className="relative z-10" style={{ maxWidth: "520px" }}>
        <h2
          className="font-twk"
          style={{
            fontSize: "64px",
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
            fontSize: "18px",
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
            padding: "16px 32px",
            fontSize: "16px",
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
