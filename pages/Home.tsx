
import React from 'react';
import Hero from '../components/Hero';
import DishShowcase from '../components/DishShowcase';
import StorySection from '../components/StorySection';
import { Language } from '../App';

interface HomeProps {
  onOpenBooking: () => void;
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ onOpenBooking, lang }) => {
  const content = {
    it: {
      ctaTitle: "Pronto per un viaggio indimenticabile?",
      ctaSub: "Ogni piatto è una storia, ogni sapore un ricordo. Riserva ora il tuo tavolo nel cuore della tradizione marinara.",
      ctaBtn: "PRENOTA ORA"
    },
    en: {
      ctaTitle: "Ready for an unforgettable journey?",
      ctaSub: "Every dish is a story, every flavor a memory. Reserve your table now in the heart of sea tradition.",
      ctaBtn: "BOOK NOW"
    }
  };

  const t = content[lang];

  return (
    <div>
      <Hero onOpenBooking={onOpenBooking} lang={lang} />
      <DishShowcase />
      <StorySection lang={lang} />
      
      {/* Call to Action Section */}
      <section className="bg-restaurant-dark py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl text-white serif mb-8">{t.ctaTitle}</h2>
          <p className="text-restaurant-subtext text-xl mb-12 max-w-2xl mx-auto">
            {t.ctaSub}
          </p>
          <button
            onClick={onOpenBooking}
            className="bg-restaurant-accent hover:bg-orange-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105 active:scale-95"
          >
            {t.ctaBtn}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
