import { useEffect, useState } from "react";

export default function Hero() {
  const [alt, setAlt] = useState(false);

  // Ustawiamy realną wysokość view-portu w --app-vh
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight; // realny pikselowy viewport
      document.documentElement.style.setProperty("--app-vh", `${vh}px`);
    };
    setVH();
    // iOS/Android potrafią zmieniać wysokość przy scrollu/orientacji
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    document.addEventListener("visibilitychange", setVH);
    // krótki timeout, gdy pasek adresu „doskakuje” po załadowaniu
    const t = setTimeout(setVH, 300);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
      document.removeEventListener("visibilitychange", setVH);
    };
  }, []);

  return (
    <>
      <style>{`
        :root { --nav-h: 68px; } /* dostosuj do realnej wysokości headera na mobile */
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-30px) } }
        @keyframes floatSm { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
      `}</style>

      <section
        id="start"
        // Klucz: wysokość = realny viewport (JS), a na desktopie zwykłe 100dvh
        // Odejmujemy header w wysokości sekcji, a padding-top "odsuwa" treść.
        className="
          relative
          h-[calc(var(--app-vh,100dvh))]
          md:h-[100dvh]
          flex items-center justify-center text-center overflow-hidden hero-gradient
          pt-[calc(var(--nav-h,68px)+env(safe-area-inset-top))]
          md:pt-0
          isolate
        "
      >
        {/* Overlay z gradientem rozciągnięty NA PEWNO na cały box + 1px margines (znika szpara na iOS) */}
        <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-[rgba(255,122,24,0.08)] to-[rgba(0,194,255,0.08)]" />

        <div className="container relative z-10 flex flex-col items-center gap-0 px-5">
          <img
            src="/logo-lockup.svg"
            alt="Chmura Glazura — logo"
            className="
              w-[min(68%,280px)]
              sm:w-[min(70%,360px)]
              md:w-[min(70%,380px)]
              mb-6 drop-shadow-xl
              animate-[floatSm_6s_ease-in-out_infinite]
              sm:animate-[float_6s_ease-in-out_infinite]
            "
          />

          <h1 className="m-0 mb-5 text-[clamp(30px,5.5vw,56px)] font-extrabold leading-tight bg-gradient-to-r from-accent to-accent2 bg-clip-text text-accent">
            {alt ? (
              <>
                <span className="text-accent bg-gradient-to-r from-accent to-accent2 bg-clip-text">
                  Tak piękna łazienka, że opada szczęka?
                </span>
                <br />
                To dobra glazura – Łukasz Chmura
              </>
            ) : (
              <>
                <span className="text-accent bg-gradient-to-r from-accent to-accent2 bg-clip-text">
                  Perfekcyjna glazura
                </span>{" "}
                i łazienki, które zachwycają
              </>
            )}
          </h1>

          <script defer async src="https://cdn.trustindex.io/loader.js?713490255f2a90543706a06d6b8"></script>

          <button
            onClick={() => setAlt(v => !v)}
            className="mb-4 inline-flex items-center px-4 py-2 rounded-full border border-accent2/50 text-white/90 hover:translate-y-[-3px] transition"
          >
            Opcja numer 2 :D
          </button>

          <p className="max-w-[700px] mx-auto mb-9 text-[18px] sm:text-[19px] leading-8 opacity-95">
            Tworzymy łazienki od stanu surowego po ostatnią fugę — z precyzją, estetyką i pasją do detali.
            Zaufaj specjalistom, którzy potrafią połączyć funkcjonalność z designem.
          </p>

          <a
            href="#kontakt"
            className="inline-block px-9 py-3 font-semibold tracking-wide text-white rounded-full bg-accent border border-accent2/40 shadow-[0_4px_18px_rgba(255,122,24,0.4)] transition hover:-translate-y-[3px] hover:shadow-[0_6px_25px_rgba(255,122,24,0.6)]"
          >
            Skontaktuj się z nami
          </a>
        </div>
      </section>
    </>
  );
}
