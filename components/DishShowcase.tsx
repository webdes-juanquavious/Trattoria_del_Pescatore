
import React from 'react';

const dishes = [
  { 
    id: 1, 
    name: 'Gamberi al Limone', 
    url: 'https://images.unsplash.com/photo-1559740038-038030616812?q=80&w=600&auto=format&fit=crop' // Piatto 1: Shrimp with lemon/salad, no forks
  },
  { 
    id: 2, 
    name: 'Orata al Cartoccio', 
    url: 'https://images.unsplash.com/photo-1534604973900-c41ab46d1334?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    name: 'Zuppa di Mare', 
    url: 'https://images.unsplash.com/photo-1534080564607-c92751f8969f?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    name: 'Frittura Mista', 
    url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 5, 
    name: 'Tartare di Pesce', 
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop' 
  },
];

const DishShowcase: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {dishes.map((dish, idx) => (
            <div 
              key={dish.id} 
              className={`relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer group 
                ${idx === 0 ? 'opacity-100 shadow-[0_0_25px_rgba(255,122,53,0.3)]' : 'opacity-40'} 
                hover:opacity-100 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,122,53,0.6)]`}
            >
              <img 
                src={dish.url} 
                alt={dish.name} 
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-sm font-semibold serif">{dish.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DishShowcase;
