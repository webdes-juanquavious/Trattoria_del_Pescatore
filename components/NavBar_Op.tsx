
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const NavBar_Op: React.FC = () => {
  const [meta, setMeta] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    import('../services/supabase').then(({ getContactInfo }) => {
      getContactInfo().then(setMeta).catch(() => setMeta(null));
    });
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };
  return (
    <nav className="bg-restaurant-dark text-white flex items-center px-6 py-4 shadow-lg">
      <span className="font-bold text-xl mr-8 flex items-center">
        <img src="/favicon.ico" alt="Logo" className="w-8 h-8 rounded-sm mr-2" />
        {meta?.Restaurant_Name || 'Dipendente'}
      </span>
      <Link to="/operator" className="mr-6 hover:text-restaurant-accent" onClick={handleLogout}>Home</Link>
      <Link to="/operator/menu" className="mr-6 hover:text-restaurant-accent">Menu</Link>
      <Link to="/operator/tables" className="hover:text-restaurant-accent">Tavoli</Link>
    </nav>
  );
};

export default NavBar_Op;
