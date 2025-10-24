# 🧱 Chmura Glazura — profesjonalne układanie płytek

Nowoczesna, responsywna strona internetowa wykonana w **React + Tailwind CSS** dla firmy **Chmura Glazura**, specjalizującej się w usługach glazurniczych i wykończeniowych.  
Projekt został zaprojektowany z naciskiem na **estetykę, wydajność i doświadczenie użytkownika (UX/UI)**.

🌐 **Live:** [https://chmura-glazura.pl](https://chmura-glazura.pl)  
📦 **Repozytorium:** [https://github.com/FullC0ntrol/chmura-glazura](https://github.com/FullC0ntrol/chmura-glazura)

---

## 🚀 Technologie

- ⚛️ **React 18**
- 💨 **Tailwind CSS v4**
- 🔗 **Vite**
- 💡 **IntersectionObserver**, **IdleCallback**, **prefers-reduced-motion**
- 🌐 API backend: `glazura-api` (Node.js / Express)
- 🔍 **Elfsight** + **Shapo.io** integracje opinii (Facebook i Google)
- 🖼️ **Lightbox**, **Slider**, **Responsive Images**

---

## 🗂️ Struktura projektu

```
src/
 ├── App.jsx                # Główna struktura aplikacji
 ├── main.jsx               # Punkt wejścia (ReactDOM)
 ├── index.css              # Globalny styl + zmienne Tailwind
 └── components/
     ├── LoadingPage.jsx    # Ekran ładowania z animacją 3D kafla
     ├── Nav.jsx            # Pasek nawigacyjny (desktop + mobile)
     ├── Hero.jsx           # Sekcja startowa z logo i CTA
     ├── Services.jsx       # Opis oferowanych usług
     ├── Gallery.jsx        # Dynamiczna galeria z Lightboxem
     ├── Lightbox.jsx       # Podgląd zdjęć w trybie pełnoekranowym
     ├── Reviews.jsx        # Opinie Google + Facebook
     ├── ElfsightReviews.jsx# Lazy-load widgetu Elfsight
     ├── Contact.jsx        # Formularz i dane kontaktowe
     └── Footer.jsx         # Stopka strony
```

---

## 💡 Główne funkcje

### 🌀 `LoadingPage`
Efektowne intro z obracającym się kaflem, dynamiczną prędkością obrotu zależną od pozycji kursora.

### 🧭 `Nav`
Responsywne menu z przejrzystym układem i mobilnym burgerem.

### 🏠 `Hero`
Sekcja startowa z animowanym logo, gradientowym tekstem i CTA prowadzącym do kontaktu lub galerii.

### 🧰 `Services`
Przejrzysty opis usług w formie kart i listy etapów realizacji, z wykorzystaniem ikon SVG.

### 🖼️ `Gallery`
Dynamiczna galeria łącząca dane z API (`/api/public/albums`) z obsługą:
- Auto-slideshow (4.2s)
- Gestów i długiego przytrzymania (long-press)
- Płynnego przewijania i dopasowania do środka
- Trybu Lightbox do podglądu zdjęć

### 💬 `Reviews`
Integracja z:
- **Shapo.io** — widget opinii Google
- **Elfsight** — widget opinii Facebook (lazy-load po scrollu lub bezczynności)

### 📞 `Contact`
Sekcja kontaktowa z linkami do:
- telefonu (`tel:`)
- e-maila
- WhatsApp
- Facebooka i profilu Google Maps  
Dodatkowo zawiera gradientowe tło i czytelną strukturę danych (`<dl>`).

### ⚫ `Footer`
Minimalistyczna stopka z aktualnym rokiem i prawami autorskimi.

---

## ⚙️ Instalacja i uruchomienie

### 1️⃣ Klonowanie projektu
```bash
git clone https://github.com/FullC0ntrol/chmura-glazura.git
cd chmura-glazura
```

### 2️⃣ Instalacja zależności
```bash
npm install
```

### 3️⃣ Uruchomienie lokalne
```bash
npm run dev
```
Strona dostępna będzie pod adresem:
```
http://localhost:5173
```

---

## 🔧 Konfiguracja środowiska

Plik `.env` (opcjonalnie):
```env
VITE_API_BASE=http://localhost:4000
```

---

## 📸 Przykład danych realizacji (`realizationsData.js`)

```js
export const REALIZATIONS = [
  {
    id: "lazienka-warszawa-2025-01",
    title: "Łazienka – Warszawa (2025)",
    cover: "/images/lazienka1.jpg",
    images: ["/images/lazienka1.jpg", "/images/lazienka2.jpg"],
    tags: ["łazienka", "gres", "prysznic"],
    date: "2025-01-15"
  }
];
```

---

## 🧠 Dobre praktyki

- Lazy loading komponentów i widgetów
- Dostępność (ARIA, alt, focus-visible)
- Obsługa `prefers-reduced-motion`
- Kompatybilność z `safe-area` (np. iPhone)
- Animacje oparte na CSS, bez zewnętrznych bibliotek

---

## 🧑‍💻 Autor

**Łukasz Chmura**  
[🌐 chmura-glazura.pl](https://chmura-glazura.pl)  
📧 [chmuraglazura@gmail.com](mailto:chmuraglazura@gmail.com)

Projekt opracowany przez **FullC0ntrol**  
Frontend / React Developer

---

## 🏗️ Plany rozwoju

- [ ] Dodanie panelu administracyjnego do zarządzania galerią  
- [ ] Optymalizacja zdjęć (Sharp, lazy AVIF/webp)  
- [ ] Animacje GSAP / Framer Motion  
- [ ] SEO meta tags i schema.org  
- [ ] Podstrony usług i realizacji

---

## 📄 Licencja

Ten projekt jest objęty licencją **MIT** — możesz go modyfikować i wykorzystywać z zachowaniem informacji o autorze.
