import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavBar_Admin from './components/NavBar_Admin';
import NavBar_Op from './components/NavBar_Op';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import WorkWithUs from './pages/WorkWithUs';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import OperatorDashboard from './pages/OperatorDashboard';
import ReservationModal from './components/ReservationModal';
import LanguageSwitcher from './components/LanguageSwitcher';
import ScrollToTop from './components/ScrollToTop';
import AdminMenu from './pages/AdminMenu';
import AdminBooking from './pages/AdminBooking';
import AdminWorkWithUs from './pages/AdminWorkWithUs';
import AdminContact from './pages/AdminContact';
import { ThemeProvider } from './context/ThemeContext';

export type Language = 'it' | 'en' | 'fr' | 'es' | 'de' | 'zh' | 'ar';


const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('lang');
    return (stored as Language) || 'it';
  });
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleLanguage = (code?: string) => {
    if (code) setLang(code as Language);
    else setLang(prev => (prev === 'it' ? 'en' : 'it'));
  };

  return (
    <ThemeProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {/* Show correct navbar by route using useLocation */}
        {location.pathname.startsWith('/admin') ? (
          <NavBar_Admin />
        ) : location.pathname.startsWith('/operator') ? (
          <NavBar_Op />
        ) : (
          <Navbar 
            lang={lang} 
            toggleLanguage={toggleLanguage} 
            onOpenBooking={openModal} 
          />
        )}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} onOpenBooking={openModal} />} />
            <Route path="/menu" element={<Menu lang={lang} />} />
            <Route path="/prenota" element={<Booking lang={lang} />} />
            <Route path="/contatto" element={<Contact lang={lang} />} />
            <Route path="/lavora-con-noi" element={<WorkWithUs lang={lang} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={localStorage.getItem('role') === 'admin' ? <AdminDashboard /> : <Login />} />
            <Route path="/admin/menu" element={localStorage.getItem('role') === 'admin' ? <AdminMenu /> : <Login />} />
            <Route path="/admin/prenota" element={localStorage.getItem('role') === 'admin' ? <AdminBooking /> : <Login />} />
            <Route path="/admin/lavora-con-noi" element={localStorage.getItem('role') === 'admin' ? <AdminWorkWithUs /> : <Login />} />
            <Route path="/admin/contatto" element={localStorage.getItem('role') === 'admin' ? <AdminContact /> : <Login />} />
            <Route path="/operator" element={localStorage.getItem('role') === 'operator' ? <OperatorDashboard /> : <Login />} />
          </Routes>
        </main>
        <Footer lang={lang} />
        <ReservationModal lang={lang} isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </ThemeProvider>
  );
};

export default App;
