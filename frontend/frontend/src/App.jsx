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

const getInitialPage = () => {
  const hash = window.location.hash.replace('#', '').trim();
  if (hash) return hash;
  return window.history.state?.page || 'home';
};

function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    localStorage.getItem('adminAuth') === 'true'
  );

  // ── Scroll to top on navigation ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  // ── Handle browser back/forward ──
  useEffect(() => {
    const initialPage = getInitialPage();
    window.history.replaceState({ page: initialPage }, '', `#${initialPage}`);

    const onPop = (e) => {
      const page = e.state?.page || 'home';
      setCurrentPage(page);
    };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // ── Navigation ──
  const handleNavigate = (page) => {
    if (page === currentPage) return;
    window.history.pushState({ page }, '', `#${page}`);
    setCurrentPage(page);
  };

  const handleBuyNavigate = (category) => {
    handleNavigate(category === 'all' ? 'buy' : `buy-${category}`);
  };

  // ── Page renderer ──
  const renderPage = () => {
    if (currentPage.startsWith('buy')) {
      const category = currentPage.split('-')[1] || 'all';
      return <BuyPage category={category} />;
    }

    if (currentPage.startsWith('sell')) {
      const category = currentPage.split('-')[1] || '';
      return <SellPage category={category} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} onBuyNavigate={handleBuyNavigate} />;
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
        return <CustomerReviewsPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'book-visit':
        return <BookVisitPage />;
      case 'sold-leased':
        return <SoldLeasedPage onNavigate={handleNavigate} />;
      case 'admin':
        if (!isAdminAuthenticated) {
          return (
            <AdminLogin
              onLogin={() => {
                localStorage.setItem('adminAuth', 'true');
                setIsAdminAuthenticated(true);
              }}
              onBack={() => handleNavigate('home')}
            />
          );
        }
        return (
          <AdminDashboard
            onLogout={() => {
              localStorage.removeItem('adminAuth');
              setIsAdminAuthenticated(false);
              handleNavigate('admin');
            }}
          />
        );
      default:
        return <Home onNavigate={handleNavigate} onBuyNavigate={handleBuyNavigate} />;
    }
  };

  return (
    <div className="app">
      <Layout currentPage={currentPage} onNavigate={handleNavigate}>
        {renderPage()}
      </Layout>
    </div>
  );
}

export default App;
