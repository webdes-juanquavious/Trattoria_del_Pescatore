
import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Language } from '../App';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const content = {
    it: {
      title: "Mettiti in Contatto",
      subtitle: "Siamo qui per te",
      p: "Hai domande sul nostro menu, allergie alimentari o vuoi organizzare un evento privato? Scrivici direttamente su WhatsApp o usa il seguente formulario, ti risponderemo il prima possibile.",
      contactTip: "Clicca sui simboli per metterti subito in contatto con noi!",
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
      p: "Questions about our menu, food allergies, or organizing a private event? Contact us directly on WhatsApp or use the form below, we will reply as soon as possible.",
      contactTip: "Click the icons to contact us instantly!",
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
      p: "Des questions sur notre menu, des allergies alimentaires ou vous souhaitez organiser un événement privé ? Contactez-nous directement sur WhatsApp ou utilisez le formulaire ci-dessous, nous vous répondrons dès que possible.",
      contactTip: "Cliquez sur les icônes pour nous contacter instantanément !",
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
      p: "¿Preguntas sobre nuestro menú, alergias alimentarias o quieres organizar un evento privado? Escríbenos directamente por WhatsApp o utiliza el formulario a continuación, te responderemos lo antes posible.",
      contactTip: "¡Haz clic en los iconos para contactarnos al instante!",
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
      p: "Fragen zu unserer Speisekarte, Lebensmittelallergien oder möchten Sie eine private Veranstaltung organisieren? Kontaktieren Sie uns direkt über WhatsApp oder nutzen Sie das untenstehende Formular, wir antworten so schnell wie möglich.",
      contactTip: "Klicken Sie auf die Symbole, um uns sofort zu kontaktieren!",
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
      p: "关于我们的菜单、食物过敏或想组织私人活动有疑问？请直接通过 WhatsApp 联系我们或使用下方表单，我们会尽快回复您。",
      contactTip: "点击图标即可立即联系我们！",
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
      p: "هل لديك أسئلة حول قائمتنا أو حساسية الطعام أو ترغب في تنظيم حدث خاص؟ تواصل معنا مباشرة عبر WhatsApp أو استخدم النموذج أدناه، سنرد عليك في أقرب وقت ممكن.",
      contactTip: "انقر على الرموز للتواصل معنا فورًا!",
      address: "العنوان",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      formName: "الاسم",
      formMsg: "رسالة",
      formBtn: "إرسال الرسالة"
    }
  };


  const t = content[lang] || content['it'];

  // Load business info from MetadataInfo.json
  const [meta, setMeta] = useState<any>(null);
  useEffect(() => {
    fetch("/MetadataInfo.json")
      .then((res) => res.json())
      .then(setMeta)
      .catch(() => setMeta(null));
  }, []);

  if (!meta) {
    return (
      <div className="pt-32 pb-20 bg-restaurant-dark min-h-screen flex items-center justify-center">
        <span className="text-restaurant-accent text-xl font-bold">Loading...</span>
      </div>
    );
  }

  // Social icons map
  const socialIcons = {
    facebook: <Facebook size={24} className="text-restaurant-accent" />,
    instagram: <Instagram size={24} className="text-restaurant-accent" />,
    twitter: <Twitter size={24} className="text-restaurant-accent" />,
    whatsapp: <FaWhatsapp size={24} className="text-restaurant-accent" />,
    tiktok: <FaTiktok size={24} className="text-restaurant-accent" />,
  };

  return (
    <div className="pt-32 pb-20 bg-restaurant-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl text-white serif text-center mb-16">{t.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl text-white serif">{t.subtitle}</h2>
              <p className="text-restaurant-subtext leading-relaxed">{t.p}</p>
            </div>
            <div className="space-y-6">
              <div className="mb-2">
                <span className="block text-center text-restaurant-accent font-bold text-lg">
                  {t.contactTip}
                </span>
              </div>
              {/* Indirizzo con link a Google Maps */}
              <a href={meta.GoogleMaps} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.address}</h4>
                  <p className="text-restaurant-subtext underline group-hover:text-restaurant-accent transition-colors">{meta.address}</p>
                </div>
              </a>
              {/* Telefono (solo visualizzazione) */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.phone}</h4>
                  <p className="text-restaurant-subtext">{meta.phone}</p>
                </div>
              </div>
              {/* CallPhone (click per chiamare) */}
              <a href={`tel:${meta.CallPhone}`} className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.phone} (Click)</h4>
                  <p className="text-restaurant-subtext underline group-hover:text-restaurant-accent transition-colors">{meta.CallPhone}</p>
                </div>
              </a>
              {/* Whatsapp (click per aprire chat) */}
              <a href={`https://wa.me/${meta.Whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                  <FaWhatsapp size={24} className="text-restaurant-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold">WhatsApp</h4>
                  <p className="text-restaurant-subtext underline group-hover:text-restaurant-accent transition-colors">{meta.Whatsapp}</p>
                </div>
              </a>
              {/* Email (click per inviare email) */}
              <a href={`mailto:${meta.email}`} className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.email}</h4>
                  <p className="text-restaurant-subtext underline group-hover:text-restaurant-accent transition-colors">{meta.email}</p>
                </div>
              </a>
              {/* Social media dinamici */}
              <div className="flex flex-wrap gap-4 mt-4">
                {meta.social && Object.entries(meta.social).map(([key, value]) => {
                  if (!socialIcons[key]) return null;
                  // Mostra solo se è un link valido
                  if (typeof value === 'string' && value.startsWith('http')) {
                    let username = value.split('/').pop();
                    if (key === 'tiktok' && username.startsWith('@')) username = username;
                    else if (key === 'instagram' || key === 'twitter') username = '@' + username;
                    return (
                      <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 group">
                        <span className="bg-restaurant-accent/10 text-restaurant-accent rounded-full p-2 group-hover:bg-restaurant-accent/20">
                          {socialIcons[key]}
                        </span>
                        <span className="text-white font-bold">{username}</span>
                        <span className="text-restaurant-subtext">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      </a>
                    );
                  }
                  return null;
                })}
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
