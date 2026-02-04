
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
    },
    fr: {
      badge: "POISSON FRAIS UNIQUEMENT",
      title: "Plongez dans les saveurs authentiques de la Méditerranée.",
      p1: "Savourez la fraîcheur de la mer—cuisinée dans le respect de la tradition, avec des ingrédients locaux et une passion pour l'excellence. Nos pêcheurs sélectionnent le meilleur chaque matin.",
      p2: "Notre plat signature : crevettes ultra fraîches servies avec un filet de citron de Sorrente et une salade croquante. L'essence de la mer en une seule bouchée.",
      feature1: "Chefs Experts",
      sub1: "Maîtres de la tradition depuis 1988",
      feature2: "Pêche Locale",
      sub2: "Des filets de notre mer chaque jour"
    },
    es: {
      badge: "SOLO PESCADO DEL DÍA",
      title: "Sumérgete en los sabores auténticos del Mediterráneo.",
      p1: "Disfruta de la frescura del mar—cocinada con respeto por la tradición, ingredientes locales y una pasión por la excelencia. Nuestros pescadores seleccionan lo mejor cada mañana.",
      p2: "Nuestro plato estrella: gambas fresquísimas servidas con un chorrito de limón de Sorrento y una ensalada crujiente. La esencia del mar en un solo bocado.",
      feature1: "Chefs Expertos",
      sub1: "Maestros de la tradición desde 1988",
      feature2: "Pescado Local",
      sub2: "De las redes de nuestro mar cada día"
    },
    de: {
      badge: "NUR TAGESFANG",
      title: "Tauchen Sie ein in authentische mediterrane Aromen.",
      p1: "Genießen Sie die Frische des Meeres—zubereitet mit Respekt vor der Tradition, lokalen Zutaten und einer Leidenschaft für Exzellenz. Unsere Fischer wählen jeden Morgen das Beste aus.",
      p2: "Unser Signature-Gericht: Frische Garnelen mit einem Spritzer Sorrento-Zitrone und einem knackigen Salat. Die Essenz des Meeres in einem Bissen.",
      feature1: "Erfahrene Köche",
      sub1: "Meister der Tradition seit 1988",
      feature2: "Lokaler Fang",
      sub2: "Aus unseren Netzen jeden Tag"
    },
    zh: {
      badge: "仅限每日捕捞",
      title: "沉浸于地中海的正宗风味。",
      p1: "品味大海的新鲜——以尊重传统、当地食材和对卓越的热情烹制。我们的渔民每天早晨精选最优质的食材。",
      p2: "我们的招牌菜：新鲜虾配索伦托柠檬和爽口嫩叶沙拉。大海的精华尽在一口之间。",
      feature1: "资深大厨",
      sub1: "自1988年传承传统",
      feature2: "本地渔获",
      sub2: "每日来自我们的渔网"
    },
    ar: {
      badge: "صيد اليوم فقط",
      title: "انغمس في نكهات البحر الأبيض المتوسط الأصيلة.",
      p1: "استمتع بنضارة البحر—مطهوة باحترام للتقاليد، ومكونات محلية وشغف بالتميز. صيادونا يختارون الأفضل كل صباح.",
      p2: "طبقنا المميز: جمبري طازج جدًا مع رشة ليمون سورينتو وسلطة مقرمشة. جوهر البحر في لقمة واحدة.",
      feature1: "طهاة خبراء",
      sub1: "أساتذة التقاليد منذ 1988",
      feature2: "صيد محلي",
      sub2: "من شباك بحرنا كل يوم"
    }
  };

  const t = content[lang] || content['it'];

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          {/* Image Side */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-restaurant-accent/10 rounded-full blur-2xl"></div>
              <img 
                src="/img/Cuoco.png" 
                alt="Cuoco" 
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
