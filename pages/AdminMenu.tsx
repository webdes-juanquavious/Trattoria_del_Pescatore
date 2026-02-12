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
    price: "",
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
  const [menuForm, setMenuForm] = useState({
    name: "",
    description: "",
    attivo: true,
    tipo_visibilita: "sempre", // sempre | giorni | orari
    data_inizio: "",
    data_fine: "",
    ora_inizio: "",
    ora_fine: ""
  });
  const [menuFormErrors, setMenuFormErrors] = useState<{ [key: string]: string }>({});
    // Validazione live orari
    useEffect(() => {
      if (menuForm.attivo && menuForm.tipo_visibilita === "orari" && menuForm.ora_inizio && menuForm.ora_fine) {
        const [hStart, mStart] = menuForm.ora_inizio.split(":").map(Number);
        const [hEnd, mEnd] = menuForm.ora_fine.split(":").map(Number);
        const startMinutes = hStart * 60 + mStart;
        const endMinutes = hEnd * 60 + mEnd;
        if (endMinutes <= startMinutes) {
          setMenuFormErrors((prev) => ({ ...prev, ora_fine: "L'orario di fine deve essere maggiore dell'orario di inizio" }));
        } else {
          setMenuFormErrors((prev) => {
            const { ora_fine, ...rest } = prev;
            return rest;
          });
        }
      }
    }, [menuForm.ora_inizio, menuForm.ora_fine, menuForm.attivo, menuForm.tipo_visibilita]);
  // Stato per selezione piatti nel menu
  const [selectedDishes, setSelectedDishes] = useState<number[]>([]);
  // Stato per id menu in modifica
  const [editingMenuId, setEditingMenuId] = useState<number | null>(null);

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
      price: dish.price?.toString() || "",
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
    if (!dish.price.trim() || isNaN(Number(dish.price))) newErrors.price = "Prezzo pieno obbligatorio e numerico";
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
          price: dish.price ? Number(dish.price) : null,
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
          price: dish.price ? Number(dish.price) : null,
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
    setMenuForm({
      name: "",
      description: "",
      attivo: true,
      tipo_visibilita: "sempre",
      data_inizio: "",
      data_fine: "",
      ora_inizio: "",
      ora_fine: ""
    });
    setSelectedDishes([]);
    setMenuFormErrors({});
    setEditingMenuId(null);
    setIsMenuModalOpen(true);
  };
  const closeMenuModal = () => {
    setIsMenuModalOpen(false);
    setMenuForm({
      name: "",
      description: "",
      attivo: true,
      tipo_visibilita: "sempre",
      data_inizio: "",
      data_fine: "",
      ora_inizio: "",
      ora_fine: ""
    });
    setMenuFormErrors({});
    setSelectedDishes([]);
    setEditingMenuId(null);
  };
  const handleMenuFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setMenuForm({ ...menuForm, [name]: checked });
    } else {
      setMenuForm({ ...menuForm, [name]: value });
    }
  };
  const validateMenuForm = () => {
    const errs: { [key: string]: string } = {};
    if (!menuForm.name.trim()) errs.name = "Il nome del menu è obbligatorio";
    if (menuForm.description.length > 200) errs.description = "Max 200 caratteri";
    if (menuForm.attivo) {
      if (menuForm.tipo_visibilita === "giorni") {
        if (!menuForm.data_inizio) errs.data_inizio = "Data inizio obbligatoria";
        if (!menuForm.data_fine) errs.data_fine = "Data fine obbligatoria";
      }
      if (menuForm.tipo_visibilita === "orari") {
        if (!menuForm.ora_inizio) errs.ora_inizio = "Ora inizio obbligatoria";
        if (!menuForm.ora_fine) errs.ora_fine = "Ora fine obbligatoria";
        // Validazione orario: 'Alle ore' > 'Dalle ore'
        if (menuForm.ora_inizio && menuForm.ora_fine) {
          // Confronto stringhe HH:mm
          const [hStart, mStart] = menuForm.ora_inizio.split(":").map(Number);
          const [hEnd, mEnd] = menuForm.ora_fine.split(":").map(Number);
          const startMinutes = hStart * 60 + mStart;
          const endMinutes = hEnd * 60 + mEnd;
          if (endMinutes <= startMinutes) {
            errs.ora_fine = "L'orario di fine deve essere maggiore dell'orario di inizio";
          }
        }
      }
    }
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
        const menuPayload = {
          menu_name: menuForm.name,
          description: menuForm.description,
          attivo: menuForm.attivo,
          tipo_visibilita: menuForm.attivo ? menuForm.tipo_visibilita : null,
          data_inizio: menuForm.attivo && menuForm.tipo_visibilita === "giorni" ? menuForm.data_inizio : null,
          data_fine: menuForm.attivo && menuForm.tipo_visibilita === "giorni" ? menuForm.data_fine : null,
          ora_inizio: menuForm.attivo && menuForm.tipo_visibilita === "orari" ? menuForm.ora_inizio : null,
          ora_fine: menuForm.attivo && menuForm.tipo_visibilita === "orari" ? menuForm.ora_fine : null
        };
        if (editingMenuId) {
          // Modifica menu esistente
          await updateMenuHeader(editingMenuId, menuPayload);
          // Elimina vecchie associazioni piatti
          await deleteMenuDishesByMenuId(editingMenuId);
        } else {
          // Nuovo menu
          const newMenu = await insertMenuHeader(menuPayload);
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
  const handleEditMenu = (menu: any) => {
    setMenuForm({
      name: menu.menu_name,
      description: menu.description || "",
      attivo: menu.attivo ?? true,
      tipo_visibilita: menu.tipo_visibilita || "sempre",
      data_inizio: menu.data_inizio || "",
      data_fine: menu.data_fine || "",
      ora_inizio: menu.ora_inizio || "",
      ora_fine: menu.ora_fine || ""
    });
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

  // Carica i piatti associati a un menu (ora dentro il componente)
  const fetchSelectedDishes = async (menuId: number) => {
    try {
      const dishIds = await getMenuDishesByMenuId(menuId);
      setSelectedDishes(dishIds);
    } catch (e) {
      setSelectedDishes([]);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--bg)', color: 'var(--text)', transition: 'background 0.3s, color 0.3s' }}>
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <h1 className="text-5xl font-bold serif mb-12 text-white">Gestione Menu</h1>
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
              <div key={menu.id} className="bg-gray-100 dark:bg-neutral-800 rounded-xl shadow p-6 w-64 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {menu.attivo ? (
                      <>
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-green-500 text-xs font-bold">Attivo</span>
                        <span className="text-green-500 text-xs font-semibold ml-2">
                          {menu.tipo_visibilita === 'sempre' && 'tutti i giorni/orari'}
                          {menu.tipo_visibilita === 'giorni' && menu.data_inizio && menu.data_fine && (
                            <>dal {menu.data_inizio} al {menu.data_fine}</>
                          )}
                          {menu.tipo_visibilita === 'orari' && menu.ora_inizio && menu.ora_fine && (
                            <span>
                              dalle ore {menu.ora_inizio?.slice(0,5)} alle ore {menu.ora_fine?.slice(0,5)}
                            </span>
                          )}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-red-500 text-xs font-bold">Non attivo</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">{menu.menu_name}</h2>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">{menu.description}</p>
                </div>
                <div className="flex flex-col gap-2 w-32 mt-auto">
                  <button
                    className="w-full bg-white text-restaurant-dark font-bold py-3 rounded-xl transition-all hover:bg-restaurant-accent hover:text-white border border-gray-300"
                    onClick={() => handleEditMenu(menu)}
                  >
                    Modifica
                  </button>
                  <button
                    className="w-full bg-transparent border border-red-500 text-red-500 font-bold py-2 rounded-xl transition-all hover:bg-red-600 hover:text-white"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menu.map((dish) => (
              <div key={dish.id} className="flex flex-col md:flex-row items-center bg-gray-100 dark:bg-neutral-800 rounded-lg shadow p-4 gap-4">
                <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-700 rounded overflow-hidden flex items-center justify-center">
                  {dish.photo_url ? (
                    <img src={dish.photo_url} alt={dish.dish_name} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-neutral-400">Foto</span>
                  )}
                </div>
                <div className="flex-1 w-full flex flex-col">
                  <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                    <h2 className="text-xl font-semibold text-orange-500 dark:text-orange-400">{dish.dish_name}</h2>
                  </div>
                  {dish.description && (
                    <p className="text-neutral-700 dark:text-neutral-300 mt-1">{dish.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    {dish.ingredients && (
                      <div className="w-full mb-1">
                        <div className="bg-neutral-200 dark:bg-neutral-700 rounded px-3 py-2 w-full">
                          <div className="font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Ingredienti:</div>
                          <div className="text-neutral-800 dark:text-neutral-100">{dish.ingredients}</div>
                        </div>
                      </div>
                    )}
                    {dish.allergens && (
                      <div className="w-full">
                        <div className="bg-neutral-200 dark:bg-neutral-700 rounded px-3 py-2 w-full">
                          <div className="font-semibold text-neutral-700 dark:text-neutral-200 mb-1">Allergeni:</div>
                          <div className="text-neutral-800 dark:text-neutral-100">{dish.allergens}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between h-full min-h-[80px]">
                  <span className="text-orange-500 dark:text-orange-400 font-bold text-lg mb-2 text-center">
                    {dish.price ? `${dish.price}€` : ""}
                    {dish.price_reduced ? ` / ${dish.price_reduced}€` : ""}
                  </span>
                  <div className="flex flex-col gap-2 w-32">
                    <button
                      className="w-full bg-white text-restaurant-dark font-bold py-3 rounded-xl transition-all hover:bg-restaurant-accent hover:text-white border border-gray-300"
                      onClick={() => openEditModal(dish)}
                    >
                      Modifica
                    </button>
                    <button
                      className="w-full bg-transparent border border-red-500 text-red-500 font-bold py-2 rounded-xl transition-all hover:bg-red-600 hover:text-white"
                      onClick={() => handleDelete(dish.id!)}
                    >
                      Elimina
                    </button>
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-in fade-in zoom-in duration-200 max-h-screen overflow-y-auto p-8">
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
              {/* Attivo switch */}
              <div className="flex items-center gap-4 mt-2">
                <label className="font-bold text-black">Menu attivo</label>
                <input
                  type="checkbox"
                  name="attivo"
                  checked={menuForm.attivo}
                  onChange={handleMenuFormChange}
                  className="accent-orange-500 w-5 h-5"
                />
              </div>
              {/* Se attivo, mostra tipo visibilità */}
              {menuForm.attivo && (
                <div className="mt-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Visibilità menu</label>
                  <select
                    name="tipo_visibilita"
                    value={menuForm.tipo_visibilita}
                    onChange={handleMenuFormChange}
                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-restaurant-dark cursor-pointer"
                  >
                    <option value="sempre">Sempre (tutti i giorni/orari)</option>
                    <option value="giorni">Dal giorno al giorno</option>
                    <option value="orari">Dall'ora all'ora</option>
                  </select>
                </div>
              )}
              {/* Se tipo_visibilita = giorni, mostra date */}
              {menuForm.attivo && menuForm.tipo_visibilita === "giorni" && (
                <div className="flex gap-4 mt-2">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dal giorno</label>
                    <input
                      type="date"
                      name="data_inizio"
                      value={menuForm.data_inizio}
                      onChange={handleMenuFormChange}
                      className={`w-full bg-gray-100 border ${menuFormErrors.data_inizio ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3`}
                    />
                    {menuFormErrors.data_inizio && <span className="text-red-500 text-xs">{menuFormErrors.data_inizio}</span>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Al giorno</label>
                    <input
                      type="date"
                      name="data_fine"
                      value={menuForm.data_fine}
                      onChange={handleMenuFormChange}
                      className={`w-full bg-gray-100 border ${menuFormErrors.data_fine ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3`}
                    />
                    {menuFormErrors.data_fine && <span className="text-red-500 text-xs">{menuFormErrors.data_fine}</span>}
                  </div>
                </div>
              )}
              {/* Se tipo_visibilita = orari, mostra orari */}
              {menuForm.attivo && menuForm.tipo_visibilita === "orari" && (
                <div className="flex gap-4 mt-2">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dalle ore</label>
                    <input
                      type="time"
                      name="ora_inizio"
                      value={menuForm.ora_inizio}
                      onChange={handleMenuFormChange}
                      className={`w-full bg-gray-100 border ${menuFormErrors.ora_inizio ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3`}
                      placeholder="--:--"
                      lang="it"
                      step="60"
                    />
                    {menuFormErrors.ora_inizio && <span className="text-red-500 text-xs">{menuFormErrors.ora_inizio}</span>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alle ore</label>
                    <input
                      type="time"
                      name="ora_fine"
                      value={menuForm.ora_fine}
                      onChange={handleMenuFormChange}
                      className={`w-full bg-gray-100 border ${menuFormErrors.ora_fine ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3`}
                      placeholder="--:--"
                      lang="it"
                      step="60"
                    />
                    {menuFormErrors.ora_fine && <span className="text-red-500 text-xs">{menuFormErrors.ora_fine}</span>}
                  </div>
                </div>
              )}
              {menuForm.attivo && menuForm.tipo_visibilita === "orari" && (
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">Esempio: Dalle <span className="font-mono">11:00</span> alle <span className="font-mono">15:30</span></span>
                </div>
              )}
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
                    id="price"
                    name="price"
                    value={dish.price}
                    onChange={handleChange}
                    required
                    placeholder="10.5"
                  />
                  <span className="absolute right-3 top-9 text-gray-400 font-bold pointer-events-none">€</span>
                  {errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}
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
