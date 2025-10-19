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
    script.src = "https://cdn.shapo.io/js/embed.js"; // <— Twój kod
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
        Opinie
      </h2>
      {/* TYLKO kontener na widget */}
      <div id="shapo-widget-26c17ff89dfbbfc83455"></div>
      <script
        id="shapo-embed-js"
        type="text/javascript"
        src="https://cdn.shapo.io/js/embed.js"
        defer
      ></script>
      <div ref={containerRef} />
    </section>
  );
}
