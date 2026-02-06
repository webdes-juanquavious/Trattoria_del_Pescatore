import React from 'react';
import NavBar_Admin from '../components/NavBar_Admin';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-restaurant-dark">
      <NavBar_Admin />
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Benvenuto, Amministratore!</h1>
        <p className="text-restaurant-subtext mb-4">Da qui puoi gestire piatti, tavoli, posizioni lavorative, contatti e molto altro.</p>
        {/* Qui andranno i widget di gestione (menu, tavoli, ecc) */}
      </div>
    </div>
  );
};

export default AdminDashboard;
