import { useEffect, useRef, useState } from "react";

function ElfsightReviews() {
  const mountRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1) Szanuj Data Saver
    if ("connection" in navigator && navigator.connection.saveData) return;

    let io, idleTimer, timeout;

    const load = () => {
      if (loaded) return;
      setLoaded(true);

      // wstawiamy platform.js tylko raz
      if (!document.getElementById("elfsight-platform-js")) {
        const s = document.createElement("script");
        s.id = "elfsight-platform-js";
        s.src = "https://elfsightcdn.com/platform.js";
        s.defer = true; // lepsze niż async dla przewidywalności inicjalizacji
        document.body.appendChild(s);
      } else {
        // jeśli skrypt już jest, Elfsight sam doinicjalizuje nowe kontenery
        // zwykle nie trzeba nic robić
      }

      // porządki
      io?.disconnect();
      clearTimeout(timeout);
      if (idleTimer) cancelIdleCallback(idleTimer);
    };

    // 2) Ładowanie, gdy sekcja zbliża się do viewportu
    io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && load(),
      { rootMargin: "400px 0px" } // startuje wcześniej, żeby nie było „pustki”
    );
    io.observe(mountRef.current);

    // 3) Fallback po bezczynności (np. brak scrolla) – 5s
    timeout = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleTimer = requestIdleCallback(load, { timeout: 2000 });
      } else {
        load();
      }
    }, 5000);

    return () => {
      io?.disconnect();
      clearTimeout(timeout);
      if (idleTimer) cancelIdleCallback(idleTimer);
    };
  }, [loaded]);

  return (
    <section aria-label="Opinie klientów">
      {/* Placeholder o stałej wysokości, żeby nie było CLS */}
      <div
        ref={mountRef}
        style={{ minHeight: 360 }}
        className="relative"
      >
        {/* Kontener Elfsight */}
        <div
          className="elfsight-app-00df572b-96d6-4ba0-b952-63c6ae45b188"
          data-elfsight-app-lazy
        />

        {/* Fallback na żądanie użytkownika (opcjonalnie) */}
        {!loaded && (
          <button
            onClick={() => {
              // ręczne doładowanie na klik
              const evt = new Event("click");
              mountRef.current?.dispatchEvent(evt);
            }}
            className="absolute inset-x-0 bottom-3 mx-auto w-max px-4 py-2 rounded-md bg-white/10 hover:bg-white/15 backdrop-blur border border-white/20"
          >
            Załaduj opinie
          </button>
        )}
      </div>
      <noscript>Włącz JavaScript, aby zobaczyć opinie.</noscript>
    </section>
  );
}

export default ElfsightReviews;
