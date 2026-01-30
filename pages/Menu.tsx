
import React from 'react';
import { Language } from '../App';

interface MenuProps {
  lang: Language;
}

const Menu: React.FC<MenuProps> = ({ lang }) => {
  const content = {
    it: {
      title: "Il Nostro Menu",
      categories: [
        { name: 'Antipasti', icon: '🦪' },
        { name: 'Primi di Mare', icon: '🍝' },
        { name: 'Secondi del Giorno', icon: '🐟' },
        { name: 'Dolci', icon: '🍰' },
      ],
      items: [
        { name: 'Impepata di Cozze', price: '€14.00', desc: 'Cozze fresche, pepe nero, prezzemolo e crostini di pane agrumati.' },
        { name: 'Spaghetti alle Vongole', price: '€18.00', desc: 'Vongole veraci, aglio, olio extravergine e un tocco di peperoncino.' },
        { name: 'Grigliata del Pescatore', price: '€28.00', desc: 'Mix di pescato locale alla brace con verdure di stagione.' },
        { name: 'Fritto Misto', price: '€22.00', desc: 'Calamari, gamberi e paranza croccante con maionese al lime.' },
        { name: 'Tartare di Tonno', price: '€20.00', desc: 'Tonno rosso, avocado, capperi e scorza di limone di Sorrento.' },
        { name: 'Risotto ai Crostacei', price: '€22.00', desc: 'Risotto Carnaroli mantecato con bisque di crostacei e scampi.' },
      ]
    },
    en: {
      title: "Our Menu",
      categories: [
        { name: 'Appetizers', icon: '🦪' },
        { name: 'Seafood Pasta', icon: '🍝' },
        { name: 'Main Courses', icon: '🐟' },
        { name: 'Desserts', icon: '🍰' },
      ],
      items: [
        { name: 'Peppered Mussels', price: '€14.00', desc: 'Fresh mussels, black pepper, parsley and citrus bread croutons.' },
        { name: 'Spaghetti with Clams', price: '€18.00', desc: 'Fresh clams, garlic, extra virgin olive oil and a touch of chili.' },
        { name: 'Fisherman Grill', price: '€28.00', desc: 'Grilled local daily catch with seasonal vegetables.' },
        { name: 'Mixed Fried Fish', price: '€22.00', desc: 'Crunchy squid, shrimp and small fish with lime mayo.' },
        { name: 'Tuna Tartare', price: '€20.00', desc: 'Red tuna, avocado, capers and Sorrento lemon zest.' },
        { name: 'Shellfish Risotto', price: '€22.00', desc: 'Carnaroli rice creamed with shellfish bisque and scampi.' },
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="pt-32 pb-20 bg-restaurant-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl text-white serif text-center mb-16">{t.title}</h1>
        
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {t.categories.map((cat) => (
            <button 
              key={cat.name}
              className="px-8 py-3 rounded-full border border-white/10 hover:border-restaurant-accent hover:text-restaurant-accent transition-all text-white font-medium"
            >
              <span className="mr-2">{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {t.items.map((item, i) => (
            <div key={i} className="flex gap-6 group cursor-pointer">
              <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                <img src={`https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=200&auto=format&fit=crop&sig=${i}`} alt="Food" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-grow border-b border-white/10 pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl text-white serif">{item.name}</h3>
                  <span className="text-restaurant-accent font-bold">{item.price}</span>
                </div>
                <p className="text-restaurant-subtext text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
