import {useEffect} from "react";

const reviews = [
  {source:"Google", date:"2025-05-01", author:"Anna", text:"Świetna robota! Łazienka wykonana perfekcyjnie, płytki równo i czysto. Polecam!"},
  {source:"Facebook", date:"2025-06-12", author:"Marek", text:"Bardzo dokładnie! Wszystko na poziomie, terminowo i profesjonalnie."},
  {source:"Google", date:"2025-07-20", author:"Paweł", text:"Taras i łazienka w pakiecie — prace zgodnie z planem, świetna komunikacja i super efekt."},
];

function Stars(){ return (
  <div className="flex items-center gap-1 text-yellow-400">
    {Array.from({length:5}).map((_,i)=><svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
  </div>
);}

export default function Reviews(){
  // (Opcjonalnie) Elfsight – jeśli chcesz widget, wstaw <div id="elfsight"></div> i załaduj skrypt:
  // useEffect(() => { const s=document.createElement('script'); s.src="https://elfsightcdn.com/platform.js"; s.async=true; document.body.appendChild(s); return ()=>document.body.removeChild(s); },[]);

  return (
    <div className="container">
      <h2 className="mb-4 text-left text-[clamp(22px,2.5vw,32px)]">Opinie klientów</h2>

      {/* Własne karty opinii */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((r,i)=>(
          <article key={i} itemProp="review" itemScope itemType="https://schema.org/Review"
            className="p-5 bg-panel border border-white/10 rounded-xl2 shadow-card"
          >
            <Stars/>
            <p className="mt-2" itemProp="reviewBody"><strong>{r.text.split(" — ")[0]}</strong>{r.text.includes(" — ") ? ` — ${r.text.split(" — ")[1]}` : ""}</p>
            <div className="mt-2 text-[13px] text-muted">
              <span className="inline-block px-2 py-0.5 rounded bg-white/5 border border-white/10 mr-1">{r.source}</span>
              • <time dateTime={r.date} itemProp="datePublished" className="mx-1">{new Date(r.date).toLocaleDateString("pl-PL",{day:"numeric",month:"long",year:"numeric"})}</time>
              • <span itemProp="author">{r.author}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
