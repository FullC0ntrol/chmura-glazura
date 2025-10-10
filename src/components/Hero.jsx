import {useState} from "react";

export default function Hero(){
  const [alt,setAlt] = useState(false);

  return (
    <section id="start" className="relative min-h-[100svh] flex items-center justify-center text-center overflow-hidden hero-gradient">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,122,24,0.08)] to-[rgba(0,194,255,0.08)]"/>
      <div className="container relative z-10 flex flex-col items-center gap-0 px-5">
        <img src="/logo-lockup.svg" alt="Chmura Glazura — logo" className="w-[min(80%,380px)] mb-6 drop-shadow-xl animate-[float_6s_ease-in-out_infinite]" />
        <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-30px)}}`}</style>

        <h1 className="m-0 mb-5 text-[clamp(34px,4vw,56px)] font-extrabold leading-tight bg-gradient-to-r from-accent to-accent2 bg-clip-text text-accent">
          {alt ? (
            <> <span className="text-accent bg-gradient-to-r from-accent to-accent2 bg-clip-text z-99">Tak piękna łazienka, że opada szczęka?</span><br/>To dobra glazura – Łukasz Chmura </>
          ) : (
            <> <span className="text-accent bg-gradient-to-r from-accent to-accent2 bg-clip-text z-99">Perfekcyjna glazura</span> i łazienki, które zachwycają</>
          )}
        </h1>

        <button
          onClick={()=>setAlt(v=>!v)}
          className="mb-4 inline-flex items-center px-4 py-2 rounded-full border border-accent2/50 text-white/90 hover:translate-y-[-3px] transition"
        >
          Opcja numer 2 :D
        </button>

        <p className="max-w-[700px] mx-auto mb-9 text-[19px] leading-8 opacity-95">
          Tworzymy łazienki od stanu surowego po ostatnią fugę — z precyzją, estetyką i pasją do detali.
          Zaufaj specjalistom, którzy potrafią połączyć funkcjonalność z designem.
        </p>

        <a href="#kontakt" className="inline-block px-9 py-3 font-semibold tracking-wide text-white rounded-full bg-accent border border-accent2/40 shadow-[0_4px_18px_rgba(255,122,24,0.4)] transition hover:-translate-y-[3px] hover:shadow-[0_6px_25px_rgba(255,122,24,0.6)]">Skontaktuj się z nami</a>
      </div>
    </section>
  );
}
