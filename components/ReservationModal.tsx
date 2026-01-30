
import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Phone, Mail, User, CheckCircle2 } from 'lucide-react';
import { Language } from '../App';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, lang }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    party_size: '2',
    notes: ''
  });

  const content = {
    it: {
      title: "Prenota il tuo tavolo",
      subtitle: "Scegli l'atmosfera perfetta per il tuo prossimo viaggio culinario.",
      nameLabel: "Nome Completo",
      dateLabel: "Data",
      timeLabel: "Ora",
      peopleLabel: "Persone",
      phoneLabel: "Telefono",
      notesLabel: "Note (Opzionale)",
      submit: "CONFERMA PRENOTAZIONE",
      successTitle: "Richiesta inviata!",
      successMsg: (name: string, date: string, time: string) => `Grazie ${name}, abbiamo ricevuto la tua richiesta. Ti contatteremo per confermare la tua prenotazione per il ${new Date(date).toLocaleDateString('it-IT')} alle ${time}.`,
      close: "Chiudi"
    },
    en: {
      title: "Book your table",
      subtitle: "Choose the perfect atmosphere for your next culinary journey.",
      nameLabel: "Full Name",
      dateLabel: "Date",
      timeLabel: "Time",
      peopleLabel: "Party Size",
      phoneLabel: "Phone",
      notesLabel: "Notes (Optional)",
      submit: "CONFIRM RESERVATION",
      successTitle: "Request sent!",
      successMsg: (name: string, date: string, time: string) => `Thank you ${name}, we received your request. We will contact you to confirm your booking for ${new Date(date).toLocaleDateString('en-US')} at ${time}.`,
      close: "Close"
    }
  };

  const t = content[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending to Supabase:', formData);
    setStep('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-restaurant-dark/80 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white text-gray-900 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-10 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors p-2"
        >
          <X size={24} />
        </button>

        {step === 'form' ? (
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold serif mb-2">{t.title}</h2>
              <p className="text-gray-500">{t.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.nameLabel}</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-restaurant-accent outline-none"
                    placeholder="Mario Rossi"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-restaurant-accent outline-none"
                    placeholder="mario@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.dateLabel}</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-restaurant-accent outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.timeLabel}</label>
                <div className="relative">
                  <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-restaurant-accent outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.peopleLabel}</label>
                <div className="relative">
                  <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="party_size"
                    value={formData.party_size}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-restaurant-accent outline-none appearance-none"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} {lang === 'it' ? (num === 1 ? 'Persona' : 'Persone') : (num === 1 ? 'Person' : 'People')}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.phoneLabel}</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-restaurant-accent outline-none"
                    placeholder="+39 333 1234567"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.notesLabel}</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-restaurant-accent outline-none resize-none"
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full bg-restaurant-accent hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-restaurant-accent/20 transition-all transform hover:scale-[1.02]"
                >
                  {t.submit}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-bold serif mb-4">{t.successTitle}</h2>
            <p className="text-gray-600 text-lg mb-8">
              {t.successMsg(formData.name, formData.date, formData.time)}
            </p>
            <button
              onClick={onClose}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
