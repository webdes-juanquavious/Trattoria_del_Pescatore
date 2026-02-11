import React, { useEffect, useState } from 'react';
import NavBar_Admin from '../components/NavBar_Admin';
import ThemeSelector from '../components/ThemeSelector';

const AdminDashboard: React.FC = () => {
  const [browserMode, setBrowserMode] = useState<string>("");
  const [currentDataTheme, setCurrentDataTheme] = useState<string>("");
  // Leggi il valore di data-theme sull'elemento root (html)
  useEffect(() => {
    const updateTheme = () => {
      setCurrentDataTheme(document.documentElement.getAttribute('data-theme') || '');
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setBrowserMode(mq.matches ? "dark" : "light");
    const handler = (e: MediaQueryListEvent) => setBrowserMode(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', transition: 'background 0.3s, color 0.3s' }}>
      <NavBar_Admin />
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>Benvenuto, Amministratore!</h1>
        <p className="text-restaurant-subtext mb-4">Da qui puoi gestire piatti, tavoli, posizioni lavorative, contatti e molto altro.</p>
        <div className="mb-8">
          <ThemeSelector />
        </div>
        {/* Qui andranno i widget di gestione (menu, tavoli, ecc) */}
        <div style={{ marginTop: 32, fontWeight: 600, color: "var(--accent)" }}>
          Il tema del tuo browser è in modalità <span style={{ color: "var(--text)", fontWeight: 700 }}>{browserMode}</span><br />
          <span style={{ color: "var(--accent)", fontWeight: 400, fontSize: 14 }}>
            data-theme attivo: <span style={{ color: "var(--text)", fontWeight: 700 }}>{currentDataTheme}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
