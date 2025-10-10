export default function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="text-center text-muted py-10">
      <div className="container">© {year} Chmura Glazura. Wszystkie prawa zastrzeżone.</div>
    </footer>
  );
}
