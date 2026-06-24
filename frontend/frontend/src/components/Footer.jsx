import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import logo from '../images/logo2.png';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer" style={{ padding: '1.5rem 0 0 0' }}>
      <div className="container">

        {/* Main Footer Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            padding: '0',
            alignItems: 'start'
          }}
        >

          {/* Column 1 - Brand */}
          <div>
            <div onClick={() => onNavigate('home')} style={{ cursor: 'pointer', marginBottom: '0.8rem' }}>
              <img src={logo} alt="RSV Groups Logo" style={{ width: '120px', height: 'auto' }} />
            </div>

            <p style={{ color: '#ffffff', fontSize: '0.875rem', lineHeight: '1.5', margin: '0 0 0.4rem 0', maxWidth: '280px' }}>
              <span style={{ color: '#C9A84C', fontWeight: '600' }}>Visit us at our office</span><br />
              No. 7, Kamakodi Nagar, Valasaravakkam, Chennai - 600087
            </p>

            <p style={{ color: '#ffffff', fontSize: '0.875rem', lineHeight: '1.5', margin: '0 0 0.4rem 0', maxWidth: '280px' }}>
              Contact Us<br />
              <a href="tel:+919962917779" style={{ color: '#ffffff', textDecoration: 'none' }}>+91 9962917779</a>
              {', '}
              <a href="tel:+919962737779" style={{ color: '#ffffff', textDecoration: 'none' }}>+91 99627 37779</a>
            </p>

            <p style={{ color: '#ffffff', fontSize: '0.875rem', lineHeight: '1.5', margin: '0 0 0.8rem 0', maxWidth: '280px' }}>
              E-mail : info@rsvgroups.com
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}><Facebook size={16} /></a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}><Twitter size={16} /></a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}><Instagram size={16} /></a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}><Youtube size={16} /></a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.6rem', fontWeight: '500', letterSpacing: '1px', marginTop: 0, color: '#C9A84C' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['home', 'about', 'buy', 'sell', 'sold-leased'].map((item) => (
                <li key={item} style={{ marginBottom: '0.4rem' }}>
                  <button
                    onClick={() => onNavigate(item)}
                    style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 0, fontSize: '0.95rem', transition: 'color 0.3s' }}
                  >
                    {item === 'sold-leased' ? 'Sold & Leased' : item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.6rem', fontWeight: '500', letterSpacing: '1px', marginTop: 0, color: '#C9A84C' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'About Us', page: 'about' },
                { label: 'Sold & Leased', page: 'sold-leased' },
                { label: 'Contact Us', page: 'contact' },
                { label: 'Book Visit', page: 'book-visit' },
              ].map(({ label, page }) => (
                <li key={page} style={{ marginBottom: '0.4rem' }}>
                  <button
                    onClick={() => onNavigate(page)}
                    style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 0, fontSize: '0.95rem' }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(201, 168, 76, 0.2)',
            padding: '0.6rem 0',
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            letterSpacing: '0.5px',
            color: '#C9A84C',
          }}
        >
          <p style={{ margin: 0 }}>
            {'© 2026 '}
            <a href="https://devspectra.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#faf9f7', textDecoration: 'none', fontWeight: '600' }}>
              DevSpectra
            </a>
            {'. ALL RIGHTS RESERVED.'}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;