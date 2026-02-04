
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Language } from '../App';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const content = {
    it: {
      title: "Mettiti in Contatto",
      subtitle: "Siamo qui per te",
      p: "Hai domande sul nostro menu, allergie alimentari o vuoi organizzare un evento privato? Scrivici o chiamaci.",
      address: "Indirizzo",
      phone: "Telefono",
      email: "Email",
      formName: "Nome",
      formMsg: "Messaggio",
      formBtn: "INVIA MESSAGGIO"
    },
    en: {
      title: "Get in Touch",
      subtitle: "We're here for you",
      p: "Questions about our menu, food allergies, or organizing a private event? Write or call us.",
      address: "Address",
      phone: "Phone",
      email: "Email",
      formName: "Name",
      formMsg: "Message",
      formBtn: "SEND MESSAGE"
    },
    fr: {
      title: "Contactez-nous",
      subtitle: "Nous sommes là pour vous",
      p: "Des questions sur notre menu, des allergies alimentaires ou vous souhaitez organiser un événement privé ? Écrivez-nous ou appelez-nous.",
      address: "Adresse",
      phone: "Téléphone",
      email: "Email",
      formName: "Nom",
      formMsg: "Message",
      formBtn: "ENVOYER LE MESSAGE"
    },
    es: {
      title: "Ponte en contacto",
      subtitle: "Estamos aquí para ti",
      p: "¿Preguntas sobre nuestro menú, alergias alimentarias o quieres organizar un evento privado? Escríbenos o llámanos.",
      address: "Dirección",
      phone: "Teléfono",
      email: "Correo electrónico",
      formName: "Nombre",
      formMsg: "Mensaje",
      formBtn: "ENVIAR MENSAJE"
    },
    de: {
      title: "Kontakt aufnehmen",
      subtitle: "Wir sind für Sie da",
      p: "Fragen zu unserer Speisekarte, Lebensmittelallergien oder möchten Sie eine private Veranstaltung organisieren? Schreiben oder rufen Sie uns an.",
      address: "Adresse",
      phone: "Telefon",
      email: "E-Mail",
      formName: "Name",
      formMsg: "Nachricht",
      formBtn: "NACHRICHT SENDEN"
    },
    zh: {
      title: "联系我们",
      subtitle: "我们在这里为您服务",
      p: "关于我们的菜单、食物过敏或想组织私人活动有疑问？写信或致电我们。",
      address: "地址",
      phone: "电话",
      email: "电子邮件",
      formName: "姓名",
      formMsg: "留言",
      formBtn: "发送信息"
    },
    ar: {
      title: "تواصل معنا",
      subtitle: "نحن هنا من أجلك",
      p: "هل لديك أسئلة حول قائمتنا أو حساسية الطعام أو ترغب في تنظيم حدث خاص؟ اكتب لنا أو اتصل بنا.",
      address: "العنوان",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      formName: "الاسم",
      formMsg: "رسالة",
      formBtn: "إرسال الرسالة"
    }
  };

  const t = content[lang] || content['it'];

  return (
    <div className="pt-32 pb-20 bg-restaurant-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl text-white serif text-center mb-16">{t.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl text-white serif">{t.subtitle}</h2>
              <p className="text-restaurant-subtext leading-relaxed">
                {t.p}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.address}</h4>
                  <p className="text-restaurant-subtext">Via del Gusto 123, 00100 Roma, Italia</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.phone}</h4>
                  <p className="text-restaurant-subtext">+39 06 1234567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.email}</h4>
                  <p className="text-restaurant-subtext">hello@pescatore.it</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-restaurant-subtext uppercase tracking-wider">{t.formName}</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-restaurant-subtext uppercase tracking-wider">Email</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-restaurant-subtext uppercase tracking-wider">{t.formMsg}</label>
                <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-restaurant-accent outline-none resize-none"></textarea>
              </div>
              <button className="w-full bg-restaurant-accent hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all">{t.formBtn}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
