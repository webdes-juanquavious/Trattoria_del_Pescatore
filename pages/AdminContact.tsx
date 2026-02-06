
import React, { useEffect, useState } from 'react';
import { getContactInfo, insertContact } from '../services/supabase';

const AdminContact: React.FC = () => {
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getContactInfo()
      .then(setMeta)
      .catch(() => setMeta(null))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const dataToSave = {
        Restaurant_Name: meta.Restaurant_Name,
        Address: meta.Address,
        Email: meta.Email,
        GoogleMaps: meta.GoogleMaps,
        GoogleEmbeddedMaps: meta.GoogleEmbeddedMaps,
        Phone: meta.Phone,
        CallPhone: meta.CallPhone,
        Whatsapp: meta.Whatsapp,
        Open_time_it: meta.Open_time_it,
        DescrizioneRistorante_it: meta.DescrizioneRistorante_it,
        Social_facebook: meta.Social_facebook,
        Social_instagram: meta.Social_instagram,
        Social_tiktok: meta.Social_tiktok,
        Social_twitter: meta.Social_twitter,
        Social_whatsapp: meta.Social_whatsapp,
        Open_time_en: meta.Open_time_en,
        Open_time_fr: meta.Open_time_fr,
        Open_time_es: meta.Open_time_es,
        Open_time_de: meta.Open_time_de,
        Open_time_zh: meta.Open_time_zh,
        Open_time_ar: meta.Open_time_ar,
        DescrizioneRistorante_en: meta.DescrizioneRistorante_en,
        DescrizioneRistorante_fr: meta.DescrizioneRistorante_fr,
        DescrizioneRistorante_es: meta.DescrizioneRistorante_es,
        DescrizioneRistorante_de: meta.DescrizioneRistorante_de,
        DescrizioneRistorante_zh: meta.DescrizioneRistorante_zh,
        DescrizioneRistorante_ar: meta.DescrizioneRistorante_ar,
      };
      const inserted = await insertContact(dataToSave);
      if (inserted && inserted[0]) setMeta({ ...dataToSave, id: inserted[0].id });
      setSuccess(true);
    } catch (err) {
      setError('Errore salvataggio');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-restaurant-dark"><span className="text-restaurant-accent text-xl font-bold">Caricamento dati…</span></div>;
  }
  if (!meta) {
    // Tabella vuota: mostra form vuoto per primo inserimento
    return (
      <section className="bg-restaurant-dark min-h-screen flex items-center justify-center py-16">
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-10 text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white serif mb-6 text-center">Inserisci Informazioni Contatto</h1>
          <div className="text-restaurant-subtext text-center mb-6">Non sono ancora presenti dati. Compila il form e premi Salva per creare la scheda contatto del ristorante.</div>
          <div className="space-y-6">
            <label className="block text-white font-semibold mb-1">Nome Ristorante</label>
            <input name="Restaurant_Name" placeholder="Nome Ristorante" value={meta.Restaurant_Name || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Indirizzo</label>
            <input name="Address" placeholder="Indirizzo" value={meta.Address || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />

            <label className="block text-white font-semibold mb-1">Telefono (visualizzato come testo)</label>
            <input name="Phone" placeholder="Telefono" value={meta.Phone || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Telefono (link chiamata)</label>
            <input name="CallPhone" placeholder="Telefono per chiamata" value={meta.CallPhone || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Numero WhatsApp</label>
            <input name="Whatsapp" placeholder="Numero WhatsApp" value={meta.Whatsapp || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Email</label>
            <input name="Email" placeholder="Email" value={meta.Email || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />

            <label className="block text-white font-semibold mb-1">Google Maps (link)</label>
            <input name="GoogleMaps" placeholder="Google Maps (link)" value={meta.GoogleMaps || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="GoogleEmbeddedMaps" placeholder="Google Embedded Maps" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Social_facebook" placeholder="Facebook" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Social_instagram" placeholder="Instagram" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Social_tiktok" placeholder="TikTok" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Social_twitter" placeholder="Twitter" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Social_whatsapp" placeholder="WhatsApp" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Open_time_it" placeholder="Orari IT" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Open_time_en" placeholder="Orari EN" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Open_time_fr" placeholder="Orari FR" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Open_time_es" placeholder="Orari ES" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Open_time_de" placeholder="Orari DE" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Open_time_zh" placeholder="Orari ZH" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <input name="Open_time_ar" placeholder="Orari AR" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <textarea name="DescrizioneRistorante_it" placeholder="Descrizione IT" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <textarea name="DescrizioneRistorante_en" placeholder="Descrizione EN" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <textarea name="DescrizioneRistorante_fr" placeholder="Descrizione FR" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <textarea name="DescrizioneRistorante_es" placeholder="Descrizione ES" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <textarea name="DescrizioneRistorante_de" placeholder="Descrizione DE" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <textarea name="DescrizioneRistorante_zh" placeholder="Descrizione ZH" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <textarea name="DescrizioneRistorante_ar" placeholder="Descrizione AR" onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
          </div>
          <button type="submit" className="w-full mt-8 bg-restaurant-accent hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all" disabled={saving}>{saving ? 'Salvataggio…' : 'Salva Modifiche'}</button>
          {success && <div className="text-green-400 font-bold mt-4">Salvataggio effettuato!</div>}
          {error && <div className="text-red-400 font-bold mt-4">{error}</div>}
        </form>
      </section>
    );
  }

  return (
    <section className="bg-restaurant-dark min-h-screen flex items-center justify-center py-16">
      <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-10 text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-white serif mb-6 text-center">Modifica Informazioni Contatto</h1>
        <div className="space-y-6">
            <label className="block text-white font-semibold mb-1">Nome Ristorante</label>
          <input name="Restaurant_Name" placeholder="Nome Ristorante" value={meta.Restaurant_Name || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Indirizzo</label>
          <input name="Address" placeholder="Indirizzo" value={meta.Address || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />

            <label className="block text-white font-semibold mb-1">Telefono (visualizzato come testo)</label>
            <input name="Phone" placeholder="Telefono" value={meta.Phone || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Telefono (link chiamata)</label>
            <input name="CallPhone" placeholder="Telefono per chiamata" value={meta.CallPhone || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Numero WhatsApp</label>
            <input name="Whatsapp" placeholder="Numero WhatsApp" value={meta.Whatsapp || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Email</label>
            <input name="Email" placeholder="Email" value={meta.Email || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />

            <label className="block text-white font-semibold mb-1">Google Maps (link)</label>
          <input name="GoogleMaps" placeholder="Google Maps (link)" value={meta.GoogleMaps || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Google Embedded Maps</label>
          <input name="GoogleEmbeddedMaps" placeholder="Google Embedded Maps" value={meta.GoogleEmbeddedMaps || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Facebook</label>
          <input name="Social_facebook" placeholder="Facebook" value={meta.Social_facebook || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Instagram</label>
          <input name="Social_instagram" placeholder="Instagram" value={meta.Social_instagram || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">TikTok</label>
          <input name="Social_tiktok" placeholder="TikTok" value={meta.Social_tiktok || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Twitter</label>
          <input name="Social_twitter" placeholder="Twitter" value={meta.Social_twitter || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">WhatsApp</label>
          <input name="Social_whatsapp" placeholder="WhatsApp" value={meta.Social_whatsapp || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Orari IT</label>
          <input name="Open_time_it" placeholder="Orari IT" value={meta.Open_time_it || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Orari EN</label>
          <input name="Open_time_en" placeholder="Orari EN" value={meta.Open_time_en || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Orari FR</label>
          <input name="Open_time_fr" placeholder="Orari FR" value={meta.Open_time_fr || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Orari ES</label>
          <input name="Open_time_es" placeholder="Orari ES" value={meta.Open_time_es || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Orari DE</label>
          <input name="Open_time_de" placeholder="Orari DE" value={meta.Open_time_de || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Orari ZH</label>
          <input name="Open_time_zh" placeholder="Orari ZH" value={meta.Open_time_zh || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Orari AR</label>
          <input name="Open_time_ar" placeholder="Orari AR" value={meta.Open_time_ar || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Descrizione IT</label>
          <textarea name="DescrizioneRistorante_it" placeholder="Descrizione IT" value={meta.DescrizioneRistorante_it || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Descrizione EN</label>
          <textarea name="DescrizioneRistorante_en" placeholder="Descrizione EN" value={meta.DescrizioneRistorante_en || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Descrizione FR</label>
          <textarea name="DescrizioneRistorante_fr" placeholder="Descrizione FR" value={meta.DescrizioneRistorante_fr || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Descrizione ES</label>
          <textarea name="DescrizioneRistorante_es" placeholder="Descrizione ES" value={meta.DescrizioneRistorante_es || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Descrizione DE</label>
          <textarea name="DescrizioneRistorante_de" placeholder="Descrizione DE" value={meta.DescrizioneRistorante_de || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Descrizione ZH</label>
          <textarea name="DescrizioneRistorante_zh" placeholder="Descrizione ZH" value={meta.DescrizioneRistorante_zh || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
            <label className="block text-white font-semibold mb-1">Descrizione AR</label>
          <textarea name="DescrizioneRistorante_ar" placeholder="Descrizione AR" value={meta.DescrizioneRistorante_ar || ''} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
        </div>
        <button type="submit" className="w-full mt-8 bg-restaurant-accent hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all" disabled={saving}>{saving ? 'Salvataggio…' : 'Salva Modifiche'}</button>
        {success && <div className="text-green-400 font-bold mt-4">Salvataggio effettuato!</div>}
        {error && <div className="text-red-400 font-bold mt-4">{error}</div>}
      </form>
    </section>
  );
};

export default AdminContact;
