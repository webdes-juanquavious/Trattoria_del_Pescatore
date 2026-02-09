import React from 'react';

const languages = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

const LanguageSwitcher: React.FC<{ current: string; onChange: (code: string) => void }> = ({ current, onChange }) => (
  <div className="flex space-x-2 items-center">
    {languages.map(lang => (
      <button
        key={lang.code}
        onClick={() => onChange(lang.code)}
        className={`px-2 py-1 rounded ${current === lang.code ? 'bg-restaurant-accent text-white' : 'bg-white/10 text-white'}`}
        aria-label={lang.label}
      >
        <span className="mr-1">{lang.flag}</span>{lang.label}
      </button>
    ))}
  </div>
);

export default LanguageSwitcher;
