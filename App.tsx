
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import ReservationModal from './components/ReservationModal';

export type Language = 'it' | 'en';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState<Language>('it');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleLanguage = () => setLang(prev => (prev === 'it' ? 'en' : 'it'));

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar 
          lang={lang} 
          toggleLanguage={toggleLanguage} 
          onOpenBooking={openModal} 
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} onOpenBooking={openModal} />} />
            <Route path="/menu" element={<Menu lang={lang} />} />
            <Route path="/prenota" element={<Booking lang={lang} />} />
            <Route path="/contatto" element={<Contact lang={lang} />} />
          </Routes>
        </main>
        <Footer lang={lang} />
        <ReservationModal lang={lang} isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </Router>
  );
};

export default App;
