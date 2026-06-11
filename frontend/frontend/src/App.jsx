




import React, { useState, useEffect } from 'react';
import './App.css';

import Layout from './components/Layout';
import Home from './pages/Home';
import PlotsPage from './pages/PlotsPage';
import LocationsPage from './pages/LocationsPage';
import ProjectsPage from './pages/ProjectsPage';
import AmenitiesPage from './pages/AmenitiesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookVisitPage from './pages/BookVisitPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import BuyPage from './pages/BuyPage';
import SellPage from './pages/SellPage';
import SoldLeasedPage from './pages/SoldLeasedPage';
import CustomerReviewsPage from './components/CustomerReviewsPage';

const API = import.meta.env.VITE_API_URL;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentPage]);

  // ✅ FeaturedProjects onNavigate('land' | 'residential' | 'commercial' | 'all')
  // Home page-ல FeaturedProjects-க்கு இந்த function pass பண்ணு
  const handleBuyNavigate = (category) => {
    if (category === 'all') {
      setCurrentPage('buy');
    } else {
      setCurrentPage(`buy-${category}`); // 'buy-land', 'buy-residential', 'buy-commercial'
    }
  };

  const renderPage = () => {
    // buy-land / buy-residential / buy-commercial / buy
    if (currentPage.startsWith('buy')) {
      const parts = currentPage.split('-');
      const category = parts[1] || 'all'; // 'land', 'residential', 'commercial', 'all'
      return <BuyPage category={category} />;
    }

    if (currentPage.startsWith('sell')) {
      const category = currentPage.split('-')[1] || '';
      return <SellPage category={category} />;
    }

    switch (currentPage) {
      case 'home':
        // ✅ Home-க்கு handleBuyNavigate pass பண்றோம்
        return <Home onNavigate={setCurrentPage} onBuyNavigate={handleBuyNavigate} />;
      case 'plots':
        return <PlotsPage />;
      case 'locations':
        return <LocationsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'amenities':
        return <AmenitiesPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'reviews':
        return <CustomerReviewsPage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'book-visit':
        return <BookVisitPage />;
      case 'sold-leased':
        return <SoldLeasedPage onNavigate={setCurrentPage} />;
      case 'admin':
        if (!isAdminAuthenticated) {
          return (
            <AdminLogin
              onLogin={() => setIsAdminAuthenticated(true)}
              onBack={() => setCurrentPage('home')}
            />
          );
        }
        return (
          <AdminDashboard
            onLogout={() => {
              setIsAdminAuthenticated(false);
              setCurrentPage('home');
            }}
          />
        );
      default:
        return <Home onNavigate={setCurrentPage} onBuyNavigate={handleBuyNavigate} />;
    }
  };

  return (
    <div className="app">
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
    </div>
  );
}

export default App;
