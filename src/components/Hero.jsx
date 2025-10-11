import { useEffect } from "react";

export default function Hero() {
  // Ustawienie realnego viewportu (stabilne 100vh na mobile)
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty("--app-vh", `${vh}px`);
    };
    setVH();
    const t = setTimeout(setVH, 300);
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    document.addEventListener("visibilitychange", setVH);
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
        :root { --nav-h: 68px; }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-24px) } }
        @keyframes floatSm { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
      `}</style>

      <section
        id="start"
        className="
          relative isolate overflow-hidden hero-gradient
          h-[calc(var(--app-vh,100dvh))] md:h-[100dvh]
          pt-[calc(var(--nav-h,68px)+env(safe-area-inset-top))]
          md:pt-0
          flex items-center
        "
        aria-label="Chmura Glazura — profesjonalne układanie płytek"
      >
        <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-[rgba(255,122,24,0.06)] to-[rgba(0,194,255,0.08)]" />

        <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center px-5">

          {/* LEWA KOLUMNA — tekst + CTA */}
          <div className="text-center md:text-left">
            <img
              src="/logo-lockup.svg"
              alt="Chmura Glazura — logo"
              className="
                w-[min(68%,280px)] sm:w-[min(70%,360px)] md:w-[min(70%,360px)]
                mx-auto md:mx-0
                mb-6 drop-shadow-xl
                animate-[floatSm_6s_ease-in-out_infinite]
                sm:animate-[float_6s_ease-in-out_infinite]
              "
              loading="eager"
            />

            <h1 className="m-0 mb-4 text-[clamp(32px,5.6vw,58px)] font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent">
                Profesjonalne układanie płytek
              </span>
              <br />
              <span className="text-white">Łukasz Chmura</span>
            </h1>
<p
  className="relative max-w-[700px] mx-auto md:mx-0 mb-8 text-[18px] sm:text-[19px] leading-8 text-white/90 italic"
>
  {/* gradientowa poświata za tekstem */}
  <span
    className="absolute inset-0 -z-10 blur-2xl opacity-25 bg-gradient-to-r from-accent to-accent2"
    aria-hidden="true"
  ></span>

  {/* duże dekoracyjne cudzysłowy */}
  <span className="absolute -left-4 -top-2 text-[60px] text-accent/30 font-serif select-none">
    “
  </span>

  Do każdego zlecenia podchodzę z pełnym zaangażowaniem i{" "}
  <span className="text-accent font-semibold not-italic">
    dbałością o szczegóły
  </span>{" "}
  — <span className="text-accent2 font-semibold not-italic">dokładność</span> i{" "}
  <span className="text-accent font-semibold not-italic">estetyka wykonania</span>{" "}
  to dla mnie priorytet.  
  Zawsze dotrzymuję terminów, a moim celem jest{" "}
  <span className="text-accent2 font-semibold not-italic">
    zadowolenie klienta
  </span>{" "}
  oraz solidny efekt, który posłuży na lata.

  <span className="absolute right-0 -bottom-10 text-[60px] text-accent2/30 font-serif select-none">
    ”
  </span>
</p>




            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#kontakt"
                className="inline-block px-8 py-3 font-semibold tracking-wide text-white rounded-full
                           bg-[var(--color-accent)]
                           border border-white/10 shadow-[0_6px_28px_rgba(255,122,24,0.5)]
                           transition will-change-transform hover:-translate-y-[3px]"
              >
                Skontaktuj się
              </a>
              <a
                href="#galeria"
                className="inline-block px-8 py-3 font-semibold tracking-wide rounded-full
                           bg-transparent text-[var(--color-text)]
                           border border-white/15 hover:border-white/30
                           transition will-change-transform hover:-translate-y-[3px]"
              >
                Zobacz realizacje
              </a>
            </div>
          </div>

          {/* PRAWA KOLUMNA — mozaika zdjęć */}
          <div className="relative md:justify-self-end w-full max-w-[560px] hidden mx-auto md:mx-0 md:block">
            <div className="ring-lights pointer-events-none" aria-hidden />

            <div className="grid grid-cols-3 gap-3 perspective-900">
              {[
                "/images/lazienka1.jpg",
                "/images/lazienka2.jpg",
                "/images/lazienka3.jpg",
                "/images/lazienka4.jpg",
                "/images/lazienka5.jpg",
                "/images/lazienka6.jpg"
              ].map((src, i) => (
                <div
                  key={src}
                  className={`
                    tile group relative overflow-hidden rounded-xl2 shadow-[var(--shadow-card)]
                    ${i % 3 === 0 ? "row-span-2" : ""}
                  `}
                  style={{ aspectRatio: i % 3 === 0 ? "2/3" : "1/1" }}
                >
                  <img
                    src={src}
                    alt="Realizacja — glazura/łazienka"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="absolute inset-0 shine opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
