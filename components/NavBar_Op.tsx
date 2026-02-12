
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const NavBar_Op: React.FC = () => {
  const [meta, setMeta] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
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
  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-100 dark:bg-restaurant-dark/95 backdrop-blur-sm py-4 shadow-lg' : 'bg-gray-50 dark:bg-restaurant-dark py-6'} flex items-center px-6`}>
      <span className="font-bold text-xl mr-8 flex items-center">
        <img src="/favicon.ico" alt="Logo" className="w-8 h-8 rounded-sm mr-2" />
        <span className="text-neutral-900 dark:text-white">{meta?.Restaurant_Name || 'Dipendente'}</span>
      </span>
      <Link to="/operator" className="mr-6 text-neutral-900 dark:text-white hover:text-restaurant-accent font-medium" onClick={handleLogout}>Home</Link>
      <Link to="/operator/menu" className="mr-6 text-neutral-900 dark:text-white hover:text-restaurant-accent font-medium">Menu</Link>
      <Link to="/operator/tables" className="text-neutral-900 dark:text-white hover:text-restaurant-accent font-medium">Tavoli</Link>
    </nav>
  );
};

export default NavBar_Op;
