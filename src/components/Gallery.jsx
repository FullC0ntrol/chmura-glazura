import { useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "./Lightbox";

const IMAGES = [
  "/images/lazienka1.jpg",
  "/images/lazienka2.jpg",
  "/images/lazienka3.jpg",
  "/images/lazienka4.jpg",
  "/images/lazienka5.jpg",
  "/images/lazienka6.jpg",
  "/images/lazienka7.jpg",
  "/images/lazienka8.jpg",
];

export default function GallerySlider({ images = IMAGES }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  // Lightbox
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  // Oblicz liczbę slajdów
  const total = images.length;

  // Szerokość pojedynczego slajdu = szerokość kontenera (1 slide na widok)
  const getSlideWidth = () => trackRef.current?.clientWidth ?? 0;

  const scrollToIndex = (i) => {
    const clamped = Math.min(Math.max(i, 0), total - 1);
    const x = clamped * getSlideWidth();
    trackRef.current?.scrollTo({ left: x, behavior: "smooth" });
  };

  const prev = () => scrollToIndex(active - 1);
  const next = () => scrollToIndex(active + 1);

  // Aktualizuj aktywny slajd przy scrollu / resize
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const w = getSlideWidth();
        const i = Math.round(el.scrollLeft / Math.max(w, 1));
        setActive(Math.min(Math.max(i, 0), total - 1));
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [total]);

  // Po resize przeskaluj i dopasuj pozycję do aktywnego indeksu
  useEffect(() => {
    const onResize = () => scrollToIndex(active);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [active, total]);

  // Klawiatura: lewo/prawo
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey, { passive: true });
    return () => window.removeEventListener("keydown", onKey);
  });

  // Preload sąsiadów (dla Lightboxa)
  useEffect(() => {
    if (!open || total === 0) return;
    const prevIdx = (idx - 1 + total) % total;
    const nextIdx = (idx + 1) % total;
    [images[prevIdx], images[nextIdx]].forEach((s) => {
      const i = new Image();
      i.src = s;
    });
  }, [open, idx, images, total]);

  return (
    <section id="realizacje" className="container py-10">
      {/* Minimalny CSS do slidera */}
      <style>{`
        .slider-track {
          scroll-snap-type: x mandatory;
          overflow-x: auto;
          overflow-y: hidden;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 100%;
          /* wygładzony moment przewijania */
          scroll-behavior: smooth;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .slide { scroll-snap-align: start; position: relative; }
        .ratio { width: 100%; aspect-ratio: 4 / 3; }
        .abs { position: absolute; inset: 0; }
        .img { width: 100%; height: 100%; object-fit: cover; }
        .ctrl {
          position: absolute; top: 50%; transform: translateY(-50%);
          display: grid; place-items: center;
          width: 42px; height: 42px; border-radius: 999px;
          background: rgba(0,0,0,.35);
          border: 1px solid rgba(255,255,255,.25);
          color: #fff; user-select: none; cursor: pointer;
          backdrop-filter: blur(4px);
        }
        .ctrl:hover { background: rgba(0,0,0,.5); }
        .ctrl:disabled { opacity: .35; pointer-events: none; }
        .ctrl-left { left: 8px; }
        .ctrl-right { right: 8px; }

        .dots { display: flex; gap: 8px; justify-content: center; margin-top: 14px; }
        .dot {
          width: 8px; height: 8px; border-radius: 999px; background: rgba(255,255,255,.35);
          border: 1px solid rgba(255,255,255,.2); cursor: pointer;
        }
        .dot.active { background: var(--color-accent, #ff7a18); border-color: transparent; }
      `}</style>

      <h2 className="mb-4 text-center text-[clamp(22px,2.5vw,32px)] font-bold">Realizacje</h2>

      <div className="relative">
        {/* TOR SLIDERA */}
        <div ref={trackRef} className="slider-track no-scrollbar rounded-xl2 shadow-[var(--shadow-card)] hero-gradient">
          {images.map((src, i) => (
            <div key={src + i} className="slide">
              {/* rezerwacja miejsca (aspect-ratio) → brak skoków layoutu */}
              <div className="ratio" />
              {/* zdjęcie */}
              <div className="abs">
                <img
                  src={src}
                  alt={`Łazienka ${i + 1} — realizacja Chmura Glazura`}
                  className="img"
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  onClick={() => { setIdx(i); setOpen(true); }}
                  style={{ cursor: "zoom-in" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Strzałki */}
        <button className="ctrl ctrl-left" onClick={prev} aria-label="Poprzedni slajd" disabled={active === 0}>
          ‹
        </button>
        <button className="ctrl ctrl-right" onClick={next} aria-label="Następny slajd" disabled={active === total - 1}>
          ›
        </button>
      </div>

      {/* Kropki */}
      <div className="dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === active ? "active" : ""}`}
            aria-label={`Przejdź do slajdu ${i + 1}`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <Lightbox
          open={open}
          src={images[idx]}
          alt={`Łazienka ${idx + 1} — realizacja`}
          onClose={() => setOpen(false)}
          onPrev={() => setIdx((i) => (i - 1 + total) % total)}
          onNext={() => setIdx((i) => (i + 1) % total)}
        />
      )}
    </section>
  );
}
