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
            Bezpłatna wycena i doradztwo materiałowe. Odpowiadamy szybko —
            zwykle tego samego dnia.
          </p>

          {/* CTA: równe szerokości na desktopie */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 items-stretch gap-3 my-6 max-w-2xl mx-auto sm:[&>a]:w-full"
            aria-label="Szybki kontakt"
          >
            <a
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-[#111] bg-gradient-to-r from-accent to-[#ffb703] shadow-[0_6px_18px_rgba(255,122,24,.25)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              href="tel:+48735583713"
              aria-label="Zadzwoń do nas"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 12.35 12.35 0 003.89.62 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 12.35 12.35 0 00.62 3.89 1 1 0 01-.21 1.11l-2.29 2.29z" />
              </svg>
              Zadzwoń
            </a>

            <a
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-text bg-white/10 border border-white/15 transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              href="mailto:chmuraglazura@gmail.com"
              aria-label="Napisz e-mail"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 7 8-7v10H4z" />
              </svg>
              Napisz
            </a>

            <a
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-accent2 bg-[rgba(0,194,255,.16)] border border-[rgba(0,194,255,.25)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent2"
              href="tel:+48735583713"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Napisz na WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 4A10 10 0 004 20l-1 4 4-1a10 10 0 0013-19zm-6.37 13.3c-2.73 0-5.27-1.35-6.89-3.6a8.4 8.4 0 01-1.74-5.14 8.42 8.42 0 0116.83 0 8.42 8.42 0 01-8.2 8.74zm4.14-3.53l-.78-.39a.5.5 0 00-.58.1l-.44.45a7 7 0 01-3.08-3.08l.45-.44a.5.5 0 00.1-.58l-.39-.78a.5.5 0 00-.45-.26 1.7 1.7 0 00-.9.26c-.26.17-.52.45-.78.78a2.6 2.6 0 00-.52 1.62 4.5 4.5 0 00.52 1.62 8.5 8.5 0 003.9 3.9 4.5 4.5 0 001.62.52 2.6 2.6 0 001.62-.52c.33-.26.61-.52.78-.78a1.7 1.7 0 00.26-.9.5.5 0 00-.26-.45z" />
              </svg>
              WhatsApp
            </a>
          </div>
          <dl className="space-y-4 sm:space-y-3 md:space-y-2">
  {/* Telefon */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-700/50 pb-3">
    <dt className="text-gray-400 font-medium flex items-center gap-2">
      <i className="fa-solid fa-phone text-accent2"></i>
      Telefon:
    </dt>
    <dd>
      <a
        href="tel:+48735583713"
        className="text-accent2 hover:text-accent font-semibold tracking-wide transition-colors duration-200 underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-accent2 rounded"
      >
        +48 735 583 713
      </a>
    </dd>
  </div>

  {/* E-mail */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-700/50 pb-3">
    <dt className="text-gray-400 font-medium flex items-center gap-2">
      <i className="fa-solid fa-envelope text-accent2"></i>
      E-mail:
    </dt>
    <dd>
      <a
        href="mailto:chmuraglazura@gmail.com"
        className="text-accent2 hover:text-accent font-semibold tracking-wide transition-colors duration-200 underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-accent2 rounded"
      >
        chmuraglazura@gmail.com
      </a>
    </dd>
  </div>

  {/* Obszar */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
    <dt className="text-gray-400 font-medium flex items-center gap-2">
      <i className="fa-solid fa-map-marker-alt text-accent2"></i>
      Obsługiwany obszar:
    </dt>
    <dd className="font-bold text-white">Bielsko i okolice</dd>
  </div>
</dl>


          <ul className="flex flex-wrap justify-center gap-2">
            {["Wycena gratis", "Gwarancja", "Faktura VAT"].map((item) => (
              <li
                key={item}
                className="px-2.5 py-1 rounded bg-white/10 border border-white/15 text-sm sm:text-[15px]"
              >
                {item}
              </li>
            ))}
          </ul>
          {/* Social media */}
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61582352062633"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1877f2]/10 border border-[#1877f2]/30 text-[#1877f2] hover:bg-[#1877f2]/20 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5v1.9H17l-.4 2.9h-2.7v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>

            <a
              href="https://share.google/uqwS41zJxsoeCNHdP"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil Google / Mapy"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] hover:bg-[#4285F4]/20 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c1.59 0 3.02.55 4.15 1.63l3.09-3.09C28.5 9.18 26.17 8 23.49 8 17.86 8 13.07 12.16 11.71 17.39l3.82 2.96c.87-3.05 3.69-5.13 7.96-5.13z"
                />
                <path
                  fill="#34A853"
                  d="M37.09 24.41c0-1.07-.1-2.09-.26-3.09H23.49v5.85h7.61a6.54 6.54 0 01-2.83 4.3v3.57h4.53c2.66-2.45 4.29-6.06 4.29-10.63z"
                />
                <path
                  fill="#FBBC05"
                  d="M15.53 27.26a7.9 7.9 0 01-.41-2.49c0-.86.15-1.69.41-2.49l-3.82-2.96a11.8 11.8 0 000 10.9l3.82-2.96z"
                />
                <path
                  fill="#EA4335"
                  d="M23.49 37c3.17 0 5.84-1.05 7.78-2.95l-4.53-3.57c-1.26.86-2.88 1.37-4.74 1.37-4.27 0-7.09-2.88-7.96-5.93l-3.82 2.96C13.07 34.84 17.86 39 23.49 39z"
                />
                <path fill="none" d="M11.71 17.39z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
