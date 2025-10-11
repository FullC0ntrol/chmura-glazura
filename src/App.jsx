import React, { useEffect, useState } from "react";
import LoadingPage from "./components/LoadingPage";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // symulacja inicjalizacji (np. fetch danych / preload obrazów)
    const t = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingPage visible={!ready} onFinish={() => { /* opcjonalnie: log */ }} />
      <Nav />
      <main aria-hidden={!ready}>
        <Hero />
        <section id="uslugi" className="py-16"><Services /></section>
        <section id="galeria" className="py-16"><Gallery /></section>
        <section id="opinie" className="py-16"><Reviews /></section>
        <section id="kontakt" className="py-16"><Contact /></section>
      </main>
      <Footer />
    </>
  );
}
