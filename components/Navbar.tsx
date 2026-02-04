
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Language } from '../App';

interface NavbarProps {
  onOpenBooking: () => void;
  lang: Language;
  toggleLanguage: (code?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, lang, toggleLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [meta, setMeta] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    fetch("/MetadataInfo.json")
      .then((res) => res.json())
      .then(setMeta)
      .catch(() => setMeta(null));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translations = {
    it: {
      home: 'Home',
      menu: 'Menu',
      booking: 'Prenota',
      work: 'Lavora con noi',
      contact: 'Contatto',
      langLabel: 'Italiano',
      flag: '🇮🇹'
    },
    en: {
      home: 'Home',
      menu: 'Menu',
      booking: 'Book',
      work: 'Work with us',
      contact: 'Contact',
      langLabel: 'English',
      flag: '🇬🇧'
    },
    fr: {
      home: 'Accueil',
      menu: 'Menu',
      booking: 'Réserver',
      work: 'Travailler avec nous',
      contact: 'Contact',
      langLabel: 'Français',
      flag: '🇫🇷'
    },
    es: {
      home: 'Inicio',
      menu: 'Menú',
      booking: 'Reservar',
      work: 'Trabaja con nosotros',
      contact: 'Contacto',
      langLabel: 'Español',
      flag: '🇪🇸'
    },
    de: {
      home: 'Startseite',
      menu: 'Speisekarte',
      booking: 'Reservieren',
      work: 'Arbeiten Sie mit uns',
      contact: 'Kontakt',
      langLabel: 'Deutsch',
      flag: '🇩🇪'
    },
    zh: {
      home: '主页',
      menu: '菜单',
      booking: '预订',
      work: '与我们合作',
      contact: '联系',
      langLabel: '中文',
      flag: '🇨🇳'
    },
    ar: {
      home: 'الرئيسية',
      menu: 'القائمة',
      booking: 'احجز',
      work: 'اعمل معنا',
      contact: 'اتصل',
      langLabel: 'العربية',
      flag: '🇸🇦'
    }
  };

  const t = translations[lang];

  const languageOptions = Object.entries(translations).map(([code, value]) => ({ code, label: value.langLabel, flag: value.flag }));

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.menu, path: '/menu' },
    { name: t.booking, path: '/prenota' },
    { name: t.work, path: '/lavora-con-noi' },
    { name: t.contact, path: '/contatto' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-restaurant-dark/95 backdrop-blur-sm py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/favicon.ico" alt="Logo" className="w-8 h-8 rounded-sm" />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white serif">{meta?.name || '...'}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-restaurant-accent whitespace-nowrap ${
                location.pathname === link.path ? 'text-restaurant-accent' : 'text-restaurant-text'
              }`}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
          
          {/* Language Dropdown */}
          <div className="relative ml-4">
            <button
              className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              onClick={() => setIsLangDropdownOpen((open) => !open)}
              onBlur={() => setTimeout(() => setIsLangDropdownOpen(false), 150)}
              tabIndex={0}
            >
              <span>{t.flag}</span>
              <span>{t.langLabel}</span>
              <span className="ml-2">▼</span>
            </button>
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl z-50">
                {languageOptions.map(option => (
                  <button
                    key={option.code}
                    onClick={() => {
                      setIsLangDropdownOpen(false);
                      if (option.code !== lang) toggleLanguage(option.code);
                    }}
                    className={`w-full flex items-center px-4 py-2 text-left space-x-2 text-sm font-medium ${option.code === lang ? 'text-restaurant-accent bg-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span>{option.flag}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-restaurant-dark z-40 flex flex-col items-center justify-center space-y-8 text-2xl animate-in fade-in zoom-in duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-restaurant-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col items-center">
            {languageOptions.map(option => (
              <button
                key={option.code}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (option.code !== lang) toggleLanguage(option.code);
                }}
                className={`text-white flex items-center space-x-2 text-xl mb-2 ${option.code === lang ? 'text-restaurant-accent' : ''}`}
              >
                <span>{option.flag}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="bg-restaurant-accent text-white px-10 py-4 rounded-lg font-semibold"
          >
            {t.booking}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
