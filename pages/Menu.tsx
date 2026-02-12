import React, { useEffect, useState } from 'react';
import { Language } from '../App';
import { getMenuHeaders, getMenuDishes, MenuHeader, MenuDish } from '../services/supabase';

interface MenuProps {
  lang: Language;
}

const Menu: React.FC<MenuProps> = ({ lang }) => {
  const [menuHeader, setMenuHeader] = useState<MenuHeader | null>(null);
  const [dishes, setDishes] = useState<MenuDish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalDish, setModalDish] = useState<MenuDish | null>(null);
  const pdfPath = '/Menu_Proposta/Menu_Italiano_Trattoria_IlCinghiale.pdf';

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = await getMenuHeaders();
        if (headers && headers.length > 0) {
          setMenuHeader(headers[0]);
        } else {
          setMenuHeader(null);
          const allDishes = await getMenuDishes();
          setDishes(allDishes);
        }
      } catch (e: any) {
        setError('Errore nel caricamento del menu');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Modal close handler
  const closeModal = () => setModalDish(null);

  return (
    <div className="pt-32 pb-20 bg-restaurant-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl text-white serif text-center mb-16">Menu</h1>
        {loading && <div className="text-orange-500 text-center text-xl mb-8">Caricamento...</div>}
        {error && <div className="text-red-500 text-center text-xl mb-8">{error}</div>}
        {!loading && !error && menuHeader && (
          <div className="text-center mb-12">
            <span className="text-2xl font-bold text-red-600">{menuHeader.menu_name}</span>
          </div>
        )}
        {!loading && !error && !menuHeader && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {dishes.length === 0 && (
              <div className="col-span-2 text-center text-red-500 text-xl">Nessun piatto disponibile</div>
            )}
            {dishes.map((dish, i) => (
              <div key={dish.id || i} className="flex gap-6 group cursor-pointer bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                  {dish.photo_url ? (
                    <img
                      src={dish.photo_url}
                      alt={dish.dish_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      onClick={() => setModalDish(dish)}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <span className="text-neutral-400">Foto</span>
                  )}
                </div>
                <div className="flex-grow pb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl text-white serif">{dish.dish_name}</h3>
                    {dish.price && <span className="text-restaurant-accent font-bold">{dish.price}€</span>}
                  </div>
                  {dish.description && <p className="text-restaurant-subtext text-sm mb-2">{dish.description}</p>}
                  {dish.ingredients && (
                    <div className="text-xs text-neutral-200 mb-1"><span className="font-semibold">Ingredienti:</span> {dish.ingredients}</div>
                  )}
                  {dish.allergens && (
                    <div className="text-xs text-neutral-400"><span className="font-semibold">Allergeni:</span> {dish.allergens}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* PDF section unchanged */}
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
      {/* Modal popup for dish photo */}
      {modalDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={closeModal}>
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full relative animate-in fade-in zoom-in duration-200 flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-orange-500 shadow-lg text-3xl text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-600 transition-colors duration-150 z-10"
              onClick={closeModal}
              aria-label="Chiudi"
              style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.15)' }}
            >
              &#10005;
            </button>
            {modalDish.photo_url && (
              <img
                src={modalDish.photo_url}
                alt={modalDish.dish_name}
                className="rounded-xl mb-6 w-full max-h-[400px] object-cover"
              />
            )}
            <h2 className="text-2xl font-bold mb-2 text-restaurant-dark serif">{modalDish.dish_name}</h2>
            {modalDish.description && (
              <p className="text-neutral-700 text-center text-lg mb-2">{modalDish.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;

