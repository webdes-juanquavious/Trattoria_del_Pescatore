

import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, User, CheckCircle2 } from 'lucide-react';
import { Language } from '../App';

interface BookingProps {
  lang: Language;
}

const Booking: React.FC<BookingProps> = ({ lang }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    party_size: '2',
    notes: ''
  });

  const content = {
    it: {
      title: "Prenotazioni",
      sub: "Scegli la data e l'ora del tuo arrivo. Consigliamo di prenotare con almeno 24 ore di anticipo.",
      tip: "Utilizza il modulo sottostante per richiedere il tuo tavolo.",
      nameLabel: "Nome Completo",
      dateLabel: "Data",
      timeLabel: "Ora",
      peopleLabel: "Persone",
      phoneLabel: "Telefono",
      notesLabel: "Intolleranze o richieste (Opzionale)",
      submit: "CONFERMA PRENOTAZIONE",
      successTitle: "Richiesta inviata!",
      successMsg: (name, date, time) => `Grazie ${name}, abbiamo ricevuto la tua richiesta. Ti contatteremo per confermare la tua prenotazione per il ${new Date(date).toLocaleDateString('it-IT')} alle ${time}.`,
    },
    en: {
      title: "Reservations",
      sub: "Choose your arrival date and time. We recommend booking at least 24 hours in advance.",
      tip: "Use the form below to request your table.",
      nameLabel: "Full Name",
      dateLabel: "Date",
      timeLabel: "Time",
      peopleLabel: "Party Size",
      phoneLabel: "Phone",
      notesLabel: "Notes (Optional)",
      submit: "CONFIRM RESERVATION",
      successTitle: "Request sent!",
      successMsg: (name, date, time) => `Thank you ${name}, we received your request. We will contact you to confirm your booking for ${new Date(date).toLocaleDateString('en-US')} at ${time}.`,
    },
    fr: {
      title: "Réservations",
      sub: "Choisissez la date et l'heure de votre arrivée. Nous recommandons de réserver au moins 24 heures à l'avance.",
      tip: "Utilisez le formulaire ci-dessous pour demander votre table.",
      nameLabel: "Nom complet",
      dateLabel: "Date",
      timeLabel: "Heure",
      peopleLabel: "Nombre de personnes",
      phoneLabel: "Téléphone",
      notesLabel: "Allergies ou demandes (facultatif)",
      submit: "CONFIRMER LA RÉSERVATION",
      successTitle: "Demande envoyée !",
      successMsg: (name, date, time) => `Merci ${name}, nous avons reçu votre demande. Nous vous contacterons pour confirmer votre réservation pour le ${new Date(date).toLocaleDateString('fr-FR')} à ${time}.`,
    },
    es: {
      title: "Reservas",
      sub: "Elija la fecha y hora de su llegada. Recomendamos reservar con al menos 24 horas de antelación.",
      tip: "Utilice el siguiente formulario para solicitar su mesa.",
      nameLabel: "Nombre completo",
      dateLabel: "Fecha",
      timeLabel: "Hora",
      peopleLabel: "Personas",
      phoneLabel: "Teléfono",
      notesLabel: "Intolerancias o solicitudes (opcional)",
      submit: "CONFIRMAR RESERVA",
      successTitle: "¡Solicitud enviada!",
      successMsg: (name, date, time) => `Gracias ${name}, hemos recibido su solicitud. Nos pondremos en contacto para confirmar su reserva para el ${new Date(date).toLocaleDateString('es-ES')} a las ${time}.`,
    },
    de: {
      title: "Reservierungen",
      sub: "Wählen Sie das Datum und die Uhrzeit Ihrer Ankunft. Wir empfehlen, mindestens 24 Stunden im Voraus zu reservieren.",
      tip: "Verwenden Sie das untenstehende Formular, um Ihren Tisch anzufordern.",
      nameLabel: "Vollständiger Name",
      dateLabel: "Datum",
      timeLabel: "Uhrzeit",
      peopleLabel: "Personen",
      phoneLabel: "Telefon",
      notesLabel: "Unverträglichkeiten oder Wünsche (optional)",
      submit: "RESERVIERUNG BESTÄTIGEN",
      successTitle: "Anfrage gesendet!",
      successMsg: (name, date, time) => `Danke ${name}, wir haben Ihre Anfrage erhalten. Wir werden Sie kontaktieren, um Ihre Reservierung für den ${new Date(date).toLocaleDateString('de-DE')} um ${time} zu bestätigen.`,
    },
    zh: {
      title: "预订",
      sub: "请选择您的到达日期和时间。我们建议至少提前24小时预订。",
      tip: "请使用下方表格申请预订餐桌。",
      nameLabel: "全名",
      dateLabel: "日期",
      timeLabel: "时间",
      peopleLabel: "人数",
      phoneLabel: "电话",
      notesLabel: "不耐受或要求（可选）",
      submit: "确认预订",
      successTitle: "请求已发送！",
      successMsg: (name, date, time) => `感谢${name}，我们已收到您的请求。我们会与您联系以确认您在${new Date(date).toLocaleDateString('zh-CN')} ${time}的预订。`,
    },
    ar: {
      title: "الحجوزات",
      sub: "اختر تاريخ ووقت وصولك. نوصي بالحجز قبل 24 ساعة على الأقل.",
      tip: "استخدم النموذج أدناه لطلب طاولتك.",
      nameLabel: "الاسم الكامل",
      dateLabel: "التاريخ",
      timeLabel: "الوقت",
      peopleLabel: "عدد الأشخاص",
      phoneLabel: "الهاتف",
      notesLabel: "الحساسية أو الطلبات (اختياري)",
      submit: "تأكيد الحجز",
      successTitle: "تم إرسال الطلب!",
      successMsg: (name, date, time) => `شكرًا ${name}، لقد استلمنا طلبك. سنتواصل معك لتأكيد حجزك في ${new Date(date).toLocaleDateString('ar-EG')} الساعة ${time}.`,
    },
  };
  const t = content[lang] || content['it'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui va la logica di invio (es. Supabase)
    setStep('success');
  };

  return (
    <div className="pt-32 pb-20 bg-restaurant-dark min-h-screen flex flex-col items-center">
      <div className="text-center mb-12 px-4">
        <h1 className="text-6xl text-white serif mb-6">{t.title}</h1>
        <p className="text-restaurant-subtext max-w-xl">{t.sub}</p>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-2xl p-8 md:p-12 shadow-2xl mx-4">
        <p className="text-center text-gray-500 italic mb-8">{t.tip}</p>
        {step === 'form' ? (
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
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-bold serif mb-4">{t.successTitle}</h2>
            <p className="text-gray-600 text-lg mb-8">
              {t.successMsg(formData.name, formData.date, formData.time)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
