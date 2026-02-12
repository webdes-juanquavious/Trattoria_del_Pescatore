import React from 'react';
import { useTheme } from '../context/ThemeContext';

const lightThemes = [
  { value: 'default', label: 'Default (Arancione)' },
  { value: 'green', label: 'Verde Pastello' },
  { value: 'olive', label: 'Oliva' },
  { value: 'blue', label: 'Azzurro' },
  { value: 'sea', label: 'Blu Mare' },
  { value: 'sand', label: 'Sabbia' },
  { value: 'purple', label: 'Viola Elegante' },
  { value: 'gold', label: 'Oro Reale' },
  { value: 'papal', label: 'Papale/Reale' },
];
const darkThemes = [
  { value: 'default', label: 'Default (Arancione)' },
  { value: 'green', label: 'Verde Pastello' },
  { value: 'olive', label: 'Oliva' },
  { value: 'blue', label: 'Azzurro' },
  { value: 'sea', label: 'Blu Mare' },
  { value: 'sand', label: 'Sabbia' },
  { value: 'purple', label: 'Viola Elegante' },
  { value: 'gold', label: 'Oro Reale' },
  { value: 'papal', label: 'Papale/Reale' },
];

export default function ThemeSelector() {
  const { themeLight, themeDark, saveTheme, loading } = useTheme();
  if (loading) return null;
  // Stile select come "tipologia di contratto" (popup offerta lavoro)
  const selectClass =
    'block w-full rounded-lg border border-gray-300 bg-gray-100 py-3 px-4 text-lg font-semibold text-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition';

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center my-8">
      <div className="flex flex-col items-start" style={{ minWidth: 260 }}>
        <label className="block text-base font-bold mb-2" htmlFor="theme-light" style={{ color: 'var(--text)' }}>Colore per style chiaro</label>
        <select
          id="theme-light"
          value={themeLight}
          onChange={e => saveTheme(e.target.value, themeDark)}
          className={selectClass}
        >
          {lightThemes.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-start" style={{ minWidth: 260 }}>
        <label className="block text-base font-bold mb-2" htmlFor="theme-dark" style={{ color: 'var(--text)' }}>Colore per style scuro</label>
        <select
          id="theme-dark"
          value={themeDark}
          onChange={e => saveTheme(themeLight, e.target.value)}
          className={selectClass}
        >
          {darkThemes.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
