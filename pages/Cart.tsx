import React, { useEffect, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
// Chiave pubblica Stripe (sostituisci con la tua vera chiave pubblica)
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');
// Modal semplice per Stripe Checkout
const StripeModal: React.FC<{ open: boolean, onClose: () => void, amount: number }> = ({ open, onClose, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Qui dovresti chiamare la tua API per creare un PaymentIntent e confermare il pagamento
    // Questo è solo un placeholder UI
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-200 flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border-2 border-orange-500 text-orange-500 text-2xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors" onClick={onClose}>&#10005;</button>
        <h2 className="text-2xl font-bold mb-4 text-restaurant-accent">Pagamento online</h2>
        {success ? (
          <div className="text-green-600 text-lg font-semibold">Pagamento completato! 🎉</div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="mb-4 w-full">
              <CardElement options={{ style: { base: { fontSize: '18px' } } }} />
            </div>
            <button type="submit" disabled={loading} className="px-8 py-3 bg-restaurant-accent text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition-all w-full">
              {loading ? 'Attendi...' : `Paga ${amount.toFixed(2)}€`}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
};
import { Language } from '../App';
import { MenuDish } from '../services/supabase';

interface CartProps {
  lang: Language;
}

const translations: Record<string, any> = {
  it: {
    title: 'Il tuo carrello',
    empty: 'Il carrello è vuoto.',
    total: 'Totale',
    remove: 'Rimuovi',
    checkout: 'Procedi all’ordine',
  },
  en: {
    title: 'Your cart',
    empty: 'Your cart is empty.',
    total: 'Total',
    remove: 'Remove',
    checkout: 'Checkout',
  },
  fr: {
    title: 'Votre panier',
    empty: 'Le panier est vide.',
    total: 'Total',
    remove: 'Supprimer',
    checkout: 'Commander',
  },
  es: {
    title: 'Tu carrito',
    empty: 'El carrito está vacío.',
    total: 'Total',
    remove: 'Eliminar',
    checkout: 'Pedir',
  },
  de: {
    title: 'Dein Warenkorb',
    empty: 'Der Warenkorb ist leer.',
    total: 'Gesamt',
    remove: 'Entfernen',
    checkout: 'Zur Kasse',
  },
  zh: {
    title: '你的购物车',
    empty: '购物车是空的。',
    total: '总计',
    remove: '移除',
    checkout: '结账',
  },
  ar: {
    title: 'سلة التسوق',
    empty: 'السلة فارغة.',
    total: 'المجموع',
    remove: 'إزالة',
    checkout: 'إتمام الطلب',
  },
};

const Cart: React.FC<CartProps> = ({ lang }) => {
  const t = translations[lang] || translations['it'];
  const [cart, setCart] = useState<MenuDish[]>([]);
  const [showStripe, setShowStripe] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart');
      setCart(stored ? JSON.parse(stored) : []);
    } catch {
      setCart([]);
    }
  }, []);

  // Raggruppa piatti uguali per id
  const grouped = cart.reduce((acc: Record<string, { dish: MenuDish, qty: number }>, dish) => {
    const key = dish.id || dish.dish_name;
    if (!acc[key]) acc[key] = { dish, qty: 0 };
    acc[key].qty++;
    return acc;
  }, {});
  const groupedArr = Object.values(grouped);

  // Rimuovi una quantità di un piatto
  const removeFromCart = (dishId: number | undefined, dishName: string) => {
    let removed = false;
    const newCart = cart.filter(d => {
      if (!removed && (d.id === dishId || (!dishId && d.dish_name === dishName))) {
        removed = true;
        return false;
      }
      return true;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, dish) => sum + (dish.price || 0), 0);

  return (
    <div className="pt-32 pb-20 bg-restaurant-dark min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl text-white serif text-center mb-12">{t.title}</h1>
        {cart.length === 0 ? (
          <div className="text-center text-neutral-400 text-xl py-16">{t.empty}</div>
        ) : (
          <div className="space-y-6">
            {groupedArr.map(({ dish, qty }, i) => (
              <div key={dish.id || dish.dish_name} className="flex bg-white/5 border border-white/10 rounded-xl p-4 gap-6 items-stretch">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                  {dish.photo_url ? (
                    <img src={dish.photo_url} alt={dish.dish_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-neutral-400">Foto</span>
                  )}
                </div>
                <div className="flex flex-grow flex-col justify-center">
                  <h3 className="text-lg text-restaurant-accent serif mb-1">{dish.dish_name}</h3>
                  {dish.description && <p className="text-restaurant-subtext text-xs mb-1">{dish.description}</p>}
                </div>
                <div className="flex flex-col justify-center items-center mx-4">
                  {dish.price && <span className="text-restaurant-accent font-bold text-2xl mb-2">{dish.price}€</span>}
                </div>
                <div className="flex flex-col justify-center items-center min-w-[110px]">
                  {qty > 1 && (
                    <span className="text-white font-bold text-lg mb-1">x{qty}</span>
                  )}
                  <button
                    className="px-6 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg font-semibold text-lg transition-all"
                    style={{ minWidth: '110px' }}
                    onClick={() => removeFromCart(dish.id, dish.dish_name)}
                  >
                    {t.remove}
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-6">
              <span className="text-xl text-white font-bold">{t.total}</span>
              <span className="text-2xl text-restaurant-accent font-bold">{total.toFixed(2)}€</span>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-8 py-3 bg-restaurant-accent text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition-all"
                onClick={() => setShowStripe(true)}
              >
                {t.checkout}
              </button>
            </div>
            <Elements stripe={stripePromise}>
              <StripeModal open={showStripe} onClose={() => setShowStripe(false)} amount={total} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
