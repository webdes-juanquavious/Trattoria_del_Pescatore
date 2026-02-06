
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
    },
    fr: {
      title: "Notre Menu",
      categories: [
        { name: 'Entrées', icon: '🦪' },
        { name: 'Pâtes de la mer', icon: '🍝' },
        { name: 'Plats du jour', icon: '🐟' },
        { name: 'Desserts', icon: '🍰' },
      ],
      items: [
        { name: 'Moules au poivre', price: '€14.00', desc: 'Moules fraîches, poivre noir, persil et croûtons de pain aux agrumes.' },
        { name: 'Spaghetti aux palourdes', price: '€18.00', desc: 'Palourdes fraîches, ail, huile d’olive extra vierge et une touche de piment.' },
        { name: 'Grill du pêcheur', price: '€28.00', desc: 'Mélange de poissons locaux grillés avec légumes de saison.' },
        { name: 'Friture mixte', price: '€22.00', desc: 'Calamars, crevettes et petits poissons croustillants avec mayonnaise au citron vert.' },
        { name: 'Tartare de thon', price: '€20.00', desc: 'Thon rouge, avocat, câpres et zeste de citron de Sorrente.' },
      ]
    },
    es: {
      title: "Nuestro Menú",
      categories: [
        { name: 'Entrantes', icon: '🦪' },
        { name: 'Pastas de mar', icon: '🍝' },
        { name: 'Platos del día', icon: '🐟' },
        { name: 'Postres', icon: '🍰' },
      ],
      items: [
        { name: 'Mejillones a la pimienta', price: '€14.00', desc: 'Mejillones frescos, pimienta negra, perejil y picatostes cítricos.' },
        { name: 'Espaguetis con almejas', price: '€18.00', desc: 'Almejas frescas, ajo, aceite de oliva virgen extra y un toque de chile.' },
        { name: 'Parrillada del pescador', price: '€28.00', desc: 'Mezcla de pescado local a la parrilla con verduras de temporada.' },
        { name: 'Fritura mixta', price: '€22.00', desc: 'Calamares, gambas y pescaditos crujientes con mayonesa de lima.' },
        { name: 'Tartar de atún', price: '€20.00', desc: 'Atún rojo, aguacate, alcaparras y ralladura de limón de Sorrento.' },
        { name: 'Risotto de mariscos', price: '€22.00', desc: 'Arroz Carnaroli cremoso con bisque de mariscos y cigalas.' },
      ]
    },
    de: {
      title: "Unsere Speisekarte",
      categories: [
        { name: 'Vorspeisen', icon: '🦪' },
        { name: 'Meeresfrüchte-Pasta', icon: '🍝' },
        { name: 'Hauptgerichte', icon: '🐟' },
        { name: 'Desserts', icon: '🍰' },
      ],
      items: [
        { name: 'Pfeffermuscheln', price: '€14.00', desc: 'Frische Muscheln, schwarzer Pfeffer, Petersilie und Zitrus-Croutons.' },
        { name: 'Spaghetti mit Venusmuscheln', price: '€18.00', desc: 'Frische Venusmuscheln, Knoblauch, Olivenöl extra vergine und eine Prise Chili.' },
        { name: 'Fischgrill', price: '€28.00', desc: 'Gegrillter lokaler Fang mit saisonalem Gemüse.' },
        { name: 'Gemischte Frittura', price: '€22.00', desc: 'Knusprige Tintenfische, Garnelen und kleine Fische mit Limettenmayonnaise.' },
        { name: 'Thunfisch-Tatar', price: '€20.00', desc: 'Roter Thunfisch, Avocado, Kapern und Sorrento-Zitronenschale.' },
        { name: 'Krabbenrisotto', price: '€22.00', desc: 'Carnaroli-Reis mit Krustentierbisque und Kaisergranat.' },
      ]
    },
    zh: {
      title: "我们的菜单",
      categories: [
        { name: '前菜', icon: '🦪' },
        { name: '海鲜意面', icon: '🍝' },
        { name: '主菜', icon: '🐟' },
        { name: '甜点', icon: '🍰' },
      ],
      items: [
        { name: '黑胡椒贻贝', price: '€14.00', desc: '新鲜贻贝、黑胡椒、香菜和柑橘面包丁。' },
        { name: '蛤蜊意面', price: '€18.00', desc: '新鲜蛤蜊、大蒜、特级初榨橄榄油和一点辣椒。' },
        { name: '渔夫烤鱼', price: '€28.00', desc: '烤本地渔获配时令蔬菜。' },
        { name: '什锦炸鱼', price: '€22.00', desc: '香脆鱿鱼、虾和小鱼配青柠蛋黄酱。' },
        { name: '金枪鱼塔塔', price: '€20.00', desc: '红金枪鱼、牛油果、刺山柑和索伦托柠檬皮。' },
        { name: '甲壳类海鲜烩饭', price: '€22.00', desc: '用甲壳类浓汤和螯虾烩制的Carnaroli米饭。' },
      ]
    },
    ar: {
      title: "قائمة الطعام",
      categories: [
        { name: 'المقبلات', icon: '🦪' },
        { name: 'باستا البحر', icon: '🍝' },
        { name: 'الأطباق الرئيسية', icon: '🐟' },
        { name: 'الحلويات', icon: '🍰' },
      ],
      items: [
        { name: 'بلح البحر بالفلفل', price: '€14.00', desc: 'بلح البحر الطازج، الفلفل الأسود، البقدونس وقطع خبز الحمضيات.' },
        { name: 'سباغيتي بالبرنقيل', price: '€18.00', desc: 'برنقيل طازج، ثوم، زيت زيتون بكر ولمسة من الفلفل الحار.' },
        { name: 'مشاوي الصياد', price: '€28.00', desc: 'تشكيلة من صيد اليوم المشوي مع خضار موسمية.' },
        { name: 'مقلي مشكل', price: '€22.00', desc: 'كالاماري، جمبري وأسماك صغيرة مقرمشة مع مايونيز الليمون الأخضر.' },
        { name: 'تارتار التونة', price: '€20.00', desc: 'تونة حمراء، أفوكادو، كبر وقشر ليمون سورينتو.' },
        { name: 'ريزوتو القشريات', price: '€22.00', desc: 'أرز كارنارولي مطهو مع بيسك القشريات والجمبري.' },
      ]
    },
  };

  const t = content[lang] || content['it'];
  const pdfPath = '/Menu_Proposta/Menu_Italiano_Trattoria_IlCinghiale.pdf';

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
        <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center">
          <iframe
            src={pdfPath}
            title="Menu PDF"
            width="100%"
            height="800px"
            className="rounded-xl border border-restaurant-accent"
          />
          <p className="mt-4 text-gray-600 text-center text-sm">
            {lang === 'it' ? 'Per aggiornare il menu, sostituisci semplicemente il file PDF.' : 'To update the menu, simply replace the PDF file.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
