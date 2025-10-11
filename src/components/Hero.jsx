import { useEffect } from "react";

export default function Hero() {
  // Stabilne 100vh na mobile
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

        /* delikatne unoszenie logo (wyłączone przy reduced-motion) */
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-20px) } }
        @keyframes floatSm { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }

        /* wejście treści */
        @keyframes riseIn { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }

        /* pulsująca strzałka na dół */
        @keyframes nudge { 0%,100% { transform: translateY(0) } 50% { transform: translateY(6px) } }

        @media (prefers-reduced-motion: reduce) {
          .anim-float, .anim-floatSm, .anim-rise, .scroll-cue { animation: none !important; }
        }
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
        {/* overlay koloru */}
        <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-[rgba(255,122,24,0.06)] to-[rgba(0,194,255,0.08)]" />

        <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center px-5">
          {/* LEWA KOLUMNA — copy + CTA */}
          <div className="text-center md:text-left">
            <img
              src="/logo-lockup.svg"
              alt="Chmura Glazura — logo"
              className="
                w-[min(68%,280px)] sm:w-[min(70%,360px)] md:w-[min(70%,360px)]
                mx-auto md:mx-0
                mb-6 drop-shadow-xl
                anim-floatSm sm:anim-float
                [animation:floatSm_6s_ease-in-out_infinite] sm:[animation:float_6s_ease-in-out_infinite]
              "
              loading="eager"
            />
            <h1 className="m-0 mb-4 text-[clamp(32px,5.6vw,58px)] font-extrabold leading-tight relative">
              <span
                className="
      inline-block text-transparent bg-clip-text
      bg-gradient-to-r from-[#ff7a18] via-[#ff8c1a] to-[#ffae42]
      drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]
    "
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow:
                    "1px 1px 0 #fff2, -1px -1px 0 #0003, 0 0 15px rgba(255,122,24,0.25)",
                }}
              >
                Profesjonalne układanie płytek
              </span>
              <br />
              <span className="text-white">Łukasz Chmura</span>
            </h1>

            {/* AKAPIT z delikatnym podświetleniem + akcenty w kolorze */}
            <p className="max-w-[700px] mx-auto md:mx-0 mb-8 text-[18px] sm:text-[19px] leading-8 text-white/90 relative anim-rise [animation:riseIn_.75s_.08s_ease-out_forwards] opacity-0">
              <span
                className="absolute inset-0 -z-10 blur-2xl opacity-20 bg-gradient-to-r from-accent to-accent2"
                aria-hidden="true"
              />
              Do każdego zlecenia podchodzę z pełnym zaangażowaniem i{" "}
              <span className="text-accent font-semibold">
                dbałością o szczegóły
              </span>{" "}
              — <span className="text-accent2 font-semibold">dokładność</span> i{" "}
              <span className="text-accent font-semibold">
                estetyka wykonania
              </span>{" "}
              to dla mnie priorytet. Zawsze dotrzymuję terminów, a moim celem
              jest{" "}
              <span className="text-accent2 font-semibold">
                zadowolenie klienta
              </span>{" "}
              oraz solidny efekt, który posłuży na lata.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start anim-rise [animation:riseIn_.8s_.14s_ease-out_forwards] opacity-0">
              <a
                href="#kontakt"
                className="inline-block px-8 py-3 font-semibold tracking-wide text-white rounded-full
                           bg-[var(--color-accent)]
                           border border-white/10 shadow-[0_6px_28px_rgba(255,122,24,0.5)]
                           transition will-change-transform hover:-translate-y-[3px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                Skontaktuj się
              </a>
              <a
                href="#galeria"
                className="hidden sm:inline-block px-8 py-3 font-semibold tracking-wide rounded-full
             bg-transparent text-[var(--color-text)]
             border border-white/15 hover:border-white/30
             transition will-change-transform hover:-translate-y-[3px]
             focus:outline-none focus-visible:ring-2 focus-visible:ring-accent2/60"
              >
                Zobacz realizacje
              </a>
            </div>
          </div>

          {/* PRAWA KOLUMNA — mozaika zdjęć z miękką maską na krawędziach */}
          <div className="relative md:justify-self-end w-full max-w-[560px] hidden mx-auto md:mx-0 md:block">
            <div className="ring-lights pointer-events-none" aria-hidden />
            <div
              className="
                grid grid-cols-3 gap-3 perspective-900
                [mask-image:radial-gradient(120%_100%_at_50%_50%,#000_70%,transparent_100%)]
              "
            >
              {[
                "/images/lazienka1.jpg",
                "/images/lazienka2.jpg",
                "/images/lazienka3.jpg",
                "/images/lazienka4.jpg",
                "/images/lazienka5.jpg",
                "/images/lazienka6.jpg",
              ].map((src, i) => (
                <div
                  key={src}
                  className={`
                    group relative overflow-hidden rounded-xl2 shadow-[var(--shadow-card)]
                    ${i % 3 === 0 ? "row-span-2" : ""}
                    will-change-transform
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

        {/* scroll cue */}
        <a
          href="#uslugi"
          className="scroll-cue absolute left-1/2 -translate-x-1/2 bottom-4 text-white/70 hover:text-white transition"
          aria-label="Przejdź do sekcji Usługi"
        >
          <span className="inline-block text-sm tracking-wide">Przewiń</span>
          <svg
            className="mx-auto mt-1 animate-[nudge_1.6s_ease-in-out_infinite]"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>
    </>
  );
}
