import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar_Admin: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [meta, setMeta] = useState<any>(null);
  const [lang, setLang] = useState<string>(() => localStorage.getItem('lang') || 'it');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    import('../services/supabase').then(({ getContactInfo }) => {
      getContactInfo().then(setMeta).catch(() => setMeta(null));
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translations: any = {
    it: { home: 'Home', menu: 'Menu', jobs: 'Lavora con noi', contact: 'Contatto', tables: 'Tavoli', langLabel: 'Italiano', flag: '🇮🇹', admin: 'Admin' },
    en: { home: 'Home', menu: 'Menu', jobs: 'Work with us', contact: 'Contact', tables: 'Tables', langLabel: 'English', flag: '🇬🇧', admin: 'Admin' },
    fr: { home: 'Accueil', menu: 'Menu', jobs: 'Travailler avec nous', contact: 'Contact', tables: 'Tables', langLabel: 'Français', flag: '🇫🇷', admin: 'Admin' },
    es: { home: 'Inicio', menu: 'Menú', jobs: 'Trabaja con nosotros', contact: 'Contacto', tables: 'Mesas', langLabel: 'Español', flag: '🇪🇸', admin: 'Admin' },
    de: { home: 'Startseite', menu: 'Speisekarte', jobs: 'Arbeiten Sie mit uns', contact: 'Kontakt', tables: 'Tische', langLabel: 'Deutsch', flag: '🇩🇪', admin: 'Admin' },
    zh: { home: '主页', menu: '菜单', jobs: '与我们合作', contact: '联系', tables: '桌子', langLabel: '中文', flag: '🇨🇳', admin: '管理员' },
    ar: { home: 'الرئيسية', menu: 'القائمة', jobs: 'اعمل معنا', contact: 'اتصل', tables: 'الطاولات', langLabel: 'العربية', flag: '🇸🇦', admin: 'مدير' },
  };
  const t = translations[lang] || translations['it'];
  const languageOptions = Object.entries(translations).map(([code, value]: any) => ({ code, label: value.langLabel, flag: value.flag }));

  const navLinks = [
    { name: t.menu, path: '/admin/menu' },
    { name: t.tables, path: '/admin/prenota' },
    { name: t.jobs, path: '/admin/lavora-con-noi' },
    { name: t.contact, path: '/admin/contatto' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleLangChange = (code: string) => {
    setLang(code);
    localStorage.setItem('lang', code);
    window.location.reload();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-restaurant-dark/95 backdrop-blur-sm py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo + Admin */}
        <Link to="/admin" className="flex items-center space-x-2" onClick={handleLogout}>
          <img src="/favicon.ico" alt="Logo" className="w-8 h-8 rounded-sm" />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white serif">{meta?.Restaurant_Name || '...'}</span>
          <span className="ml-3 px-2 py-1 bg-restaurant-accent text-white rounded text-xs font-bold uppercase">{t.admin}</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-restaurant-accent whitespace-nowrap ${location.pathname === link.path ? 'text-restaurant-accent' : 'text-restaurant-text'}`}
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
                    onClick={() => handleLangChange(option.code)}
                    className={`w-full flex items-center px-4 py-2 text-left space-x-2 text-sm font-medium ${option.code === lang ? 'text-restaurant-accent bg-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span>{option.flag}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Logout */}
          <button onClick={handleLogout} className="ml-6 px-4 py-2 bg-restaurant-accent text-white rounded-lg font-bold hover:bg-orange-600 transition-all">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar_Admin;
