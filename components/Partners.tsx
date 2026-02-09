
import React from 'react';

const partners = [
  { name: 'Logoipsum 1', url: 'https://picsum.photos/120/40?grayscale&sig=1' },
  { name: 'Logoipsum 2', url: 'https://picsum.photos/120/40?grayscale&sig=2' },
  { name: 'Logoipsum 3', url: 'https://picsum.photos/120/40?grayscale&sig=3' },
  { name: 'Logoipsum 4', url: 'https://picsum.photos/120/40?grayscale&sig=4' },
  { name: 'Logoipsum 5', url: 'https://picsum.photos/120/40?grayscale&sig=5' },
];

const Partners: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-50">
          {partners.map((partner, idx) => (
            <img 
              key={idx} 
              src={partner.url} 
              alt={partner.name} 
              className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
