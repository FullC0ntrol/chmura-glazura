const tiles = [
  {title:"Łazienki od A do Z", text:"Od projektu, przez instalacje i hydroizolację, po układanie płytek i montaż armatury."},
  {title:"Układanie płytek", text:"Ściany, podłogi, prysznice, gres i ceramika, również wielkie formaty i mozaiki."},
  {title:"Naprawy i renowacje", text:"Wymiana płytek, fug i silikonów, korekty oraz odświeżanie istniejących łazienek."},
];

export default function Services(){
  return (
    <div className="container">
      <h2 className="mb-4 text-center text-[clamp(22px,2.5vw,32px)]">Co robimy</h2>

      {/* Tip: dopisz tu rozbudowę oferty – listy, ikony, małe zdjęcia realizacji itp. */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((t)=>(
          <div key={t.title} className="p-5 bg-panel border border-white/10 rounded-xl2 shadow-card hover:-translate-y-1.5 hover:shadow-2xl transition">
            <h3 className="mt-2 mb-1 text-[18px] text-accent2">{t.title}</h3>
            <p className="m-0 text-muted">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
