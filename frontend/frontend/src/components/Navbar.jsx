

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../images/logo2.png';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    {
      name: 'Buy', id: 'buy',
      dropdown: [
        { name: 'Land', id: 'buy-land' },
        { name: 'Residential', id: 'buy-residential' },
        { name: 'Commercial', id: 'buy-commercial' }
      ]
    },
    {
      name: 'Sell', id: 'sell',
      dropdown: [
        { name: 'Land', id: 'sell-land' },
        { name: 'Residential', id: 'sell-residential' },
        { name: 'Commercial', id: 'sell-commercial' }
      ]
    },
    { name: 'Sold leased', id: 'sold-leased' },
    { name: 'Contact', id: 'contact' },
    { name: 'Book Visit', id: 'book-visit' }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
    setDropdownOpen(null);
  };

 const isLightPage = ['sell', 'testimonials'].some(page => currentPage.startsWith(page));
  return (
    <nav className={`navbar ${isScrolled || isLightPage ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="container nav-content">
        <div className="logo-section" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
         <img src={logoImg} alt="RSV ESTATES logo" className="navbar-logo" style={{ width: '90px', height: 'auto', maxWidth: '70px' }} />
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={link.dropdown ? 'dropdown-parent' : ''}
              onMouseEnter={() => setDropdownOpen(link.id)}
              onMouseLeave={() => setDropdownOpen(null)}
              style={link.dropdown ? { position: 'relative' } : {}}
            >
              <button
                  onClick={() => handleNavClick(link.id)}
  className={`${
    link.id === 'book-visit'
      ? 'book-visit-nav-btn'
      : `nav-link-btn ${currentPage === link.id ? 'active' : ''}`
                      }`}
                  >
                  {link.name}
                  {link.dropdown && (
                <span
                style={{
                        fontSize: '0.6em',
                        marginLeft: '4px',
                        verticalAlign: 'middle'
                        }}
                          >
                         ▼
                          </span>
                   )}
                          </button>
              {link.dropdown && dropdownOpen === link.id && (
                <div className="dropdown-menu">
                  {link.dropdown.map(drop => (
                    <button
                      key={drop.id}
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick(drop.id);
                      }}
                    >
                      {drop.name}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <X size={24} color={isScrolled || isLightPage ? "#0F1A11" : "white"} />
            ) : (
              <Menu size={24} color={isScrolled || isLightPage ? "#0F1A11" : "white"} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

