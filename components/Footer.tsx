
import React, { useEffect, useState } from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Clock } from 'lucide-react';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Language } from '../App';

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
      designer: "Disegnato da WebDesigner Juanquavious"
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
      designer: "Designed by WebDesigner Juanquavious"
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
      designer: "Conçu par WebDesigner Juanquavious"
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
      designer: "Diseñado por WebDesigner Juanquavious"
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
      designer: "Entworfen von WebDesigner Juanquavious"
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
      designer: "由 WebDesigner Juanquavious 设计"
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
      designer: "صممها WebDesigner Juanquavious"
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
    // Optionally, show a loading spinner or fallback
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
              <span className="text-2xl font-bold tracking-tight serif">{meta.name}</span>
            </Link>
            <p className="text-restaurant-subtext leading-relaxed">
              {meta.DescrizioneRistorante?.[lang] || meta.DescrizioneRistorante?.['it']}
            </p>
            <div className="flex space-x-4">
                  {meta.social?.instagram && (
                    <a href={meta.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><Instagram size={20} /></a>
                  )}
                  {meta.social?.facebook && (
                    <a href={meta.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><Facebook size={20} /></a>
                  )}
                  {meta.social?.twitter && (
                    <a href={meta.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><Twitter size={20} /></a>
                  )}
                  {meta.social?.tiktok && (
                    <a href={meta.social.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><FaTiktok size={20} className="align-middle" /></a>
                  )}
                  {meta.social?.whatsapp && (
                    <a href={`https://wa.me/${meta.social.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><FaWhatsapp size={20} className="align-middle" /></a>
                  )}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold serif text-restaurant-accent uppercase tracking-widest">{t.contacts}</h4>
            <ul className="space-y-4 text-restaurant-subtext">
              {meta.address && meta.GoogleMaps && (
                <li className="flex items-start space-x-3">
                  <a href={meta.GoogleMaps} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3 group">
                    <MapPin size={20} className="text-restaurant-accent shrink-0 mt-1 group-hover:text-restaurant-accent/80 transition-colors" />
                      <span className="group-hover:text-restaurant-accent/80 transition-colors">
                      {meta.address.split(',').map((line: string, i: number) => (
                        <React.Fragment key={i}>
                          {line.trim()}
                          {i < meta.address.split(',').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </span>
                  </a>
                </li>
              )}
              {/* Phone as plain text */}
              {meta.phone && (
                <li className="flex items-center space-x-3">
                  <Phone size={20} className="text-restaurant-accent shrink-0" />
                  <span>{meta.phone.split(',').map((num: string, i: number) => (
                    <React.Fragment key={i}>
                      {num.trim()}
                      {i < meta.phone.split(',').length - 1 && <br />}
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
                  <FaWhatsapp size={20} className="text-green-500 flex-shrink-0 align-middle" />
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
              {meta.OpenTime && (
                <li className="flex items-start space-x-3">
                  <Clock size={20} className="text-restaurant-accent shrink-0 mt-1" />
                  <div>
                    <span className="text-lg font-bold serif text-restaurant-accent uppercase tracking-widest">{t['openingHours'] || 'Orari di apertura'}</span><br />
                    {(meta.OpenTime[lang] || meta.OpenTime['it']).split(',').map((line: string, i: number) => {
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
              <li><Link to="/lavora-con-noi" className="hover:text-restaurant-accent transition-colors">{t.work}</Link></li>
              <li><Link to="/contatto" className="hover:text-restaurant-accent transition-colors">{t.contact}</Link></li>
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
          <p>© {new Date().getFullYear()} {meta.name}. {t.rights}</p>
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
