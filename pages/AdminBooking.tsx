import React from 'react';

const AdminBooking: React.FC = () => {
  return (
    <section className="bg-restaurant-dark min-h-screen flex items-center justify-center py-16">
      <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white serif mb-6">Gestione Prenotazioni</h1>
        <p className="text-restaurant-subtext text-lg mb-8">Qui potrai visualizzare e gestire le prenotazioni dei clienti.</p>
        {/* TODO: aggiungi funzionalità di gestione prenotazioni */}
      </div>
    </section>
  );
};

export default AdminBooking;
