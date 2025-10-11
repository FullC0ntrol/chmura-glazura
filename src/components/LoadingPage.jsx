import React, { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - visible: boolean — czy pokazać overlay
 * - onFinish?: () => void — wołane po zakończeniu fade-out
 * - minTimeMs?: number — minimalny czas wyświetlania (domyślnie 600ms)
 *
 * Użycie:
 *   <LoadingPage visible={!ready} onFinish={() => setReady(true)} />
 */
export default function LoadingPage({ visible = true, onFinish, minTimeMs = 600 }) {
  const overlayRef = useRef(null);
  const [mount, setMount] = useState(visible);
  const [fadeOut, setFadeOut] = useState(false);
  const t0 = useRef(performance.now());

  // Montuj/odmontuj po zmianie visible z eleganckim fade-out
  useEffect(() => {
    if (visible) {
      setMount(true);
      setFadeOut(false);
      t0.current = performance.now();
      return;
    }
    const left = Math.max(0, minTimeMs - (performance.now() - t0.current));
    const id = setTimeout(() => {
      setFadeOut(true);
      // po animacji znikamy i informujemy App
      const done = setTimeout(() => {
        setMount(false);
        setFadeOut(false);
        onFinish && onFinish();
      }, 380);
      return () => clearTimeout(done);
    }, left);
    return () => clearTimeout(id);
  }, [visible, minTimeMs, onFinish]);

  // Interakcja: szybkość obrotu zależna od pozycji kursora/palca
  useEffect(() => {
    if (!mount) return;
    const el = overlayRef.current;
    if (!el) return;

    const setSpinFromEvent = (x, y) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (x - cx) / rect.width;
      const dy = (y - cy) / rect.height;
      const dist = Math.min(1, Math.hypot(dx, dy) * 2); // 0..1
      // mapowanie: blisko środka wolniej (8s), na brzegach szybciej (3.2s)
      const spinSec = 8 - dist * 4.8; // 8s -> 3.2s
      el.style.setProperty("--spin", `${spinSec.toFixed(2)}s`);
    };

    const onMove = (e) => setSpinFromEvent(e.clientX, e.clientY);
    const onTouch = (e) => {
      const t = e.touches?.[0];
      if (t) setSpinFromEvent(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    // startowa wartość
    el.style.setProperty("--spin", `6s`);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [mount]);

  if (!mount) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-live="polite"
      className={`loading-overlay ${fadeOut ? "loading-overlay--hide" : ""}`}
    >
      {/* CSS osadzony lokalnie — nie psuje reszty projektu */}
      <style>{`
        .loading-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: grid; place-items: center;
          background:
            radial-gradient(circle at 20% 30%, rgba(0,194,255,0.12), transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(255,122,24,0.18), transparent 60%),
            linear-gradient(180deg, #0f1115 0%, #0c0e12 100%);
          opacity: 1; transform: scale(1);
          transition: opacity .35s ease, transform .35s ease;
        }
        .loading-overlay--hide {
          opacity: 0; transform: scale(1.02);
          pointer-events: none;
        }

        .logo-wrap {
          position: relative; width: min(320px, 72vw); aspect-ratio: 1/1;
          display: grid; place-items: center;
          filter: drop-shadow(0 10px 24px rgba(0,0,0,.45));
        }

        /* Pomarańczowy kafelek (interaktywny, obrót wg --spin) */
        .tile {
          position: absolute; inset: 0;
          display: grid; place-items: center;
          transform-style: preserve-3d;
          animation: spin var(--spin, 6s) linear infinite;
          will-change: transform;
        }
        .tile::before {
          content: "";
          width: 54%;
          aspect-ratio: 1/1;
          border-radius: 10px;
          background: var(--color-accent, #ff7a18);
          box-shadow:
            0 12px 30px rgba(255,122,24,.35),
            inset 0 0 0 1px rgba(255,255,255,.08);
          transform: rotate(45deg) translateZ(0);
        }

        /* Delikatna poświata pod kaflem */
        .glow {
          position: absolute; width: 70%; height: 70%;
          border-radius: 999px; filter: blur(28px);
          background: radial-gradient(circle, rgba(255,122,24,.33), transparent 60%);
          opacity: .8; transform: translateZ(-1px);
        }

        /* Twoje logo na wierzchu */
        .logo {
          position: relative; width: 68%;
          user-select: none; pointer-events: none;
          mix-blend-mode: normal;
        }

        /* dostępność: tryb ograniczonego ruchu */
        @media (prefers-reduced-motion: reduce) {
          .tile { animation: none; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div className="logo-wrap" aria-label="Ładowanie…">
        <div className="glow" />
        <div className="tile" />
        {/* Użyj swojego pliku logo — wcześniej miałeś /logo-lockup.svg.
            Jeśli chcesz użyć samego znaku: wrzuć go do /public/logo-mark.svg */}
        <img className="logo" src="/logo-lockup.svg" alt="Chmura Glazura — logo" />
      </div>
    </div>
  );
}
