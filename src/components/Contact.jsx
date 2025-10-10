export default function Contact() {
  return (
    <section className="container mx-auto px-4">
      <div
        className="relative mx-auto max-w-4xl text-center p-6 sm:p-8 md:p-12 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden border border-white/10"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,122,24,0.14), transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,194,255,0.14), transparent 60%), linear-gradient(160deg, rgba(21,23,31,0.92), rgba(15,17,21,1))",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,122,24,0.05), rgba(0,194,255,0.06))",
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <h2 className="m-0 mb-3 text-[clamp(26px,4vw,40px)] font-extrabold tracking-wide uppercase bg-gradient-to-r from-accent2 to-accent bg-clip-text text-accent">
            Skontaktuj się z nami
          </h2>
          <div className="w-160 h-[3px] mx-auto mb-4 rounded bg-gradient-to-t from-accent to-accent2" />

          <p className="opacity-95 text-[15px] sm:text-base leading-relaxed">
            Bezpłatna wycena i doradztwo materiałowe. Odpowiadamy szybko — zwykle tego samego dnia.
          </p>

          {/* CTA: równe szerokości na desktopie */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 items-stretch gap-3 my-6 max-w-2xl mx-auto sm:[&>a]:w-full"
            aria-label="Szybki kontakt"
          >
            <a className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-[#111] bg-gradient-to-r from-accent to-[#ffb703] shadow-[0_6px_18px_rgba(255,122,24,.25)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" href="tel:+48600000000" aria-label="Zadzwoń do nas">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 12.35 12.35 0 003.89.62 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 12.35 12.35 0 00.62 3.89 1 1 0 01-.21 1.11l-2.29 2.29z"/></svg>
              Zadzwoń
            </a>

            <a className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-text bg-white/10 border border-white/15 transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" href="mailto:kontakt@chmuraglazura.pl" aria-label="Napisz e-mail">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 7 8-7v10H4z"/></svg>
              Napisz
            </a>

            <a className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-accent2 bg-[rgba(0,194,255,.16)] border border-[rgba(0,194,255,.25)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent2" href="https://wa.me/48600000000" target="_blank" rel="noopener noreferrer" aria-label="Napisz na WhatsApp">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M20 4A10 10 0 004 20l-1 4 4-1a10 10 0 0013-19zm-6.37 13.3c-2.73 0-5.27-1.35-6.89-3.6a8.4 8.4 0 01-1.74-5.14 8.42 8.42 0 0116.83 0 8.42 8.42 0 01-8.2 8.74zm4.14-3.53l-.78-.39a.5.5 0 00-.58.1l-.44.45a7 7 0 01-3.08-3.08l.45-.44a.5.5 0 00.1-.58l-.39-.78a.5.5 0 00-.45-.26 1.7 1.7 0 00-.9.26c-.26.17-.52.45-.78.78a2.6 2.6 0 00-.52 1.62 4.5 4.5 0 00.52 1.62 8.5 8.5 0 003.9 3.9 4.5 4.5 0 001.62.52 2.6 2.6 0 001.62-.52c.33-.26.61-.52.78-.78a1.7 1.7 0 00.26-.9.5.5 0 00-.26-.45z"/></svg>
              WhatsApp
            </a>
          </div>

          {/* Dane kontaktowe: stała kolumna etykiet od md w górę */}
          <dl aria-label="Dane kontaktowe" className="mx-auto my-6 max-w-2xl text-[15px] sm:text-[16px] text-text/95">
            <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] md:grid-cols-[200px,1fr] items-center gap-x-4 gap-y-2 py-2">
              <dt className="text-muted font-semibold sm:text-center">Telefon:</dt>
              <dd>
                <a className="text-accent2 hover:text-accent underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent2 rounded font-bold" href="tel:+48735583713">
                  +48 735 583 713
                </a>
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] md:grid-cols-[200px,1fr] items-center gap-x-4 gap-y-2 py-2">
              <dt className="text-muted font-semibold sm:text-center">E-mail:</dt>
              <dd>
                <a className="text-accent2 hover:text-accent underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent2 rounded font-bold" href="mailto:chmuraglazura@gmail.com">
                  chmuraglazura@gmail.com
                </a>
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] md:grid-cols-[200px,1fr] items-center gap-x-4 gap-y-2 py-2">
              <dt className="text-muted font-semibold sm:text-center">Obsługiwany obszar:</dt>
              <dd className="font-bold">Bielsko i okolice</dd>
            </div>
          </dl>

          <ul className="flex flex-wrap justify-center gap-2">
            {["Wycena gratis", "Gwarancja", "Faktura VAT"].map((item) => (
              <li key={item} className="px-2.5 py-1 rounded bg-white/10 border border-white/15 text-sm sm:text-[15px]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
