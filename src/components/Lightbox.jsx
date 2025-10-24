export default function Lightbox({
  open,
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  counter, // np. "1 / 10"
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm select-none"
      role="dialog"
      aria-label="Podgląd zdjęcia"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <style>{`
        :root{
          --safe-left: env(safe-area-inset-left, 0px);
          --safe-right: env(safe-area-inset-right, 0px);
          --safe-top: env(safe-area-inset-top, 0px);
        }
        /* Strzałki jak w galerii: brak tła/ramek, tylko znak i duży hitbox */
        .lb-arrow{
          position:absolute; top:50%; transform:translateY(-50%);
          z-index:10000; color:rgba(255,255,255,0.9);
          background:none; border:0; line-height:1;
          user-select:none; -webkit-tap-highlight-color:transparent; touch-action:manipulation;
          transition:color .15s ease, opacity .15s ease, transform .12s ease;
          padding:18px; /* duży hitbox na dotyk */
        }
        .lb-arrow:hover{ color:rgb(251,146,60); } /* orange-400 */
        .lb-arrow:active{ transform:translateY(-50%) scale(0.98); }
        .lb-left{  left:  calc(8px + var(--safe-left)); }
        .lb-right{ right: calc(8px + var(--safe-right)); }

        /* Przycisk zamknięcia: też transparentny */
        .lb-close{
          position:absolute; right:calc(10px + var(--safe-right)); 
          top:calc(10px + var(--safe-top));
          color:#fff; background:none; border:0; line-height:1;
          font-weight:300; transition:transform .15s ease, opacity .15s ease;
        }
        .lb-close:hover{ transform:scale(1.08); }
        .lb-close:active{ transform:scale(0.96); }

        /* Rozmiary typografii/hitboxów */
        @media (max-width: 639px){
          .lb-arrow{ font-size:56px; padding:22px; }   /* mobile */
          .lb-close{ font-size:40px; padding:10px; }
        }
        @media (min-width: 640px){
          .lb-arrow{ font-size:96px; padding:14px; }   /* desktop/tablet */
          .lb-close{ font-size:48px; padding:12px; }
        }
      `}</style>

      {/* Zamknij */}
      <button
        className="lb-close"
        aria-label="Zamknij"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
      >
        ×
      </button>

      {/* Poprzednie */}
      <button
        className="lb-arrow lb-left"
        aria-label="Poprzednie zdjęcie"
        onClick={(e) => {
          e.stopPropagation();
          onPrev?.();
        }}
      >
        ‹
      </button>

      {/* Obraz */}
      <img
        src={src}
        alt={alt ?? "Podgląd zdjęcia"}
        className="max-w-[95vw] max-h-[88vh] sm:max-w-[92vw] sm:max-h-[88vh] rounded-[12px] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      />

      {/* Następne */}
      <button
        className="lb-arrow lb-right"
        aria-label="Następne zdjęcie"
        onClick={(e) => {
          e.stopPropagation();
          onNext?.();
        }}
      >
        ›
      </button>

      {/* Licznik */}
      {counter && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-white/85 font-medium tracking-wide">
          {counter}
        </span>
      )}
    </div>
  );
}
