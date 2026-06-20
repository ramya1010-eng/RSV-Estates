import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Phone } from 'lucide-react';

const Layout = ({ children, onNavigate, currentPage }) => {
  const isAdminPage = currentPage === 'admin';

  const handleWhatsApp = () => {
    window.open('https://wa.me/919962737779', '_blank');
  };

  const handleCall = () => {
  window.location.href = 'tel:+919876543210';
};

  return (
    <div className="layout">
      {!isAdminPage && <Navbar onNavigate={onNavigate} currentPage={currentPage} />}
      <main>{children}</main>
      {!isAdminPage && <Footer onNavigate={onNavigate} />}

      {/* Call Floating Button */}
{!isAdminPage && (
  <button
    onClick={handleCall}
    style={{
      position: 'fixed',
      bottom: '6.8rem',
      right: '2rem',
      width: '58px',
      height: '58px',
      borderRadius: '50%',
      background: '#0B4D1F',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(11,77,31,0.4)',
      zIndex: 9999,
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'scale(1.1)';
      e.currentTarget.style.boxShadow =
        '0 6px 25px rgba(11,77,31,0.6)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow =
        '0 4px 20px rgba(11,77,31,0.4)';
    }}
    title="Call Us"
  >
    <Phone size={26} color="white" />
  </button>
)}

      {/* WhatsApp Floating Button */}
      {!isAdminPage && (
        <button
          onClick={handleWhatsApp}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: '#25D366',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
            zIndex: 9999,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(37,211,102,0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)';
          }}
          title="Chat on WhatsApp"
        >
          {/* WhatsApp SVG Icon */}
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.828 6.5L4 29l7.75-1.797A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3z" fill="white"/>
            <path d="M21.5 18.5c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="#25D366"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Layout;

