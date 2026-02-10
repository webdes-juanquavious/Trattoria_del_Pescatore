// ...existing code...

import React, { useState } from 'react';
import { Language } from '../App';


const dishes = [
  {
    id: 1,
    url: '/img/04_PappardelleRaguCinghiale_pz9553pz9553pz95.png',
    translations: {
      it: {
        name: 'Pappardelle al Ragù di Cinghiale',
        description: 'Pappardelle fatte in casa con ragù di cinghiale, un classico della tradizione toscana.',
        ingredients: 'Pappardelle, ragù di cinghiale, pomodoro, sedano, carota, cipolla, vino rosso, olio EVO, sale, pepe',
        allergens: 'Glutine, sedano',
      },
      de: {
        name: 'Pappardelle mit Wildschweinragout',
        description: 'Hausgemachte Pappardelle mit Wildschweinragout, ein Klassiker der toskanischen Tradition.',
        ingredients: 'Pappardelle, Wildschweinragout, Tomaten, Sellerie, Karotten, Zwiebeln, Rotwein, Olivenöl, Salz, Pfeffer',
        allergens: 'Gluten, Sellerie',
      },
      // ...altre lingue se vuoi
    }
  },
  {
    id: 2,
    url: '/img/10_CimeDiRapa_bkudl0bkudl0bkud.png',
    translations: {
      it: {
        name: 'Cime di Rapa Saltate',
        description: 'Cime di rapa saltate con aglio e peperoncino, scelta vegetariana locale.',
        ingredients: 'Cime di rapa, aglio, peperoncino, olio EVO, sale',
        allergens: 'Nessuno',
      },
      de: {
        name: 'Gebratene Stängelkohl',
        description: 'Gebratener Stängelkohl mit Knoblauch und Chili, lokale vegetarische Wahl.',
        ingredients: 'Stängelkohl, Knoblauch, Chili, Olivenöl, Salz',
        allergens: 'Keine',
      },
    }
  },
  {
    id: 3,
    url: '/img/01_AntipastoCacciatore_1uu7lb1uu7lb1uu7.png',
    translations: {
      it: {
        name: 'Antipasto del Cacciatore',
        description: 'Antipasto misto con mozzarella di bufala, olive, prosciutto, salame, formaggio di capra, frittata con cime di rapa.',
        ingredients: 'Mozzarella di bufala, olive, prosciutto crudo, salame, formaggio di capra, uova, cime di rapa',
        allergens: 'Latte, uova',
      },
      de: {
        name: 'Jäger-Vorspeise',
        description: 'Gemischte Vorspeise mit Büffelmozzarella, Oliven, Schinken, Salami, Ziegenkäse, Omelett mit Stängelkohl.',
        ingredients: 'Büffelmozzarella, Oliven, Rohschinken, Salami, Ziegenkäse, Eier, Stängelkohl',
        allergens: 'Milch, Eier',
      },
    }
  },
  {
    id: 4,
    url: '/img/Gemini_Generated_Image_x70gf8x70gf8x70g.png',
    translations: {
      it: {
        name: 'Torta ai Frutti di Bosco',
        description: 'Torta ai frutti di bosco accompagnata da vino locale e birra artigianale.',
        ingredients: 'Farina, uova, burro, zucchero, frutti di bosco, lievito',
        allergens: 'Glutine, uova, latte',
      },
      de: {
        name: 'Waldbeerenkuchen',
        description: 'Waldbeerenkuchen serviert mit lokalem Wein und handwerklichem Bier.',
        ingredients: 'Mehl, Eier, Butter, Zucker, Waldbeeren, Backpulver',
        allergens: 'Gluten, Eier, Milch',
      },
    }
  },
  {
    id: 5,
    url: '/img/Gemini_Generated_Image_7hsa5b7hsa5b7hsa.png',
    translations: {
      it: {
        name: 'Piatto Principale della Casa',
        description: 'Specialità della casa, piatto principale con ingredienti freschi e selezionati.',
        ingredients: 'Ingredienti vari secondo stagione',
        allergens: 'Chiedere allo staff',
      },
      de: {
        name: 'Haus-Spezialität',
        description: 'Hausspezialität, Hauptgericht mit frischen und ausgewählten Zutaten.',
        ingredients: 'Verschiedene Zutaten je nach Saison',
        allergens: 'Bitte das Personal fragen',
      },
    }
  },
];


interface DishShowcaseProps {
  lang: Language;
}

const DishShowcase: React.FC<DishShowcaseProps> = ({ lang }) => {
  const [selected, setSelected] = useState(0);
  const dish = dishes[selected];
  const t = dish.translations[lang] || dish.translations['it'];
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Dish selector thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
          {dishes.map((d, idx) => (
            <div
              key={d.id}
              className={`relative overflow-hidden rounded-xl transition-all duration-500 cursor-pointer group
                ${selected === idx ? 'opacity-100 shadow-[0_0_25px_rgba(255,122,53,0.3)]' : 'opacity-40'}
                hover:opacity-100 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,122,53,0.6)]`}
              onClick={() => setSelected(idx)}
            >
              <img
                src={d.url}
                alt={d.translations[lang]?.name || d.translations['it'].name}
                className="w-full h-32 md:h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <span className="text-white text-xs font-semibold serif">{d.translations[lang]?.name || d.translations['it'].name}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Main dish showcase: image left, info right */}
        <div className="flex flex-col md:flex-row gap-10 items-stretch justify-center">
          {/* Dish image */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={dish.url}
              alt={dish.translations[lang]?.name || dish.translations['it'].name}
              className="rounded-xl shadow-xl w-full max-w-md object-cover"
              style={{ maxHeight: 350 }}
            />
          </div>
          {/* Dish info */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-orange-600 uppercase tracking-tight serif">
              {t.name}
            </h2>
            <p className="mb-6 text-lg text-gray-800 font-medium">{t.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-orange-600 text-lg mb-1 uppercase">{lang === 'de' ? 'Zutaten' : 'Ingredienti'}</h3>
                <p className="text-base text-gray-700 bg-orange-50 rounded-lg p-3 shadow-sm">{t.ingredients}</p>
              </div>
              <div>
                <h3 className="font-bold text-orange-600 text-lg mb-1 uppercase">{lang === 'de' ? 'Allergene' : 'Allergeni'}</h3>
                <p className="text-base text-gray-700 bg-orange-50 rounded-lg p-3 shadow-sm">{t.allergens}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DishShowcase;
