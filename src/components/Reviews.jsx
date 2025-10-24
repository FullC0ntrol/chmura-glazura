import { useEffect } from "react";
import ElfsightReviews from "./ElfsightReviews";


export default function Reviews() {
  useEffect(() => {
    // --- 1️⃣ Wczytaj skrypt Shapo (jeśli nie istnieje) ---
    if (!document.getElementById("shapo-embed-js")) {
      const script = document.createElement("script");
      script.id = "shapo-embed-js";
      script.src = "https://cdn.shapo.io/js/embed.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

  
  }, []);

  return (
    <section className="container">
      <h2 className="mb-6 text-center text-[clamp(22px,2.5vw,32px)] font-bold">
        Opinie Google
      </h2>

      {/* --- 🔶 Widget Shapo --- */}
      <div id="shapo-widget-26c17ff89dfbbfc83455" className="mb-10"></div>
      
      <h2 className="mb-6 text-center text-[clamp(22px,2.5vw,32px)] font-bold">
        Opinie Facebook
      </h2>
      {/* --- 🔷 Widget Elfsight --- */}
      <ElfsightReviews />
    </section>
  );
}
