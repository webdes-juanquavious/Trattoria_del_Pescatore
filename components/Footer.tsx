
import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../App';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const content = {
    it: {
      desc: "Dalla tradizione mediterranea alla tavola moderna. Un'esperienza culinaria unica che celebra la freschezza e l'armonia degli ingredienti del mare.",
      contacts: "Contatti",
      links: "Link Rapidi",
      findUs: "Trova la Via",
      menu: "Il nostro menu",
      book: "Prenota tavolo",
      location: "Dove siamo",
      work: "Lavora con noi",
      contact: "Contatto",
      rights: "Tutti i diritti riservati."
    },
    en: {
      desc: "From Mediterranean tradition to the modern table. A unique culinary experience that celebrates the freshness and harmony of sea ingredients.",
      contacts: "Contacts",
      links: "Quick Links",
      findUs: "Find Us",
      menu: "Our menu",
      book: "Book a table",
      location: "Where we are",
      work: "Work with us",
      contact: "Contact",
      rights: "All rights reserved."
    }
  };

  const t = content[lang];

  return (
    <footer className="bg-restaurant-dark text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-restaurant-accent rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-2xl font-bold tracking-tight serif">Trattoria del pescatore</span>
            </Link>
            <p className="text-restaurant-subtext leading-relaxed">
              {t.desc}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-restaurant-accent transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold serif">{t.contacts}</h4>
            <ul className="space-y-4 text-restaurant-subtext">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-restaurant-accent shrink-0 mt-1" />
                <span>Via del Gusto 123, <br /> 00100 Roma, Italia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-restaurant-accent shrink-0" />
                <span>+39 06 1234567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={20} className="text-restaurant-accent shrink-0 mt-1" />
                <span>Lun - Dom: 12:00 - 15:00 <br /> 19:00 - 00:00</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold serif">{t.links}</h4>
            <ul className="space-y-4 text-restaurant-subtext">
              <li><Link to="/menu" className="hover:text-restaurant-accent transition-colors">{t.menu}</Link></li>
              <li><Link to="/prenota" className="hover:text-restaurant-accent transition-colors">{t.book}</Link></li>
              <li><Link to="/contatto" className="hover:text-restaurant-accent transition-colors">{t.location}</Link></li>
              <li><Link to="/lavora-con-noi" className="hover:text-restaurant-accent transition-colors">{t.work}</Link></li>
              <li><Link to="/contatto" className="hover:text-restaurant-accent transition-colors">{t.contact}</Link></li>
            </ul>
          </div>

          {/* Map */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold serif">{t.findUs}</h4>
            <div className="aspect-square rounded-xl overflow-hidden grayscale contrast-125 opacity-70">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.878931168936!2d12.4922309!3d41.8902102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6045688667c3%3A0x4a41f692398f2aa2!2sColosseo!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit" 
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
          <p>© {new Date().getFullYear()} Trattoria del pescatore. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
