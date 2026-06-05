import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Home, Building, TreePine, Filter, Search, Ruler } from 'lucide-react';

const BuyPage = ({ category = 'all' }) => {
  const [filterState, setFilterState] = useState({
    minPrice: '',
    maxPrice: '',
    propertyType: category === 'all' ? '' : category,
    location: ''
  });

  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: '',
    maxPrice: '',
    propertyType: category === 'all' ? '' : category,
    location: ''
  });

  useEffect(() => {
    setFilterState(prev => ({ ...prev, propertyType: category === 'all' ? '' : category }));
    setAppliedFilters(prev => ({ ...prev, propertyType: category === 'all' ? '' : category }));
  }, [category]);

  const [selectedProperty, setSelectedProperty] = useState(null);

  const [userProps, setUserProps] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('user_properties') || '[]');
    setUserProps(saved);

    const searchQuery = localStorage.getItem('home_search_filters');
    if (searchQuery) {
      const parsed = JSON.parse(searchQuery);
      const mappedFilters = {};
      
      if (parsed.location) mappedFilters.location = parsed.location;
      if (parsed.price === '25-50') { mappedFilters.minPrice = '2500000'; mappedFilters.maxPrice = '5000000'; }
      if (parsed.price === '50-100') { mappedFilters.minPrice = '5000000'; mappedFilters.maxPrice = '10000000'; }
      if (parsed.price === '100-plus') { mappedFilters.minPrice = '10000000'; mappedFilters.maxPrice = '500000000'; }

      setFilterState(prev => ({ ...prev, ...mappedFilters }));
      setAppliedFilters(prev => ({ ...prev, ...mappedFilters }));
      localStorage.removeItem('home_search_filters');
    }
  }, []);

  const properties = [
    { title: "Luxury Horizon Villa", location: "OMR, Chennai", sqft: "2400 Sq.ft", price: "5.2 Cr", type: "residential", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", ownerName: "Rajesh Kumar", phone: "+91 98401 23456", email: "rajesh.k@example.com" },
    { title: "Elite Commercial Hub", location: "Guindy, Chennai", sqft: "5000 Sq.ft", price: "12.5 Cr", type: "commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", ownerName: "Meenakshi Properties", phone: "+91 99402 34567", email: "contact@meenakshi.in" },
    { title: "Sunrise Seaside Plot", location: "ECR, Chennai", sqft: "1200 Sq.ft", price: "1.8 Cr", type: "land", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop", ownerName: "Senthil Nathan", phone: "+91 98843 45678", email: "senthil.ecr@example.com" },
    { title: "Pinegrove Residencies", location: "Tambaram", sqft: "1500 Sq.ft", price: "3.2 Cr", type: "residential", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", ownerName: "Priya Anand", phone: "+91 97914 56789", email: "priya.tbm@example.com" },
    { title: "Tech Park Annex", location: "Taramani", sqft: "12000 Sq.ft", price: "25 Cr", type: "commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", ownerName: "TechLand Inv.", phone: "+91 94445 67890", email: "invest@techland.in" },
    { title: "Green Acres Farmland", location: "Chengalpattu", sqft: "2 Acres", price: "85 L", type: "land", img: "https://images.unsplash.com/photo-1629851605336-f3ccb0eceb9e?q=80&w=2074&auto=format&fit=crop", ownerName: "Karthikeyan", phone: "+91 99626 78901", email: "karthi.farms@example.com" }
  ];

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const lower = priceStr.toLowerCase();
    let num = parseFloat(lower.replace(/[^0-9.]/g, ''));
    if (lower.includes('cr')) return num * 10000000;
    if (lower.includes('l')) return num * 100000;
    return num;
  };

  const allProperties = [...userProps, ...properties];

  const filtered = allProperties.filter(p => {
    if (p.status && p.status !== 'approved') return false;
    if (appliedFilters.propertyType && p.type !== appliedFilters.propertyType) return false;
    if (appliedFilters.location && !p.location.toLowerCase().includes(appliedFilters.location.toLowerCase())) return false;
    
    const pValue = parsePrice(p.price);
    if (appliedFilters.minPrice && pValue < parseInt(appliedFilters.minPrice)) return false;
    if (appliedFilters.maxPrice && pValue > parseInt(appliedFilters.maxPrice)) return false;
    
    return true;
  });

  const getIcon = (type) => {
    if (type === 'residential') return <Home size={18} />;
    if (type === 'commercial') return <Building size={18} />;
    return <TreePine size={18} />;
  };

  return (
    <div className="page-container" style={{ background: 'var(--primary-bg)' }}>
      <section className="buy-hero" style={{ 
        height: '60vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        marginTop: '-100px',
        paddingTop: '100px',
        overflow: 'hidden'
      }}>
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop) center/cover no-repeat',
            zIndex: 0
          }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1.5rem' }}>Discover <span className="highlight">Properties.</span></h1>
            <h2 className="serif" style={{ fontSize: 'var(--font-lg)', color: 'rgba(255,255,255,0.8)' }}>Find your next investment.</h2>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 2rem' }}>

        <div className="buy-filter-bar">
          
          {/* Min Price */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Min Price</label>
            <select 
              value={filterState.minPrice} 
              onChange={e => setFilterState({...filterState, minPrice: e.target.value})}
              style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
            >
              <option value="">--Select--</option>
              <option value="5000000">50 Lacs</option>
              <option value="10000000">1 Crore</option>
              <option value="20000000">2 Crores</option>
              <option value="50000000">5 Crores</option>
              <option value="100000000">10 Crores</option>
            </select>
          </div>

          {/* Max Price */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Max Price</label>
            <select 
               value={filterState.maxPrice} 
               onChange={e => setFilterState({...filterState, maxPrice: e.target.value})}
              style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
            >
              <option value="">--Select--</option>
              <option value="5000000">50 Lacs</option>
              <option value="10000000">1 Crore</option>
              <option value="50000000">5 Crores</option>
              <option value="100000000">10 Crores</option>
              <option value="500000000">50 Crores+</option>
            </select>
          </div>

          {/* Property Type */}
          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Property Type</label>
            <select 
               value={filterState.propertyType} 
               onChange={e => setFilterState({...filterState, propertyType: e.target.value})}
              style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
            >
              <option value="">-- Choose Property Type --</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land / Plot</option>
            </select>
          </div>

          {/* Location */}
          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Location</label>
            <select 
               value={filterState.location} 
               onChange={e => setFilterState({...filterState, location: e.target.value})}
              style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
            >
              <option value="">-- Choose Property Area --</option>
              <option value="omr">OMR</option>
              <option value="ecr">ECR</option>
              <option value="guindy">Guindy</option>
              <option value="tambaram">Tambaram</option>
              <option value="chengalpattu">Chengalpattu</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button 
              onClick={() => setAppliedFilters(filterState)}
              style={{ background: '#F58220', color: 'white', fontWeight: 700, padding: '10px 24px', border: 'none', cursor: 'pointer', height: '39px', display: 'flex', alignItems: 'center' }}
            >
              Search
            </button>
          </div>
        </div>

        <div className="projects-grid" style={{ minHeight: '50vh' }}>
          {filtered.length > 0 ? filtered.map((prop, idx) => (
            <motion.div 
              key={idx}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover="hover" // Triggers hover variants on children
              style={{ overflow: 'hidden', borderRadius: '12px' }}
            >
              <div className="card-image" style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
                <motion.img 
                  src={prop.img} 
                  alt={prop.title} 
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  variants={{
                    hover: { scale: 1.15 }
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                
                <span className="tag" style={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 12 }}>
                  {getIcon(prop.type)} {prop.type}
                </span>
              </div>
              <div className="card-content">
                <h3 className="project-title serif" style={{ fontSize: '1.4rem' }}>{prop.title}</h3>
                <div className="project-location" style={{ marginBottom: '1.5rem', display: 'flex', gap: '20px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} color="#F58220"/> {prop.location}</span>
                  {prop.sqft && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Ruler size={16} color="#F58220"/> {prop.sqft}</span>}
                </div>
                <div className="price-info">
                  <span className="price">{prop.price}</span>
                  <button
                        className="view-all-btn"
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                        onClick={() =>
                          setSelectedProperty(prop)
                        }
                      >
                        MORE DETAILS
                      </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div style={{ padding: '4rem', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-light)' }}>
              No properties available in this category yet. Check back soon.
            </div>
          )}
        </div>
      </div>
      {selectedProperty && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.75)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}
  >
    <div
            style={{
              width: '850px',
              maxWidth: '95%',
              maxHeight: '90vh',
              background: '#f8f4e8',
              borderRadius: '20px',
              overflowY: 'auto',
              overflowX: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
            }}
          >
      <img
        src={selectedProperty.img}
        alt={selectedProperty.title}
        style={{
          width: '100%',
          height: '320px',
          objectFit: 'cover'
        }}
      />

      <div
            style={{
              padding: '2rem',
              position: 'relative'
            }}
          >

              

        <h2
          className="serif"
          style={{
            color: '#153a21',
            marginBottom: '1rem'
          }}
        >
          {selectedProperty.title}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(2,1fr)',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >
          <p><strong>Location:</strong> {selectedProperty.location}</p>
          <p><strong>Area:</strong> {selectedProperty.sqft}</p>
          <p><strong>Price:</strong> {selectedProperty.price}</p>
          <p><strong>Type:</strong> {selectedProperty.type}</p>
          <p><strong>Status:</strong> {selectedProperty.status}</p>
          <p><strong>Registration:</strong> {selectedProperty.registration}</p>
        </div>

        <h3
          style={{
            color: '#153a21',
            marginBottom: '1rem'
          }}
        >
          Property Description
        </h3>

        <p
          style={{
            color: '#555',
            lineHeight: 1.8
          }}
        >
          {selectedProperty.description}
        </p>

        <hr
          style={{
            margin: '2rem 0'
          }}
        />

        <h3
          style={{
            color: '#153a21'
          }}
        >
          Owner Information
        </h3>

        <p><strong>Name:</strong> {selectedProperty.ownerName}</p>
        <p><strong>Phone:</strong> {selectedProperty.phone}</p>
        <p><strong>Email:</strong> {selectedProperty.email}</p>

        <button
          onClick={() =>
            setSelectedProperty(null)
          }
          style={{
            marginTop: '2rem',
            background: '#153a21',
            color: '#fff',
            border: 'none',
            padding: '14px 30px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default BuyPage;
