
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
    }
  };

  const t = content[lang];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-restaurant-dark">
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

      {/* Hero Seafood Image */}
      <div className="mt-16 relative w-full max-w-4xl px-4 flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
          <img
            src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop"
            alt="Piatto di pesce fresco"
            className="relative z-10 w-full max-w-[800px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
