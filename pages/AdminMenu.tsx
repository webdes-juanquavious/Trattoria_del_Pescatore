import React from 'react';

const AdminMenu: React.FC = () => {
  return (
    <section className="bg-restaurant-dark min-h-screen flex items-center justify-center py-16">
      <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white serif mb-6">Gestione Menu</h1>
        <p className="text-restaurant-subtext text-lg mb-8">Qui potrai gestire i piatti e le categorie del menu.</p>
        {/* TODO: aggiungi funzionalità CRUD */}
      </div>
    </section>
  );
};

export default AdminMenu;
