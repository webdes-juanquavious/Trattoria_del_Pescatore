
import React from 'react';
import { Language } from '../App';

interface StorySectionProps {
  lang: Language;
}

const StorySection: React.FC<StorySectionProps> = ({ lang }) => {
  const content = {
    it: {
      badge: "SOLO PESCATO DEL GIORNO",
      title: "Immergiti nei sapori autentici del Mediterraneo.",
      p1: "Assapora la freschezza del mare—cucinata con rispetto per la tradizione, ingredienti locali e una passione per l'eccellenza. I nostri pescatori selezionano il meglio ogni mattina.",
      p2: "Il nostro piatto signature: gamberi freschissimi serviti con una spruzzata di limone di Sorrento e un'insalatina novella croccante. L'essenza del mare in un solo assaggio.",
      feature1: "Chef Esperti",
      sub1: "Maestri della tradizione dal 1988",
      feature2: "Pescato Locale",
      sub2: "Dalle reti del nostro mare ogni giorno"
    },
    en: {
      badge: "DAILY CATCH ONLY",
      title: "Immerse yourself in authentic Mediterranean flavors.",
      p1: "Savor sea freshness—cooked with respect for tradition, local ingredients, and a passion for excellence. Our fishermen select the best every single morning.",
      p2: "Our signature dish: fresh shrimp served with a squeeze of Sorrento lemon and a crisp baby leaf salad. The essence of the sea in a single bite.",
      feature1: "Expert Chefs",
      sub1: "Mastering tradition since 1988",
      feature2: "Local Catch",
      sub2: "From our sea nets every day"
    }
  };

  const t = content[lang];

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          {/* Image Side */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-restaurant-accent/10 rounded-full blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1559740038-038030616812?q=80&w=1000&auto=format&fit=crop" 
                alt="Gamberi al Limone" 
                className="rounded-2xl shadow-2xl w-full h-[400px] md:h-[600px] object-cover"
              />
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 order-1 md:order-2 text-left">
            <div className="flex items-center space-x-2 text-restaurant-accent mb-4">
              <span className="bg-restaurant-accent text-white p-1 rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              </span>
              <span className="text-sm font-bold tracking-widest uppercase">{t.badge}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight serif">
              {t.title}
            </h2>
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed max-w-lg">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-restaurant-accent font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t.feature1}</h4>
                  <p className="text-sm text-gray-500">{t.sub1}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-restaurant-accent font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t.feature2}</h4>
                  <p className="text-sm text-gray-500">{t.sub2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
