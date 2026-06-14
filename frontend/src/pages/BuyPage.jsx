



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { MapPin, Home, Building, TreePine, Search, Ruler } from 'lucide-react';

// const BuyPage = ({ category = 'all' }) => {
//   const [filterState, setFilterState] = useState({
//     minPrice: '',
//     maxPrice: '',
//     propertyType: category === 'all' ? '' : category,
//     location: ''
//   });

//   const [appliedFilters, setAppliedFilters] = useState({
//     minPrice: '',
//     maxPrice: '',
//     propertyType: category === 'all' ? '' : category,
//     location: ''
//   });

//   useEffect(() => {
//     setFilterState(prev => ({ ...prev, propertyType: category === 'all' ? '' : category }));
//     setAppliedFilters(prev => ({ ...prev, propertyType: category === 'all' ? '' : category }));
//   }, [category]);

//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [userProps, setUserProps] = useState([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('user_properties') || '[]');
//     setUserProps(saved);

//     const searchQuery = localStorage.getItem('home_search_filters');
//     if (searchQuery) {
//       const parsed = JSON.parse(searchQuery);
//       const mappedFilters = {};
//       if (parsed.location) mappedFilters.location = parsed.location;
//       if (parsed.price === '25-50')    { mappedFilters.minPrice = '2500000';  mappedFilters.maxPrice = '5000000';   }
//       if (parsed.price === '50-100')   { mappedFilters.minPrice = '5000000';  mappedFilters.maxPrice = '10000000';  }
//       if (parsed.price === '100-plus') { mappedFilters.minPrice = '10000000'; mappedFilters.maxPrice = '500000000'; }
//       setFilterState(prev => ({ ...prev, ...mappedFilters }));
//       setAppliedFilters(prev => ({ ...prev, ...mappedFilters }));
//       localStorage.removeItem('home_search_filters');
//     }
//   }, []);

//   const parsePrice = (priceStr) => {
//     if (!priceStr) return 0;
//     const lower = priceStr.toLowerCase();
//     let num = parseFloat(lower.replace(/[^0-9.]/g, ''));
//     if (lower.includes('cr')) return num * 10000000;
//     if (lower.includes('l'))  return num * 100000;
//     return num;
//   };

//   const allProperties = [...userProps];

//   const filtered = allProperties.filter(p => {
//     if (p.status && p.status !== 'approved') return false;
//     if (appliedFilters.propertyType && p.type !== appliedFilters.propertyType) return false;
//     if (appliedFilters.location && !p.location.toLowerCase().includes(appliedFilters.location.toLowerCase())) return false;
//     const pValue = parsePrice(p.price);
//     if (appliedFilters.minPrice && pValue < parseInt(appliedFilters.minPrice)) return false;
//     if (appliedFilters.maxPrice && pValue > parseInt(appliedFilters.maxPrice)) return false;
//     return true;
//   });

//   const getIcon = (type) => {
//     if (type === 'residential') return <Home size={16} />;
//     if (type === 'commercial')  return <Building size={16} />;
//     return <TreePine size={16} />;
//   };

//   const heroImages = {
//     land:        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop',
//     residential: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
//     commercial:  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
//     all:         'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
//   };

//   const heroTitles = {
//     land:        'Land & Plots',
//     residential: 'Residential Properties',
//     commercial:  'Commercial Spaces',
//     all:         'All Properties',
//   };

//   return (
//     <div className="page-container" style={{ background: 'var(--primary-bg)' }}>

//       {/* ── Hero ── */}
//       <section className="buy-hero" style={{
//         height: '60vh', position: 'relative', display: 'flex', alignItems: 'center',
//         marginTop: '-100px', paddingTop: '100px', overflow: 'hidden'
//       }}>
//         <motion.div
//           key={category}
//           initial={{ scale: 1.15 }} animate={{ scale: 1 }}
//           transition={{ duration: 1.5, ease: 'easeOut' }}
//           style={{
//             position: 'absolute', inset: 0,
//             background: `url(${heroImages[category] || heroImages.all}) center/cover no-repeat`,
//             zIndex: 0
//           }}
//         />
//         <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))', zIndex: 1 }} />
//         <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//             <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1.5rem' }}>
//               Discover <span className="highlight">{heroTitles[category] || 'Properties'}.</span>
//             </h1>
//             <h2 className="serif" style={{ fontSize: 'var(--font-lg)', color: 'rgba(255,255,255,0.8)' }}>
//               Find your next investment.
//             </h2>
//           </motion.div>
//         </div>
//       </section>

//       <div className="container" style={{ padding: '3rem 2rem' }}>

//         {/* ── Filter Bar ── */}
//         <div className="buy-filter-bar">
//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <label style={{ color: 'white', fontSize: '0.85rem' }}>Min Price</label>
//             <select
//               value={filterState.minPrice}
//               onChange={e => setFilterState({ ...filterState, minPrice: e.target.value })}
//               style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
//             >
//               <option value="">--Select--</option>
//               <option value="5000000">50 Lacs</option>
//               <option value="10000000">1 Crore</option>
//               <option value="20000000">2 Crores</option>
//               <option value="50000000">5 Crores</option>
//               <option value="100000000">10 Crores</option>
//             </select>
//           </div>

//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <label style={{ color: 'white', fontSize: '0.85rem' }}>Max Price</label>
//             <select
//               value={filterState.maxPrice}
//               onChange={e => setFilterState({ ...filterState, maxPrice: e.target.value })}
//               style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
//             >
//               <option value="">--Select--</option>
//               <option value="5000000">50 Lacs</option>
//               <option value="10000000">1 Crore</option>
//               <option value="50000000">5 Crores</option>
//               <option value="100000000">10 Crores</option>
//               <option value="500000000">50 Crores+</option>
//             </select>
//           </div>

//           <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <label style={{ color: 'white', fontSize: '0.85rem' }}>Property Type</label>
//             <select
//               value={filterState.propertyType}
//               onChange={e => setFilterState({ ...filterState, propertyType: e.target.value })}
//               style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
//             >
//               <option value="">-- All Types --</option>
//               <option value="land">Land / Plot</option>
//               <option value="residential">Residential</option>
//               <option value="commercial">Commercial</option>
//             </select>
//           </div>

//           <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <label style={{ color: 'white', fontSize: '0.85rem' }}>Location</label>
//             <input
//               type="text"
//               placeholder="Enter area or city..."
//               value={filterState.location}
//               onChange={e => setFilterState({ ...filterState, location: e.target.value })}
//               style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333', fontSize: '0.95rem', boxSizing: 'border-box' }}
//             />
//           </div>

//           <div style={{ display: 'flex', alignItems: 'flex-end' }}>
//             <button
//               onClick={() => setAppliedFilters(filterState)}
//               style={{ background: '#F58220', color: 'white', fontWeight: 700, padding: '10px 24px', border: 'none', cursor: 'pointer', height: '39px', display: 'flex', alignItems: 'center', gap: '6px' }}
//             >
//               <Search size={16} /> Search
//             </button>
//           </div>
//         </div>

//         {/* ── Active filter badge ── */}
//         {appliedFilters.propertyType && (
//           <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <span style={{
//               background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
//               color: 'var(--accent-gold, #c9a84c)', padding: '6px 16px',
//               borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
//             }}>
//               {appliedFilters.propertyType === 'land' ? 'Land / Plot' :
//                appliedFilters.propertyType === 'residential' ? 'Residential' : 'Commercial'}
//             </span>
//             <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
//               {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
//             </span>
//           </div>
//         )}

//         {/* ── Properties Grid ── */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: '1.5rem',
//           minHeight: '50vh',
//         }}>
//           {filtered.length > 0 ? filtered.map((prop, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: idx * 0.08 }}
//               whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
//               style={{
//                 background: 'white',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 border: '1px solid #eee',
//                 boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
//                 transition: 'box-shadow 0.3s',
//                 cursor: 'pointer',
//               }}
//             >
//               <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
//                 <motion.img
//                   src={prop.img || prop.image_url || heroImages.all}
//                   alt={prop.title}
//                   loading="lazy"
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                   whileHover={{ scale: 1.08 }}
//                   transition={{ duration: 0.6, ease: 'easeOut' }}
//                 />
//                 <span style={{
//                   position: 'absolute', top: '12px', left: '12px',
//                   background: 'rgba(15,26,17,0.85)',
//                   color: '#c9a84c',
//                   padding: '4px 10px',
//                   borderRadius: '20px',
//                   fontSize: '0.72rem',
//                   fontWeight: 700,
//                   display: 'flex', alignItems: 'center', gap: '4px',
//                   textTransform: 'capitalize',
//                   backdropFilter: 'blur(4px)',
//                 }}>
//                   {getIcon(prop.type)} {prop.type}
//                 </span>
//               </div>

//               <div style={{ padding: '1rem 1.2rem 1.2rem' }}>
//                 <h3 style={{
//                   fontSize: '1rem',
//                   fontWeight: 700,
//                   color: 'var(--primary-dark, #0f1a11)',
//                   marginBottom: '0.5rem',
//                   lineHeight: 1.3,
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                 }}>
//                   {prop.title}
//                 </h3>

//                 <div style={{ display: 'flex', gap: '16px', color: 'var(--text-light, #888)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
//                   <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//                     <MapPin size={13} color="#F58220" /> {prop.location}
//                   </span>
//                   {(prop.sqft || prop.area) && (
//                     <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//                       <Ruler size={13} color="#F58220" /> {prop.sqft || prop.area}
//                     </span>
//                   )}
//                 </div>

//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
//                   <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold, #c9a84c)' }}>
//                     {prop.price}
//                   </span>
//                   <button
//                     onClick={() => setSelectedProperty(prop)}
//                     style={{
//                       background: 'var(--primary-dark, #0f1a11)',
//                       color: 'white',
//                       border: 'none',
//                       padding: '6px 14px',
//                       borderRadius: '4px',
//                       fontSize: '0.72rem',
//                       fontWeight: 700,
//                       cursor: 'pointer',
//                       letterSpacing: '0.05em',
//                     }}
//                   >
//                     MORE DETAILS
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           )) : (
//             <div style={{ padding: '4rem', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-light)' }}>
//               No properties available in this category yet. Check back soon.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── Property Detail Modal ── */}
//       {selectedProperty && (
//         <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
//           <div style={{ width: '750px', maxWidth: '95%', maxHeight: '88vh', background: '#f8f4e8', borderRadius: '20px', overflowY: 'auto', overflowX: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
//             <img
//               src={selectedProperty.img || selectedProperty.image_url || heroImages.all}
//               alt={selectedProperty.title}
//               style={{ width: '100%', height: '280px', objectFit: 'cover' }}
//             />
//             <div style={{ padding: '2rem' }}>
//               <h2 className="serif" style={{ color: '#153a21', marginBottom: '1rem', fontSize: '1.6rem' }}>{selectedProperty.title}</h2>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
//                 <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Location:</strong> {selectedProperty.location}</p>
//                 <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Area:</strong> {selectedProperty.sqft || selectedProperty.area}</p>
//                 <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Price:</strong> {selectedProperty.price}</p>
//                 <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Type:</strong> {selectedProperty.type}</p>
//                 {selectedProperty.status       && <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Status:</strong> {selectedProperty.status}</p>}
//                 {selectedProperty.registration && <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Registration:</strong> {selectedProperty.registration}</p>}
//               </div>
//               {selectedProperty.description && (
//                 <>
//                   <h3 style={{ color: '#153a21', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Property Description</h3>
//                   <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.9rem' }}>{selectedProperty.description}</p>
//                   <hr style={{ margin: '1.5rem 0' }} />
//                 </>
//               )}
//               {selectedProperty.ownerName && (
//                 <>
//                   <h3 style={{ color: '#153a21', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Owner Information</h3>
//                   <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Name:</strong>  {selectedProperty.ownerName  || selectedProperty.owner_name}</p>
//                   <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Phone:</strong> {selectedProperty.phone}</p>
//                   <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Email:</strong> {selectedProperty.email}</p>
//                 </>
//               )}
//               <button
//                 onClick={() => setSelectedProperty(null)}
//                 style={{ marginTop: '1.5rem', background: '#153a21', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default BuyPage;








import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Home, Building, TreePine, Search, Ruler, Loader2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// ── Supabase (same config as AdminDashboard) ──────────────────────────────────
const SUPABASE_URL      = "https://gdyapjrcmbhojclmrhyf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_BdsZT5s1ds2ntHEFE3POiw_9E0i79Ws";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// ─────────────────────────────────────────────────────────────────────────────

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

  // ── Supabase properties (approved only) ────────────────────────────────────
  const [properties, setProperties] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    setFilterState(prev => ({ ...prev, propertyType: category === 'all' ? '' : category }));
    setAppliedFilters(prev => ({ ...prev, propertyType: category === 'all' ? '' : category }));
  }, [category]);

  // ── Fetch ONLY approved properties from Supabase ───────────────────────────
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('sell')
          .select('*')
          .eq('status', 'approved')          // ← Only approved rows
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProperties(data || []);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // ── Read home-page search filters from localStorage (optional UX) ──────────
  useEffect(() => {
    const searchQuery = localStorage.getItem('home_search_filters');
    if (searchQuery) {
      const parsed = JSON.parse(searchQuery);
      const mappedFilters = {};
      if (parsed.location) mappedFilters.location = parsed.location;
      if (parsed.price === '25-50')    { mappedFilters.minPrice = '2500000';  mappedFilters.maxPrice = '5000000';   }
      if (parsed.price === '50-100')   { mappedFilters.minPrice = '5000000';  mappedFilters.maxPrice = '10000000';  }
      if (parsed.price === '100-plus') { mappedFilters.minPrice = '10000000'; mappedFilters.maxPrice = '500000000'; }
      setFilterState(prev => ({ ...prev, ...mappedFilters }));
      setAppliedFilters(prev => ({ ...prev, ...mappedFilters }));
      localStorage.removeItem('home_search_filters');
    }
  }, []);

  // ── Parse price string (e.g. "75L", "1.5Cr") to number ───────────────────
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const lower = String(priceStr).toLowerCase();
    let num = parseFloat(lower.replace(/[^0-9.]/g, ''));
    if (lower.includes('cr')) return num * 10000000;
    if (lower.includes('l'))  return num * 100000;
    return num;
  };

  // ── Map Supabase "sell" row → display shape ────────────────────────────────
  const normalise = (p) => {
    // Build full images array: cover first, then rest of images array (deduped)
    const cover = p.cover_image || '';
    const extras = Array.isArray(p.images) ? p.images : [];
    const allImgs = cover
      ? [cover, ...extras.filter(i => i && i !== cover)]
      : extras.filter(Boolean);

    return {
      id:          p.id,
      title:       p.title,
      location:    p.location,
      type:        p.property_category || p.property_type || 'residential',
      price:       p.price,
      sqft:        p.builtup_area
                     ? `${p.builtup_area} ${p.builtup_unit || 'sqft'}`
                     : p.land_area
                     ? `${p.land_area} ${p.land_area_unit || 'sqft'}`
                     : p.plot_size
                     ? `${p.plot_size} ${p.plot_unit || 'sqft'}`
                     : '',
      image_url:   allImgs[0] || '',
      images:      allImgs,                 // ← full gallery
      description: p.additional_info || '',
      ownerName:   p.owner_name,
      phone:       p.phone,
      email:       p.email,
      status:      p.status,
      registration: p.registration,
      amenities:   p.amenities,
      address:     p.property_address,
    };
  };

  // ── Filter (client-side, since data is already fetched) ────────────────────
  const filtered = properties
    .map(normalise)
    .filter(p => {
      // property type
      if (appliedFilters.propertyType) {
        const t = p.type?.toLowerCase();
        const f = appliedFilters.propertyType.toLowerCase();
        // "land" matches "plot" and vice-versa
        const match =
          t === f ||
          (f === 'land' && (t === 'plot' || t === 'land')) ||
          (f === 'plot' && (t === 'land' || t === 'plot'));
        if (!match) return false;
      }
      // location
      if (appliedFilters.location && !p.location?.toLowerCase().includes(appliedFilters.location.toLowerCase())) return false;
      // price range
      const pValue = parsePrice(p.price);
      if (appliedFilters.minPrice && pValue < parseInt(appliedFilters.minPrice)) return false;
      if (appliedFilters.maxPrice && pValue > parseInt(appliedFilters.maxPrice)) return false;
      return true;
    });

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentImg, setCurrentImg]             = useState(0);

  // Reset image index when modal opens
  const openModal = useCallback((prop) => {
    setCurrentImg(0);
    setSelectedProperty(prop);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProperty(null);
    setCurrentImg(0);
  }, []);

  const prevImg = useCallback(() => {
    if (!selectedProperty) return;
    setCurrentImg(i => (i - 1 + (selectedProperty.images.length || 1)) % (selectedProperty.images.length || 1));
  }, [selectedProperty]);

  const nextImg = useCallback(() => {
    if (!selectedProperty) return;
    setCurrentImg(i => (i + 1) % (selectedProperty.images.length || 1));
  }, [selectedProperty]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedProperty) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft')  prevImg();
      if (e.key === 'ArrowRight') nextImg();
      if (e.key === 'Escape')     closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedProperty, prevImg, nextImg, closeModal]);

  // Touch swipe support
  const touchStart = React.useRef(null);
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? nextImg() : prevImg();
    touchStart.current = null;
  };

  const getIcon = (type) => {
    const t = type?.toLowerCase();
    if (t === 'residential' || t === 'apartment' || t === 'villa') return <Home size={16} />;
    if (t === 'commercial') return <Building size={16} />;
    return <TreePine size={16} />;
  };

  const heroImages = {
    land:        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop',
    residential: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    commercial:  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    all:         'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
  };

  const heroTitles = {
    land:        'Land & Plots',
    residential: 'Residential Properties',
    commercial:  'Commercial Spaces',
    all:         'All Properties',
  };

  const fallbackImg = heroImages.all;

  return (
    <div className="page-container" style={{ background: 'var(--primary-bg)' }}>

      {/* ── Hero ── */}
      <section className="buy-hero" style={{
        height: '60vh', position: 'relative', display: 'flex', alignItems: 'center',
        marginTop: '-100px', paddingTop: '100px', overflow: 'hidden'
      }}>
        <motion.div
          key={category}
          initial={{ scale: 1.15 }} animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            background: `url(${heroImages[category] || heroImages.all}) center/cover no-repeat`,
            zIndex: 0
          }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1.5rem' }}>
              Discover <span className="highlight">{heroTitles[category] || 'Properties'}.</span>
            </h1>
            <h2 className="serif" style={{ fontSize: 'var(--font-lg)', color: 'rgba(255,255,255,0.8)' }}>
              Find your next investment.
            </h2>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ padding: '3rem 2rem' }}>

        {/* ── Filter Bar ── */}
        <div className="buy-filter-bar">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Min Price</label>
            <select
              value={filterState.minPrice}
              onChange={e => setFilterState({ ...filterState, minPrice: e.target.value })}
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

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Max Price</label>
            <select
              value={filterState.maxPrice}
              onChange={e => setFilterState({ ...filterState, maxPrice: e.target.value })}
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

          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Property Type</label>
            <select
              value={filterState.propertyType}
              onChange={e => setFilterState({ ...filterState, propertyType: e.target.value })}
              style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
            >
              <option value="">-- All Types --</option>
              <option value="land">Land / Plot</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'white', fontSize: '0.85rem' }}>Location</label>
            <input
              type="text"
              placeholder="Enter area or city..."
              value={filterState.location}
              onChange={e => setFilterState({ ...filterState, location: e.target.value })}
              style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333', fontSize: '0.95rem', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={() => setAppliedFilters(filterState)}
              style={{ background: '#F58220', color: 'white', fontWeight: 700, padding: '10px 24px', border: 'none', cursor: 'pointer', height: '39px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Search size={16} /> Search
            </button>
          </div>
        </div>

        {/* ── Active filter badge ── */}
        {appliedFilters.propertyType && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
              color: 'var(--accent-gold, #c9a84c)', padding: '6px 16px',
              borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {appliedFilters.propertyType === 'land' ? 'Land / Plot' :
               appliedFilters.propertyType === 'residential' ? 'Residential' : 'Commercial'}
            </span>
            <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
            </span>
          </div>
        )}

        {/* ── Loading state ── */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh', gap: '12px', color: 'var(--text-light)' }}>
            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
            <span>Loading properties...</span>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          /* ── Properties Grid ── */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            minHeight: '50vh',
          }}>
            {filtered.length > 0 ? filtered.map((prop, idx) => (
              <motion.div
                key={prop.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #eee',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.3s',
                  cursor: 'pointer',
                }}
              >
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <motion.img
                    src={prop.image_url || fallbackImg}
                    alt={prop.title}
                    loading="lazy"
                    onError={(e) => { e.target.src = fallbackImg; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: 'rgba(15,26,17,0.85)',
                    color: '#c9a84c',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'flex', alignItems: 'center', gap: '4px',
                    textTransform: 'capitalize',
                    backdropFilter: 'blur(4px)',
                  }}>
                    {getIcon(prop.type)} {prop.type}
                  </span>
                </div>

                <div style={{ padding: '1rem 1.2rem 1.2rem' }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--primary-dark, #0f1a11)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {prop.title}
                  </h3>

                  <div style={{ display: 'flex', gap: '16px', color: 'var(--text-light, #888)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="#F58220" /> {prop.location}
                    </span>
                    {prop.sqft && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Ruler size={13} color="#F58220" /> {prop.sqft}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold, #c9a84c)' }}>
                      {prop.price}
                    </span>
                    <button
                      onClick={() => openModal(prop)}
                      style={{
                        background: 'var(--primary-dark, #0f1a11)',
                        color: 'white',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        letterSpacing: '0.05em',
                      }}
                    >
                      MORE DETAILS
                    </button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div style={{ padding: '4rem', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-light)' }}>
                No approved properties available in this category yet. Check back soon.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Property Detail Modal with Image Carousel ── */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.93, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.93, y: 24 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '780px', maxWidth: '96%', maxHeight: '92vh', background: '#f8f4e8', borderRadius: '20px', overflowY: 'auto', overflowX: 'hidden', boxShadow: '0 32px 64px rgba(0,0,0,0.45)', position: 'relative' }}
            >

              {/* ── Close button ── */}
              <button
                onClick={closeModal}
                style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 20, background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(6px)' }}
              >
                <X size={18} color="white" />
              </button>

              {/* ── Image Carousel ── */}
              {selectedProperty.images && selectedProperty.images.length > 0 ? (
                <div
                  style={{ position: 'relative', height: '300px', background: '#111', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImg}
                      src={selectedProperty.images[currentImg]}
                      alt={`${selectedProperty.title} – image ${currentImg + 1}`}
                      onError={(e) => { e.target.src = fallbackImg; }}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.28 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </AnimatePresence>

                  {/* Prev / Next arrows — show only when >1 image */}
                  {selectedProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImg}
                        style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)', zIndex: 10 }}
                      >
                        <ChevronLeft size={20} color="white" />
                      </button>
                      <button
                        onClick={nextImg}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)', zIndex: 10 }}
                      >
                        <ChevronRight size={20} color="white" />
                      </button>

                      {/* Dot indicators */}
                      <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '7px', zIndex: 10 }}>
                        {selectedProperty.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentImg(i)}
                            style={{ width: i === currentImg ? '22px' : '8px', height: '8px', borderRadius: '4px', background: i === currentImg ? '#F58220' : 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.25s' }}
                          />
                        ))}
                      </div>

                      {/* Counter badge */}
                      <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', backdropFilter: 'blur(4px)', zIndex: 10 }}>
                        {currentImg + 1} / {selectedProperty.images.length}
                      </div>
                    </>
                  )}

                  {/* Thumbnail strip */}
                  {selectedProperty.images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', display: 'flex', gap: '4px', padding: '0 12px 36px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {selectedProperty.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`thumb-${i}`}
                          onClick={() => setCurrentImg(i)}
                          onError={(e) => { e.target.src = fallbackImg; }}
                          style={{ width: '52px', height: '38px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer', border: i === currentImg ? '2px solid #F58220' : '2px solid transparent', opacity: i === currentImg ? 1 : 0.65, transition: 'all 0.2s', flexShrink: 0 }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={fallbackImg}
                  alt={selectedProperty.title}
                  style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '20px 20px 0 0' }}
                />
              )}

              {/* ── Details ── */}
              <div style={{ padding: '2rem' }}>
                <h2 className="serif" style={{ color: '#153a21', marginBottom: '1rem', fontSize: '1.6rem' }}>{selectedProperty.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Location:</strong> {selectedProperty.location}</p>
                  {selectedProperty.sqft && <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Area:</strong> {selectedProperty.sqft}</p>}
                  <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Price:</strong> {selectedProperty.price}</p>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Type:</strong> {selectedProperty.type}</p>
                  {selectedProperty.address && <p style={{ margin: 0, fontSize: '0.9rem', gridColumn: 'span 2' }}><strong>Address:</strong> {selectedProperty.address}</p>}
                  {selectedProperty.amenities?.length > 0 && (
                    <p style={{ margin: 0, fontSize: '0.9rem', gridColumn: 'span 2' }}>
                      <strong>Amenities:</strong> {selectedProperty.amenities.join(', ')}
                    </p>
                  )}
                </div>

                {selectedProperty.description && (
                  <>
                    <h3 style={{ color: '#153a21', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Property Description</h3>
                    <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.9rem' }}>{selectedProperty.description}</p>
                    <hr style={{ margin: '1.5rem 0' }} />
                  </>
                )}

                {selectedProperty.ownerName && (
                  <>
                    <h3 style={{ color: '#153a21', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Owner Information</h3>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Name:</strong> {selectedProperty.ownerName}</p>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Phone:</strong> {selectedProperty.phone}</p>
                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Email:</strong> {selectedProperty.email}</p>
                  </>
                )}

                <button
                  onClick={closeModal}
                  style={{ marginTop: '1.5rem', background: '#153a21', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BuyPage;
