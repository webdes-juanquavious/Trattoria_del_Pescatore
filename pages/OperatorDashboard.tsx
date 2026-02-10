import React from 'react';
import NavBar_Op from '../components/NavBar_Op';

const OperatorDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-restaurant-dark">
      <NavBar_Op />
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Benvenuto, Dipendente!</h1>
        <p className="text-restaurant-subtext mb-4">Da qui puoi consultare il menu e gestire i tavoli assegnati.</p>
        {/* Qui andranno i widget di gestione tavoli e visualizzazione menu */}
      </div>
    </div>
  );
};

export default OperatorDashboard;
