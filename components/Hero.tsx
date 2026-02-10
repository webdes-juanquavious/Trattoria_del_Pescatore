
import React from 'react';
import { Language } from '../App';

interface HeroProps {
  onOpenBooking: () => void;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ onOpenBooking, lang }) => {
  const content = {
    it: {
      title: "Cucina di mare & un'esperienza autentica",
      sub: "Dalla rete alla tavola, la tradizione del mare dal 1988.",
      cta: "PRENOTA UN TAVOLO"
    },
    en: {
      title: "Seafood & an authentic experience",
      sub: "From the net to the table, sea tradition since 1988.",
      cta: "BOOK A TABLE"
    },
    fr: {
      title: "Cuisine de la mer & une expérience authentique",
      sub: "De la mer à la table, la tradition marine depuis 1988.",
      cta: "RÉSERVEZ UNE TABLE"
    },
    es: {
      title: "Cocina de mar & una experiencia auténtica",
      sub: "De la red a la mesa, la tradición del mar desde 1988.",
      cta: "RESERVA UNA MESA"
    },
    de: {
      title: "Meeresküche & ein authentisches Erlebnis",
      sub: "Vom Netz auf den Tisch, Meerestradition seit 1988.",
      cta: "TISCH RESERVIEREN"
    },
    zh: {
      title: "海鲜美食与正宗体验",
      sub: "从渔网到餐桌，自1988年的海洋传统。",
      cta: "预订餐桌"
    },
    ar: {
      title: "مأكولات بحرية وتجربة أصيلة",
      sub: "من الشباك إلى الطاولة، تقليد البحر منذ 1988.",
      cta: "احجز طاولة"
    }
  };

  const t = content[lang] || content['it'];

  return (
    <section
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-0 overflow-visible"
      style={{
        background: 'linear-gradient(to bottom, #101513 0%, #101513 70%, #fff 30%, #fff 100%)'
      }}
    >
      {/* Decorative Net/Water elements placeholder */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,53,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight text-white serif font-medium">
          {t.title.split('&').map((part, i) => (
            <React.Fragment key={i}>
              {part} {i === 0 && <br className="hidden md:block" />}
            </React.Fragment>
          ))}
        </h1>
        <p className="text-restaurant-subtext text-lg md:text-xl mb-10 max-w-2xl mx-auto tracking-wide font-light">
          {t.sub}
        </p>
        <button
          onClick={onOpenBooking}
          className="bg-restaurant-accent hover:bg-orange-600 text-white px-10 py-4 rounded-lg text-lg font-bold tracking-widest transition-all transform hover:scale-105 shadow-xl"
        >
          {t.cta}
        </button>
      </div>

      {/* Hero Main Dish Image */}
      <div className="mt-16 relative w-full max-w-4xl px-4 flex justify-center" style={{ zIndex: 20 }}>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
          <img
            src="/img/Gemini_Generated_Image_7hsa5b7hsa5b7hsa.png"
            alt="Piatto principale della casa"
            className="relative z-10 w-full max-w-[800px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] object-cover rounded-t-2xl"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
