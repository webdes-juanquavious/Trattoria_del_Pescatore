
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import WorkWithUs from './pages/WorkWithUs';
import ReservationModal from './components/ReservationModal';
import LanguageSwitcher from './components/LanguageSwitcher';

export type Language = 'it' | 'en' | 'fr' | 'es' | 'de' | 'zh' | 'ar';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState<Language>('it');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleLanguage = (code?: string) => {
    if (code) setLang(code as Language);
    else setLang(prev => (prev === 'it' ? 'en' : 'it'));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Removed test message */}
        <Navbar 
          lang={lang} 
          toggleLanguage={toggleLanguage} 
          onOpenBooking={openModal} 
        />
        {/* LanguageSwitcher removed, use only Navbar's selector */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} onOpenBooking={openModal} />} />
            <Route path="/menu" element={<Menu lang={lang} />} />
            <Route path="/prenota" element={<Booking lang={lang} />} />
            <Route path="/contatto" element={<Contact lang={lang} />} />
            <Route path="/lavora-con-noi" element={<WorkWithUs lang={lang} />} />
          </Routes>
        </main>
        <Footer lang={lang} />
        <ReservationModal lang={lang} isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </Router>
  );
};

export default App;
