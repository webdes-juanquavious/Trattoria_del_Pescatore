
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Language } from '../App';

interface NavbarProps {
  onOpenBooking: () => void;
  lang: Language;
  toggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, lang, toggleLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    }
  };

  const t = translations[lang];

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
          <div className="w-8 h-8 bg-restaurant-accent rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white serif">Trattoria del pescatore</span>
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
          
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            <span>{t.flag}</span>
            <span>{t.langLabel}</span>
          </button>
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
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              toggleLanguage();
            }}
            className="text-white flex items-center space-x-2 text-xl"
          >
             <span>{t.flag}</span>
             <span>{t.langLabel}</span>
          </button>
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
