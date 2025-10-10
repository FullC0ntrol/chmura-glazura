export default function Lightbox({open, src, alt, onClose, onPrev, onNext}){
  if(!open) return null;
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-black/85"
      role="dialog" aria-label="Podgląd zdjęcia" aria-hidden={!open}
      onClick={(e)=>{ if(e.target===e.currentTarget) onClose(); }}
    >
      <button className="absolute top-5 right-6 px-3 py-1.5 text-3xl text-white bg-white/15 border border-white/25 rounded-lg hover:bg-white/20" aria-label="Zamknij" onClick={onClose}>×</button>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-14 text-4xl text-white bg-white/15 border border-white/25 rounded-xl hover:bg-white/20" aria-label="Poprzednie zdjęcie" onClick={onPrev}>‹</button>
      <img src={src} alt={alt ?? "Podgląd zdjęcia"} className="max-w-[92vw] max-h-[90vh] rounded-lg shadow-2xl"/>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center w-12 h-14 text-4xl text-white bg-white/15 border border-white/25 rounded-xl hover:bg-white/20" aria-label="Następne zdjęcie" onClick={onNext}>›</button>
    </div>
  );
}
