





// // AdminDashboard.jsx — Full Version with customer_reviews Testimonials

// import React, { useState, useEffect } from 'react';
// import '../Admin.css';
// import {
//   LayoutDashboard, Map, Users, Layers, Settings,
//   Plus, Trash2, Edit3, ArrowUpRight, Search,
//   Bell, LogOut, CheckCircle, BadgeDollarSign, Phone, X,
//   Eye, ThumbsUp, ThumbsDown, Star
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import logo from '../images/LOGO.png';

// const API = 'http://localhost:5000';

// const PROPERTY_TYPES    = ["Land", "Apartment", "Villa", "Plot", "Commercial", "Independent House"];
// const REPRESENTED_OPTIONS = ["Both Buyer & Sellers", "Buyer Only", "Seller Only", "Developer"];

// // ── Star display (read-only) ──────────────────────────────────────────────────
// const StarDisplay = ({ value = 5 }) => (
//   <div style={{ display: 'flex', gap: '3px' }}>
//     {[1, 2, 3, 4, 5].map(s => (
//       <Star
//         key={s}
//         size={14}
//         fill={value >= s ? '#F58220' : 'none'}
//         color={value >= s ? '#F58220' : '#555'}
//       />
//     ))}
//   </div>
// );

// // ── Star selector (editable) ──────────────────────────────────────────────────
// const StarRating = ({ value, onChange }) => {
//   const [hovered, setHovered] = useState(0);
//   return (
//     <div style={{ display: 'flex', gap: '4px' }}>
//       {[1, 2, 3, 4, 5].map(s => (
//         <Star
//           key={s}
//           size={22}
//           fill={(hovered || value) >= s ? '#F58220' : 'none'}
//           color={(hovered || value) >= s ? '#F58220' : '#555'}
//           style={{ cursor: 'pointer', transition: 'all 0.15s' }}
//           onMouseEnter={() => setHovered(s)}
//           onMouseLeave={() => setHovered(0)}
//           onClick={() => onChange(s)}
//         />
//       ))}
//     </div>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────

// const AdminDashboard = ({ onLogout }) => {
//   const [activeTab, setActiveTab]         = useState('Sold');
//   const [showSoldModal, setShowSoldModal] = useState(false);
//   const [searchTerm, setSearchTerm]       = useState('');
//   const [properties, setProperties]       = useState([]);
//   const [soldSuccess, setSoldSuccess]     = useState(false);
//   const [selectedProperty, setSelectedProperty]   = useState(null);
//   const [editingProperty, setEditingProperty]     = useState(null);

//   const disabledTabs = ['Dashboard', 'Plots', 'Leads', 'Projects'];

//   // ── SOLD ─────────────────────────────────────────────────────────────────
//   const [soldEntries, setSoldEntries] = useState(
//     JSON.parse(localStorage.getItem('sold_entries') || '[]')
//   );
//   const [soldForm, setSoldForm] = useState({
//     title: '', location: '', price: '', size: '',
//     propertyType: 'Land', represented: 'Both Buyer & Sellers',
//     customerName: '', status: 'Sold',
//   });
//   const [soldFormError, setSoldFormError] = useState('');

//   // ── TESTIMONIALS (customer_reviews) ──────────────────────────────────────
//   const [testimonials, setTestimonials]                     = useState([]);
//   const [showTestimonialModal, setShowTestimonialModal]     = useState(false);
//   const [editingTestimonial, setEditingTestimonial]         = useState(null);
//   const [viewingTestimonial, setViewingTestimonial]         = useState(null);
//   const [testimonialStatusFilter, setTestimonialStatusFilter] = useState('all');
//   const [testimonialForm, setTestimonialForm] = useState({
//     name: '', role: '', review: '', rating: 5,
//   });

//   // ── SITE INQUIRIES ────────────────────────────────────────────────────────
//   const [siteInquiries, setSiteInquiries] = useState([]);

//   // ── SETTINGS ─────────────────────────────────────────────────────────────
//   const [settings, setSettings] = useState({
//     companyName: 'RSV Groups',
//     contactEmail: 'info@rsvgroups.com',
//     contactPhone: '+91 90000 00000',
//     address: 'Anna Salai, Chennai',
//   });

//   // ── DUMMY DATA ────────────────────────────────────────────────────────────
//   const [plots] = useState([
//     { id: 1, name: 'Premium Plot A1',  location: 'OMR, Chennai', price: '45L', size: '1200 Sq.ft', status: 'Available', project: 'The Royal Estate' },
//     { id: 2, name: 'Emerald Plot B4',  location: 'ECR, Chennai', price: '85L', size: '2400 Sq.ft', status: 'Booked',    project: 'Emerald Valley'  },
//     { id: 3, name: 'Heritage Plot C9', location: 'GST Road',     price: '32L', size: '1000 Sq.ft', status: 'Available', project: 'Heritage West'   },
//   ]);
//   const [leads] = useState([
//     { id: 1, name: 'Anish Kumar',  phone: '+91 98765 43210', email: 'anish@email.com',  interest: 'OMR Plots',    status: 'New',       date: '2024-03-20' },
//     { id: 2, name: 'Priya Sharma', phone: '+91 87654 32109', email: 'priya@email.com',  interest: 'ECR Luxury',   status: 'Contacted', date: '2024-03-19' },
//     { id: 3, name: 'Vikram Singh', phone: '+91 76543 21098', email: 'vikram@email.com', interest: 'Heritage West',status: 'Sold',      date: '2024-03-18' },
//   ]);
//   const [projects] = useState([
//     { id: 1, name: 'The Royal Estate', location: 'OMR, Chennai', units: '45/60', status: 'Active'   },
//     { id: 2, name: 'Emerald Valley',   location: 'ECR, Chennai', units: '12/24', status: 'Limited'  },
//     { id: 3, name: 'Heritage West',    location: 'GST Road',     units: '10/10', status: 'Sold Out' },
//   ]);

//   // ── EFFECTS ───────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const props = JSON.parse(localStorage.getItem('user_properties') || '[]');
//     setProperties(props);
//   }, [activeTab]);

//   useEffect(() => { loadTestimonials(); }, []);
//   useEffect(() => { loadSiteInquiries(); }, []);

//   // ── LOADERS ───────────────────────────────────────────────────────────────
//   const loadTestimonials = async () => {
//     try {
//       // Fetch all reviews (no status filter) for admin view
//       const res = await axios.get(`${API}/api/customer-reviews`);
//       setTestimonials(res.data);
//     } catch (err) { console.error(err); }
//   };

//   const loadSiteInquiries = async () => {
//     try {
//       const res = await axios.get(`${API}/api/site-inquiries`);
//       setSiteInquiries(res.data);
//     } catch (err) { console.error(err); }
//   };

//   // ── APPROVALS (property) ─────────────────────────────────────────────────
//   const handleApprove = (id) => {
//     const props   = JSON.parse(localStorage.getItem('user_properties') || '[]');
//     const updated = props.map(p => p.id === id ? { ...p, status: 'approved' } : p);
//     localStorage.setItem('user_properties', JSON.stringify(updated));
//     setProperties(updated);
//   };
//   const handleReject = (id) => {
//     const props   = JSON.parse(localStorage.getItem('user_properties') || '[]');
//     const updated = props.map(p => p.id === id ? { ...p, status: 'rejected' } : p);
//     localStorage.setItem('user_properties', JSON.stringify(updated));
//     setProperties(updated);
//   };
//   const handleView = (id) => {
//     const props    = JSON.parse(localStorage.getItem('user_properties') || '[]');
//     const property = props.find(p => p.id === id);
//     setSelectedProperty(property);
//   };
//   const handleEdit        = (property) => { setEditingProperty(property); };
//   const handleSaveEdit    = () => {
//     const props   = JSON.parse(localStorage.getItem('user_properties') || '[]');
//     const updated = props.map(p => p.id === editingProperty.id ? editingProperty : p);
//     localStorage.setItem('user_properties', JSON.stringify(updated));
//     setProperties(updated);
//     setEditingProperty(null);
//   };
//   const handleDelete = (id) => {
//     if (!window.confirm('Delete this property permanently?')) return;
//     const props   = JSON.parse(localStorage.getItem('user_properties') || '[]');
//     const updated = props.filter(p => p.id !== id);
//     localStorage.setItem('user_properties', JSON.stringify(updated));
//     setProperties(updated);
//   };

//   // ── SOLD ─────────────────────────────────────────────────────────────────
//   const handleSoldChange = (e) => setSoldForm({ ...soldForm, [e.target.name]: e.target.value });
//   const handleSoldSubmit = (e) => {
//     e.preventDefault();
//     if (!soldForm.title || !soldForm.location) { setSoldFormError('Property Title and Location are required.'); return; }
//     setSoldFormError('');
//     const updated = [{ ...soldForm, id: Date.now() }, ...soldEntries];
//     setSoldEntries(updated);
//     localStorage.setItem('sold_entries', JSON.stringify(updated));
//     setSoldForm({ title: '', location: '', price: '', size: '', propertyType: 'Land', represented: 'Both Buyer & Sellers', customerName: '', status: 'Sold' });
//     setShowSoldModal(false);
//     setSoldSuccess(true);
//     setTimeout(() => setSoldSuccess(false), 3000);
//   };
//   const handleSoldDelete = (id) => {
//     const updated = soldEntries.filter(e => e.id !== id);
//     setSoldEntries(updated);
//     localStorage.setItem('sold_entries', JSON.stringify(updated));
//   };

//   // ── TESTIMONIALS (customer_reviews) ──────────────────────────────────────
//   const handleTestimonialApprove = async (id) => {
//     try {
//       await axios.patch(`${API}/api/customer-reviews/${id}/status`, { status: 'approved' });
//       await loadTestimonials();
//     } catch (err) { console.error(err); alert('Failed to approve'); }
//   };

//   const handleTestimonialReject = async (id) => {
//     try {
//       await axios.patch(`${API}/api/customer-reviews/${id}/status`, { status: 'rejected' });
//       await loadTestimonials();
//     } catch (err) { console.error(err); alert('Failed to reject'); }
//   };

//   const handleDeleteTestimonial = async (id) => {
//     if (!window.confirm('Delete this review permanently?')) return;
//     try {
//       await axios.delete(`${API}/api/customer-reviews/${id}`);
//       await loadTestimonials();
//     } catch (err) { console.error(err); }
//   };

//   const handleTestimonialSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingTestimonial) {
//         await axios.put(`${API}/api/customer-reviews/${editingTestimonial.id}`, {
//           name:   testimonialForm.name,
//           role:   testimonialForm.role,
//           review: testimonialForm.review,
//           rating: testimonialForm.rating,
//         });
//       } else {
//         await axios.post(`${API}/api/customer-reviews`, {
//           name:   testimonialForm.name,
//           role:   testimonialForm.role,
//           review: testimonialForm.review,
//           rating: testimonialForm.rating,
//           status: 'approved',  // admin-added → directly approved
//         });
//       }
//       await loadTestimonials();
//       closeTestimonialModal();
//     } catch (err) { console.error(err); alert('Failed to save review'); }
//   };

//   const openAddTestimonial = () => {
//     setEditingTestimonial(null);
//     setTestimonialForm({ name: '', role: '', review: '', rating: 5 });
//     setShowTestimonialModal(true);
//   };
//   const openEditTestimonial = (item) => {
//     setEditingTestimonial(item);
//     setTestimonialForm({ name: item.name, role: item.role || '', review: item.review, rating: item.rating || 5 });
//     setShowTestimonialModal(true);
//   };
//   const closeTestimonialModal = () => {
//     setShowTestimonialModal(false);
//     setEditingTestimonial(null);
//     setTestimonialForm({ name: '', role: '', review: '', rating: 5 });
//   };

//   // ── SITE INQUIRIES ────────────────────────────────────────────────────────
//   const handleDeleteInquiry = async (id) => {
//     try {
//       await axios.delete(`${API}/api/site-inquiries/${id}`);
//       loadSiteInquiries();
//     } catch (err) { console.error(err); }
//   };

//   // ── NAV ───────────────────────────────────────────────────────────────────
//   const handleTabClick = (tabId) => {
//     if (!disabledTabs.includes(tabId)) setActiveTab(tabId);
//   };

//   // ── STATUS BADGE COLOR ────────────────────────────────────────────────────
//   const statusColor = (s) => {
//     if (s === 'approved') return { background: 'rgba(46,213,115,0.15)', color: '#2ed573', border: '1px solid rgba(46,213,115,0.3)' };
//     if (s === 'rejected') return { background: 'rgba(255,71,87,0.12)',  color: '#ff4757', border: '1px solid rgba(255,71,87,0.25)' };
//     return { background: 'rgba(255,165,0,0.12)', color: '#ffa500', border: '1px solid rgba(255,165,0,0.3)' };
//   };

//   // ── FILTERED TESTIMONIALS ─────────────────────────────────────────────────
//   const filteredTestimonials = testimonialStatusFilter === 'all'
//     ? testimonials
//     : testimonials.filter(t => t.status === testimonialStatusFilter);

//   // ── TAB CONTENT ───────────────────────────────────────────────────────────
//   const renderTabContent = () => {
//     switch (activeTab) {

//       // ── SOLD ──────────────────────────────────────────────────────────────
//       case 'Sold':
//         return (
//           <div className="admin-table-container">
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
//               <h3 className="serif" style={{ fontSize: '1.5rem' }}>Sold / Leased Inventory</h3>
//               <button className="book-btn" style={{ gap: '10px', fontSize: '0.8rem', padding: '0.8rem 1.5rem', cursor: 'pointer' }} onClick={() => setShowSoldModal(true)}>
//                 <Plus size={18} /> ADD SOLD DETAIL
//               </button>
//             </div>
//             <AnimatePresence>
//               {soldSuccess && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
//                   style={{ background: 'rgba(46,213,115,0.12)', border: '1px solid rgba(46,213,115,0.3)', color: '#2ed573', borderRadius: '10px', padding: '12px 20px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}
//                 >
//                   ✅ Sold entry added successfully!
//                 </motion.div>
//               )}
//             </AnimatePresence>
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>PROPERTY DETAIL</th><th>LOCATION</th><th>VALUE</th>
//                   <th>SIZE</th><th>REPRESENTED BY</th><th>STATUS</th><th>ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {soldEntries.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
//                       <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏡</div>
//                       <div style={{ marginBottom: '0.4rem' }}>No sold entries yet.</div>
//                       <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Click "+ ADD SOLD DETAIL" to record your first deal.</div>
//                     </td>
//                   </tr>
//                 ) : (
//                   soldEntries.map((entry) => (
//                     <motion.tr key={entry.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
//                       <td>
//                         <div style={{ fontWeight: 600 }}>{entry.title}</div>
//                         <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', marginTop: 3 }}>{entry.propertyType}</div>
//                       </td>
//                       <td>{entry.location}</td>
//                       <td style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{entry.price || '—'}</td>
//                       <td>{entry.size || '—'}</td>
//                       <td style={{ fontSize: '0.82rem' }}>
//                         RSV Groups Represented <strong style={{ color: 'var(--accent-gold)' }}>{entry.represented}</strong>
//                       </td>
//                       <td>
//                         <span className={`status-badge ${entry.status === 'Sold' ? 'status-booked' : 'status-available'}`}>
//                           {entry.status}
//                         </span>
//                       </td>
//                       <td>
//                         <Trash2 size={18} style={{ cursor: 'pointer', color: '#ff4757', opacity: 0.7 }} onClick={() => handleSoldDelete(entry.id)} />
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         );

//       // ── APPROVALS ─────────────────────────────────────────────────────────
//       case 'Approvals':
//         return (
//           <div className="admin-table-container">
//             <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Property Approvals</h3>
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>Title</th><th>Location</th><th>Type</th>
//                   <th>Owner</th><th>Status</th><th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {properties.length === 0 ? (
//                   <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No pending properties at the moment.</td></tr>
//                 ) : (
//                   properties.map((prop) => (
//                     <tr key={prop.id || prop.title}>
//                       <td style={{ fontWeight: 600 }}>{prop.title}</td>
//                       <td>{prop.location}</td>
//                       <td>{prop.type || prop.propertyType || 'N/A'}</td>
//                       <td>
//                         <div>{prop.ownerName}</div>
//                         <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{prop.phone}</div>
//                       </td>
//                       <td>
//                         <span style={{
//                           background: prop.status === 'approved' ? '#288849' : prop.status === 'rejected' ? '#d32f2f' : '#ff9800',
//                           color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
//                         }}>
//                           {prop.status || 'pending'}
//                         </span>
//                       </td>
//                       <td>
//                         <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
//                           <button style={{ background: '#288849', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleApprove(prop.id)}>Approve</button>
//                           <button style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleReject(prop.id)}>Reject</button>
//                           <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleEdit(prop)}>Edit</button>
//                           <button style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleView(prop.id)}>View</button>
//                           <button style={{ background: '#111827', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleDelete(prop.id)}>Delete</button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         );

//       // ── TESTIMONIALS (customer_reviews) ───────────────────────────────────
//       case 'Testimonials':
//         return (
//           <div className="admin-table-container">
//             {/* Header row */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
//               <h3 className="serif" style={{ fontSize: '1.5rem' }}>Customer Reviews</h3>
//               <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
//                 {/* Status filter pills */}
//                 <div style={{ display: 'flex', gap: '8px' }}>
//                   {['all', 'pending', 'approved', 'rejected'].map(f => (
//                     <button
//                       key={f}
//                       onClick={() => setTestimonialStatusFilter(f)}
//                       style={{
//                         padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem',
//                         fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
//                         border: testimonialStatusFilter === f ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.12)',
//                         background: testimonialStatusFilter === f ? 'rgba(245,130,32,0.15)' : 'transparent',
//                         color: testimonialStatusFilter === f ? 'var(--accent-gold)' : 'rgba(255,255,255,0.5)',
//                         transition: 'all 0.2s',
//                       }}
//                     >
//                       {f === 'all' ? `All (${testimonials.length})` : `${f} (${testimonials.filter(t => t.status === f).length})`}
//                     </button>
//                   ))}
//                 </div>
//                 <button
//                   className="book-btn"
//                   style={{ gap: '10px', fontSize: '0.8rem', padding: '0.8rem 1.5rem', cursor: 'pointer' }}
//                   onClick={openAddTestimonial}
//                 >
//                   <Plus size={18} /> ADD REVIEW
//                 </button>
//               </div>
//             </div>

//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>CUSTOMER</th>
//                   <th>RATING</th>
//                   <th>REVIEW</th>
//                   <th>SUBMITTED</th>
//                   <th>STATUS</th>
//                   <th>ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTestimonials.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
//                       <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💬</div>
//                       {testimonialStatusFilter === 'all'
//                         ? 'No reviews yet.'
//                         : `No ${testimonialStatusFilter} reviews.`}
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredTestimonials.map((item) => (
//                     <motion.tr key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
//                       {/* Customer info */}
//                       <td>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                           <div style={{
//                             width: '38px', height: '38px', borderRadius: '50%',
//                             background: 'linear-gradient(135deg, #F58220, #e06b10)',
//                             display: 'flex', alignItems: 'center', justifyContent: 'center',
//                             color: 'white', fontWeight: 700, fontSize: '1rem',
//                             overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(245,130,32,0.4)',
//                           }}>
//                             {item.image_url
//                               ? <img src={`${API}${item.image_url}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                               : item.name?.charAt(0).toUpperCase()
//                             }
//                           </div>
//                           <div>
//                             <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
//                             <div style={{ fontSize: '0.75rem', opacity: 0.55 }}>{item.role || 'Customer'}</div>
//                           </div>
//                         </div>
//                       </td>
//                       {/* Rating */}
//                       <td><StarDisplay value={item.rating || 5} /></td>
//                       {/* Review snippet */}
//                       <td style={{ fontSize: '0.82rem', maxWidth: '240px', lineHeight: '1.5' }}>
//                         <span style={{ opacity: 0.8 }}>
//                           "{item.review?.slice(0, 80)}{item.review?.length > 80 ? '…' : ''}"
//                         </span>
//                       </td>
//                       {/* Date */}
//                       <td style={{ fontSize: '0.78rem', opacity: 0.55, whiteSpace: 'nowrap' }}>
//                         {item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
//                       </td>
//                       {/* Status badge */}
//                       <td>
//                         <span style={{
//                           ...statusColor(item.status || 'pending'),
//                           padding: '5px 12px', borderRadius: '100px',
//                           fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
//                         }}>
//                           {item.status || 'pending'}
//                         </span>
//                       </td>
//                       {/* Actions */}
//                       <td>
//                         <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
//                           {/* Approve */}
//                           {item.status !== 'approved' && (
//                             <button
//                               title="Approve"
//                               onClick={() => handleTestimonialApprove(item.id)}
//                               style={{ background: 'rgba(46,213,115,0.15)', color: '#2ed573', border: '1px solid rgba(46,213,115,0.3)', padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
//                             >
//                               <ThumbsUp size={13} /> Approve
//                             </button>
//                           )}
//                           {/* Reject */}
//                           {item.status !== 'rejected' && (
//                             <button
//                               title="Reject"
//                               onClick={() => handleTestimonialReject(item.id)}
//                               style={{ background: 'rgba(255,71,87,0.12)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.25)', padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
//                             >
//                               <ThumbsDown size={13} /> Reject
//                             </button>
//                           )}
//                           {/* View */}
//                           <button
//                             title="View"
//                             onClick={() => setViewingTestimonial(item)}
//                             style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.3)', padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
//                           >
//                             <Eye size={14} />
//                           </button>
//                           {/* Edit */}
//                           <button
//                             title="Edit"
//                             onClick={() => openEditTestimonial(item)}
//                             style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
//                           >
//                             <Edit3 size={14} />
//                           </button>
//                           {/* Delete */}
//                           <button
//                             title="Delete"
//                             onClick={() => handleDeleteTestimonial(item.id)}
//                             style={{ background: 'rgba(255,71,87,0.12)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.25)', padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         );

//       // ── SITE INQUIRIES ────────────────────────────────────────────────────
//       case 'Site Inquiries':
//         return (
//           <div className="admin-table-container">
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
//               <h3 className="serif" style={{ fontSize: '1.5rem' }}>Site Inquiries</h3>
//               <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{siteInquiries.length} Leads</div>
//             </div>
//             <table className="admin-table">
//               <thead>
//                 <tr><th>Name</th><th>Phone</th><th>Region</th><th>Date</th><th>Actions</th></tr>
//               </thead>
//               <tbody>
//                 {siteInquiries.length === 0 ? (
//                   <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No inquiries found.</td></tr>
//                 ) : (
//                   siteInquiries.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.name}</td>
//                       <td>
//                         <a href={`tel:${item.phone}`} style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>
//                           {item.phone}
//                         </a>
//                       </td>
//                       <td>{item.region}</td>
//                       <td>{new Date(item.created_at).toLocaleDateString()}</td>
//                       <td>
//                         <button
//                           style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
//                           onClick={() => handleDeleteInquiry(item.id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         );

//       // ── SETTINGS ──────────────────────────────────────────────────────────
//       case 'Settings':
//         return (
//           <div className="admin-table-container" style={{ maxWidth: '800px' }}>
//             <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Configuration</h3>
//             <div style={{ display: 'grid', gap: '2rem' }}>
//               <div className="admin-input-group">
//                 <label>Company Name</label>
//                 <input type="text" value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} />
//               </div>
//               <div className="admin-input-group">
//                 <label>Admin Email</label>
//                 <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
//               </div>
//               <div className="admin-input-group">
//                 <label>Support Phone</label>
//                 <input type="text" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} />
//               </div>
//               <div className="admin-input-group">
//                 <label>Office Address</label>
//                 <textarea
//                   style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#fdfdfd', border: '1px solid #eee' }}
//                   value={settings.address}
//                   onChange={(e) => setSettings({ ...settings, address: e.target.value })}
//                 />
//               </div>
//               <button className="book-btn" style={{ width: 'fit-content', padding: '1rem 3rem', cursor: 'pointer' }}>Save Changes</button>
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <div className="admin-table-container">
//             <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
//               <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
//               <h3 style={{ marginBottom: '0.5rem' }}>Tab Disabled</h3>
//               <p style={{ opacity: 0.6 }}>This section is currently under development.</p>
//             </div>
//           </div>
//         );
//     }
//   };

//   // ── RENDER ────────────────────────────────────────────────────────────────
//   return (
//     <div className="admin-dashboard">

//       {/* Sidebar */}
//       <aside className="admin-sidebar">
//         <div className="admin-logo" style={{ cursor: 'pointer', padding: '0 10px' }}>
//           <img src={logo} alt="RSV Groups Logo" style={{ width: '100%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} />
//         </div>
//         <nav className="admin-nav">
//           {[
//             { id: 'Dashboard',      icon: <LayoutDashboard size={20} /> },
//             { id: 'Plots',          icon: <Map size={20} /> },
//             { id: 'Leads',          icon: <Users size={20} /> },
//             { id: 'Projects',       icon: <Layers size={20} /> },
//             { id: 'Sold',           icon: <BadgeDollarSign size={20} /> },
//             { id: 'Approvals',      icon: <CheckCircle size={20} /> },
//             { id: 'Testimonials',   icon: <Users size={20} /> },
//             { id: 'Site Inquiries', icon: <Phone size={20} /> },
//             { id: 'Settings',       icon: <Settings size={20} /> },
//           ].map((item) => {
//             const isDisabled = disabledTabs.includes(item.id);
//             return (
//               <div
//                 key={item.id}
//                 className={`admin-nav-item ${activeTab === item.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
//                 onClick={() => handleTabClick(item.id)}
//                 style={{
//                   cursor:        isDisabled ? 'not-allowed' : 'pointer',
//                   opacity:       isDisabled ? 0.4 : 1,
//                   filter:        isDisabled ? 'grayscale(0.3)' : 'none',
//                   pointerEvents: isDisabled ? 'none' : 'auto',
//                 }}
//               >
//                 {item.icon} {item.id}
//                 {isDisabled && <span style={{ fontSize: '0.7rem', marginLeft: '8px', color: '#888' }}>(Soon)</span>}
//               </div>
//             );
//           })}
//         </nav>
//         <div style={{ marginTop: 'auto', cursor: 'pointer' }} className="admin-nav-item" onClick={onLogout}>
//           <LogOut size={20} /> Logout
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="admin-main">
//         <header className="admin-header">
//           <div className="admin-header-left">
//             <h1 className="serif">{activeTab}</h1>
//             <p style={{ color: 'rgba(255,255,255,0.4)' }}>RSV Management Hub</p>
//           </div>
//           <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
//             <div style={{ position: 'relative' }}>
//               <input
//                 type="text"
//                 placeholder={`Search in ${activeTab}...`}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ background: 'rgba(15,26,17,0.04)', border: '1px solid var(--admin-border)', padding: '12px 20px 12px 45px', borderRadius: '100px', color: 'var(--admin-text)', outline: 'none', width: '300px' }}
//               />
//               <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text)', opacity: 0.5 }} />
//             </div>
//             <Bell size={24} style={{ color: 'var(--admin-text)', opacity: 0.5, cursor: 'pointer' }} />
//             <div style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid white', background: `url(${logo}) center/cover`, cursor: 'pointer' }} />
//           </div>
//         </header>
//         {renderTabContent()}
//       </main>

//       {/* ═══ SOLD MODAL ═══════════════════════════════════════════════════════ */}
//       <AnimatePresence>
//         {showSoldModal && (
//           <motion.div
//             className="admin-modal-overlay"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={(e) => { if (e.target === e.currentTarget) setShowSoldModal(false); }}
//           >
//             <motion.div
//               className="admin-modal"
//               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
//               style={{ maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
//             >
//               <button onClick={() => setShowSoldModal(false)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
//                 <X size={22} />
//               </button>
//               <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
//                 Add New <span className="highlight">Sold Detail</span>
//               </h2>
//               <form onSubmit={handleSoldSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
//                 <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
//                   <label>PROPERTY / DEAL TITLE</label>
//                   <input type="text" name="title" value={soldForm.title} onChange={handleSoldChange} placeholder="e.g. Land in Kundrathur" />
//                 </div>
//                 <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
//                   <label>SPECIFIC LOCATION</label>
//                   <input type="text" name="location" value={soldForm.location} onChange={handleSoldChange} placeholder="e.g. Astalakshmi Nagar, Chennai" />
//                 </div>
//                 <div className="admin-input-group">
//                   <label>PRICE / VALUE</label>
//                   <input type="text" name="price" value={soldForm.price} onChange={handleSoldChange} placeholder="e.g. 75L or Market Rate" />
//                 </div>
//                 <div className="admin-input-group">
//                   <label>SIZE (SQ.FT / GROUND)</label>
//                   <input type="text" name="size" value={soldForm.size} onChange={handleSoldChange} placeholder="e.g. 2400 sqft" />
//                 </div>
//                 <div className="admin-input-group">
//                   <label>PROPERTY TYPE</label>
//                   <select name="propertyType" value={soldForm.propertyType} onChange={handleSoldChange}>
//                     {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
//                   </select>
//                 </div>
//                 <div className="admin-input-group">
//                   <label>STATUS</label>
//                   <select name="status" value={soldForm.status} onChange={handleSoldChange}>
//                     <option>Sold</option>
//                     <option>Leased</option>
//                   </select>
//                 </div>
//                 <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
//                   <label>REPRESENTED BY</label>
//                   <select name="represented" value={soldForm.represented} onChange={handleSoldChange}>
//                     {REPRESENTED_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
//                   </select>
//                   <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
//                     Preview → <span style={{ color: '#c9a84c', fontStyle: 'normal', fontWeight: 600 }}>RSV Groups Represented {soldForm.represented}</span>
//                   </div>
//                 </div>
//                 <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
//                   <label>CUSTOMER NAME / NOTE</label>
//                   <input type="text" name="customerName" value={soldForm.customerName} onChange={handleSoldChange} placeholder="e.g. Jagadeesan M or Private Client" />
//                 </div>
//                 {soldFormError && (
//                   <div style={{ gridColumn: 'span 2', color: '#ff4757', fontSize: '0.85rem', background: 'rgba(255,71,87,0.1)', padding: '10px 14px', borderRadius: '8px' }}>
//                     {soldFormError}
//                   </div>
//                 )}
//                 <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
//                   <button type="submit" className="book-btn" style={{ flex: 1, cursor: 'pointer' }}>ADD SOLD ENTRY</button>
//                   <button type="button" className="book-btn"
//                     style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
//                     onClick={() => { setShowSoldModal(false); setSoldFormError(''); }}>
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ═══ TESTIMONIAL ADD / EDIT MODAL ════════════════════════════════════ */}
//       <AnimatePresence>
//         {showTestimonialModal && (
//           <motion.div
//             className="admin-modal-overlay"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={(e) => { if (e.target === e.currentTarget) closeTestimonialModal(); }}
//           >
//             <motion.div
//               className="admin-modal"
//               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
//               style={{ maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
//             >
//               <button onClick={closeTestimonialModal} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
//                 <X size={22} />
//               </button>
//               <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
//                 {editingTestimonial ? 'Edit' : 'Add'} <span className="highlight">Customer Review</span>
//               </h2>
//               <form onSubmit={handleTestimonialSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
//                 <div className="admin-input-group">
//                   <label>CUSTOMER NAME *</label>
//                   <input
//                     type="text" required placeholder="e.g. Rajesh Kumar"
//                     value={testimonialForm.name}
//                     onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
//                   />
//                 </div>
//                 <div className="admin-input-group">
//                   <label>ROLE / DESIGNATION</label>
//                   <input
//                     type="text" placeholder="e.g. Plot Owner, OMR"
//                     value={testimonialForm.role}
//                     onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
//                   />
//                 </div>
//                 <div className="admin-input-group">
//                   <label>RATING *</label>
//                   <div style={{ paddingTop: '6px' }}>
//                     <StarRating
//                       value={testimonialForm.rating}
//                       onChange={(v) => setTestimonialForm({ ...testimonialForm, rating: v })}
//                     />
//                   </div>
//                 </div>
//                 <div className="admin-input-group">
//                   <label>REVIEW *</label>
//                   <textarea
//                     required placeholder="Customer's experience..."
//                     style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'inherit', resize: 'vertical', fontFamily: 'inherit' }}
//                     value={testimonialForm.review}
//                     onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })}
//                   />
//                 </div>
//                 <div style={{ display: 'flex', gap: '1.5rem' }}>
//                   <button type="submit" className="book-btn" style={{ flex: 1, cursor: 'pointer' }}>
//                     {editingTestimonial ? 'UPDATE REVIEW' : 'SAVE REVIEW'}
//                   </button>
//                   <button type="button" className="book-btn"
//                     style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
//                     onClick={closeTestimonialModal}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ═══ VIEW REVIEW MODAL ════════════════════════════════════════════════ */}
//       <AnimatePresence>
//         {viewingTestimonial && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}
//             onClick={() => setViewingTestimonial(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
//               onClick={(e) => e.stopPropagation()}
//               style={{
//                 background: 'var(--admin-card, #1a1a2e)', border: '1px solid rgba(245,130,32,0.2)',
//                 width: '520px', maxWidth: '95%', borderRadius: '20px', padding: '2.5rem',
//                 color: 'var(--admin-text, #fff)', position: 'relative',
//               }}
//             >
//               <button onClick={() => setViewingTestimonial(null)}
//                 style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}>
//                 <X size={22} />
//               </button>

//               {/* Avatar */}
//               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
//                 <div style={{
//                   width: '56px', height: '56px', borderRadius: '50%',
//                   background: 'linear-gradient(135deg, #F58220, #e06b10)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   color: 'white', fontWeight: 700, fontSize: '1.3rem',
//                   overflow: 'hidden', border: '3px solid rgba(245,130,32,0.4)', flexShrink: 0,
//                 }}>
//                   {viewingTestimonial.image_url
//                     ? <img src={`${API}${viewingTestimonial.image_url}`} alt={viewingTestimonial.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                     : viewingTestimonial.name?.charAt(0).toUpperCase()
//                   }
//                 </div>
//                 <div>
//                   <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{viewingTestimonial.name}</div>
//                   <div style={{ fontSize: '0.82rem', opacity: 0.55 }}>{viewingTestimonial.role || 'Customer'}</div>
//                   <div style={{ marginTop: '4px' }}><StarDisplay value={viewingTestimonial.rating || 5} /></div>
//                 </div>
//               </div>

//               {/* Review text */}
//               <p style={{
//                 fontSize: '0.95rem', lineHeight: '1.75', opacity: 0.85,
//                 background: 'rgba(255,255,255,0.04)', borderRadius: '12px',
//                 padding: '1.2rem 1.4rem', borderLeft: '3px solid var(--accent-gold, #F58220)',
//                 marginBottom: '1.5rem',
//               }}>
//                 "{viewingTestimonial.review}"
//               </p>

//               {/* Meta */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', opacity: 0.5 }}>
//                 <span>
//                   Submitted: {viewingTestimonial.created_at
//                     ? new Date(viewingTestimonial.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
//                     : '—'}
//                 </span>
//                 <span style={{
//                   ...statusColor(viewingTestimonial.status || 'pending'),
//                   padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
//                 }}>
//                   {viewingTestimonial.status || 'pending'}
//                 </span>
//               </div>

//               {/* Quick action buttons */}
//               <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
//                 {viewingTestimonial.status !== 'approved' && (
//                   <button
//                     onClick={() => { handleTestimonialApprove(viewingTestimonial.id); setViewingTestimonial(null); }}
//                     style={{ flex: 1, background: 'rgba(46,213,115,0.15)', color: '#2ed573', border: '1px solid rgba(46,213,115,0.3)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
//                   >
//                     <ThumbsUp size={15} /> Approve
//                   </button>
//                 )}
//                 {viewingTestimonial.status !== 'rejected' && (
//                   <button
//                     onClick={() => { handleTestimonialReject(viewingTestimonial.id); setViewingTestimonial(null); }}
//                     style={{ flex: 1, background: 'rgba(255,71,87,0.12)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.25)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
//                   >
//                     <ThumbsDown size={15} /> Reject
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setViewingTestimonial(null)}
//                   style={{ flex: 1, background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
//                 >
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ═══ VIEW PROPERTY MODAL ═════════════════════════════════════════════ */}
//       <AnimatePresence>
//         {selectedProperty && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}
//             onClick={() => setSelectedProperty(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
//               onClick={(e) => e.stopPropagation()}
//               style={{ background: '#fff', width: '700px', maxWidth: '95%', borderRadius: '16px', padding: '30px', color: '#111' }}
//             >
//               <h2 style={{ marginBottom: '1rem' }}>{selectedProperty.title}</h2>
//               <p><strong>Location:</strong> {selectedProperty.location}</p>
//               <p><strong>Type:</strong> {selectedProperty.type}</p>
//               <p><strong>Owner:</strong> {selectedProperty.ownerName}</p>
//               <p><strong>Phone:</strong> {selectedProperty.phone}</p>
//               <button onClick={() => setSelectedProperty(null)}
//                 style={{ marginTop: '1.5rem', background: '#288849', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ═══ EDIT PROPERTY MODAL ═════════════════════════════════════════════ */}
//       <AnimatePresence>
//         {editingProperty && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}
//             onClick={() => setEditingProperty(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
//               onClick={(e) => e.stopPropagation()}
//               style={{ background: '#fff', width: '700px', maxWidth: '95%', borderRadius: '16px', padding: '30px', color: '#111' }}
//             >
//               <h2 style={{ marginBottom: '1.5rem' }}>Edit Property</h2>
//               <input type="text" value={editingProperty.title || ''} placeholder="Title"
//                 onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
//                 style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
//               />
//               <input type="text" value={editingProperty.location || ''} placeholder="Location"
//                 onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
//                 style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
//               />
//               <textarea value={editingProperty.description || ''} placeholder="Description"
//                 onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
//                 style={{ width: '100%', minHeight: '120px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
//               />
//               <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
//                 <button onClick={handleSaveEdit} style={{ background: '#288849', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Save Changes</button>
//                 <button onClick={() => setEditingProperty(null)} style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// };

// export default AdminDashboard;










// AdminDashboard.jsx — Full Version with customer_reviews Testimonials + Supabase "sell" Approvals

import React, { useState, useEffect } from 'react';
import '../Admin.css';
import {
  LayoutDashboard, Map, Users, Layers, Settings,
  Plus, Trash2, Edit3, ArrowUpRight, Search,
  Bell, LogOut, CheckCircle, BadgeDollarSign, Phone, X,
  Eye, ThumbsUp, ThumbsDown, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import logo from '../images/LOGO.png';

const API = 'http://localhost:5000';

// ─── Supabase Config ──────────────────────────────────────────────────────────
const SUPABASE_URL      = "https://gdyapjrcmbhojclmrhyf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_BdsZT5s1ds2ntHEFE3POiw_9E0i79Ws";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// ─────────────────────────────────────────────────────────────────────────────

const PROPERTY_TYPES    = ["Land", "Apartment", "Villa", "Plot", "Commercial", "Independent House"];
const REPRESENTED_OPTIONS = ["Both Buyer & Sellers", "Buyer Only", "Seller Only", "Developer"];

// ── Star display (read-only) ──────────────────────────────────────────────────
const StarDisplay = ({ value = 5 }) => (
  <div style={{ display: 'flex', gap: '3px' }}>
    {[1, 2, 3, 4, 5].map(s => (
      <Star
        key={s}
        size={14}
        fill={value >= s ? '#F58220' : 'none'}
        color={value >= s ? '#F58220' : '#555'}
      />
    ))}
  </div>
);

// ── Star selector (editable) ──────────────────────────────────────────────────
const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={22}
          fill={(hovered || value) >= s ? '#F58220' : 'none'}
          color={(hovered || value) >= s ? '#F58220' : '#555'}
          style={{ cursor: 'pointer', transition: 'all 0.15s' }}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab]         = useState('Sold');
  const [showSoldModal, setShowSoldModal] = useState(false);
  const [searchTerm, setSearchTerm]       = useState('');
  const [properties, setProperties]       = useState([]);
  const [soldSuccess, setSoldSuccess]     = useState(false);
  const [selectedProperty, setSelectedProperty]   = useState(null);
  const [editingProperty, setEditingProperty]     = useState(null);
  const [savingEdit, setSavingEdit]               = useState(false);

  const disabledTabs = ['Dashboard', 'Plots', 'Leads', 'Projects'];

  // ── SOLD ─────────────────────────────────────────────────────────────────
  const [soldEntries, setSoldEntries] = useState(
    JSON.parse(localStorage.getItem('sold_entries') || '[]')
  );
  const [soldForm, setSoldForm] = useState({
    title: '', location: '', price: '', size: '',
    propertyType: 'Land', represented: 'Both Buyer & Sellers',
    customerName: '', status: 'Sold',
  });
  const [soldFormError, setSoldFormError] = useState('');

  // ── TESTIMONIALS (customer_reviews) ──────────────────────────────────────
  const [testimonials, setTestimonials]                     = useState([]);
  const [showTestimonialModal, setShowTestimonialModal]     = useState(false);
  const [editingTestimonial, setEditingTestimonial]         = useState(null);
  const [viewingTestimonial, setViewingTestimonial]         = useState(null);
  const [testimonialStatusFilter, setTestimonialStatusFilter] = useState('all');
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', role: '', review: '', rating: 5,
  });

  // ── SITE INQUIRIES ────────────────────────────────────────────────────────
  const [siteInquiries, setSiteInquiries] = useState([]);

  // ── SETTINGS ─────────────────────────────────────────────────────────────
  const [settings, setSettings] = useState({
    companyName: 'RSV Groups',
    contactEmail: 'info@rsvgroups.com',
    contactPhone: '+91 90000 00000',
    address: 'Anna Salai, Chennai',
  });

  // ── DUMMY DATA ────────────────────────────────────────────────────────────
  const [plots] = useState([
    { id: 1, name: 'Premium Plot A1',  location: 'OMR, Chennai', price: '45L', size: '1200 Sq.ft', status: 'Available', project: 'The Royal Estate' },
    { id: 2, name: 'Emerald Plot B4',  location: 'ECR, Chennai', price: '85L', size: '2400 Sq.ft', status: 'Booked',    project: 'Emerald Valley'  },
    { id: 3, name: 'Heritage Plot C9', location: 'GST Road',     price: '32L', size: '1000 Sq.ft', status: 'Available', project: 'Heritage West'   },
  ]);
  const [leads] = useState([
    { id: 1, name: 'Anish Kumar',  phone: '+91 98765 43210', email: 'anish@email.com',  interest: 'OMR Plots',    status: 'New',       date: '2024-03-20' },
    { id: 2, name: 'Priya Sharma', phone: '+91 87654 32109', email: 'priya@email.com',  interest: 'ECR Luxury',   status: 'Contacted', date: '2024-03-19' },
    { id: 3, name: 'Vikram Singh', phone: '+91 76543 21098', email: 'vikram@email.com', interest: 'Heritage West',status: 'Sold',      date: '2024-03-18' },
  ]);
  const [projects] = useState([
    { id: 1, name: 'The Royal Estate', location: 'OMR, Chennai', units: '45/60', status: 'Active'   },
    { id: 2, name: 'Emerald Valley',   location: 'ECR, Chennai', units: '12/24', status: 'Limited'  },
    { id: 3, name: 'Heritage West',    location: 'GST Road',     units: '10/10', status: 'Sold Out' },
  ]);

  // ── EFFECTS ───────────────────────────────────────────────────────────────
  useEffect(() => {
    loadProperties();
  }, [activeTab]);

  useEffect(() => { loadTestimonials(); }, []);
  useEffect(() => { loadSiteInquiries(); }, []);

  // ── LOADERS ───────────────────────────────────────────────────────────────
  const loadProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('sell')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProperties(data || []);
    } catch (err) {
      console.error('Failed to load properties:', err);
    }
  };

  const loadTestimonials = async () => {
    try {
      // Fetch all reviews (no status filter) for admin view
      const res = await axios.get(`${API}/api/customer-reviews`);
      setTestimonials(res.data);
    } catch (err) { console.error(err); }
  };

  const loadSiteInquiries = async () => {
    try {
      const res = await axios.get(`${API}/api/site-inquiries`);
      setSiteInquiries(res.data);
    } catch (err) { console.error(err); }
  };

  // ── APPROVALS (property — Supabase "sell" table) ─────────────────────────
  const handleApprove = async (id) => {
    try {
      const { error } = await supabase.from('sell').update({ status: 'approved' }).eq('id', id);
      if (error) throw error;
      await loadProperties();
    } catch (err) {
      console.error(err);
      alert('Failed to approve property');
    }
  };

  const handleReject = async (id) => {
    try {
      const { error } = await supabase.from('sell').update({ status: 'rejected' }).eq('id', id);
      if (error) throw error;
      await loadProperties();
    } catch (err) {
      console.error(err);
      alert('Failed to reject property');
    }
  };

  const handleView = (id) => {
    const property = properties.find(p => p.id === id);
    setSelectedProperty(property);
  };

  const handleEdit = (property) => {
    setEditingProperty({ ...property });
  };

  const handleSaveEdit = async () => {
    if (!editingProperty) return;
    setSavingEdit(true);
    try {
      const { id, created_at, ...fields } = editingProperty;
      const { error } = await supabase.from('sell').update(fields).eq('id', id);
      if (error) throw error;
      setEditingProperty(null);
      await loadProperties();
    } catch (err) {
      console.error(err);
      alert('Failed to update property');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property permanently?')) return;
    try {
      const { error } = await supabase.from('sell').delete().eq('id', id);
      if (error) throw error;
      await loadProperties();
    } catch (err) {
      console.error(err);
      alert('Failed to delete property');
    }
  };

  // ── SOLD ─────────────────────────────────────────────────────────────────
  const handleSoldChange = (e) => setSoldForm({ ...soldForm, [e.target.name]: e.target.value });
  const handleSoldSubmit = (e) => {
    e.preventDefault();
    if (!soldForm.title || !soldForm.location) { setSoldFormError('Property Title and Location are required.'); return; }
    setSoldFormError('');
    const updated = [{ ...soldForm, id: Date.now() }, ...soldEntries];
    setSoldEntries(updated);
    localStorage.setItem('sold_entries', JSON.stringify(updated));
    setSoldForm({ title: '', location: '', price: '', size: '', propertyType: 'Land', represented: 'Both Buyer & Sellers', customerName: '', status: 'Sold' });
    setShowSoldModal(false);
    setSoldSuccess(true);
    setTimeout(() => setSoldSuccess(false), 3000);
  };
  const handleSoldDelete = (id) => {
    const updated = soldEntries.filter(e => e.id !== id);
    setSoldEntries(updated);
    localStorage.setItem('sold_entries', JSON.stringify(updated));
  };

  // ── TESTIMONIALS (customer_reviews) ──────────────────────────────────────
  const handleTestimonialApprove = async (id) => {
    try {
      await axios.patch(`${API}/api/customer-reviews/${id}/status`, { status: 'approved' });
      await loadTestimonials();
    } catch (err) { console.error(err); alert('Failed to approve'); }
  };

  const handleTestimonialReject = async (id) => {
    try {
      await axios.patch(`${API}/api/customer-reviews/${id}/status`, { status: 'rejected' });
      await loadTestimonials();
    } catch (err) { console.error(err); alert('Failed to reject'); }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      await axios.delete(`${API}/api/customer-reviews/${id}`);
      await loadTestimonials();
    } catch (err) { console.error(err); }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await axios.put(`${API}/api/customer-reviews/${editingTestimonial.id}`, {
          name:   testimonialForm.name,
          role:   testimonialForm.role,
          review: testimonialForm.review,
          rating: testimonialForm.rating,
        });
      } else {
        await axios.post(`${API}/api/customer-reviews`, {
          name:   testimonialForm.name,
          role:   testimonialForm.role,
          review: testimonialForm.review,
          rating: testimonialForm.rating,
          status: 'approved',  // admin-added → directly approved
        });
      }
      await loadTestimonials();
      closeTestimonialModal();
    } catch (err) { console.error(err); alert('Failed to save review'); }
  };

  const openAddTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialForm({ name: '', role: '', review: '', rating: 5 });
    setShowTestimonialModal(true);
  };
  const openEditTestimonial = (item) => {
    setEditingTestimonial(item);
    setTestimonialForm({ name: item.name, role: item.role || '', review: item.review, rating: item.rating || 5 });
    setShowTestimonialModal(true);
  };
  const closeTestimonialModal = () => {
    setShowTestimonialModal(false);
    setEditingTestimonial(null);
    setTestimonialForm({ name: '', role: '', review: '', rating: 5 });
  };

  // ── SITE INQUIRIES ────────────────────────────────────────────────────────
  const handleDeleteInquiry = async (id) => {
    try {
      await axios.delete(`${API}/api/site-inquiries/${id}`);
      loadSiteInquiries();
    } catch (err) { console.error(err); }
  };

  // ── NAV ───────────────────────────────────────────────────────────────────
  const handleTabClick = (tabId) => {
    if (!disabledTabs.includes(tabId)) setActiveTab(tabId);
  };

  // ── STATUS BADGE COLOR ────────────────────────────────────────────────────
  const statusColor = (s) => {
    if (s === 'approved') return { background: 'rgba(46,213,115,0.15)', color: '#2ed573', border: '1px solid rgba(46,213,115,0.3)' };
    if (s === 'rejected') return { background: 'rgba(255,71,87,0.12)',  color: '#ff4757', border: '1px solid rgba(255,71,87,0.25)' };
    return { background: 'rgba(255,165,0,0.12)', color: '#ffa500', border: '1px solid rgba(255,165,0,0.3)' };
  };

  // ── FILTERED TESTIMONIALS ─────────────────────────────────────────────────
  const filteredTestimonials = testimonialStatusFilter === 'all'
    ? testimonials
    : testimonials.filter(t => t.status === testimonialStatusFilter);

  // ── TAB CONTENT ───────────────────────────────────────────────────────────
  const renderTabContent = () => {
    switch (activeTab) {

      // ── SOLD ──────────────────────────────────────────────────────────────
      case 'Sold':
        return (
          <div className="admin-table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 className="serif" style={{ fontSize: '1.5rem' }}>Sold / Leased Inventory</h3>
              <button className="book-btn" style={{ gap: '10px', fontSize: '0.8rem', padding: '0.8rem 1.5rem', cursor: 'pointer' }} onClick={() => setShowSoldModal(true)}>
                <Plus size={18} /> ADD SOLD DETAIL
              </button>
            </div>
            <AnimatePresence>
              {soldSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  style={{ background: 'rgba(46,213,115,0.12)', border: '1px solid rgba(46,213,115,0.3)', color: '#2ed573', borderRadius: '10px', padding: '12px 20px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  ✅ Sold entry added successfully!
                </motion.div>
              )}
            </AnimatePresence>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>PROPERTY DETAIL</th><th>LOCATION</th><th>VALUE</th>
                  <th>SIZE</th><th>REPRESENTED BY</th><th>STATUS</th><th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {soldEntries.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏡</div>
                      <div style={{ marginBottom: '0.4rem' }}>No sold entries yet.</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Click "+ ADD SOLD DETAIL" to record your first deal.</div>
                    </td>
                  </tr>
                ) : (
                  soldEntries.map((entry) => (
                    <motion.tr key={entry.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{entry.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', marginTop: 3 }}>{entry.propertyType}</div>
                      </td>
                      <td>{entry.location}</td>
                      <td style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{entry.price || '—'}</td>
                      <td>{entry.size || '—'}</td>
                      <td style={{ fontSize: '0.82rem' }}>
                        RSV Groups Represented <strong style={{ color: 'var(--accent-gold)' }}>{entry.represented}</strong>
                      </td>
                      <td>
                        <span className={`status-badge ${entry.status === 'Sold' ? 'status-booked' : 'status-available'}`}>
                          {entry.status}
                        </span>
                      </td>
                      <td>
                        <Trash2 size={18} style={{ cursor: 'pointer', color: '#ff4757', opacity: 0.7 }} onClick={() => handleSoldDelete(entry.id)} />
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      // ── APPROVALS (Supabase "sell" table) ───────────────────────────────────
      case 'Approvals':
        return (
          <div className="admin-table-container">
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Property Approvals</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th><th>Location</th><th>Type</th>
                  <th>Owner</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No properties found.</td></tr>
                ) : (
                  properties.map((prop) => (
                    <tr key={prop.id}>
                      <td style={{ fontWeight: 600 }}>{prop.title}</td>
                      <td>{prop.location}</td>
                      <td>{prop.property_type || prop.type || 'N/A'}</td>
                      <td>
                        <div>{prop.owner_name}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{prop.phone}</div>
                      </td>
                      <td>
                        <span style={{
                          background: prop.status === 'approved' ? '#288849' : prop.status === 'rejected' ? '#d32f2f' : '#ff9800',
                          color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
                        }}>
                          {prop.status || 'pending'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button style={{ background: '#288849', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleApprove(prop.id)}>Approve</button>
                          <button style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleReject(prop.id)}>Reject</button>
                          <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleEdit(prop)}>Edit</button>
                          <button style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleView(prop.id)}>View</button>
                          <button style={{ background: '#111827', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => handleDelete(prop.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      // ── TESTIMONIALS (customer_reviews) ───────────────────────────────────
      case 'Testimonials':
        return (
          <div className="admin-table-container">
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 className="serif" style={{ fontSize: '1.5rem' }}>Customer Reviews</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Status filter pills */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['all', 'pending', 'approved', 'rejected'].map(f => (
                    <button
                      key={f}
                      onClick={() => setTestimonialStatusFilter(f)}
                      style={{
                        padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem',
                        fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
                        border: testimonialStatusFilter === f ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.12)',
                        background: testimonialStatusFilter === f ? 'rgba(245,130,32,0.15)' : 'transparent',
                        color: testimonialStatusFilter === f ? 'var(--accent-gold)' : 'rgba(255,255,255,0.5)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {f === 'all' ? `All (${testimonials.length})` : `${f} (${testimonials.filter(t => t.status === f).length})`}
                    </button>
                  ))}
                </div>
                <button
                  className="book-btn"
                  style={{ gap: '10px', fontSize: '0.8rem', padding: '0.8rem 1.5rem', cursor: 'pointer' }}
                  onClick={openAddTestimonial}
                >
                  <Plus size={18} /> ADD REVIEW
                </button>
              </div>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>CUSTOMER</th>
                  <th>RATING</th>
                  <th>REVIEW</th>
                  <th>SUBMITTED</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestimonials.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💬</div>
                      {testimonialStatusFilter === 'all'
                        ? 'No reviews yet.'
                        : `No ${testimonialStatusFilter} reviews.`}
                    </td>
                  </tr>
                ) : (
                  filteredTestimonials.map((item) => (
                    <motion.tr key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      {/* Customer info */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '38px', height: '38px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #F58220, #e06b10)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: 700, fontSize: '1rem',
                            overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(245,130,32,0.4)',
                          }}>
                            {item.image_url
                              ? <img src={`${API}${item.image_url}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : item.name?.charAt(0).toUpperCase()
                            }
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.55 }}>{item.role || 'Customer'}</div>
                          </div>
                        </div>
                      </td>
                      {/* Rating */}
                      <td><StarDisplay value={item.rating || 5} /></td>
                      {/* Review snippet */}
                      <td style={{ fontSize: '0.82rem', maxWidth: '240px', lineHeight: '1.5' }}>
                        <span style={{ opacity: 0.8 }}>
                          "{item.review?.slice(0, 80)}{item.review?.length > 80 ? '…' : ''}"
                        </span>
                      </td>
                      {/* Date */}
                      <td style={{ fontSize: '0.78rem', opacity: 0.55, whiteSpace: 'nowrap' }}>
                        {item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      {/* Status badge */}
                      <td>
                        <span style={{
                          ...statusColor(item.status || 'pending'),
                          padding: '5px 12px', borderRadius: '100px',
                          fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                        }}>
                          {item.status || 'pending'}
                        </span>
                      </td>
                      {/* Actions */}
                      <td>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {/* Approve */}
                          {item.status !== 'approved' && (
                            <button
                              title="Approve"
                              onClick={() => handleTestimonialApprove(item.id)}
                              style={{ background: 'rgba(46,213,115,0.15)', color: '#2ed573', border: '1px solid rgba(46,213,115,0.3)', padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                            >
                              <ThumbsUp size={13} /> Approve
                            </button>
                          )}
                          {/* Reject */}
                          {item.status !== 'rejected' && (
                            <button
                              title="Reject"
                              onClick={() => handleTestimonialReject(item.id)}
                              style={{ background: 'rgba(255,71,87,0.12)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.25)', padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                            >
                              <ThumbsDown size={13} /> Reject
                            </button>
                          )}
                          {/* View */}
                          <button
                            title="View"
                            onClick={() => setViewingTestimonial(item)}
                            style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.3)', padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          >
                            <Eye size={14} />
                          </button>
                          {/* Edit */}
                          <button
                            title="Edit"
                            onClick={() => openEditTestimonial(item)}
                            style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          >
                            <Edit3 size={14} />
                          </button>
                          {/* Delete */}
                          <button
                            title="Delete"
                            onClick={() => handleDeleteTestimonial(item.id)}
                            style={{ background: 'rgba(255,71,87,0.12)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.25)', padding: '7px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      // ── SITE INQUIRIES ────────────────────────────────────────────────────
      case 'Site Inquiries':
        return (
          <div className="admin-table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 className="serif" style={{ fontSize: '1.5rem' }}>Site Inquiries</h3>
              <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{siteInquiries.length} Leads</div>
            </div>
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Phone</th><th>Region</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {siteInquiries.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No inquiries found.</td></tr>
                ) : (
                  siteInquiries.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <a href={`tel:${item.phone}`} style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>
                          {item.phone}
                        </a>
                      </td>
                      <td>{item.region}</td>
                      <td>{new Date(item.created_at).toLocaleDateString()}</td>
                      <td>
                        <button
                          style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                          onClick={() => handleDeleteInquiry(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      // ── SETTINGS ──────────────────────────────────────────────────────────
      case 'Settings':
        return (
          <div className="admin-table-container" style={{ maxWidth: '800px' }}>
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Configuration</h3>
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div className="admin-input-group">
                <label>Company Name</label>
                <input type="text" value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} />
              </div>
              <div className="admin-input-group">
                <label>Admin Email</label>
                <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
              </div>
              <div className="admin-input-group">
                <label>Support Phone</label>
                <input type="text" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} />
              </div>
              <div className="admin-input-group">
                <label>Office Address</label>
                <textarea
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#fdfdfd', border: '1px solid #eee' }}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                />
              </div>
              <button className="book-btn" style={{ width: 'fit-content', padding: '1rem 3rem', cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
        );

      default:
        return (
          <div className="admin-table-container">
            <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Tab Disabled</h3>
              <p style={{ opacity: 0.6 }}>This section is currently under development.</p>
            </div>
          </div>
        );
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo" style={{ cursor: 'pointer', padding: '0 10px' }}>
          <img src={logo} alt="RSV Groups Logo" style={{ width: '100%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} />
        </div>
        <nav className="admin-nav">
          {[
            { id: 'Dashboard',      icon: <LayoutDashboard size={20} /> },
            { id: 'Plots',          icon: <Map size={20} /> },
            { id: 'Leads',          icon: <Users size={20} /> },
            { id: 'Projects',       icon: <Layers size={20} /> },
            { id: 'Sold',           icon: <BadgeDollarSign size={20} /> },
            { id: 'Approvals',      icon: <CheckCircle size={20} /> },
            { id: 'Testimonials',   icon: <Users size={20} /> },
            { id: 'Site Inquiries', icon: <Phone size={20} /> },
            { id: 'Settings',       icon: <Settings size={20} /> },
          ].map((item) => {
            const isDisabled = disabledTabs.includes(item.id);
            return (
              <div
                key={item.id}
                className={`admin-nav-item ${activeTab === item.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => handleTabClick(item.id)}
                style={{
                  cursor:        isDisabled ? 'not-allowed' : 'pointer',
                  opacity:       isDisabled ? 0.4 : 1,
                  filter:        isDisabled ? 'grayscale(0.3)' : 'none',
                  pointerEvents: isDisabled ? 'none' : 'auto',
                }}
              >
                {item.icon} {item.id}
                {isDisabled && <span style={{ fontSize: '0.7rem', marginLeft: '8px', color: '#888' }}>(Soon)</span>}
              </div>
            );
          })}
        </nav>
        <div style={{ marginTop: 'auto', cursor: 'pointer' }} className="admin-nav-item" onClick={onLogout}>
          <LogOut size={20} /> Logout
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <h1 className="serif">{activeTab}</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>RSV Management Hub</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={`Search in ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'rgba(15,26,17,0.04)', border: '1px solid var(--admin-border)', padding: '12px 20px 12px 45px', borderRadius: '100px', color: 'var(--admin-text)', outline: 'none', width: '300px' }}
              />
              <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text)', opacity: 0.5 }} />
            </div>
            <Bell size={24} style={{ color: 'var(--admin-text)', opacity: 0.5, cursor: 'pointer' }} />
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid white', background: `url(${logo}) center/cover`, cursor: 'pointer' }} />
          </div>
        </header>
        {renderTabContent()}
      </main>

      {/* ═══ SOLD MODAL ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showSoldModal && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowSoldModal(false); }}
          >
            <motion.div
              className="admin-modal"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
            >
              <button onClick={() => setShowSoldModal(false)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                <X size={22} />
              </button>
              <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                Add New <span className="highlight">Sold Detail</span>
              </h2>
              <form onSubmit={handleSoldSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>PROPERTY / DEAL TITLE</label>
                  <input type="text" name="title" value={soldForm.title} onChange={handleSoldChange} placeholder="e.g. Land in Kundrathur" />
                </div>
                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>SPECIFIC LOCATION</label>
                  <input type="text" name="location" value={soldForm.location} onChange={handleSoldChange} placeholder="e.g. Astalakshmi Nagar, Chennai" />
                </div>
                <div className="admin-input-group">
                  <label>PRICE / VALUE</label>
                  <input type="text" name="price" value={soldForm.price} onChange={handleSoldChange} placeholder="e.g. 75L or Market Rate" />
                </div>
                <div className="admin-input-group">
                  <label>SIZE (SQ.FT / GROUND)</label>
                  <input type="text" name="size" value={soldForm.size} onChange={handleSoldChange} placeholder="e.g. 2400 sqft" />
                </div>
                <div className="admin-input-group">
                  <label>PROPERTY TYPE</label>
                  <select name="propertyType" value={soldForm.propertyType} onChange={handleSoldChange}>
                    {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="admin-input-group">
                  <label>STATUS</label>
                  <select name="status" value={soldForm.status} onChange={handleSoldChange}>
                    <option>Sold</option>
                    <option>Leased</option>
                  </select>
                </div>
                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>REPRESENTED BY</label>
                  <select name="represented" value={soldForm.represented} onChange={handleSoldChange}>
                    {REPRESENTED_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
                    Preview → <span style={{ color: '#c9a84c', fontStyle: 'normal', fontWeight: 600 }}>RSV Groups Represented {soldForm.represented}</span>
                  </div>
                </div>
                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>CUSTOMER NAME / NOTE</label>
                  <input type="text" name="customerName" value={soldForm.customerName} onChange={handleSoldChange} placeholder="e.g. Jagadeesan M or Private Client" />
                </div>
                {soldFormError && (
                  <div style={{ gridColumn: 'span 2', color: '#ff4757', fontSize: '0.85rem', background: 'rgba(255,71,87,0.1)', padding: '10px 14px', borderRadius: '8px' }}>
                    {soldFormError}
                  </div>
                )}
                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="book-btn" style={{ flex: 1, cursor: 'pointer' }}>ADD SOLD ENTRY</button>
                  <button type="button" className="book-btn"
                    style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
                    onClick={() => { setShowSoldModal(false); setSoldFormError(''); }}>
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ TESTIMONIAL ADD / EDIT MODAL ════════════════════════════════════ */}
      <AnimatePresence>
        {showTestimonialModal && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) closeTestimonialModal(); }}
          >
            <motion.div
              className="admin-modal"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
            >
              <button onClick={closeTestimonialModal} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                <X size={22} />
              </button>
              <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                {editingTestimonial ? 'Edit' : 'Add'} <span className="highlight">Customer Review</span>
              </h2>
              <form onSubmit={handleTestimonialSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                <div className="admin-input-group">
                  <label>CUSTOMER NAME *</label>
                  <input
                    type="text" required placeholder="e.g. Rajesh Kumar"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                  />
                </div>
                <div className="admin-input-group">
                  <label>ROLE / DESIGNATION</label>
                  <input
                    type="text" placeholder="e.g. Plot Owner, OMR"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                  />
                </div>
                <div className="admin-input-group">
                  <label>RATING *</label>
                  <div style={{ paddingTop: '6px' }}>
                    <StarRating
                      value={testimonialForm.rating}
                      onChange={(v) => setTestimonialForm({ ...testimonialForm, rating: v })}
                    />
                  </div>
                </div>
                <div className="admin-input-group">
                  <label>REVIEW *</label>
                  <textarea
                    required placeholder="Customer's experience..."
                    style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'inherit', resize: 'vertical', fontFamily: 'inherit' }}
                    value={testimonialForm.review}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <button type="submit" className="book-btn" style={{ flex: 1, cursor: 'pointer' }}>
                    {editingTestimonial ? 'UPDATE REVIEW' : 'SAVE REVIEW'}
                  </button>
                  <button type="button" className="book-btn"
                    style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
                    onClick={closeTestimonialModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ VIEW REVIEW MODAL ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {viewingTestimonial && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}
            onClick={() => setViewingTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--admin-card, #1a1a2e)', border: '1px solid rgba(245,130,32,0.2)',
                width: '520px', maxWidth: '95%', borderRadius: '20px', padding: '2.5rem',
                color: 'var(--admin-text, #fff)', position: 'relative',
              }}
            >
              <button onClick={() => setViewingTestimonial(null)}
                style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}>
                <X size={22} />
              </button>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F58220, #e06b10)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: '1.3rem',
                  overflow: 'hidden', border: '3px solid rgba(245,130,32,0.4)', flexShrink: 0,
                }}>
                  {viewingTestimonial.image_url
                    ? <img src={`${API}${viewingTestimonial.image_url}`} alt={viewingTestimonial.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : viewingTestimonial.name?.charAt(0).toUpperCase()
                  }
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{viewingTestimonial.name}</div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.55 }}>{viewingTestimonial.role || 'Customer'}</div>
                  <div style={{ marginTop: '4px' }}><StarDisplay value={viewingTestimonial.rating || 5} /></div>
                </div>
              </div>

              {/* Review text */}
              <p style={{
                fontSize: '0.95rem', lineHeight: '1.75', opacity: 0.85,
                background: 'rgba(255,255,255,0.04)', borderRadius: '12px',
                padding: '1.2rem 1.4rem', borderLeft: '3px solid var(--accent-gold, #F58220)',
                marginBottom: '1.5rem',
              }}>
                "{viewingTestimonial.review}"
              </p>

              {/* Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', opacity: 0.5 }}>
                <span>
                  Submitted: {viewingTestimonial.created_at
                    ? new Date(viewingTestimonial.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
                    : '—'}
                </span>
                <span style={{
                  ...statusColor(viewingTestimonial.status || 'pending'),
                  padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                }}>
                  {viewingTestimonial.status || 'pending'}
                </span>
              </div>

              {/* Quick action buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                {viewingTestimonial.status !== 'approved' && (
                  <button
                    onClick={() => { handleTestimonialApprove(viewingTestimonial.id); setViewingTestimonial(null); }}
                    style={{ flex: 1, background: 'rgba(46,213,115,0.15)', color: '#2ed573', border: '1px solid rgba(46,213,115,0.3)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <ThumbsUp size={15} /> Approve
                  </button>
                )}
                {viewingTestimonial.status !== 'rejected' && (
                  <button
                    onClick={() => { handleTestimonialReject(viewingTestimonial.id); setViewingTestimonial(null); }}
                    style={{ flex: 1, background: 'rgba(255,71,87,0.12)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.25)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <ThumbsDown size={15} /> Reject
                  </button>
                )}
                <button
                  onClick={() => setViewingTestimonial(null)}
                  style={{ flex: 1, background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ VIEW PROPERTY MODAL (Supabase "sell" — full details) ════════════ */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#fff', width: '700px', maxWidth: '95%', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', padding: '30px', color: '#111' }}
            >
              <h2 style={{ marginBottom: '1rem' }}>{selectedProperty.title}</h2>

              {selectedProperty.cover_image && (
                <img src={selectedProperty.cover_image} alt="cover" style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }} />
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', fontSize: '0.9rem' }}>
                <p><strong>Price:</strong> {selectedProperty.price}</p>
                <p><strong>Category:</strong> {selectedProperty.property_category}</p>
                <p><strong>Type:</strong> {selectedProperty.property_type}</p>
                <p><strong>Apartment Type:</strong> {selectedProperty.apartment_type || '—'}</p>
                <p><strong>Land Area:</strong> {selectedProperty.land_area ? `${selectedProperty.land_area} ${selectedProperty.land_area_unit}` : '—'}</p>
                <p><strong>Built-up Area:</strong> {selectedProperty.builtup_area ? `${selectedProperty.builtup_area} ${selectedProperty.builtup_unit}` : '—'}</p>
                <p><strong>Plot Size:</strong> {selectedProperty.plot_size ? `${selectedProperty.plot_size} ${selectedProperty.plot_unit}` : '—'}</p>
                <p><strong>Location:</strong> {selectedProperty.location}</p>
              </div>

              <p style={{ marginTop: '10px' }}><strong>Address:</strong> {selectedProperty.property_address}</p>
              <p><strong>Description:</strong> {selectedProperty.additional_info || '—'}</p>
              <p><strong>Amenities:</strong> {selectedProperty.amenities?.length ? selectedProperty.amenities.join(', ') : '—'}</p>

              <hr style={{ margin: '1rem 0' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', fontSize: '0.9rem' }}>
                <p><strong>Owner:</strong> {selectedProperty.owner_name}</p>
                <p><strong>Phone:</strong> {selectedProperty.phone}</p>
                <p><strong>Email:</strong> {selectedProperty.email}</p>
                <p><strong>Member Type:</strong> {selectedProperty.member_type}</p>
              </div>

              {selectedProperty.images?.length > 1 && (
                <>
                  <p style={{ marginTop: '1rem' }}><strong>All Images:</strong></p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedProperty.images.map((img, i) => (
                      <img key={i} src={img} alt={`img-${i}`} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px' }} />
                    ))}
                  </div>
                </>
              )}

              <button onClick={() => setSelectedProperty(null)}
                style={{ marginTop: '1.5rem', background: '#288849', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ EDIT PROPERTY MODAL (Supabase "sell" — full form) ════════════════ */}
      <AnimatePresence>
        {editingProperty && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}
            onClick={() => setEditingProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#fff', width: '700px', maxWidth: '95%', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', padding: '30px', color: '#111' }}
            >
              <h2 style={{ marginBottom: '1.5rem' }}>Edit Property</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Title</label>
                  <input type="text" value={editingProperty.title || ''} placeholder="Title"
                    onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Price</label>
                  <input type="text" value={editingProperty.price || ''} placeholder="Price"
                    onChange={(e) => setEditingProperty({ ...editingProperty, price: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Property Category</label>
                  <select value={editingProperty.property_category || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, property_category: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <option value="">Select Category</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Property Type</label>
                  <select value={editingProperty.property_type || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, property_type: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <option value="">Select Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="plot">Plot / Land</option>
                  </select>
                </div>

                {editingProperty.property_type === 'apartment' && (
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Apartment Type</label>
                    <select value={editingProperty.apartment_type || ''}
                      onChange={(e) => setEditingProperty({ ...editingProperty, apartment_type: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                      <option value="">Select Apartment Type</option>
                      <option value="corporate">Corporate</option>
                      <option value="scalable">Scalable</option>
                      <option value="uds">UDS</option>
                    </select>
                  </div>
                )}

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Location</label>
                  <select value={editingProperty.location || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <option value="">Select Location</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Thiruvallur">Thiruvallur</option>
                    <option value="Kanchipuram">Kanchipuram</option>
                  </select>
                </div>

                {editingProperty.property_type === 'villa' && (
                  <>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Land Area</label>
                      <input type="text" value={editingProperty.land_area || ''}
                        onChange={(e) => setEditingProperty({ ...editingProperty, land_area: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Land Area Unit</label>
                      <select value={editingProperty.land_area_unit || 'sqft'}
                        onChange={(e) => setEditingProperty({ ...editingProperty, land_area_unit: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <option value="sqft">Sq.ft</option>
                        <option value="acre">Acre</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Built-up Area</label>
                      <input type="text" value={editingProperty.builtup_area || ''}
                        onChange={(e) => setEditingProperty({ ...editingProperty, builtup_area: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Built-up Unit</label>
                      <select value={editingProperty.builtup_unit || 'sqft'}
                        onChange={(e) => setEditingProperty({ ...editingProperty, builtup_unit: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <option value="sqft">Sq.ft</option>
                        <option value="acre">Acre</option>
                      </select>
                    </div>
                  </>
                )}

                {editingProperty.property_type === 'plot' && (
                  <>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Plot Size</label>
                      <input type="text" value={editingProperty.plot_size || ''}
                        onChange={(e) => setEditingProperty({ ...editingProperty, plot_size: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Plot Unit</label>
                      <select value={editingProperty.plot_unit || 'sqft'}
                        onChange={(e) => setEditingProperty({ ...editingProperty, plot_unit: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <option value="sqft">Sq.ft</option>
                        <option value="acre">Acre</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Owner Name</label>
                  <input type="text" value={editingProperty.owner_name || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, owner_name: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Phone</label>
                  <input type="text" value={editingProperty.phone || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Email</label>
                  <input type="email" value={editingProperty.email || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, email: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Member Type</label>
                  <select value={editingProperty.member_type || 'new'}
                    onChange={(e) => setEditingProperty({ ...editingProperty, member_type: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <option value="new">New Member</option>
                    <option value="existing">Existing Member</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Status</label>
                  <select value={editingProperty.status || 'pending'}
                    onChange={(e) => setEditingProperty({ ...editingProperty, status: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Property Address</label>
                <textarea value={editingProperty.property_address || ''} placeholder="Property Address"
                  onChange={(e) => setEditingProperty({ ...editingProperty, property_address: e.target.value })}
                  style={{ width: '100%', minHeight: '70px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>

              <div style={{ marginTop: '12px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea value={editingProperty.additional_info || ''} placeholder="Description"
                  onChange={(e) => setEditingProperty({ ...editingProperty, additional_info: e.target.value })}
                  style={{ width: '100%', minHeight: '90px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button onClick={handleSaveEdit} disabled={savingEdit}
                  style={{ background: '#288849', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: savingEdit ? 'not-allowed' : 'pointer', opacity: savingEdit ? 0.7 : 1 }}>
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
                <button onClick={() => setEditingProperty(null)} style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </motion.div>    
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;



//wwsewswswssw
