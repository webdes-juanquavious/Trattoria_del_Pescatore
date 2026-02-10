// Funzioni Supabase per SettingWebapp
import { supabase } from './supabase';

export async function getSettingWebapp() {
  const { data, error } = await supabase
    .from('SettingWebapp')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    .single();
  if (error) return null;
  return data;
}

export async function updateSettingWebapp({ theme_light, theme_dark }) {
  // Upsert: aggiorna sempre il record con id=1
  await supabase
    .from('SettingWebapp')
    .upsert([{ id: 1, theme_light, theme_dark }], { onConflict: ['id'] });
}
