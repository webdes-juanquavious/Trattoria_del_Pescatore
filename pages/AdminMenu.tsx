import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  getMenuDishes,
  insertMenuDish,
  updateMenuDish,
  deleteMenuDish,
  MenuDish,
  getMenuHeaders,
  insertMenuHeader,
  updateMenuHeader,
  deleteMenuHeader,
  deleteMenuDishesByMenuId,
  insertMenuDishes,
  MenuHeader,
  getMenuDishesByMenuId
} from "../services/supabase";
  // Carica i piatti associati a un menu
  async function fetchSelectedDishes(menuId: number) {
    try {
      const dishIds = await getMenuDishesByMenuId(menuId);
      setSelectedDishes(dishIds);
    } catch (e) {
      setSelectedDishes([]);
    }
  }

const dishCategories = [
  "Antipasti",
  "Primi",
  "Secondi",
  "Contorni",
  "Dolci",
  "Bevande"
];

export default function AdminMenu() {
  // Stato CRUD
  const [menu, setMenu] = useState<MenuDish[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Stato per apertura modale e modifica
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  // Stato per i campi del piatto
  const emptyDish = {
    name: "",
    category: dishCategories[0],
    photo_url: "",
    description: "",
    price_full: "",
    price_reduced: "",
    ingredients: "",
    allergens: "",
  };
  const [dish, setDish] = useState<any>(emptyDish);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Stato menu header
  const [menus, setMenus] = useState<MenuHeader[]>([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuError, setMenuError] = useState<string | null>(null);

  // Stato per modale menu
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [menuForm, setMenuForm] = useState({ name: "", description: "" });
  const [menuFormErrors, setMenuFormErrors] = useState<{ [key: string]: string }>({});
  // Stato per selezione piatti nel menu
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);
  // Stato per id menu in modifica
  const [editingMenuId, setEditingMenuId] = useState<number | null>(null);

  // Carica i piatti associati a un menu (ora dentro il componente)
  const fetchSelectedDishes = async (menuId: number) => {
    try {
      const dishIds = await getMenuDishesByMenuId(menuId);
      setSelectedDishes(dishIds);
    } catch (e) {
      setSelectedDishes([]);
    }
  };

  // Carica menu all'avvio
  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMenuDishes();
        setMenu(data);
      } catch (e: any) {
        setError("Errore nel caricamento del menu");
      } finally {
        setLoading(false);
      }
    };
    const loadMenus = async () => {
      setMenuLoading(true);
      setMenuError(null);
      try {
        const data = await getMenuHeaders();
        setMenus(data);
      } catch (e: any) {
        setMenuError("Errore nel caricamento dei menu");
      } finally {
        setMenuLoading(false);
      }
    };
    loadMenu();
    loadMenus();
  }, []);

  // Apri modale per nuovo piatto
  const openModal = () => {
    setEditingId(null);
    setDish(emptyDish);
    setErrors({});
    setIsModalOpen(true);
  };
  // Apri modale per modifica
  const openEditModal = (dish: MenuDish) => {
    setEditingId(dish.id!);
    setDish({
      name: dish.dish_name || "",
      category: dish.category || dishCategories[0],
      photo_url: dish.photo_url || "",
      description: dish.description || "",
      price_full: dish.price?.toString() || "",
      price_reduced: dish.price_reduced?.toString() || "",
      ingredients: dish.ingredients || "",
      allergens: dish.allergens || "",
    });
    setErrors({});
    setIsModalOpen(true);
  };
  // Chiudi modale
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setDish(emptyDish);
    setErrors({});
  };
  // Gestione input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "description") {
      setDish({ ...dish, description: value.slice(0, 250) });
    } else {
      setDish({ ...dish, [name]: value });
    }
  };
  // Validazione base
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!dish.name.trim()) newErrors.name = "Il nome è obbligatorio";
    if (!dish.price_full.trim() || isNaN(Number(dish.price_full))) newErrors.price_full = "Prezzo pieno obbligatorio e numerico";
    if (dish.price_reduced && isNaN(Number(dish.price_reduced))) newErrors.price_reduced = "Prezzo ridotto deve essere numerico";
    if (dish.description.length > 250) newErrors.description = "Limite massimo di 250 caratteri raggiunto";
    return newErrors;
  };
  // Submit (crea o modifica)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setLoading(true);
    setError(null);
    try {
      if (editingId) {
        // Modifica
        await updateMenuDish(editingId, {
          dish_name: dish.name,
          category: dish.category,
          photo_url: dish.photo_url,
          description: dish.description,
          price_full: dish.price_full ? Number(dish.price_full) : null,
          price_reduced: dish.price_reduced ? Number(dish.price_reduced) : null,
          ingredients: dish.ingredients,
          allergens: dish.allergens,
        });
      } else {
        // Nuovo
        await insertMenuDish({
          dish_name: dish.name,
          category: dish.category,
          photo_url: dish.photo_url,
          description: dish.description,
          price_full: dish.price_full ? Number(dish.price_full) : null,
          price_reduced: dish.price_reduced ? Number(dish.price_reduced) : null,
          ingredients: dish.ingredients,
          allergens: dish.allergens,
        });
      }
      // Aggiorna lista
      const data = await getMenuDishes();
      setMenu(data);
      closeModal();
    } catch (e: any) {
      setError("Errore nel salvataggio del piatto");
    } finally {
      setLoading(false);
    }
  };
  // Elimina piatto
  const handleDelete = async (id: number) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo piatto?")) return;
    setLoading(true);
    setError(null);
    try {
      await deleteMenuDish(id);
      setMenu(menu.filter((d) => d.id !== id));
    } catch (e: any) {
      setError("Errore nell'eliminazione del piatto");
    } finally {
      setLoading(false);
    }
  };

  const openMenuModal = () => {
    setMenuForm({ name: "", description: "" });
    setSelectedDishes([]);
    setMenuFormErrors({});
    setEditingMenuId(null);
    setIsMenuModalOpen(true);
  };
  const closeMenuModal = () => {
    setIsMenuModalOpen(false);
    setMenuForm({ name: "", description: "" });
    setMenuFormErrors({});
    setSelectedDishes([]);
    setEditingMenuId(null);
  };
  const handleMenuFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMenuForm({ ...menuForm, [e.target.name]: e.target.value });
  };
  const validateMenuForm = () => {
    const errs: { [key: string]: string } = {};
    if (!menuForm.name.trim()) errs.name = "Il nome del menu è obbligatorio";
    if (menuForm.description.length > 200) errs.description = "Max 200 caratteri";
    return errs;
  };
  const handleMenuFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateMenuForm();
    setMenuFormErrors(errs);
    if (Object.keys(errs).length > 0) return;
    (async () => {
      try {
        let menuId = editingMenuId;
        if (editingMenuId) {
          // Modifica menu esistente
          await updateMenuHeader(editingMenuId, {
            menu_name: menuForm.name,
            description: menuForm.description,
          });
          // Elimina vecchie associazioni piatti
          await deleteMenuDishesByMenuId(editingMenuId);
        } else {
          // Nuovo menu
          const newMenu = await insertMenuHeader({
            menu_name: menuForm.name,
            description: menuForm.description,
          });
          menuId = newMenu.id;
        }
        // Inserisci nuove associazioni piatti
        if (menuId) {
          await insertMenuDishes(menuId, selectedDishes);
        }
        // aggiorna lista menu
        const data = await getMenuHeaders();
        setMenus(data);
        closeMenuModal();
      } catch (e) {
        setMenuError('Errore nel salvataggio del menu');
      }
    })();
  };

  // Handler per modifica menu (apre la modale con i dati del menu)
  const handleEditMenu = (menu: MenuHeader) => {
    setMenuForm({ name: menu.menu_name, description: menu.description || "" });
    setMenuFormErrors({});
    setEditingMenuId(menu.id ?? null);
    setIsMenuModalOpen(true);
  };

  // Effetto: quando si apre la modale per modifica menu, carica i piatti associati
  React.useEffect(() => {
    if (isMenuModalOpen && editingMenuId) {
      fetchSelectedDishes(editingMenuId);
    }
    if (isMenuModalOpen && !editingMenuId) {
      setSelectedDishes([]);
    }
  }, [isMenuModalOpen, editingMenuId]);

  // Handler per eliminazione menu
  const handleDeleteMenu = async (id: number) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo menu?")) return;
    setMenuLoading(true);
    setMenuError(null);
    try {
      await deleteMenuDishesByMenuId(id);
      await deleteMenuHeader(id);
      const data = await getMenuHeaders();
      setMenus(data);
    } catch (e) {
      setMenuError('Errore durante eliminazione menu');
    } finally {
      setMenuLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8 px-4">
      <div className="max-w-3xl mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-white">Gestione Menu</h1>
        <div className="mb-6 text-neutral-600 dark:text-neutral-300">
          <div>Qui puoi aggiungere, modificare o eliminare i menu e i piatti del menu. Ecco come puoi procedere:</div>
          <div className="mt-2">1) inserisci o modifica i piatti.</div>
          <div>2) puoi creare, modificare ed attivare vari tipi di menu (esempio: "menu pranzo", "menu cena", "menu di natale", "menu inverno"...).</div>
          <div className="mt-2">Se il menu non esiste, allora verranno mostrati tutti i piatti disponibili.</div>
        </div>
        {/* Sezione Gestione Menu */}
        <div className="mb-10">
          <div className="mb-6 flex items-center" style={{gap: '1rem'}}>
            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold shadow transition" onClick={openMenuModal}>
              + Aggiungi menu
            </button>
            {menus.length === 0 && (
              <span className="text-red-600 font-semibold" style={{fontSize: '1.2rem'}}>Nessun menu esistente</span>
            )}
          </div>
          {/* menuError visualizzato solo nel popup */}
          {menuLoading && <div className="mb-4 text-orange-500">Caricamento menu...</div>}
          <div className="flex flex-wrap gap-4">
            {menus.map((menu) => (
              <div key={menu.id} className="bg-neutral-800 rounded-xl shadow p-6 w-64 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{menu.menu_name}</h2>
                  <p className="text-neutral-300 text-sm mb-4">{menu.description}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl transition-all"
                    onClick={() => handleEditMenu(menu)}
                  >
                    Modifica
                  </button>
                  <button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-xl transition-all"
                    onClick={() => handleDeleteMenu(menu.id)}
                  >
                    Elimina
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Sezione Gestione Piatti */}
        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center" style={{gap: '1rem'}}>
              <button
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold shadow transition"
                onClick={openModal}
              >
                + Aggiungi piatto
              </button>
              {menu.length === 0 && (
                <span className="text-red-600 font-semibold" style={{fontSize: '1.2rem'}}>Nessun piatto esistente</span>
              )}
            </div>
            {menu.length > 0 && (
              <span className="text-base font-semibold text-orange-500" style={{letterSpacing: '0.5px'}}>Totale numero piatti: {menu.length}</span>
            )}
          </div>
          {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}
          {loading && <div className="mb-4 text-orange-500">Caricamento...</div>}
          {/* Lista piatti */}
          <div className="space-y-4">
            {menu.map((dish) => (
              <div key={dish.id} className="flex flex-col md:flex-row items-center bg-white dark:bg-neutral-800 rounded-lg shadow p-4 gap-4">
                <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-700 rounded overflow-hidden flex items-center justify-center">
                  {dish.photo_url ? (
                    <img src={dish.photo_url} alt={dish.dish_name} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-neutral-400">Foto</span>
                  )}
                </div>
                <div className="flex-1 w-full flex flex-col">
                  <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                    <h2 className="text-xl font-semibold text-orange-500">{dish.dish_name}</h2>
                  </div>
                  {dish.description && (
                    <p className="text-neutral-600 dark:text-neutral-300 mt-1">{dish.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    {dish.ingredients && (
                      <div className="w-full mb-1">
                        <div className="bg-neutral-100 dark:bg-neutral-700 rounded px-3 py-2 w-full">
                          <div className="font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Ingredienti:</div>
                          <div className="text-neutral-800 dark:text-neutral-100">{dish.ingredients}</div>
                        </div>
                      </div>
                    )}
                    {dish.allergens && (
                      <div className="w-full">
                        <div className="bg-neutral-100 dark:bg-neutral-700 rounded px-3 py-2 w-full">
                          <div className="font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Allergeni:</div>
                          <div className="text-neutral-800 dark:text-neutral-100">{dish.allergens}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full min-h-[80px]">
                  <span className="text-orange-500 font-bold text-lg mb-2">
                    {dish.price ? `${dish.price}€` : ""}
                    {dish.price_reduced ? ` / ${dish.price_reduced}€` : ""}
                  </span>
                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={() => openEditModal(dish)}>Modifica</button>
                    <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded" onClick={() => handleDelete(dish.id!)}>Elimina</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modale menu */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-in fade-in zoom-in duration-200">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 transition-colors p-2"
              onClick={closeMenuModal}
              aria-label="Chiudi"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-2 text-restaurant-dark serif">Aggiungi Menu</h2>
            <p className="text-xs text-gray-500 mb-4">Il nome del menu è obbligatorio</p>
            <form onSubmit={handleMenuFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="menu_name">Nome menu *</label>
                <input
                  className={`w-full bg-gray-100 border ${menuFormErrors.name ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark`}
                  type="text"
                  id="menu_name"
                  name="name"
                  value={menuForm.name}
                  onChange={handleMenuFormChange}
                  required
                  placeholder="Menu Estate, Menu Bambini, Menu Natale..."
                />
                {menuFormErrors.name && <span className="text-red-500 text-xs">{menuFormErrors.name}</span>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="menu_description">Descrizione</label>
                <textarea
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark min-h-[60px]"
                  id="menu_description"
                  name="description"
                  value={menuForm.description}
                  onChange={handleMenuFormChange}
                  rows={2}
                  maxLength={200}
                  placeholder="Menu per le vacanze di Natale 2022, menu pensato per i più piccoli..."
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">{menuForm.description.length}/200</span>
                  {menuForm.description.length === 200 && (
                    <span className="text-red-500 text-xs ml-2">Limite massimo di 200 caratteri raggiunto</span>
                  )}
                </div>
              </div>
              {/* Lista piatti selezionabili (solo grafica, stato locale) */}
              <div className="mt-6">
                <div className="font-bold text-black mb-2">Seleziona i piatti per questo menu:</div>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {menu.map((dish) => (
                    <label key={dish.id} className="flex items-center gap-2 px-3 py-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDishes.includes(dish.id)}
                        onChange={() => {
                          setSelectedDishes((prev) =>
                            prev.includes(dish.id)
                              ? prev.filter((id) => id !== dish.id)
                              : [...prev, dish.id]
                          );
                        }}
                        style={{ accentColor: selectedDishes.includes(dish.id) ? '#22c55e' : undefined }} // verde se selezionato
                      />
                      <span className="font-medium text-black">{dish.dish_name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-restaurant-accent hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all mt-6"
              >
                Salva
              </button>
              {error && (
                <div className="mt-4 text-red-500 font-semibold text-center">{error}</div>
              )}
              {menuError && (
                <div className="mt-4 text-red-500 font-semibold text-center">{menuError}</div>
              )}
            </form>
          </div>
        </div>
      )}
      {/* Modale/Form aggiunta/modifica piatto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-in fade-in zoom-in duration-200">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 transition-colors p-2"
              onClick={closeModal}
              aria-label="Chiudi"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-2 text-restaurant-dark serif">Aggiungi Piatto</h2>
            <p className="text-xs text-gray-500 mb-4">i campi con * sono obbligatori</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-[1] min-w-0">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="category">Categoria</label>
                  <select
                    name="category"
                    id="category"
                    value={dish.category}
                    onChange={handleChange}
                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark cursor-pointer"
                    required
                  >
                    {dishCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-[2] min-w-0">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="name">Nome del piatto *</label>
                  <input
                    className={`w-full min-w-0 bg-gray-100 border ${errors.name ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark`}
                    type="text"
                    id="name"
                    name="name"
                    value={dish.name}
                    onChange={handleChange}
                    required
                    placeholder="Antipasto di formaggi"
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="photo_url">URL Foto (da Google Drive)</label>
                <input
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark"
                  type="text"
                  id="photo_url"
                  name="photo_url"
                  value={dish.photo_url}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="description">Descrizione</label>
                <textarea
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark min-h-[80px]"
                  id="description"
                  name="description"
                  value={dish.description}
                  onChange={handleChange}
                  rows={2}
                  maxLength={250}
                  placeholder="Un antipasto di prodotti locali a base di formaggi stagionati, mozzarelline di bufala ed olive"
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">{dish.description.length}/250</span>
                  {dish.description.length === 250 && (
                    <span className="text-red-500 text-xs ml-2">Limite massimo di 250 caratteri raggiunto</span>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="price_full">Prezzo Pieno *</label>
                  <input
                    className={`w-full bg-gray-100 border ${errors.price_full ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark`}
                    type="text"
                    id="price_full"
                    name="price_full"
                    value={dish.price_full}
                    onChange={handleChange}
                    required
                    placeholder="10.5"
                  />
                  <span className="absolute right-3 top-9 text-gray-400 font-bold pointer-events-none">€</span>
                  {errors.price_full && <span className="text-red-500 text-xs">{errors.price_full}</span>}
                </div>
                <div className="flex-1 relative">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="price_reduced">Prezzo Ridotto</label>
                  <input
                    className={`w-full bg-gray-100 border ${errors.price_reduced ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark`}
                    type="text"
                    id="price_reduced"
                    name="price_reduced"
                    value={dish.price_reduced}
                    onChange={handleChange}
                    placeholder="8.0"
                  />
                  <span className="absolute right-3 top-9 text-gray-400 font-bold pointer-events-none">€</span>
                  {errors.price_reduced && <span className="text-red-500 text-xs">{errors.price_reduced}</span>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="ingredients">Ingredienti</label>
                <input
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark"
                  type="text"
                  id="ingredients"
                  name="ingredients"
                  value={dish.ingredients}
                  onChange={handleChange}
                  placeholder="Formaggi, olive, olio extra vergine"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="allergens">Allergeni</label>
                <input
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark"
                  type="text"
                  id="allergens"
                  name="allergens"
                  value={dish.allergens}
                  onChange={handleChange}
                  placeholder="Latte, lattosio, uova"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-restaurant-accent hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all mt-6"
              >
                Salva
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
