
import React from 'react';
import ReservationModal from '../components/ReservationModal';
import { Language } from '../App';

interface BookingProps {
  lang: Language;
}

const Booking: React.FC<BookingProps> = ({ lang }) => {
  const content = {
    it: {
      title: "Prenotazioni",
      sub: "Scegli la data e l'ora del tuo arrivo. Consigliamo di prenotare con almeno 24 ore di anticipo.",
      tip: "Utilizza il modulo sottostante per richiedere il tuo tavolo."
    },
    en: {
      title: "Reservations",
      sub: "Choose your arrival date and time. We recommend booking at least 24 hours in advance.",
      tip: "Use the form below to request your table."
    }
  };

  const t = content[lang];

  return (
    <div className="pt-32 pb-20 bg-restaurant-dark min-h-screen flex flex-col items-center">
      <div className="text-center mb-12 px-4">
        <h1 className="text-6xl text-white serif mb-6">{t.title}</h1>
        <p className="text-restaurant-subtext max-w-xl">
          {t.sub}
        </p>
      </div>
      
      <div className="w-full max-w-2xl bg-white rounded-2xl p-8 md:p-12 shadow-2xl mx-4">
         <p className="text-center text-gray-500 italic mb-8">{t.tip}</p>
         <ReservationModal lang={lang} isOpen={true} onClose={() => {}} />
      </div>
    </div>
  );
};

export default Booking;
