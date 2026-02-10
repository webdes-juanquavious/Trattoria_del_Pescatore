// Ottieni tutti gli id dei piatti associati a un menu
export const getMenuDishesByMenuId = async (menu_id: number): Promise<number[]> => {
  const { data, error } = await supabase
    .from('menu_dishes')
    .select('dish_id')
    .eq('menu_id', menu_id);
  if (error) throw error;
  return (data || []).map((row: any) => row.dish_id);
};
// Inserisci associazioni piatti-menu (menu_dishes)
export const insertMenuDishes = async (menu_id: number, dish_ids: number[]): Promise<void> => {
  if (dish_ids.length === 0) return;
  const rows = dish_ids.map((dish_id) => ({ menu_id, dish_id }));
  const { error } = await supabase
    .from('menu_dishes')
    .insert(rows);
  if (error) throw error;
};
// Elimina tutte le associazioni piatti di un menu
export const deleteMenuDishesByMenuId = async (menu_id: number): Promise<void> => {
  const { error } = await supabase
    .from('menu_dishes')
    .delete()
    .eq('menu_id', menu_id);
  if (error) throw error;
};
// --- JOB OFFERS CRUD ---
export interface JobOffer {
  id?: number;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  Job_Title?: string;
  role_icon?: string;
  Mansione?: string;
  Contract_Type?: string;
  Job_Location?: string;
  Job_Description?: string;
  Salary_Amount?: number;
  Salary_Period?: string;
}

// Get all job offers (public)
export const getJobOffers = async (): Promise<JobOffer[]> => {
  const { data, error } = await supabase
    .from('job_offers')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data as JobOffer[];
};

// Insert new job offer (admin)
export const insertJobOffer = async (offer: JobOffer): Promise<JobOffer> => {
  const { data, error } = await supabase
    .from('job_offers')
    .insert([offer])
    .select()
    .single();
  if (error) throw error;
  return data as JobOffer;
};

// Update job offer by id (admin)
export const updateJobOffer = async (id: number, offer: Partial<JobOffer>): Promise<JobOffer> => {
  const { data, error } = await supabase
    .from('job_offers')
    .update(offer)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as JobOffer;
};

// Delete job offer by id (admin)
export const deleteJobOffer = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('job_offers')
    .delete()
    .eq('id', id);
  if (error) throw error;
};


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://umvvcgvvzvzqjofozxep.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtdnZjZ3Z2enZ6cWpvZm96eGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyODk3MDMsImV4cCI6MjA4NTg2NTcwM30.SybGkVUzDDqmy30ZOqAjAKwzM9vteOn4yyJKh0zet6w';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ReservationData {
  full_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
  notes?: string;
}

export const insertReservation = async (data: ReservationData) => {
  const { data: result, error } = await supabase.from('reservations').insert([data]);
  if (error) throw error;
  return result;
};


export interface ContactInfoRow {
  id: number;
  [key: string]: any;
}
export const insertContact = async (data: any): Promise<ContactInfoRow[]> => {
  // Non passare columns, solo l’oggetto data
  const { data: result, error } = await supabase.from('contact_info').insert([data]).select();
  if (error) throw error;
  return result as ContactInfoRow[];
};



export const getContactInfo = async () => {
  // Prendi sempre l'ultimo record (id più alto)
  const { data, error } = await supabase.from('contact_info').select('*').order('id', { ascending: false }).limit(1);
  if (error) throw error;
  return data && data[0];
};

export const updateContactInfo = async (id: number, data: any) => {
  const { data: result, error } = await supabase.from('contact_info').update(data).eq('id', id);
  if (error) throw error;
  return result;
};

// --- MENU CRUD ---
export interface MenuDish {
  id?: number;
  created_at?: string;
  dish_name: string;
  category?: string;
  photo_url?: string;
  description?: string;
  price?: number;
  price_reduced?: number;
  ingredients?: string;
  allergens?: string;
}

// Get all menu dishes
export const getMenuDishes = async (): Promise<MenuDish[]> => {
  const { data, error } = await supabase
    .from('menu_list')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as MenuDish[];
};

// Insert new dish
export const insertMenuDish = async (dish: MenuDish): Promise<MenuDish> => {
  const { data, error } = await supabase
    .from('menu_list')
    .insert([dish])
    .select()
    .single();
  if (error) throw error;
  return data as MenuDish;
};

// Update dish by id
export const updateMenuDish = async (id: number, dish: Partial<MenuDish>): Promise<MenuDish> => {
  const { data, error } = await supabase
    .from('menu_list')
    .update(dish)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as MenuDish;
};

// Delete dish by id
export const deleteMenuDish = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('menu_list')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// --- MENU HEADER CRUD ---
export interface MenuHeader {
  id?: number;
  created_at?: string;
  menu_name: string;
  description?: string;
  attivo?: boolean;
  tipo_visibilita?: string | null;
  data_inizio?: string | null;
  data_fine?: string | null;
  ora_inizio?: string | null;
  ora_fine?: string | null;
}

export const getMenuHeaders = async (): Promise<MenuHeader[]> => {
  const { data, error } = await supabase
    .from('menu_header')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as MenuHeader[];
};

export const insertMenuHeader = async (menu: MenuHeader): Promise<MenuHeader> => {
  const { data, error } = await supabase
    .from('menu_header')
    .insert([menu])
    .select()
    .single();
  if (error) throw error;
  return data as MenuHeader;
};

export const updateMenuHeader = async (id: number, menu: Partial<MenuHeader>): Promise<MenuHeader> => {
  const { data, error } = await supabase
    .from('menu_header')
    .update(menu)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as MenuHeader;
};

export const deleteMenuHeader = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('menu_header')
    .delete()
    .eq('id', id);
  if (error) throw error;
};
