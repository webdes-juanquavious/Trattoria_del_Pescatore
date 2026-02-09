

import React, { useEffect, useState } from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Clock, Mail } from 'lucide-react';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Language } from '../App';
import { getContactInfo } from '../services/supabase';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const content = {
    it: {
      contacts: "Contatti",
      links: "Link Rapidi",
      findUs: "Clicca per aprire il navigatore",
      menu: "Il nostro menu",
      book: "Prenota tavolo",
      location: "Dove siamo",
      work: "Lavora con noi",
      contact: "Contatto",
      rights: "Tutti i diritti riservati.",
      designer: "Disegnato da WebDesigner Juanquavious",
      openingHours: "Orari di apertura"
    },
    en: {
      contacts: "Contacts",
      links: "Quick Links",
      findUs: "Click to open navigator",
      menu: "Our menu",
      book: "Book a table",
      location: "Where we are",
      work: "Work with us",
      contact: "Contact",
      rights: "All rights reserved.",
      designer: "Designed by WebDesigner Juanquavious",
      openingHours: "Opening hours"
    },
    fr: {
      contacts: "Contacts",
      links: "Liens rapides",
      findUs: "Cliquez pour ouvrir le navigateur",
      menu: "Notre menu",
      book: "Réserver une table",
      location: "Où nous sommes",
      work: "Travailler avec nous",
      contact: "Contact",
      rights: "Tous droits réservés.",
      designer: "Conçu par WebDesigner Juanquavious",
      openingHours: "Heures d'ouverture"
    },
    es: {
      contacts: "Contactos",
      links: "Enlaces rápidos",
      findUs: "Haz clic para abrir el navegador",
      menu: "Nuestro menú",
      book: "Reservar mesa",
      location: "Dónde estamos",
      work: "Trabaja con nosotros",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      designer: "Diseñado por WebDesigner Juanquavious",
      openingHours: "Horario de apertura"
    },
    de: {
      contacts: "Kontakt",
      links: "Schnellzugriffe",
      findUs: "Klicken Sie, um den Navigator zu öffnen",
      menu: "Unsere Speisekarte",
      book: "Tisch reservieren",
      location: "Wo wir sind",
      work: "Arbeiten Sie mit uns",
      contact: "Kontakt",
      rights: "Alle Rechte vorbehalten.",
      designer: "Entworfen von WebDesigner Juanquavious",
      openingHours: "Öffnungszeiten"
    },
    zh: {
      contacts: "联系方式",
      links: "快速链接",
      findUs: "点击以打开导航",
      menu: "我们的菜单",
      book: "预订餐桌",
      location: "我们的位置",
      work: "与我们合作",
      contact: "联系",
      rights: "版权所有。",
      designer: "由 WebDesigner Juanquavious 设计",
      openingHours: "营业时间"
    },
    ar: {
      contacts: "جهات الاتصال",
      links: "روابط سريعة",
      findUs: "انقر لفتح الملاحة",
      menu: "قائمتنا",
      book: "احجز طاولة",
      location: "أين نحن",
      work: "اعمل معنا",
      contact: "اتصل",
      rights: "جميع الحقوق محفوظة.",
      designer: "صممها WebDesigner Juanquavious",
      openingHours: "ساعات العمل"
    }
  };

  const t = content[lang] || content['it'];



  // Carica info dinamiche da Supabase
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getContactInfo()
      .then(setMeta)
      .catch(() => setMeta(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return null; // oppure spinner
  }
  if (!meta) {
    return null;
  }

  return (
    <footer className={`bg-restaurant-dark text-white border-t border-white/5${lang === 'ar' ? ' text-right' : ''}`}
      dir={lang === 'ar' ? 'rtl' : undefined}>
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/favicon.ico" alt="Logo" className="w-8 h-8 rounded-sm" />
              <span className="text-2xl font-bold tracking-tight serif">{meta.Restaurant_Name}</span>
            </Link>
            <p className="text-restaurant-subtext leading-relaxed">
              {meta[`DescrizioneRistorante_${lang}`] || meta.DescrizioneRistorante_it}
            </p>
            <div className="flex space-x-4">
              {meta.Social_instagram && (
                <a href={meta.Social_instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><Instagram size={20} /></a>
              )}
              {meta.Social_facebook && (
                <a href={meta.Social_facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><Facebook size={20} /></a>
              )}
              {meta.Social_twitter && (
                <a href={meta.Social_twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><Twitter size={20} /></a>
              )}
              {meta.Social_tiktok && (
                <a href={meta.Social_tiktok} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><FaTiktok size={20} color="#fff" /></a>
              )}
              {meta.Social_whatsapp && (
                <a href={`https://wa.me/${meta.Social_whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><FaWhatsapp size={20} color="#00bb2d" /></a>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold serif text-restaurant-accent uppercase tracking-widest">{t.contacts}</h4>
            <ul className="space-y-4 text-restaurant-subtext">
                            {/* Email */}
                            {meta.email && (
                              <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-restaurant-accent shrink-0" />
                                <span>
                                  <a href={`mailto:${meta.email}`} className="hover:text-restaurant-accent transition-colors">{meta.email}</a>
                                </span>
                              </li>
                            )}
              {meta.Address && meta.GoogleMaps && (
                <li className="flex items-start space-x-3">
                  <a href={meta.GoogleMaps} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3 group">
                    <MapPin size={20} className="text-restaurant-accent shrink-0 mt-1 group-hover:text-restaurant-accent/80 transition-colors" />
                      <span className="group-hover:text-restaurant-accent/80 transition-colors">
                      {meta.Address.split(',').map((line: string, i: number) => (
                        <React.Fragment key={i}>
                          {line.trim()}
                          {i < meta.Address.split(',').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </span>
                  </a>
                </li>
              )}
              {/* Phone as plain text */}
              {meta.Phone && (
                <li className="flex items-center space-x-3">
                  <Phone size={20} className="text-restaurant-accent shrink-0" />
                  <span>{meta.Phone.split(',').map((num: string, i: number) => (
                    <React.Fragment key={i}>
                      {num.trim()}
                      {i < meta.Phone.split(',').length - 1 && <br />}
                    </React.Fragment>
                  ))}</span>
                </li>
              )}
              {/* Phone as tel: links */}
              {meta.CallPhone && (
                <li className="flex items-center space-x-3">
                  <Phone size={20} className="text-restaurant-accent shrink-0" />
                  <span>{meta.CallPhone.split(',').map((num: string, i: number) => {
                    const tel = num.replace(/[^\d+]/g, '');
                    return (
                      <React.Fragment key={i}>
                        <a href={`tel:${tel}`} className="hover:text-restaurant-accent transition-colors">{num.trim()}</a>
                        {i < meta.CallPhone.split(',').length - 1 && <br />}
                      </React.Fragment>
                    );
                  })}</span>
                </li>
              )}
              {/* Phone as WhatsApp links */}
              {meta.Whatsapp && (
                <li className="flex items-center space-x-3">
                  <FaWhatsapp size={20} color="#00bb2d" />
                  <span>{meta.Whatsapp.split(',').map((num: string, i: number) => {
                    const wa = num.replace(/[^\d]/g, '');
                    return (
                      <React.Fragment key={i}>
                        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">{num.trim()}</a>
                        {i < meta.Whatsapp.split(',').length - 1 && <br />}
                      </React.Fragment>
                    );
                  })}</span>
                </li>
              )}
              {/* Email sotto WhatsApp */}
              {meta.Email && (
                <li className="flex items-center space-x-3">
                  <Mail size={20} className="text-restaurant-accent shrink-0" />
                  <span>
                    <a href={`mailto:${meta.Email}`} className="hover:text-restaurant-accent transition-colors">{meta.Email}</a>
                  </span>
                </li>
              )}
              {meta[`Open_time_${lang}`] && (
                <li className="flex items-start space-x-3">
                  <Clock size={20} className="text-restaurant-accent shrink-0 mt-1" />
                  <div>
                    <span className="text-lg font-bold serif text-restaurant-accent uppercase tracking-widest">{t.openingHours}</span><br />
                    {meta[`Open_time_${lang}`].split(',').map((line: string, i: number) => {
                      const closedWords = [
                        'Chiuso', 'chiuso', 'Closed', 'closed', 'Fermé', 'fermé', 'Cerrado', 'cerrado',
                        'Geschlossen', 'geschlossen', '休息', 'مغلق', 'Abends geschlossen', 'Fermé le soir', '晚餐休息', 'مغلق مساءً'
                      ];
                      const isClosed = closedWords.some(word => line.includes(word));
                      if (line.includes(':')) {
                        const idx = line.indexOf(':');
                        const day = line.slice(0, idx).trim();
                        const timesRaw = line.slice(idx + 1).trim();
                        const times = timesRaw.split('/').map(t => t.trim());
                        return (
                          <div key={i} className="flex">
                            <div className={"min-w-[90px] font-semibold" + (isClosed ? ' text-red-500' : '')}>{day ? day + ':' : ''}</div>
                            <div className="flex flex-col">
                              {times.map((t, j) => (
                                <span key={j} className={isClosed ? 'text-red-500 font-semibold' : ''}>{t}</span>
                              ))}
                            </div>
                          </div>
                        );
                      } else {
                        // Riga senza giorno, solo orario o nota (es: "Chiuso a cena")
                        return (
                          <div key={i} className="flex">
                            <div className="min-w-[90px]"></div>
                            <div className="flex flex-col">
                              <span className={isClosed ? 'text-red-500 font-semibold' : ''}>{line.trim()}</span>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold serif text-restaurant-accent uppercase tracking-widest">{t.links}</h4>
            <ul className="space-y-4 text-restaurant-subtext">
              <li><Link to="/menu" className="hover:text-restaurant-accent transition-colors">{t.menu}</Link></li>
              <li><Link to="/prenota" className="hover:text-restaurant-accent transition-colors">{t.book}</Link></li>
              {meta.GoogleMaps ? (
                <li>
                  <a href={meta.GoogleMaps} target="_blank" rel="noopener noreferrer" className="hover:text-restaurant-accent transition-colors cursor-pointer">{t.location}</a>
                </li>
              ) : (
                <li><Link to="/contatto" className="hover:text-restaurant-accent transition-colors">{t.location}</Link></li>
              )}
              {/* Lavora con noi condizionale */}
              {meta.JobOffersCount > 0 && (
                <li><Link to="/lavora-con-noi" className="hover:text-restaurant-accent transition-colors">{t.work}</Link></li>
              )}
              <li><Link to="/contatto" className="hover:text-restaurant-accent transition-colors">{t.contact}</Link></li>
              <li><Link to="/login" className="hover:text-restaurant-accent transition-colors" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>Dipendenti</Link></li>
            </ul>
          </div>

          {/* Map */}
          <div className="space-y-6">
            {meta.GoogleMaps ? (
              <a href={meta.GoogleMaps} target="_blank" rel="noopener noreferrer">
                <h4 className="text-lg font-bold serif text-restaurant-accent uppercase tracking-widest hover:underline cursor-pointer">{t.findUs}</h4>
              </a>
            ) : (
              <h4 className="text-lg font-bold serif text-restaurant-accent uppercase tracking-widest">{t.findUs}</h4>
            )}
            <div className="aspect-square rounded-xl overflow-hidden grayscale contrast-125 opacity-70">
              <iframe 
                src={meta.GoogleEmbeddedMaps || "https://www.google.com/maps"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center text-restaurant-subtext text-sm">
          <p>© {new Date().getFullYear()} {meta.Restaurant_Name}. {t.rights}</p>
          <div className="mt-2">
            <span className="block w-full py-2 rounded text-restaurant-accent font-semibold text-sm">
              © {new Date().getFullYear()} {t.designer}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
