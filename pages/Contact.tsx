
import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Language } from '../App';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  // Max message length warning translations
  const maxMsgWarning = {
    it: 'Limite massimo raggiunto',
    en: 'Maximum limit reached',
    fr: 'Limite maximale atteinte',
    es: 'Límite máximo alcanzado',
    de: 'Maximale Grenze erreicht',
    zh: '已达最大字数限制',
    ar: 'تم الوصول إلى الحد الأقصى'
  };
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

  // Load business info from Supabase
  const [meta, setMeta] = useState<any>(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    import('../services/supabase').then(({ getContactInfo }) => {
      getContactInfo().then(setMeta).catch(() => setMeta(null));
    });
  }, []);

  if (!meta) {
    return (
      <div className="pt-32 pb-20 bg-gray-50 dark:bg-restaurant-dark min-h-screen flex items-center justify-center transition-colors">
        <span className="text-restaurant-accent text-xl font-bold">Loading...</span>
      </div>
    );
  }

  // Social icons map
  const socialIcons = {
    facebook: <Facebook size={24} className="text-restaurant-accent" />,
    instagram: <Instagram size={24} className="text-restaurant-accent" />,
    twitter: <Twitter size={24} className="text-restaurant-accent" />,
    whatsapp: <FaWhatsapp size={24} color="#00bb2d" />,
    tiktok: <FaTiktok size={24} color="#010101" />,
  };

  return (
    <div className="pt-32 pb-20 bg-gray-50 dark:bg-restaurant-dark min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl text-gray-900 dark:text-white serif text-center mb-16">{t.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl text-gray-900 dark:text-white serif">{t.subtitle}</h2>
              <p className="text-restaurant-subtext dark:text-gray-300 leading-relaxed">{t.p}</p>
            </div>
            <div className="space-y-6">
              <div className="mb-2">
                <span className="block text-center text-restaurant-accent font-bold text-lg">
                  {t.contactTip}
                </span>
              </div>
              {/* Indirizzo con link a Google Maps */}
                {meta.Address && meta.GoogleMaps && (
                  <a href={meta.GoogleMaps} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-bold">{t.address}</h4>
                      <p className="text-restaurant-subtext dark:text-gray-300 group-hover:text-restaurant-accent transition-colors">{meta.Address}</p>
                    </div>
                  </a>
                )}
              {/* Telefono (solo visualizzazione) */}
              {meta.Phone && (
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-bold">{t.phone}</h4>
                    <p className="text-restaurant-subtext dark:text-gray-300">{meta.Phone}</p>
                  </div>
                </div>
              )}
              {/* CallPhone (click per chiamare) */}
              {meta.CallPhone && (
                <a href={`tel:${meta.CallPhone}`} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-bold">{t.phone}</h4>
                    <p className="text-restaurant-subtext dark:text-gray-300 group-hover:text-restaurant-accent transition-colors">{meta.CallPhone}</p>
                  </div>
                </a>
              )}
              {/* Whatsapp (click per aprire chat) */}
              {meta.Whatsapp && (
                <a href={`https://wa.me/${meta.Whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                    <FaWhatsapp size={24} color="#00bb2d" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-bold">WhatsApp</h4>
                    <p className="text-restaurant-subtext dark:text-gray-300 group-hover:text-restaurant-accent transition-colors">{meta.Whatsapp}</p>
                  </div>
                </a>
              )}
              {/* Email (click per inviare email) */}
              <a href={`mailto:${meta.email}`} className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-bold">{t.email}</h4>
                  <p className="text-restaurant-subtext dark:text-gray-300 group-hover:text-restaurant-accent transition-colors">{meta.Email}</p>
                </div>
              </a>
              {/* Social media dinamici da Supabase */}
              <div className="flex flex-col gap-4 mt-4">
                {meta.Social_facebook && (
                  <a href={meta.Social_facebook} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                      <Facebook size={24} />
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-bold">Facebook</h4>
                      <p className="text-restaurant-subtext dark:text-gray-300 group-hover:text-restaurant-accent transition-colors">{meta.Social_facebook.split('/').pop()}</p>
                    </div>
                  </a>
                )}
                {meta.Social_instagram && (
                  <a href={meta.Social_instagram} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                      <Instagram size={24} />
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-bold">Instagram</h4>
                      <p className="text-restaurant-subtext dark:text-gray-300 group-hover:text-restaurant-accent transition-colors">@{meta.Social_instagram.split('/').pop()}</p>
                    </div>
                  </a>
                )}
                {meta.Social_tiktok && (
                  <a href={meta.Social_tiktok} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                      <FaTiktok size={24} color="#ff6600" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-bold">TikTok</h4>
                      <p className="text-restaurant-subtext dark:text-gray-300 group-hover:text-restaurant-accent transition-colors">{meta.Social_tiktok.split('/').pop()}</p>
                    </div>
                  </a>
                )}
                {meta.Social_twitter && (
                  <a href={meta.Social_twitter} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-restaurant-accent/10 text-restaurant-accent rounded-full flex items-center justify-center shrink-0 group-hover:bg-restaurant-accent/20">
                      <Twitter size={24} />
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-bold">Twitter</h4>
                      <p className="text-restaurant-subtext dark:text-gray-300 group-hover:text-restaurant-accent transition-colors">@{meta.Social_twitter.split('/').pop()}</p>
                    </div>
                  </a>
                )}
              </div>
              {/* Social media dinamici */}
              <div className="flex flex-col gap-4 mt-4">
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
                        <span className="text-gray-900 dark:text-white font-bold">{username}</span>
                        <p className="text-restaurant-subtext dark:text-gray-300 group-hover:text-restaurant-accent transition-colors">{value}</p>
                      </a>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-gray-100 dark:bg-neutral-800 p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-white/10 transition-colors">
            <form className="space-y-8">
              {/* Nome */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-restaurant-subtext dark:text-gray-300 uppercase tracking-wider">{t.formName}</label>
                <input
                  className="w-full bg-white border border-gray-200 dark:bg-neutral-900 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-restaurant-accent outline-none transition-colors"
                  name="name"
                  autoComplete="name"
                  placeholder={
                    lang === 'it' ? 'Mario Rossi' :
                    lang === 'en' ? 'John Smith' :
                    lang === 'fr' ? 'Jean Dupont' :
                    lang === 'es' ? 'Juan Pérez' :
                    lang === 'de' ? 'Max Mustermann' :
                    lang === 'zh' ? '张伟' :
                    lang === 'ar' ? 'محمد أحمد' :
                    'Mario Rossi'
                  }
                />
              </div>
              {/* Telefono con prefisso */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-restaurant-subtext dark:text-gray-300 uppercase tracking-wider">{t.phone}</label>
                <div className="flex gap-2">
                  <input
                    className="w-20 bg-white border border-gray-200 dark:bg-neutral-900 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-restaurant-accent outline-none text-center transition-colors"
                    name="prefix"
                    defaultValue={
                      lang === 'it' ? '+39' :
                      lang === 'de' ? '+49' :
                      lang === 'fr' ? '+33' :
                      lang === 'es' ? '+34' :
                      lang === 'en' ? '+44' :
                      lang === 'zh' ? '+86' :
                      lang === 'ar' ? '+20' :
                      '+39'
                    }
                    maxLength={5}
                    placeholder={
                      lang === 'it' ? '+39' :
                      lang === 'de' ? '+49' :
                      lang === 'fr' ? '+33' :
                      lang === 'es' ? '+34' :
                      lang === 'en' ? '+44' :
                      lang === 'zh' ? '+86' :
                      lang === 'ar' ? '+20' :
                      '+39'
                    }
                  />
                  <input
                    className="flex-1 bg-white border border-gray-200 dark:bg-neutral-900 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-restaurant-accent outline-none transition-colors"
                    name="phone"
                    autoComplete="tel"
                    placeholder={
                      lang === 'it' ? '333 1234567' :
                      lang === 'en' ? '7123 456789' :
                      lang === 'fr' ? '612 345678' :
                      lang === 'es' ? '612 345678' :
                      lang === 'de' ? '1512 3456789' :
                      lang === 'zh' ? '138 00138000' :
                      lang === 'ar' ? '10 1234 5678' :
                      '333 1234567'
                    }
                  />
                </div>
              </div>
              {/* Email opzionale */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-restaurant-subtext dark:text-gray-300 uppercase tracking-wider">{t.email} <span className="font-normal">({lang === 'it' ? 'opzionale' : lang === 'en' ? 'optional' : lang === 'fr' ? 'optionnel' : lang === 'es' ? 'opcional' : lang === 'de' ? 'optional' : lang === 'zh' ? '可选' : lang === 'ar' ? 'اختياري' : 'opzionale'})</span></label>
                <input className="w-full bg-white border border-gray-200 dark:bg-neutral-900 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-restaurant-accent outline-none transition-colors" name="email" autoComplete="email" />
              </div>
              {/* Messaggio con limite 250 caratteri */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-restaurant-subtext dark:text-gray-300 uppercase tracking-wider">{t.formMsg} <span className="text-xs text-restaurant-subtext dark:text-gray-300">(max 250)</span></label>
                <textarea
                  rows={6}
                  maxLength={250}
                  className="w-full bg-white border border-gray-200 dark:bg-neutral-900 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-restaurant-accent outline-none resize-none transition-colors"
                  name="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                ></textarea>
                {message.length === 250 && (
                  <div className="text-xs text-red-500 font-bold mt-1">{maxMsgWarning[lang] || maxMsgWarning['it']}</div>
                )}
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
