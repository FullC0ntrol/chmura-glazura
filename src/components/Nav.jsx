import { useState, useEffect } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  // zamknij na zmianę szerokości / nawigację
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 700) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo-mark.svg"
            width={46}
            height={46}
            alt="Chmura Glazura"
          />
          <div>
            <div className="font-bold tracking-wide text-[18px]">
              Chmura Glazura
            </div>
            <div className="text-[12px] text-muted">
              glazura • łazienki • płytki
            </div>
          </div>
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-5 text-muted">
          <a
            className="px-3 py-2 rounded hover:bg-white/5 hover:text-text"
            href="#uslugi"
          >
            Usługi
          </a>
          <a
            className="px-3 py-2 rounded hover:bg-white/5 hover:text-text"
            href="#galeria"
          >
            Realizacje
          </a>
          <a
            className="px-3 py-2 rounded hover:bg-white/5 hover:text-text"
            href="#opinie"
          >
            Opinie
          </a>
          <a
            className="px-3 py-2 bg-accent text-white rounded font-bold hover:bg-white/5 hover:text-text"
            href="#kontakt"
          >
            Kontakt
          </a>
        </nav>

        {/* Burger */}
        <button
          className="md:hidden px-2 py-1 text-text border border-white/25 rounded"
          aria-controls="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        {/* Mobile menu */}
        {open && (
          <nav
            id="menu"
            aria-label="Główne"
            className="absolute top-[60px] right-[4%] flex flex-col gap-2 p-3 bg-[#151923] rounded-lg border border-white/10 md:hidden"
          >
            {[
              ["#uslugi", "Usługi"],
              ["#galeria", "Realizacje"],
              ["#opinie", "Opinie"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={`px-3 py-2 rounded transition ${
                  label === "Kontakt"
                    ? "bg-accent text-white font-semibold shadow-md hover:bg-accent/80"
                    : "hover:bg-white/5"
                }`}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
