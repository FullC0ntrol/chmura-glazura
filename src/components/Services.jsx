const scope = [
  { title: "Dokładna wycena prac" },
  { title: "Pomoc w wyborze materiałów wykończeniowych" },
  { title: "Ustalenie terminu i harmonogramu realizacji" },
  { title: "Przygotowanie listy zakupów niezbędnych materiałów" },
  { title: "Doradztwo w funkcjonalnych i estetycznych rozwiązaniach" },
  { title: "Stały kontakt na każdym etapie realizacji" },
];

const tiles = [
  {
    title: "Łazienki od A do Z",
    text: "Kompleksowe wykończenie łazienek – od przygotowania podłoża i hydroizolacji, po układanie płytek i montaż armatury."
  },
{
  title: "Układanie płytek",
  text: "Ściany, podłogi, prysznice oraz płytki wielkoformatowe do 60×120 cm – prace glazurnicze z precyzyjnym dopasowaniem wzoru i spoin."
},
  {
    title: "Wykończenia i detale",
    text: "Zabudowy, listwy wykończeniowe, fugowanie, silikonowanie oraz dopracowanie każdego szczegółu z dbałością o estetykę."
  },
];

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
      <path fill="currentColor" d="M9.55 16.05 5.5 12l1.4-1.4 2.65 2.65 7.6-7.6L18.55 7l-9 9Z"/>
    </svg>
  );
}

export default function Services(){
  return (
    <section className="container">
      {/* Nagłówek sekcji */}
      <header className="mb-6 text-center">
        <h2 className="mb-2 text-[clamp(22px,2.5vw,32px)] font-bold">
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text">
            Zakres usług
          </span>
        </h2>
        <p className="mx-auto max-w-[780px] text-white/90">
          Dbam o to, aby cały proces remontu przebiegał sprawnie, przejrzyście i bez stresu dla klienta.
        </p>
      </header>

      {/* Lista etapów (wytyczne klienta) */}
      <div className="mx-auto mb-10 max-w-[860px]">
        <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scope.map((item) => (
            <li key={item.title} className="flex items-start gap-3 rounded-xl bg-panel/50 border border-white/10 px-4 py-3">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <span className="text-white/95">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((t)=>(
          <article
            key={t.title}
            className="p-5 bg-panel border border-white/10 rounded-2xl shadow-card hover:-translate-y-1 hover:shadow-2xl transition"
          >
            <h4 className="mt-1 mb-1 text-[18px] text-accent2 font-semibold">{t.title}</h4>
            <p className="m-0 text-white/80">{t.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
