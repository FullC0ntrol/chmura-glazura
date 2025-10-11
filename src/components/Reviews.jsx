import { useEffect, useRef } from "react";

export default function Reviews() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1) Czyścimy kontener (gdybyś wracał na stronę)
    container.innerHTML = "";

    // 2) Upewnij się, że nie ma innych instancji skryptu (opcjonalne)
    //    (Zostawiamy, ale nie jest konieczne jeśli wstrzykujemy do kontenera)
    // document.querySelectorAll('script[src^="https://cdn.trustindex.io/loader.js"]').forEach(s => s.remove());

    // 3) Dodajemy wewnątrz kontenera wymagany znacznik .ti-widget
    const widgetDiv = document.createElement("div");


    // 4) WSTRZYKUJEMY SKRYPT DO KONTENERA (kluczowa zmiana!)
    const script = document.createElement("script");
    script.src = "https://cdn.trustindex.io/loader.js?9e7d810558a693930a36c71ff82"; // <— Twój kod
    script.async = true;
    script.defer = true;
    container.appendChild(script);

    // 5) Sprzątanie przy odmontowaniu
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="container">
      <h2 className="mb-4 text-center text-[clamp(22px,2.5vw,32px)] font-bold">
        Opinie klientów
      </h2>
      <h3 className="text-center">(Tymczasowe)</h3>
      {/* TYLKO kontener na widget */}
      <div ref={containerRef} />
    </section>
  );
}
