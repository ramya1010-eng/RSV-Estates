// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   CheckCircle2, ChevronLeft, ChevronRight,
//   MapPin, Home, Building2, Layers, Search, X
// } from 'lucide-react';
// import Footer from '../components/Footer';

// const STATUS_FILTERS = ['All', 'Sold', 'Leased'];
// const ITEMS_PER_PAGE = 12;

// // ── Map propertyType → icon ───────────────────────────────────────────────────
// const typeIcon = (type = '') => {
//   const t = type.toLowerCase();
//   if (t.includes('apartment') || t.includes('flat')) return <Building2 size={14} />;
//   if (t.includes('villa') || t.includes('house'))    return <Home size={14} />;
//   return <Layers size={14} />;
// };

// // ── Helpers ───────────────────────────────────────────────────────────────────
// const getEntries = () => {
//   try {
//     return JSON.parse(localStorage.getItem('sold_entries') || '[]');
//   } catch {
//     return [];
//   }
// };

// // ── Detail Modal ──────────────────────────────────────────────────────────────
// const PropertyDetailModal = ({ item, onClose }) => (
//   <>
//     <motion.div
//       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//       onClick={onClose}
//       style={{
//         position: 'fixed', inset: 0,
//         background: 'rgba(15,26,17,0.75)',
//         zIndex: 2000,
//         backdropFilter: 'blur(4px)',
//       }}
//     />
//     <motion.div
//       initial={{ opacity: 0, y: 40, scale: 0.97 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: 40, scale: 0.97 }}
//       transition={{ duration: 0.3 }}
//       style={{
//         position: 'fixed', inset: 0,
//         zIndex: 2001,
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         padding: '1.5rem',
//         pointerEvents: 'none',
//       }}
//     >
//       <div
//         onClick={e => e.stopPropagation()}
//         style={{
//           background: 'white', borderRadius: '24px',
//           overflow: 'hidden', maxWidth: '560px', width: '100%',
//           pointerEvents: 'all',
//           boxShadow: '0 32px 80px rgba(15,26,17,0.3)',
//         }}
//       >
//         <div style={{ height: '5px', background: 'linear-gradient(90deg,#0f1a11,#c9a84c)' }} />
//         <div style={{ padding: '2rem 2rem 2.5rem' }}>

//           {/* Header */}
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
//             <div>
//               <span style={{
//                 background: '#e8f5e9', color: '#288849',
//                 padding: '4px 12px', borderRadius: '100px',
//                 fontSize: '0.68rem', fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '1px',
//                 display: 'inline-flex', alignItems: 'center', gap: '5px',
//               }}>
//                 <CheckCircle2 size={11} /> {(item.status || 'SOLD').toUpperCase()}
//               </span>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '1rem' }}>
//                 <MapPin size={16} style={{ color: '#c9a84c' }} />
//                 <span style={{
//                   fontSize: '1.6rem', fontFamily: "'Cormorant Garamond', serif",
//                   fontWeight: 700, color: '#0f1a11',
//                 }}>
//                   {item.title}
//                 </span>
//               </div>
//               {item.location && (
//                 <p style={{ margin: '4px 0 0 22px', color: '#6b7280', fontFamily: 'sans-serif', fontSize: '0.88rem' }}>
//                   {item.location}
//                 </p>
//               )}
//             </div>
//             <button
//               onClick={onClose}
//               style={{
//                 background: '#f4f1eb', border: 'none', borderRadius: '50%',
//                 width: '36px', height: '36px', cursor: 'pointer',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
//               }}
//             >
//               <X size={16} color="#0f1a11" />
//             </button>
//           </div>

//           {/* Specs grid */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: '1rem' }}>
//             {[
//               { label: 'Type',        value: item.propertyType },
//               { label: 'Size',        value: item.size },
//               item.price       ? { label: 'Sold At',    value: item.price,       gold: true } : null,
//               item.represented ? { label: 'Represented', value: item.represented } : null,
//               item.customerName? { label: 'Client',     value: item.customerName } : null,
//             ].filter(Boolean).map((spec, i) => (
//               <div key={i} style={{ background: '#f9f7f4', borderRadius: '12px', padding: '1rem' }}>
//                 <div style={{ fontSize: '0.6rem', fontFamily: 'sans-serif', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
//                   {spec.label}
//                 </div>
//                 <div style={{
//                   fontWeight: 700,
//                   color: spec.gold ? '#c9a84c' : '#0f1a11',
//                   fontFamily: "'Cormorant Garamond', serif",
//                   fontSize: '1rem',
//                 }}>
//                   {spec.value}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Footer note */}
//           <div style={{ marginTop: '1.5rem', padding: '1rem 1.2rem', background: '#f0faf4', borderRadius: '12px', border: '1px solid #c6ebd4' }}>
//             <p style={{ margin: 0, fontSize: '0.8rem', fontFamily: 'sans-serif', color: '#288849' }}>
//               ✓ RSV Groups Represented <strong>{item.represented || 'Both Buyer & Sellers'}</strong> — Full legal clarity guaranteed.
//             </p>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   </>
// );

// // ── Main Page ─────────────────────────────────────────────────────────────────
// const SoldLeasedPage = ({ onNavigate }) => {
//   const [data,     setData]     = useState([]);
//   const [loading,  setLoading]  = useState(true);
//   const [locations, setLocations] = useState(['All']);
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [locationFilter, setLocationFilter] = useState('All');
//   const [search,   setSearch]   = useState('');
//   const [page,     setPage]     = useState(1);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     const rows = getEntries();
//     setData(rows);
//     const locs = Array.from(new Set(rows.map(r => r.location).filter(Boolean))).sort();
//     setLocations(['All', ...locs]);
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     const h = e => { if (e.key === 'Escape') setSelected(null); };
//     window.addEventListener('keydown', h);
//     return () => window.removeEventListener('keydown', h);
//   }, []);

//   const handleFilter = (setter, val) => { setter(val); setPage(1); };

//   const filtered = data.filter(d => {
//     const ms = statusFilter === 'All' || d.status === statusFilter;
//     const ml = locationFilter === 'All' || d.location === locationFilter;
//     const mq = !search ||
//       (d.title    || '').toLowerCase().includes(search.toLowerCase()) ||
//       (d.location || '').toLowerCase().includes(search.toLowerCase());
//     return ms && ml && mq;
//   });

//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

//   return (
//     <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: '#f9f7f4', minHeight: '75vh' }}>

//       {/* ── Hero ── */}
//       <section style={{
//         minHeight: '75vh', position: 'relative',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         overflow: 'hidden', paddingTop: '80px', paddingBottom: '3rem', boxSizing: 'border-box',
//       }}>
//         <motion.div
//           initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.6 }}
//           style={{
//             position: 'absolute', inset: 0,
//             background: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat',
//             zIndex: 0,
//           }}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(15,26,17,.75),rgba(15,26,17,.92))', zIndex: 1 }} />
//         <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem', width: '100%', maxWidth: '860px', margin: '0 auto' }}>
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
//             <p style={{ color: '#c9a84c', fontSize: '0.8rem', fontFamily: 'sans-serif', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', marginTop: 55 }}>
//               Reflecting Our Commitment
//             </p>
//             <h1 style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', color: 'white', lineHeight: 1.1, margin: '0 0 1.5rem 0' }}>
//               Sold <span style={{ color: '#c9a84c' }}>& Leased</span>
//             </h1>
//             <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
//               Every transaction tells a trust story. Here's our growing record of sold &amp; leased properties across Chennai.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
//             style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}
//           >
//             {[
//               { num: loading ? '…' : `${data.length}+`, label: 'Units Sold' },
//               { num: '120+',    label: 'Leased Spaces' },
//               { num: '₹250Cr+', label: 'Transaction Value' },
//               { num: '100%',    label: 'Legal Clarity' },
//             ].map((s, i) => (
//               <div key={i} style={{ textAlign: 'center' }}>
//                 <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#c9a84c' }}>{s.num}</div>
//                 <div style={{ fontSize: '0.7rem', fontFamily: 'sans-serif', letterSpacing: '2px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase' }}>{s.label}</div>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </section>


//       {/* ── Sticky Filters ── */}
      
// <section
//   style={{
//     background: '#f5e4ca',
//     padding: '1.5rem 0',
//     position: 'sticky',
//     top: 0,
//     zIndex: 50,
//     boxShadow: '0 8px 30px rgba(0,0,0,.25)',
//   }}
// >
//   <div
//     style={{
//       maxWidth: '1300px',
//       margin: '0 auto',
//       padding: '0 2rem',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       gap: '1rem',
//       flexWrap: 'wrap',
//     }}
//   >

//     {/* Left Side */}
//     <div
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: '1rem',
//         flexWrap: 'wrap',
//       }}
//     >

//       {/* Search */}
//       <div
//         style={{
//           position: 'relative',
//           width: '420px',
//         }}
//       >
//         <Search
//           size={16}
//           style={{
//             position: 'absolute',
//             left: '14px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: '#032e07',
//           }}
//         />

//         <input
//           value={search}
//           onChange={(e) =>
//             handleFilter(setSearch, e.target.value)
//           }
//           placeholder="Search property or location..."
//           style={{
//             width: '100%',
//             padding: '12px 16px 12px 42px',
//             background: 'rgba(255,255,255,.05)',
//             border: '1px solid rgba(201,168,76,.25)',
//             borderRadius: '12px',
//             color: '#0f1a11',
//             fontSize: '0.9rem',
//             fontFamily: 'sans-serif',
//             outline: 'none',
//           }}
//         />
//       </div>

//       {/* Status Buttons */}
//       <div
//         style={{
//           display: 'flex',
//           gap: '0.5rem',
//         }}
//       >
//         {STATUS_FILTERS.map((s) => (
//           <button
//             key={s}
//             onClick={() =>
//               handleFilter(
//                 setStatusFilter,
//                 s
//               )
//             }
//             style={{
//               padding: '10px 20px',
//               borderRadius: '999px',
//               border: 'none',
//               cursor: 'pointer',
//               fontSize: '0.82rem',
//               fontWeight: 600,
//               fontFamily: 'sans-serif',
//               transition: 'all .25s ease',

//               background:
//                 statusFilter === s
//                   ? '#c9a84c'
//                   : 'rgba(255,255,255,.06)',

//               color:
//                 statusFilter === s
//                   ? '#0f1a11'
//                   : 'rgba(6, 27, 3, 0.75)',
//             }}
//           >
//             {s}
//           </button>
//         ))}
//       </div>
//     </div>


//     {/* Right Side */}
//     <div
//       style={{
//         color: '#c9a84c',
//         fontWeight: 700,
//         fontSize: '1rem',
//         fontFamily: 'sans-serif',
//         whiteSpace: 'nowrap',
//       }}
//     >
//       {filtered.length} Properties Found
//     </div>

//   </div>
// </section>

//       {/* ── Cards Grid ── */}
//       <section style={{ maxWidth: '1300px', margin: '0 auto', padding: '5rem 2rem' }}>
//         {loading ? (
//           <div style={{ textAlign: 'center', padding: '8rem', color: '#6b8072', fontFamily: 'sans-serif' }}>
//             <div style={{ width: '40px', height: '40px', border: '3px solid #e5e5e5', borderTop: '3px solid #c9a84c', borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 1.5rem' }} />
//             Loading properties…
//             <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//           </div>
//         ) : paginated.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: '8rem', color: '#6b7280', fontFamily: 'sans-serif' }}>
//             <Layers size={48} style={{ opacity: .2, marginBottom: '1rem' }} />
//             <p>No properties found.</p>
//           </div>
//         ) : (
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`${statusFilter}-${locationFilter}-${search}-${page}`}
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
//               style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}
//             >
//               {paginated.map((item, idx) => (
//                 <motion.div
//                   key={item.id}
//                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.05, duration: 0.4 }}
//                   whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(15,26,17,.14)' }}
//                   onClick={() => setSelected(item)}
//                   style={{
//                     background: 'white', borderRadius: '20px', overflow: 'hidden',
//                     boxShadow: '0 4px 20px rgba(0,0,0,.07)',
//                     border: '1px solid #eeeeee9a', cursor: 'pointer',
//                     transition: 'box-shadow .3s', display: 'flex', flexDirection: 'column',
//                   }}
//                 >
//                   <div style={{ height: '4px', background: 'linear-gradient(90deg,#0f1a11,#c9a84c)', flexShrink: 0 }} />
//                   <div style={{ padding: '1.4rem', flex: 1 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
//                       <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#e8f5e9', color: '#288849', padding: '4px 10px', borderRadius: '100px', fontSize: '0.68rem', fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '.5px' }}>
//                         <CheckCircle2 size={11} /> {(item.status || 'SOLD').toUpperCase()}
//                       </span>
//                       <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#f4f1eb', color: '#6b7280', padding: '4px 8px', borderRadius: '6px', fontSize: '0.68rem', fontFamily: 'sans-serif', fontWeight: 600 }}>
//                         {typeIcon(item.propertyType)} {item.propertyType || 'Property'}
//                       </span>
//                     </div>
//                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '1rem' }}>
//                       <MapPin size={14} style={{ color: '#c9a84c', marginTop: '4px', flexShrink: 0 }} />
//                       <div>
//                         <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f1a11', lineHeight: 1.2 }}>{item.title}</div>
//                         {item.location && (
//                           <div style={{ fontSize: '0.82rem', color: '#6b7280', fontFamily: 'sans-serif', marginTop: '3px' }}>{item.location}</div>
//                         )}
//                       </div>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
//                       <div>
//                         <div style={{ fontSize: '0.6rem', fontFamily: 'sans-serif', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>Size</div>
//                         <div style={{ fontWeight: 700, color: '#0f1a11', fontSize: '0.9rem', fontFamily: 'sans-serif' }}>{item.size || '—'}</div>
//                       </div>
//                       {item.price && (
//                         <div style={{ textAlign: 'right' }}>
//                           <div style={{ fontSize: '0.6rem', fontFamily: 'sans-serif', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>Sold At</div>
//                           <div style={{ fontWeight: 700, color: '#c9a84c', fontSize: '1.1rem', fontFamily: "'Cormorant Garamond',serif" }}>{item.price}</div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div style={{ padding: '0.75rem 1.4rem', background: '#fafafa', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <p style={{ margin: 0, fontSize: '0.72rem', fontFamily: 'sans-serif', color: '#9ca3af' }}>
//                       RSV Groups Represented <strong style={{ color: '#288849' }}>{item.represented || 'Both Buyer & Sellers'}</strong>
//                     </p>
//                     <span style={{ fontSize: '0.72rem', fontFamily: 'sans-serif', color: '#c9a84c', fontWeight: 600 }}>View Details →</span>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         )}

//         {/* ── Pagination ── */}
//         {totalPages > 1 && (
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '4rem', flexWrap: 'wrap' }}>
//             <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
//               style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: page === 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === 1 ? 0.4 : 1 }}>
//               <ChevronLeft size={18} />
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1)
//               .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
//               .reduce((acc, p, i, arr) => { if (i > 0 && p - arr[i - 1] > 1) acc.push('...'); acc.push(p); return acc; }, [])
//               .map((p, i) =>
//                 p === '...'
//                   ? <span key={`e-${i}`} style={{ color: '#9ca3af', fontFamily: 'sans-serif', padding: '0 4px' }}>…</span>
//                   : <button key={p} onClick={() => setPage(p)}
//                       style={{ width: '44px', height: '44px', borderRadius: '50%', border: 'none', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.9rem', transition: 'all .2s', background: page === p ? '#0f1a11' : 'white', color: page === p ? '#c9a84c' : '#6b7280', boxShadow: page === p ? '0 4px 12px rgba(15,26,17,.25)' : 'none' }}>
//                       {p}
//                     </button>
//               )
//             }
//             <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
//               style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: page === totalPages ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === totalPages ? 0.4 : 1 }}>
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         )}
//       </section>

//       {/* ── CTA ── */}
//       <section style={{ background: '#0f1a11', padding: '6rem 2rem', textAlign: 'center' }}>
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
//           <p style={{ color: '#c9a84c', fontSize: '0.75rem', fontFamily: 'sans-serif', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>Ready to Transact?</p>
//           <h2 style={{ color: 'white', fontSize: 'clamp(2rem,4vw,3.5rem)', marginBottom: '1.5rem' }}>
//             Be Our Next <span style={{ color: '#c9a84c' }}>Success Story.</span>
//           </h2>
//           <p style={{ color: 'rgba(255,255,255,.5)', maxWidth: '500px', margin: '0 auto 2.5rem', fontFamily: 'sans-serif', lineHeight: 1.7 }}>
//             Whether you're buying, selling, or leasing — our experts deliver results with full legal clarity.
//           </p>
//           <button
//             onClick={() => onNavigate && onNavigate('book-visit')}
//             style={{ background: '#c9a84c', color: '#0f1a11', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '1px', cursor: 'pointer' }}
//           >
//             BOOK A CONSULTATION
//           </button>
//         </motion.div>
//       </section>

//       {/* ── Detail Modal ── */}
//       <AnimatePresence>
//         {selected && <PropertyDetailModal item={selected} onClose={() => setSelected(null)} />}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default SoldLeasedPage;











import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ChevronLeft, ChevronRight,
  MapPin, Home, Building2, Layers, Search, X
} from 'lucide-react';

const STATUS_FILTERS = ['All', 'Sold', 'Leased'];
const ITEMS_PER_PAGE = 12;

const typeIcon = (type = '') => {
  const t = type.toLowerCase();
  if (t.includes('apartment') || t.includes('flat')) return <Building2 size={13} />;
  if (t.includes('villa')    || t.includes('house')) return <Home size={13} />;
  return <Layers size={13} />;
};

// ─── In-memory store (replace with your real data source) ──────────────────
const getEntries = () => {
  try {
    // localStorage not available in all environments — use your actual data fetch here
    return JSON.parse(localStorage.getItem('sold_entries') || '[]');
  } catch {
    return [];
  }
};

// ─── Detail Modal ───────────────────────────────────────────────────────────
const PropertyDetailModal = ({ item, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal open
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const specs = [
    { label: 'Type', value: item.type || item.propertyType },
{ label: 'Size',       value: item.size },
{ label: 'Location',   value: item.locality },
item.price       ? { label: 'Sold At',     value: item.price,       gold: true } : null,
item.represented ? { label: 'Represented', value: item.represented             } : null,
item.description ? { label: 'Client',      value: item.description             } : null,
  ].filter(Boolean);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15,26,17,0.75)',
          zIndex: 2000,
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 2001,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(1rem, 4vw, 1.5rem)',
          pointerEvents: 'none',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: 'white', borderRadius: '24px',
            overflow: 'hidden', width: '100%', maxWidth: '560px',
            pointerEvents: 'all',
            boxShadow: '0 32px 80px rgba(15,26,17,0.3)',
            maxHeight: '90vh', overflowY: 'auto',
          }}
        >
          <div style={{ height: '5px', background: 'linear-gradient(90deg,#0f1a11,#c9a84c)', flexShrink: 0 }} />
          <div style={{ padding: 'clamp(1.4rem,4vw,2rem) clamp(1.2rem,4vw,2rem) 2.5rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  background: '#e8f5e9', color: '#288849',
                  padding: '4px 12px', borderRadius: '100px',
                  fontSize: '0.66rem', fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '1px',
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                }}>
                  <CheckCircle2 size={11} /> {(item.status || 'SOLD').toUpperCase()}
                </span>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginTop: '1rem' }}>
                  <MapPin size={16} style={{ color: '#c9a84c', marginTop: '4px', flexShrink: 0 }} />
                  <span style={{
                    fontSize: 'clamp(1.25rem,4vw,1.6rem)',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700, color: '#0f1a11', lineHeight: 1.2,
                  }}>
                    {item.title}
                  </span>
                </div>
                {item.location && (
                  <p style={{ margin: '4px 0 0 22px', color: '#6b7280', fontFamily: 'sans-serif', fontSize: '0.86rem' }}>
                    {item.location}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: '#f4f1eb', border: 'none', borderRadius: '50%',
                  width: '36px', height: '36px', minWidth: '36px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={16} color="#0f1a11" />
              </button>
            </div>

            {/* Specs grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '0.9rem', marginBottom: '1.5rem',
            }}>
              {specs.map((spec, i) => (
                <div key={i} style={{ background: '#f9f7f4', borderRadius: '12px', padding: '0.9rem' }}>
                  <div style={{ fontSize: '0.58rem', fontFamily: 'sans-serif', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {spec.label}
                  </div>
                  <div style={{
                    fontWeight: 700,
                    color: spec.gold ? '#c9a84c' : '#0f1a11',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1rem',
                  }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div style={{ padding: '1rem 1.2rem', background: '#f0faf4', borderRadius: '12px', border: '1px solid #c6ebd4' }}>
              <p style={{ margin: 0, fontSize: '0.78rem', fontFamily: 'sans-serif', color: '#288849' }}>
                ✓ RSV Groups Represented <strong>{item.represented || 'Both Buyer & Sellers'}</strong> — Full legal clarity guaranteed.
              </p>
            </div>

          </div>
        </div>
      </motion.div>
    </>
  );
};

// ─── Property Card ──────────────────────────────────────────────────────────
const PropertyCard = ({ item, idx, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.04, duration: 0.4 }}
    whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(15,26,17,.14)' }}
    onClick={onClick}
    style={{
      background: 'white', borderRadius: '20px', overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,.07)',
      border: '1px solid rgba(238,238,238,.9)',
      cursor: 'pointer', display: 'flex', flexDirection: 'column',
      transition: 'box-shadow .3s',
    }}
  >
    <div style={{ height: '4px', background: 'linear-gradient(90deg,#0f1a11,#c9a84c)', flexShrink: 0 }} />
    <div style={{ padding: '1.3rem', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#e8f5e9', color: '#288849', padding: '4px 10px', borderRadius: '100px', fontSize: '0.64rem', fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '.5px' }}>
          <CheckCircle2 size={11} /> {(item.status || 'SOLD').toUpperCase()}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#f4f1eb', color: '#6b7280', padding: '4px 8px', borderRadius: '6px', fontSize: '0.64rem', fontFamily: 'sans-serif', fontWeight: 600 }}>
         {typeIcon(item.type || item.propertyType)} {item.type || item.propertyType || 'Property'}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '1rem' }}>
        <MapPin size={14} style={{ color: '#c9a84c', marginTop: '4px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f1a11', lineHeight: 1.25 }}>{item.area}</div>
          {item.locality && (
            <div style={{ fontSize: '0.78rem', color: '#6b7280', fontFamily: 'sans-serif', marginTop: '3px' }}>{item.locality}</div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.58rem', fontFamily: 'sans-serif', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>Size</div>
          <div style={{ fontWeight: 700, color: '#0f1a11', fontSize: '0.88rem', fontFamily: 'sans-serif' }}>{item.size || '—'}</div>
        </div>
        {item.price && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.58rem', fontFamily: 'sans-serif', color: '#9ca3af', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>Sold At</div>
            <div style={{ fontWeight: 700, color: '#c9a84c', fontSize: '1.05rem', fontFamily: "'Cormorant Garamond',serif" }}>{item.price}</div>
          </div>
        )}
      </div>
    </div>
    <div style={{ padding: '0.7rem 1.3rem', background: '#fafafa', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
      <p style={{ margin: 0, fontSize: '0.68rem', fontFamily: 'sans-serif', color: '#9ca3af', lineHeight: 1.4, flex: 1, minWidth: 0 }}>
        RSV Groups Represented <strong style={{ color: '#288849' }}>{item.represented || 'Both Buyer & Sellers'}</strong>
      </p>
      <span style={{ fontSize: '0.68rem', fontFamily: 'sans-serif', color: '#c9a84c', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>View Details →</span>
    </div>
  </motion.div>
);

// ─── Main Page ──────────────────────────────────────────────────────────────
const SoldLeasedPage = ({ onNavigate }) => {
  const [data,         setData]         = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search,       setSearch]       = useState('');
  const [page,         setPage]         = useState(1);
  const [selected,     setSelected]     = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://celebrated-flexibility-production-1c57.up.railway.app/api/sold-leased')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const handleFilter = useCallback((setter, val) => {
    setter(val);
    setPage(1);
  }, []);

  const filtered = data.filter(d => {
    const ms = statusFilter === 'All' || d.status === statusFilter;
    const mq = !search ||
      (d.area     || '').toLowerCase().includes(search.toLowerCase()) ||
      (d.locality || '').toLowerCase().includes(search.toLowerCase()) ||
      (d.type     || '').toLowerCase().includes(search.toLowerCase());
    return ms && mq;
  });
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Pagination range builder
  const pageRange = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce((acc, p, i, arr) => {
      if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
      acc.push(p);
      return acc;
    }, []);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: '#f9f7f4', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '75vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px', paddingBottom: '3rem',
        paddingLeft: 'clamp(1rem, 4vw, 2rem)',
        paddingRight: 'clamp(1rem, 4vw, 2rem)',
        boxSizing: 'border-box',
      }}>
        <motion.div
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.6 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(15,26,17,.75),rgba(15,26,17,.92))', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: '860px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
            <p style={{ color: '#c9a84c', fontSize: '0.75rem', fontFamily: 'sans-serif', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', marginTop: 55 }}>
              Reflecting Our Commitment
            </p>
            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', color: 'white', lineHeight: 1.1, margin: '0 0 1.5rem 0' }}>
              Sold <span style={{ color: '#c9a84c' }}>& Leased</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 'clamp(0.92rem,2vw,1.1rem)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontFamily: 'sans-serif' }}>
              Every transaction tells a trust story. Here's our growing record of sold & leased properties across Chennai.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
            style={{
              display: 'flex', gap: 'clamp(1.5rem,4vw,3rem)',
              justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap',
            }}
          >
            {[
              { num: loading ? '…' : `${data.length}+`, label: 'Units Sold' },
              { num: '120+',    label: 'Leased Spaces' },
              { num: '₹250Cr+', label: 'Transaction Value' },
              { num: '100%',    label: 'Legal Clarity' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 700, color: '#c9a84c' }}>{s.num}</div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'sans-serif', letterSpacing: '2px', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Filters ── */}
      <section style={{
        background: '#f5e4ca',
        padding: '1.2rem 0',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 8px 30px rgba(0,0,0,.25)',
      }}>
        <div style={{
          maxWidth: '1300px', margin: '0 auto',
          padding: '0 clamp(1rem,3vw,2rem)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap',
        }}>
          {/* Left side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 180px', minWidth: '180px', maxWidth: '400px' }}>
              <Search size={16} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#032e07' }} />
              <input
                value={search}
                onChange={e => handleFilter(setSearch, e.target.value)}
                placeholder="Search property or location..."
                style={{
                  width: '100%', padding: '10px 14px 10px 40px',
                  background: 'rgba(255,255,255,.7)',
                  border: '1px solid rgba(201,168,76,.35)',
                  borderRadius: '10px',
                  color: '#0f1a11', fontSize: '0.88rem',
                  fontFamily: 'sans-serif', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            {/* Status buttons */}
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, flexWrap: 'wrap' }}>
              {STATUS_FILTERS.map(s => (
                <button key={s} onClick={() => handleFilter(setStatusFilter, s)} style={{
                  padding: '8px 16px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600, fontFamily: 'sans-serif', transition: 'all .2s',
                  background: statusFilter === s ? '#c9a84c' : 'rgba(255,255,255,.3)',
                  color: statusFilter === s ? '#0f1a11' : 'rgba(6,27,3,.75)',
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          {/* Count */}
          <div style={{ color: '#c9a84c', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'sans-serif', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {filtered.length} Properties Found
          </div>
        </div>
      </section>

      {/* ── Cards Grid ── */}
      <section style={{ maxWidth: '1300px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,5rem) clamp(1rem,3vw,2rem)' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#6b8072', fontFamily: 'sans-serif' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #e5e5e5', borderTop: '3px solid #c9a84c', borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 1.5rem' }} />
            Loading properties…
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : paginated.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#6b7280', fontFamily: 'sans-serif' }}>
            <Layers size={48} style={{ opacity: .2, marginBottom: '1rem' }} />
            <p>No properties found.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${statusFilter}-${search}-${page}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1rem,2vw,1.5rem)',
              }}
            >
              {paginated.map((item, idx) => (
                <PropertyCard key={item.id} item={item} idx={idx} onClick={() => setSelected(item)} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: page === 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === 1 ? 0.4 : 1 }}
            >
              <ChevronLeft size={17} />
            </button>
            {pageRange.map((p, i) =>
              p === '...'
                ? <span key={`e-${i}`} style={{ color: '#9ca3af', fontFamily: 'sans-serif', padding: '0 2px' }}>…</span>
                : <button key={p} onClick={() => setPage(p)} style={{
                    width: '42px', height: '42px', borderRadius: '50%', border: 'none',
                    cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.88rem',
                    transition: 'all .2s',
                    background: page === p ? '#0f1a11' : 'white',
                    color: page === p ? '#c9a84c' : '#6b7280',
                    boxShadow: page === p ? '0 4px 12px rgba(15,26,17,.25)' : 'none',
                  }}>
                    {p}
                  </button>
            )}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: page === totalPages ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === totalPages ? 0.4 : 1 }}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#0f1a11', padding: 'clamp(4rem,8vw,6rem) clamp(1rem,4vw,2rem)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p style={{ color: '#c9a84c', fontSize: '0.72rem', fontFamily: 'sans-serif', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Ready to Transact?
          </p>
          <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem,4vw,3.5rem)', marginBottom: '1.5rem', fontFamily: "'Cormorant Garamond', serif" }}>
            Be Our Next <span style={{ color: '#c9a84c' }}>Success Story.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.5)', maxWidth: '500px', margin: '0 auto 2.5rem', fontFamily: 'sans-serif', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Whether you're buying, selling, or leasing — our experts deliver results with full legal clarity.
          </p>
          <button
            onClick={() => onNavigate && onNavigate('book-visit')}
            style={{ background: '#c9a84c', color: '#0f1a11', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '1px', cursor: 'pointer' }}
          >
            BOOK A CONSULTATION
          </button>
        </motion.div>
      </section>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && <PropertyDetailModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

    </div>
  );
};

export default SoldLeasedPage;

