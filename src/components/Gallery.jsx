import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "https://admin.chmura-glazura.pl";

// =============================================
// Lekki Lightbox
// =============================================
function Lightbox({ open, src, alt, onClose, onPrev, onNext, counter }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-black/85"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="absolute top-5 right-6 px-3 py-1.5 text-3xl text-white bg-white/15 border border-white/25 rounded-lg hover:bg-white/20"
        onClick={onClose}
      >
        ×
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-14 text-4xl text-white bg-white/15 border border-white/25 rounded-xl hover:bg-white/20"
        onClick={onPrev}
      >
        ‹
      </button>
      <img
        src={src}
        alt={alt ?? "Podgląd zdjęcia"}
        className="max-w-[92vw] max-h-[90vh] rounded-lg shadow-2xl"
      />
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-14 text-4xl text-white bg-white/15 border border-white/25 rounded-xl hover:bg-white/20"
        onClick={onNext}
      >
        ›
      </button>
      {counter && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 text-sm bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
          {counter}
        </span>
      )}
    </div>
  );
}

// =============================================
// Komponent główny
// =============================================
export default function Gallery({ title = "Realizacje" }) {
  const [albums, setAlbums] = useState(null);
  const [open, setOpen] = useState(false);
  const [albumIdx, setAlbumIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);

  // ---- Pobieranie albumów z API ----
  useEffect(() => {
    const url = `${API_BASE}/api/public/albums`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("404");
        return r.json();
      })
      .then((data) => {
        // poprawiamy linki
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

  const openAlbum = (i, startAt = 0) => {
    setAlbumIdx(i);
    setImgIdx(startAt);
    setOpen(true);
  };
  const close = () => setOpen(false);
  const prev = () => setImgIdx((i) => ((i - 1 + total) % total));
  const next = () => setImgIdx((i) => ((i + 1) % total));

  // Klawiatura
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, total]);

  return (
    <section id="realizacje" className="text-white">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-[clamp(22px,2.5vw,32px)] font-bold tracking-wide">
          {title}
        </h2>

        {/* STANY */}
        {albums === null ? (
          <p className="text-center text-white/70">Ładuję realizacje…</p>
        ) : data.length === 0 ? (
          <p className="text-center text-white/70">
            Brak opublikowanych realizacji.
          </p>
        ) : (
          <div
            className="
              grid 
              gap-6 
              justify-center 
              grid-cols-[repeat(auto-fit,minmax(260px,320px))]
              place-items-center
            "
          >
            {data.map((a, i) => (
              <article
                key={a.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-lg cursor-pointer w-full max-w-[320px] hover:scale-[1.02] transition-transform"
                onClick={() => openAlbum(i, 0)}
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={a.images?.[0]?.thumbUrl || a.images?.[0]?.fileUrl}
                    alt={a.title || "Realizacja"}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <h3 className="text-white font-semibold truncate">
                      {a.title || "Realizacja"}
                    </h3>
                    <span className="text-white/90 text-xs px-2 py-1 rounded-full bg-black/40 border border-white/10">
                      {a.images?.length || 0}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
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
