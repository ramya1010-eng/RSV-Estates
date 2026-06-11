// import React, { useState } from 'react';
// import { Search, MapPin, Ruler, Wallet } from 'lucide-react';

// const SearchBar = ({ onSearch }) => {
//   const [location, setLocation] = useState('');
//   const [sqft, setSqft] = useState('');
//   const [price, setPrice] = useState('');

//   const handleSearch = () => {
//     localStorage.setItem('home_search_filters', JSON.stringify({ location, sqft, price }));
//     if (onSearch) onSearch();
//   };

//   return (
//     <div className="search-bar-wrapper container">
//       <div className="search-bar-inner">
//         <div className="filter-item border-right">
//           <div className="filter-text">
//             <span>LOCATION corridor</span>
//             <select className="serif" value={location} onChange={(e) => setLocation(e.target.value)} style={{ cursor: 'pointer' }}>
//               <option value="">Select Destination</option>
//               <option value="chennai">Chennai</option>
//               <option value="thiruvallur">Thiruvallur</option>
//               <option value="kanchipuram">Kanchipuram</option>
//             </select>
//           </div>
//         </div>

//         <div className="filter-item border-right">
//           <div className="filter-text">
//             <span>PLOT DIMENSIONS</span>
//             <select className="serif" value={sqft} onChange={(e) => setSqft(e.target.value)} style={{ cursor: 'pointer' }}>
//               <option value="">Any Dimension</option>
//               <option value="1200">600 - 1200 Sq.ft</option>
//               <option value="2400">1200 - 2400 Sq.ft</option>
//               <option value="4800">2400 - 4800 Sq.ft</option>
//             </select>
//           </div>
//         </div>

//         <div className="filter-item">
//           <div className="filter-text">
//             <span>INVESTMENT RANGE</span>
//             <select className="serif" value={price} onChange={(e) => setPrice(e.target.value)} style={{ cursor: 'pointer' }}>
//               <option value="">Private Consultation</option>
//               <option value="25-50">₹25L - ₹50L</option>
//               <option value="50-100">₹50L - ₹1Cr</option>
//               <option value="100-plus">₹1Cr - ₹5Cr</option>
//             </select>
//           </div>
//         </div>

//         <button onClick={handleSearch} className="search-plots-btn" style={{ cursor: 'pointer' }}>
//           <Search size={18} />
//           <span>Find Estate</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;







import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

const areaOptions = {
  chennai: [
    "Adyar", "Anna Nagar", "Velachery", "OMR", "ECR",
    "Porur", "Ambattur", "Perambur", "Sholinganallur", "Medavakkam",
    "Pallavaram", "Chromepet", "Tambaram", "Nungambakkam", "T. Nagar",
    "Vadapalani", "Kodambakkam", "Mylapore", "Teynampet", "Guindy"
  ],
  thiruvallur: [
    "Poonamallee", "Avadi", "Thiruvallur Town", "Gummidipoondi",
    "Tiruttani", "Uthukottai", "Kadambathur", "Pallipet", "Surapet", "Minjur",
    "Redhills", "Thiruninravur", "Mappedu", "Nazarethpet", "Veppampattu"
  ],
  kanchipuram: [
    "Kanchipuram Town", "Sriperumbudur", "Uthiramerur", "Walajabad",
    "Madurantakam", "Cheyyar", "Acharapakkam", "Padalam", "Kundrathur", "Singaperumalkoil",
    "Tambaram", "Vandalur", "Perungalathur", "Guduvanchery", "Urapakkam"
  ],
};

const districtLabels = {
  chennai: "Chennai",
  thiruvallur: "Thiruvallur",
  kanchipuram: "Kanchipuram",
};

const FONT = "'Playfair Display', serif";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [sqft, setSqft] = useState('');
  const [price, setPrice] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredDistrict, setHoveredDistrict] = useState('chennai');
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const inTrigger = triggerRef.current?.contains(e.target);
      const inDropdown = dropdownRef.current?.contains(e.target);
      if (!inTrigger && !inDropdown) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAreaSelect = (selectedDistrict, selectedArea) => {
    setLocation(selectedDistrict);
    setArea(selectedArea);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    localStorage.setItem('home_search_filters', JSON.stringify({ location, area, sqft, price }));
    if (onSearch) onSearch();
  };

  const displayText = area
    ? area
    : location
    ? districtLabels[location]
    : 'Select Destination';

  return (
    <div className="search-bar-wrapper container">
      <div className="search-bar-inner">

        {/* LOCATION */}
        <div
          className="filter-item border-right"
          style={{ cursor: 'pointer', position: 'relative' }}
          ref={triggerRef}
          onClick={() => {
            setHoveredDistrict(location || 'chennai');
            setShowDropdown(prev => !prev);
          }}
        >
          <div className="filter-text">
            <span style={{ fontFamily: FONT }}>LOCATION CORRIDOR</span>
            <div style={{
              fontWeight: 700,
              fontFamily: FONT,
              fontSize: '1.2rem',
              color: area ? '#0F1A11' : location ? '#0F1A11' : '#aaa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none',
            }}>
              {displayText}
              <span style={{ fontSize: '0.75rem', color: '#aaa', fontFamily: FONT }}>▾</span>
            </div>
          </div>

          {/* DROPDOWN */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '8px',
                zIndex: 9999,
                display: 'flex',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                border: '1px solid #e5e7eb',
                minWidth: '360px',
                background: '#fff',
              }}
            >
              {/* LEFT - Districts */}
              <div style={{
                background: '#f9fafb',
                width: '160px',
                padding: '8px 0',
                flexShrink: 0,
                borderRight: '1px solid #e5e7eb',
              }}>
                <p style={{
                  fontSize: '0.6rem',
                  color: '#9ca3af',
                  letterSpacing: '2px',
                  padding: '8px 16px 6px',
                  margin: 0,
                  fontFamily: FONT,
                }}>DISTRICT</p>
                {Object.keys(areaOptions).map((district) => (
                  <div
                    key={district}
                    onMouseEnter={() => setHoveredDistrict(district)}
                    onClick={() => { setLocation(district); setArea(''); }}
                    style={{
                      padding: '11px 16px',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontFamily: FONT,
                      color: hoveredDistrict === district ? '#F58220' : '#1f2937',
                      background: hoveredDistrict === district ? '#fff7ed' : 'transparent',
                      borderLeft: hoveredDistrict === district ? '2px solid #F58220' : '2px solid transparent',
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {districtLabels[district]}
                    <span style={{ fontSize: '0.7rem', opacity: 0.4, fontFamily: FONT }}>›</span>
                  </div>
                ))}
              </div>

              {/* RIGHT - Areas */}
              <div style={{
                background: '#ffffff',
                width: '200px',
                padding: '8px 0',
                maxHeight: '280px',
                overflowY: 'auto',
              }}>
                <p style={{
                  fontSize: '0.6rem',
                  color: '#9ca3af',
                  letterSpacing: '2px',
                  padding: '8px 16px 6px',
                  margin: 0,
                  fontFamily: FONT,
                }}>AREAS</p>
                {areaOptions[hoveredDistrict]?.map((a) => (
                  <div
                    key={a}
                    onClick={() => handleAreaSelect(hoveredDistrict, a)}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontFamily: FONT,
                      color: (area === a && location === hoveredDistrict) ? '#F58220' : '#374151',
                      background: (area === a && location === hoveredDistrict) ? '#fff7ed' : 'transparent',
                      transition: 'all 0.15s',
                      fontWeight: (area === a && location === hoveredDistrict) ? 600 : 400,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.color = '#F58220';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = (area === a && location === hoveredDistrict) ? '#fff7ed' : 'transparent';
                      e.currentTarget.style.color = (area === a && location === hoveredDistrict) ? '#F58220' : '#374151';
                    }}
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PLOT DIMENSIONS */}
        <div className="filter-item border-right">
          <div className="filter-text">
            <span style={{ fontFamily: FONT }}>PLOT DIMENSIONS</span>
            <select
              value={sqft}
              onChange={(e) => setSqft(e.target.value)}
              style={{
                cursor: 'pointer',
                background: '#ffffff',
                color: sqft ? '#1f2937' : '#6b7280',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '0.95rem',
                fontFamily: FONT,
                fontWeight: 600,
                outline: 'none',
                width: '100%',
                appearance: 'auto',
              }}
            >
              <option value="">Any Dimension</option>
              <option value="1200">600 - 1200 Sq.ft</option>
              <option value="2400">1200 - 2400 Sq.ft</option>
              <option value="4800">2400 - 4800 Sq.ft</option>
            </select>
          </div>
        </div>

        {/* INVESTMENT RANGE */}
        <div className="filter-item">
          <div className="filter-text">
            <span style={{ fontFamily: FONT }}>INVESTMENT RANGE</span>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                cursor: 'pointer',
                background: '#ffffff',
                color: price ? '#1f2937' : '#6b7280',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '0.95rem',
                fontFamily: FONT,
                fontWeight: 600,
                outline: 'none',
                width: '100%',
                appearance: 'auto',
              }}
            >
              <option value="">Private Consultation</option>
              <option value="25-50">₹25L - ₹50L</option>
              <option value="50-100">₹50L - ₹1Cr</option>
              <option value="100-plus">₹1Cr - ₹5Cr</option>
            </select>
          </div>
        </div>

        <button onClick={handleSearch} className="search-plots-btn" style={{ cursor: 'pointer', fontFamily: FONT }}>
          <Search size={18} />
          <span>Find Estate</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;