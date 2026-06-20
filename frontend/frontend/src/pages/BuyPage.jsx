


// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { MapPin, ArrowRight, Home, Building, TreePine, Search, Ruler } from 'lucide-react';

// // const BuyPage = ({ category = 'all' }) => {
// //   const [filterState, setFilterState] = useState({
// //     minPrice: '',
// //     maxPrice: '',
// //     propertyType: category === 'all' ? '' : category,
// //     location: ''
// //   });

// //   const [appliedFilters, setAppliedFilters] = useState({
// //     minPrice: '',
// //     maxPrice: '',
// //     propertyType: category === 'all' ? '' : category,
// //     location: ''
// //   });

// //   useEffect(() => {
// //     setFilterState(prev => ({ ...prev, propertyType: category === 'all' ? '' : category }));
// //     setAppliedFilters(prev => ({ ...prev, propertyType: category === 'all' ? '' : category }));
// //   }, [category]);

// //   const [selectedProperty, setSelectedProperty] = useState(null);
// //   const [userProps, setUserProps] = useState([]);

// //   useEffect(() => {
// //     const saved = JSON.parse(localStorage.getItem('user_properties') || '[]');
// //     setUserProps(saved);

// //     const searchQuery = localStorage.getItem('home_search_filters');
// //     if (searchQuery) {
// //       const parsed = JSON.parse(searchQuery);
// //       const mappedFilters = {};
// //       if (parsed.location) mappedFilters.location = parsed.location;
// //       if (parsed.price === '25-50')    { mappedFilters.minPrice = '2500000';  mappedFilters.maxPrice = '5000000';   }
// //       if (parsed.price === '50-100')   { mappedFilters.minPrice = '5000000';  mappedFilters.maxPrice = '10000000';  }
// //       if (parsed.price === '100-plus') { mappedFilters.minPrice = '10000000'; mappedFilters.maxPrice = '500000000'; }
// //       setFilterState(prev => ({ ...prev, ...mappedFilters }));
// //       setAppliedFilters(prev => ({ ...prev, ...mappedFilters }));
// //       localStorage.removeItem('home_search_filters');
// //     }
// //   }, []);

// //   // ✅ Hardcoded properties array REMOVED — admin la irunthu mattum varanum

// //   const locationSuggestions = [
// //     "OMR", "ECR", "Guindy", "Tambaram", "Chengalpattu",
// //     "Adyar", "Anna Nagar", "Velachery", "Porur", "Ambattur",
// //     "Perambur", "Sholinganallur", "Medavakkam", "Pallavaram",
// //     "Chromepet", "Nungambakkam", "T. Nagar", "Vadapalani",
// //     "Kodambakkam", "Mylapore", "Teynampet", "Taramani",
// //     "Poonamallee", "Avadi", "Thiruvallur", "Sriperumbudur",
// //     "Kanchipuram", "Kundrathur", "Vandalur", "Guduvanchery"
// //   ];

// //   const parsePrice = (priceStr) => {
// //     if (!priceStr) return 0;
// //     const lower = priceStr.toLowerCase();
// //     let num = parseFloat(lower.replace(/[^0-9.]/g, ''));
// //     if (lower.includes('cr')) return num * 10000000;
// //     if (lower.includes('l'))  return num * 100000;
// //     return num;
// //   };

// //   // ✅ Only userProps (from admin/backend) — no hardcoded array
// //   const allProperties = [...userProps];

// //   const filtered = allProperties.filter(p => {
// //     if (p.status && p.status !== 'approved') return false;
// //     if (appliedFilters.propertyType && p.type !== appliedFilters.propertyType) return false;
// //     if (appliedFilters.location && !p.location.toLowerCase().includes(appliedFilters.location.toLowerCase())) return false;
// //     const pValue = parsePrice(p.price);
// //     if (appliedFilters.minPrice && pValue < parseInt(appliedFilters.minPrice)) return false;
// //     if (appliedFilters.maxPrice && pValue > parseInt(appliedFilters.maxPrice)) return false;
// //     return true;
// //   });

// //   const getIcon = (type) => {
// //     if (type === 'residential') return <Home size={18} />;
// //     if (type === 'commercial')  return <Building size={18} />;
// //     return <TreePine size={18} />;
// //   };

// //   const heroImages = {
// //     land:        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop',
// //     residential: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
// //     commercial:  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
// //     all:         'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
// //   };

// //   const heroTitles = {
// //     land:        'Land & Plots',
// //     residential: 'Residential Properties',
// //     commercial:  'Commercial Spaces',
// //     all:         'All Properties',
// //   };

// //   return (
// //     <div className="page-container" style={{ background: 'var(--primary-bg)' }}>

// //       {/* ── Hero ── */}
// //       <section className="buy-hero" style={{
// //         height: '60vh', position: 'relative', display: 'flex', alignItems: 'center',
// //         marginTop: '-100px', paddingTop: '100px', overflow: 'hidden'
// //       }}>
// //         <motion.div
// //           key={category}
// //           initial={{ scale: 1.15 }} animate={{ scale: 1 }}
// //           transition={{ duration: 1.5, ease: "easeOut" }}
// //           style={{
// //             position: 'absolute', inset: 0,
// //             background: `url(${heroImages[category] || heroImages.all}) center/cover no-repeat`,
// //             zIndex: 0
// //           }}
// //         />
// //         <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))', zIndex: 1 }} />
// //         <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
// //           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
// //             <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1.5rem' }}>
// //               Discover <span className="highlight">{heroTitles[category] || 'Properties'}.</span>
// //             </h1>
// //             <h2 className="serif" style={{ fontSize: 'var(--font-lg)', color: 'rgba(255,255,255,0.8)' }}>
// //               Find your next investment.
// //             </h2>
// //           </motion.div>
// //         </div>
// //       </section>

// //       <div className="container" style={{ padding: '4rem 2rem' }}>

// //         {/* ── Filter Bar ── */}
// //         <div className="buy-filter-bar">
// //           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
// //             <label style={{ color: 'white', fontSize: '0.85rem' }}>Min Price</label>
// //             <select
// //               value={filterState.minPrice}
// //               onChange={e => setFilterState({ ...filterState, minPrice: e.target.value })}
// //               style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
// //             >
// //               <option value="">--Select--</option>
// //               <option value="5000000">50 Lacs</option>
// //               <option value="10000000">1 Crore</option>
// //               <option value="20000000">2 Crores</option>
// //               <option value="50000000">5 Crores</option>
// //               <option value="100000000">10 Crores</option>
// //             </select>
// //           </div>

// //           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
// //             <label style={{ color: 'white', fontSize: '0.85rem' }}>Max Price</label>
// //             <select
// //               value={filterState.maxPrice}
// //               onChange={e => setFilterState({ ...filterState, maxPrice: e.target.value })}
// //               style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
// //             >
// //               <option value="">--Select--</option>
// //               <option value="5000000">50 Lacs</option>
// //               <option value="10000000">1 Crore</option>
// //               <option value="50000000">5 Crores</option>
// //               <option value="100000000">10 Crores</option>
// //               <option value="500000000">50 Crores+</option>
// //             </select>
// //           </div>

// //           <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
// //             <label style={{ color: 'white', fontSize: '0.85rem' }}>Property Type</label>
// //             <select
// //               value={filterState.propertyType}
// //               onChange={e => setFilterState({ ...filterState, propertyType: e.target.value })}
// //               style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333' }}
// //             >
// //               <option value="">-- All Types --</option>
// //               <option value="land">Land / Plot</option>
// //               <option value="residential">Residential</option>
// //               <option value="commercial">Commercial</option>
// //             </select>
// //           </div>

// //           <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
// //             <label style={{ color: 'white', fontSize: '0.85rem' }}>Location</label>
// //             <input
// //               type="text"
// //               list="location-suggestions"
// //               placeholder="Type or select area..."
// //               value={filterState.location}
// //               onChange={e => setFilterState({ ...filterState, location: e.target.value })}
// //               style={{
// //                 padding: '10px', width: '100%', border: 'none',
// //                 background: 'white', outline: 'none', color: '#333',
// //                 fontSize: '0.95rem', boxSizing: 'border-box',
// //               }}
// //             />
// //             <datalist id="location-suggestions">
// //               {locationSuggestions.map(loc => <option key={loc} value={loc} />)}
// //             </datalist>
// //           </div>

// //           <div style={{ display: 'flex', alignItems: 'flex-end' }}>
// //             <button
// //               onClick={() => setAppliedFilters(filterState)}
// //               style={{ background: '#F58220', color: 'white', fontWeight: 700, padding: '10px 24px', border: 'none', cursor: 'pointer', height: '39px', display: 'flex', alignItems: 'center', gap: '6px' }}
// //             >
// //               <Search size={16} /> Search
// //             </button>
// //           </div>
// //         </div>

// //         {/* ── Active filter badge ── */}
// //         {appliedFilters.propertyType && (
// //           <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
// //             <span style={{
// //               background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
// //               color: 'var(--accent-gold, #c9a84c)', padding: '6px 16px',
// //               borderRadius: '30px', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em',
// //               textTransform: 'uppercase',
// //             }}>
// //               {appliedFilters.propertyType === 'land' ? 'Land / Plot' :
// //                appliedFilters.propertyType === 'residential' ? 'Residential' : 'Commercial'}
// //             </span>
// //             <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
// //               {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
// //             </span>
// //           </div>
// //         )}

// //         {/* ── Properties Grid ── */}
// //         <div className="projects-grid" style={{ minHeight: '50vh' }}>
// //           {filtered.length > 0 ? filtered.map((prop, idx) => (
// //             <motion.div
// //               key={idx}
// //               className="project-card"
// //               initial={{ opacity: 0, y: 30 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: idx * 0.1 }}
// //               whileHover="hover"
// //               style={{ overflow: 'hidden', borderRadius: '12px' }}
// //             >
// //               <div className="card-image" style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
// //                 <motion.img
// //                   src={prop.img} alt={prop.title} loading="lazy"
// //                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// //                   variants={{ hover: { scale: 1.15 } }}
// //                   transition={{ duration: 0.8, ease: "easeOut" }}
// //                 />
// //                 <span className="tag" style={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 12 }}>
// //                   {getIcon(prop.type)} {prop.type}
// //                 </span>
// //               </div>
// //               <div className="card-content">
// //                 <h3 className="project-title serif" style={{ fontSize: '1.4rem' }}>{prop.title}</h3>
// //                 <div className="project-location" style={{ marginBottom: '1.5rem', display: 'flex', gap: '20px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
// //                   <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
// //                     <MapPin size={16} color="#F58220" /> {prop.location}
// //                   </span>
// //                   {prop.sqft && (
// //                     <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
// //                       <Ruler size={16} color="#F58220" /> {prop.sqft}
// //                     </span>
// //                   )}
// //                 </div>
// //                 <div className="price-info">
// //                   <span className="price">{prop.price}</span>
// //                   <button
// //                     className="view-all-btn"
// //                     style={{ fontSize: '0.75rem', fontWeight: 700 }}
// //                     onClick={() => setSelectedProperty(prop)}
// //                   >
// //                     MORE DETAILS
// //                   </button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )) : (
// //             <div style={{ padding: '4rem', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-light)' }}>
// //               No properties available in this category yet. Check back soon.
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* ── Property Detail Modal ── */}
// //       {selectedProperty && (
// //         <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
// //           <div style={{ width: '850px', maxWidth: '95%', maxHeight: '90vh', background: '#f8f4e8', borderRadius: '20px', overflowY: 'auto', overflowX: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
// //             <img src={selectedProperty.img} alt={selectedProperty.title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
// //             <div style={{ padding: '2rem', position: 'relative' }}>
// //               <h2 className="serif" style={{ color: '#153a21', marginBottom: '1rem' }}>{selectedProperty.title}</h2>
// //               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '2rem' }}>
// //                 <p><strong>Location:</strong> {selectedProperty.location}</p>
// //                 <p><strong>Area:</strong> {selectedProperty.sqft}</p>
// //                 <p><strong>Price:</strong> {selectedProperty.price}</p>
// //                 <p><strong>Type:</strong> {selectedProperty.type}</p>
// //                 <p><strong>Status:</strong> {selectedProperty.status}</p>
// //                 <p><strong>Registration:</strong> {selectedProperty.registration}</p>
// //               </div>
// //               <h3 style={{ color: '#153a21', marginBottom: '1rem' }}>Property Description</h3>
// //               <p style={{ color: '#555', lineHeight: 1.8 }}>{selectedProperty.description}</p>
// //               <hr style={{ margin: '2rem 0' }} />
// //               <h3 style={{ color: '#153a21' }}>Owner Information</h3>
// //               <p><strong>Name:</strong> {selectedProperty.ownerName}</p>
// //               <p><strong>Phone:</strong> {selectedProperty.phone}</p>
// //               <p><strong>Email:</strong> {selectedProperty.email}</p>
// //               <button
// //                 onClick={() => setSelectedProperty(null)}
// //                 style={{ marginTop: '2rem', background: '#153a21', color: '#fff', border: 'none', padding: '14px 30px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700 }}
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //     </div>
// //   );
// // };

// // export default BuyPage;





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

//   const locationSuggestions = [
//     "OMR", "ECR", "Guindy", "Tambaram", "Chengalpattu",
//     "Adyar", "Anna Nagar", "Velachery", "Porur", "Ambattur",
//     "Perambur", "Sholinganallur", "Medavakkam", "Pallavaram",
//     "Chromepet", "Nungambakkam", "T. Nagar", "Vadapalani",
//     "Kodambakkam", "Mylapore", "Teynampet", "Taramani",
//     "Poonamallee", "Avadi", "Thiruvallur", "Sriperumbudur",
//     "Kanchipuram", "Kundrathur", "Vandalur", "Guduvanchery"
//   ];

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
//               list="location-suggestions"
//               placeholder="Type or select area..."
//               value={filterState.location}
//               onChange={e => setFilterState({ ...filterState, location: e.target.value })}
//               style={{ padding: '10px', width: '100%', border: 'none', background: 'white', outline: 'none', color: '#333', fontSize: '0.95rem', boxSizing: 'border-box' }}
//             />
//             <datalist id="location-suggestions">
//               {locationSuggestions.map(loc => <option key={loc} value={loc} />)}
//             </datalist>
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

//         {/* ── Properties Grid ── ✅ Fixed size */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',  // ✅ 3 columns fixed
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
//               {/* ✅ Image — fixed 200px height */}
//               <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
//                 <motion.img
//                   src={prop.img || prop.image_url || heroImages.all}
//                   alt={prop.title}
//                   loading="lazy"
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                   whileHover={{ scale: 1.08 }}
//                   transition={{ duration: 0.6, ease: 'easeOut' }}
//                 />
//                 {/* Type badge */}
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

//               {/* ✅ Card content — compact padding */}
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




import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Home, Building, TreePine, Search, Ruler } from 'lucide-react';

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
    // Fetch approved properties from DB
    fetch('https://celebrated-flexibility-production-1c57.up.railway.app/api/buy')
      .then(res => res.json())
      .then(data => {
        console.log('Buy properties from DB:', data);
        setUserProps(data);
      })
      .catch(err => console.error('Buy fetch error:', err));

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

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const lower = priceStr.toLowerCase();
    let num = parseFloat(lower.replace(/[^0-9.]/g, ''));
    if (lower.includes('cr')) return num * 10000000;
    if (lower.includes('l'))  return num * 100000;
    return num;
  };

  const allProperties = userProps.map(p => ({
  ...p,
  title: p.title || p.property_name,
  type: p.type || p.category || p.property_type,
  price: p.price,
  location: p.location,
  img: p.img || (p.image_urls ? `https://celebrated-flexibility-production-1c57.up.railway.app${p.image_urls.split(',')[0].trim()}` : null),
}));

const filtered = allProperties.filter(p => {
  if (appliedFilters.propertyType && p.type !== appliedFilters.propertyType) return false;
  if (appliedFilters.location && p.location && !p.location.toLowerCase().includes(appliedFilters.location.toLowerCase())) return false;
  const pValue = parsePrice(p.price);
  if (appliedFilters.minPrice && pValue < parseInt(appliedFilters.minPrice)) return false;
  if (appliedFilters.maxPrice && pValue > parseInt(appliedFilters.maxPrice)) return false;
  return true;
});

  const getIcon = (type) => {
    if (type === 'residential') return <Home size={16} />;
    if (type === 'commercial')  return <Building size={16} />;
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

        {/* ── Properties Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          minHeight: '50vh',
        }}>
          {filtered.length > 0 ? filtered.map((prop, idx) => (
            <motion.div
              key={idx}
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
                  src={prop.img || prop.image_url || heroImages.all}
                  alt={prop.title}
                  loading="lazy"
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
                  {(prop.sqft || prop.area) && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Ruler size={13} color="#F58220" /> {prop.sqft || prop.area}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold, #c9a84c)' }}>
                    {prop.price}
                  </span>
                  <button
                    onClick={() => setSelectedProperty(prop)}
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
              No properties available in this category yet. Check back soon.
            </div>
          )}
        </div>
      </div>

      {/* ── Property Detail Modal ── */}
      {selectedProperty && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{ width: '750px', maxWidth: '95%', maxHeight: '88vh', background: '#f8f4e8', borderRadius: '20px', overflowY: 'auto', overflowX: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
            {selectedProperty.image_urls ? (
  <div style={{ display: 'flex', overflowX: 'auto', gap: '0', height: '280px' }}>
    {selectedProperty.image_urls.split(',').map((url, idx) => (
      <img
        key={idx}
        src={`https://celebrated-flexibility-production-1c57.up.railway.app${url.trim()}`}
        alt={`${selectedProperty.title} ${idx + 1}`}
        style={{ 
          minWidth: selectedProperty.image_urls.split(',').length === 1 ? '100%' : '280px',
          height: '280px', 
          objectFit: 'cover',
          flex: selectedProperty.image_urls.split(',').length === 1 ? '1' : 'none'
        }}
      />
    ))}
  </div>
) : (
  <img
    src={selectedProperty.img || heroImages.all}
    alt={selectedProperty.title}
    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
  />
)}
            <div style={{ padding: '2rem' }}>
              <h2 className="serif" style={{ color: '#153a21', marginBottom: '1rem', fontSize: '1.6rem' }}>{selectedProperty.title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Location:</strong> {selectedProperty.location}</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Area:</strong> {selectedProperty.sqft || selectedProperty.area}</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Price:</strong> {selectedProperty.price}</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Type:</strong> {selectedProperty.type}</p>
                {selectedProperty.status       && <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Status:</strong> {selectedProperty.status}</p>}
                {selectedProperty.registration && <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Registration:</strong> {selectedProperty.registration}</p>}
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
                  <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Name:</strong>  {selectedProperty.ownerName  || selectedProperty.owner_name}</p>
                  <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Phone:</strong> {selectedProperty.phone}</p>
                  <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Email:</strong> {selectedProperty.email}</p>
                </>
              )}
              <button
                onClick={() => setSelectedProperty(null)}
                style={{ marginTop: '1.5rem', background: '#153a21', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}
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

