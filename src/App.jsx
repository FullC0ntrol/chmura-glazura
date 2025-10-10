import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App(){
  return (
    <>
      <Nav/>
      <main>
        <Hero/>
        <section id="uslugi" className="py-16"><Services/></section>
        <section id="galeria" className="py-16"><Gallery/></section>
        <section id="opinie" className="py-16"><Reviews/></section>
        <section id="kontakt" className="py-16"><Contact/></section>
      </main>
      <Footer/>
    </>
  );
}
