import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Lightbox from "./Lightbox";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function Gallery({ title = "Realizacje" }) {
  const [albums, setAlbums] = useState(null);

  // Lightbox
  const [open, setOpen] = useState(false);
  const [albumIdx, setAlbumIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  // Slider
  const trackRef = useRef(null);
  const autoTimer = useRef(null);
  const isAnimatingRef = useRef(false);
  const unlockTimer = useRef(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Press & hold
  const holdDelayTimer = useRef(null);
  const holdInterval = useRef(null);
  const holdDir = useRef(0);
  const longPressFired = useRef(false);

  // --- Data ---
  useEffect(() => {
    const url = `${API_BASE}/api/public/albums`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("404");
        return r.json();
      })
      .then((data) => {
        const mapUrl = (u) => (u?.startsWith("http") ? u : `${API_BASE}${u}`);
        const mapped = data.map((a) => ({
          ...a,
          images: (a.images || []).map((img) => ({
            ...img,
            fileUrl: mapUrl(img.fileUrl),
            thumbUrl: mapUrl(img.thumbUrl),
          })),
        }));
        setAlbums(mapped);
      })
      .catch(() => setAlbums([]));
  }, []);

  const data = useMemo(() => albums || [], [albums]);
  const current = data[albumIdx] || { images: [] };
  const total = current.images.length;

  // Lightbox
  const openAlbum = (i, startAt = 0) => {
    setAlbumIdx(i);
    setImgIdx(startAt);
    setOpen(true);
  };
  const close = () => setOpen(false);
  const prev = () => setImgIdx((i) => (i - 1 + total) % total);
  const next = () => setImgIdx((i) => (i + 1) % total);

  // Helpers
  const prefersCenter = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(min-width: 1024px)").matches; // >= lg

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  // lewy offset docelowej karty (start na mobile, center na desktopie)
  const getChildLeft = (i) => {
    const track = trackRef.current;
    if (!track) return 0;
    const child = track.children[i];
    if (!child) return 0;
    const padLeft = parseFloat(getComputedStyle(track).paddingLeft || "0");
    const baseLeft = child.offsetLeft - track.offsetLeft - padLeft;

    if (!prefersCenter()) return baseLeft;

    const centerOffset =
      baseLeft - (track.clientWidth - child.clientWidth) / 2;
    const maxScroll = track.scrollWidth - track.clientWidth;
    return clamp(centerOffset, 0, Math.max(0, maxScroll));
  };

  const scrollToIndex = useCallback(
    (i, behavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;

      const maxIdx = Math.max(0, (track.children?.length || 1) - 1);
      const safeIdx = clamp(i, 0, maxIdx);

      isAnimatingRef.current = true;
      const left = getChildLeft(safeIdx);
      track.scrollTo({ left, behavior });
      setIndex(safeIdx);

      // odblokowanie po animacji
      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = window.setTimeout(() => {
        const eps = 2;
        if (Math.abs(track.scrollLeft - left) <= eps) {
          isAnimatingRef.current = false;
        } else {
          unlockTimer.current = window.setTimeout(() => {
            isAnimatingRef.current = false;
          }, 140);
        }
      }, behavior === "auto" ? 10 : 380);
    },
    []
  );

  // Stabilne kropki (mapka) – z scrollLeft
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (isAnimatingRef.current) return;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;

          const padLeft = parseFloat(getComputedStyle(track).paddingLeft || "0");
          const sLeft = track.scrollLeft + padLeft;

          let bestIdx = 0;
          let bestDelta = Infinity;
          const items = track.children.length;
          for (let i = 0; i < items; i++) {
            const el = track.children[i];
            const elLeft = el.offsetLeft - track.offsetLeft;
            const targetLeft = prefersCenter()
              ? elLeft - (track.clientWidth - el.clientWidth) / 2
              : elLeft;
            const delta = Math.abs(targetLeft - sLeft);
            if (delta < bestDelta) {
              bestDelta = delta;
              bestIdx = i;
            }
          }
          setIndex(bestIdx);
        });
      }
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance (co 4.2 s)
  const startAuto = useCallback(() => {
    if (autoTimer.current) return;
    autoTimer.current = setInterval(() => {
      if (paused || !data.length) return;
      const last = data.length - 1;
      if (index < last) scrollToIndex(index + 1);
      else scrollToIndex(0, "auto");
    }, 4200);
  }, [data.length, index, paused, scrollToIndex]);

  const stopAuto = useCallback(() => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
      autoTimer.current = null;
    }
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  // Pauza na hover/touch
  const onEnter = () => setPaused(true);
  const onLeave = () => setPaused(false);

  // Przycisk: click = 1 krok; long-press => seria
  const pointerDown = (dir) => (e) => {
    e.preventDefault();
    longPressFired.current = false;
    holdDir.current = dir;

    holdDelayTimer.current = setTimeout(() => {
      longPressFired.current = true;
      holdInterval.current = setInterval(() => {
        setIndex((prev) => {
          const nextIdx =
            dir === -1
              ? prev > 0
                ? prev - 1
                : (data.length || 1) - 1
              : (prev + 1) % (data.length || 1);
          scrollToIndex(nextIdx);
          return nextIdx;
        });
      }, 180);
    }, 300);
  };

  const pointerUp = () => {
    if (!longPressFired.current) {
      const nextIdx =
        holdDir.current === -1
          ? index > 0
            ? index - 1
            : (data.length || 1) - 1
          : (index + 1) % (data.length || 1);
      scrollToIndex(nextIdx);
    }
    clearTimeout(holdDelayTimer.current);
    holdDelayTimer.current = null;
    if (holdInterval.current) clearInterval(holdInterval.current);
    holdInterval.current = null;
    longPressFired.current = false;
    holdDir.current = 0;
  };

  return (
    <section id="realizacje" className="text-white py-12">
      <style>{`
        :root {
          --card-radius: 18px;
          --safe-left: env(safe-area-inset-left, 0px);
          --safe-right: env(safe-area-inset-right, 0px);
        }
        .cg-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .cg-no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        .cg-track { will-change: scroll-position; scroll-behavior: smooth; }
        .cg-card img { backface-visibility: hidden; transform: translateZ(0); }
        @media (prefers-reduced-motion: reduce) { .cg-track { scroll-behavior: auto !important; } }

        .gl-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          color: rgba(255,255,255,0.85);
          background: none; border: 0; line-height: 1;
          user-select: none; -webkit-tap-highlight-color: transparent; touch-action: manipulation;
          transition: color .15s ease, opacity .15s ease;
        }
        .gl-arrow:hover { color: rgb(251,146,60); }
        .gl-left  { left:  calc(8px + var(--safe-left)); }
        .gl-right { right: calc(8px + var(--safe-right)); }

        /* Mobile: widoczne zawsze; Desktop: fade-in na hover */
        @media (max-width: 1023px) { .gl-arrow { font-size: 42px; padding: 18px; opacity: 1; } }
        @media (min-width: 1024px) { .gl-arrow { font-size: 76px; padding: 14px; opacity: 0; } .group:hover .gl-arrow { opacity: 1; } }
      `}</style>

      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-center text-[clamp(24px,3vw,36px)] font-semibold tracking-tight">
          {title}
        </h2>

        {albums === null ? (
          <div className="h-[140px] grid place-items-center">
            <p className="text-white/70">Ładuję realizacje…</p>
          </div>
        ) : data.length === 0 ? (
          <div className="h-[140px] grid place-items-center">
            <p className="text-white/70">Brak opublikowanych realizacji.</p>
          </div>
        ) : (
          <div
            className="relative group"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onTouchStart={onEnter}
            onTouchEnd={onLeave}
          >
            {/* Strzałki — bez tła/ramek, click vs long-press */}
            <button
              type="button"
              className="gl-arrow gl-left"
              aria-label="Poprzednia realizacja"
              onPointerDown={pointerDown(-1)}
              onPointerUp={pointerUp}
              onPointerCancel={pointerUp}
              onPointerLeave={(e) => {
                if (e.pointerType !== "mouse") return;
                pointerUp();
              }}
            >
              ‹
            </button>

            <button
              type="button"
              className="gl-arrow gl-right"
              aria-label="Następna realizacja"
              onPointerDown={pointerDown(1)}
              onPointerUp={pointerUp}
              onPointerCancel={pointerUp}
              onPointerLeave={(e) => {
                if (e.pointerType !== "mouse") return;
                pointerUp();
              }}
            >
              ›
            </button>

            {/* Track – snap start mobile, snap center desktop, równe karty */}
            <div
              ref={trackRef}
              className="
                cg-track cg-no-scrollbar
                flex gap-4 sm:gap-5 lg:gap-6
                overflow-x-auto rounded-2xl
                pb-1 pt-1
                pl-[52px] pr-[52px] sm:pl-2 sm:pr-2
                snap-x snap-mandatory
              "
            >
              {data.map((a, i) => {
                const dateTxt = a.createdAt
                  ? new Date(a.createdAt).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "";
                const cover = a.images?.[0]?.thumbUrl || a.images?.[0]?.fileUrl || "";

                return (
                  <article
                    key={a.id}
                    onClick={() => openAlbum(i, 0)}
                    className="
                      cg-card relative cursor-pointer
                      min-w-[82vw] xs:min-w-[72vw]
                      sm:min-w-[320px] sm:max-w-[360px]
                      lg:min-w-[260px] lg:max-w-[300px]
                      snap-start lg:snap-center
                      overflow-hidden rounded-[var(--card-radius)]
                      border border-white/10 bg-white/[0.04] backdrop-blur
                      shadow-[0_8px_24px_rgba(0,0,0,0.30)]
                      transition-transform duration-300
                    "
                    aria-label={a.title || "Realizacja"}
                    role="button"
                  >
                    <div className="relative aspect-[4/3]">
                      <img
                        src={cover}
                        alt={a.title || "Realizacja"}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-white font-medium truncate">
                            {a.title || "Realizacja"}
                          </h3>
                          <span className="text-white/90 text-[11px] px-2 py-0.5 rounded-full bg-black/50 border border-white/10 shrink-0">
                            {a.images?.length || 0}
                          </span>
                        </div>
                        {dateTxt && (
                          <div className="text-[11px] text-white/75 mt-1">
                            Data realizacji: <span className="font-medium">{dateTxt}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Kropki */}
            <div className="flex justify-center gap-1.5 mt-4">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-white/90" : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Idź do slajdu ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open && total > 0}
        src={current.images?.[imgIdx]?.fileUrl}
        alt={`${current.title ?? "Realizacja"} — zdjęcie ${imgIdx + 1}`}
        onClose={close}
        onPrev={prev}
        onNext={next}
        counter={`${imgIdx + 1} / ${total}`}
      />
    </section>
  );
}
