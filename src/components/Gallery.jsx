import {useEffect, useMemo, useState} from "react";
import Lightbox from "./Lightbox";

const images = [
  "/images/lazienka1.jpg",
  "/images/lazienka2.jpg",
  "/images/lazienka3.jpg",
  "/images/lazienka4.jpg",
  "/images/lazienka5.jpg",
  "/images/lazienka6.jpg",
  "/images/lazienka7.jpg",
  "/images/lazienka8.JPG",
];

export default function Gallery(){
  const [open,setOpen] = useState(false);
  const [idx,setIdx] = useState(0);

  const src = images[idx];
  const alt = `Łazienka ${idx+1} — realizacja Chmura Glazura`;

  // preload sąsiadów
  useEffect(()=>{
    if(!open) return;
    const prev = images[(idx - 1 + images.length) % images.length];
    const next = images[(idx + 1) % images.length];
    [prev,next].forEach(s => { const i = new Image(); i.src = s; });
  },[open,idx]);

  useEffect(()=>{
    const onKey = (e)=>{
      if(!open) return;
      if(e.key==="Escape") setOpen(false);
      if(e.key==="ArrowLeft") setIdx(i => (i-1+images.length)%images.length);
      if(e.key==="ArrowRight") setIdx(i => (i+1)%images.length);
    };
    window.addEventListener("keydown", onKey, {passive:true});
    return ()=> window.removeEventListener("keydown", onKey);
  },[open]);

  return (
    <div className="container">
      <h2 className="mb-4 text-center text-[clamp(22px,2.5vw,32px)]">Realizacje</h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {images.map((s,i)=>(
          <button
            key={s}
            className="relative aspect-[4/3] overflow-hidden cursor-zoom-in rounded-lg bg-[#0e1117] shadow-lg hover:-translate-y-0.5 hover:shadow-2xl transition"
            onClick={()=>{ setIdx(i); setOpen(true); }}
            aria-label={`Powiększ zdjęcie ${i+1}`}
          >
            <img src={s} alt={`Łazienka ${i+1} — realizacja Chmura Glazura`} className="w-full h-full object-cover"/>
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        src={src}
        alt={alt}
        onClose={()=>setOpen(false)}
        onPrev={()=>setIdx(i => (i-1+images.length)%images.length)}
        onNext={()=>setIdx(i => (i+1)%images.length)}
      />
    </div>
  );
}
