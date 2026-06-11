





// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { MapPin, Phone, User, Calendar, ShieldCheck, CheckCircle2, Navigation, FileCheck, Loader, AlertCircle } from 'lucide-react';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// const BookVisitPage = () => {
//   const [form, setForm] = useState({
//     name: '',
//     phone: '',
//     date: '',
//     property: 'Padappai - Villa Plots',
//   });
//   const [status, setStatus] = useState('idle'); // idle | loading | success | error

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name.trim() || !form.phone.trim() || !form.date) {
//       alert('Please fill all required fields.');
//       return;
//     }

//     setStatus('loading');

//     try {
//       const res = await fetch(`${API_URL}/api/book-visit`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setStatus('success');
//       } else {
//         setStatus('error');
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus('error');
//     }
//   };

//   const inputStyle = {
//     border: 'none',
//     outline: 'none',
//     width: '100%',
//     font: 'inherit',
//     background: 'transparent',
//     fontSize: '0.95rem',
//   };

//   const fieldStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '15px',
//     borderBottom: '1px solid #eee',
//     paddingBottom: '10px',
//   };

//   return (
//     <div className="book-visit-page-detailed">

//       {/* ── Hero ── */}
//       <section
//         style={{
//           height: '70vh',
//           position: 'relative',
//           display: 'flex',
//           alignItems: 'center',
//           paddingTop: '100px',
//           background: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000) center/cover no-repeat',
//         }}
//       >
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.95))' }} />
//         <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//             <h1 className="serif" style={{ fontSize: '5rem', color: 'white', marginBottom: '1rem' }}>
//               Experience Before <br /><span className="highlight">You Invest.</span>
//             </h1>
//             <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
//               Book a curated site tour and witness the Greenfield quality firsthand. No obligations, just clarity.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* ── What to Expect ── */}
//       <section style={{ padding: '10rem 0', background: '#fcfcfc' }}>
//         <div className="container">
//           <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
//             <span className="badge-premium">Your Visit Guide</span>
//             <h2 className="section-title serif">What to <span className="highlight">Expect</span></h2>
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem' }}>
//             {[
//               { icon: <Navigation size={32} />, title: 'Guided Site Tour',   desc: 'A personal walkthrough of the entire layout and amenities.' },
//               { icon: <MapIcon size={32} />,    title: 'Layout Explanation', desc: 'Detailed brief on plot markings, road widths, and future plans.' },
//               { icon: <TrendingUp size={32} />, title: 'Investment Advice',  desc: 'Consultation on ROI potential and market trends in the area.' },
//               { icon: <FileCheck size={32} />,  title: 'Doc. Clarity',       desc: 'Review legal papers, DTCP approvals, and parent documents.' },
//             ].map((item, i) => (
//               <div key={i} style={{ padding: '3rem', background: 'white', borderRadius: '20px', border: '1px solid #eee', textAlign: 'center' }}>
//                 <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
//                 <h4 className="serif" style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{item.title}</h4>
//                 <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Booking Form ── */}
//       <section style={{ padding: '10rem 0' }}>
//         <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8rem', alignItems: 'center' }}>

//           <div style={{ background: 'white', padding: '5rem', borderRadius: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>

//             {/* ── Success State ── */}
//             {status === 'success' ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 style={{ textAlign: 'center', padding: '3rem 0' }}
//               >
//                 <CheckCircle2 size={80} color="var(--accent-emerald)" style={{ marginBottom: '2rem' }} />
//                 <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Visit Scheduled!</h2>
//                 <p style={{ color: 'var(--text-light)' }}>Our team will contact you shortly to confirm your visit details.</p>
//                 <button
//                   onClick={() => { setStatus('idle'); setForm({ name: '', phone: '', date: '', property: 'Padappai - Villa Plots' }); }}
//                   style={{ marginTop: '2rem', color: 'var(--accent-gold)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
//                 >
//                   Book another visit
//                 </button>
//               </motion.div>
//             ) : (
//               <>
//                 {/* ── Error Banner ── */}
//                 {status === 'error' && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
//                     style={{ background: '#ffebee', border: '1px solid #ef9a9a', borderRadius: '12px', padding: '14px 18px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#c62828' }}
//                   >
//                     <AlertCircle size={20} />
//                     <div>
//                       <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Something went wrong!</div>
//                       <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Please try again or call us directly.</div>
//                     </div>
//                   </motion.div>
//                 )}

//                 <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
//                     <div style={fieldStyle}>
//                       <User size={18} color="var(--accent-gold)" />
//                       <input
//                         type="text" name="name" value={form.name}
//                         onChange={handleChange} placeholder="Full Name"
//                         style={inputStyle} required
//                       />
//                     </div>
//                     <div style={fieldStyle}>
//                       <Phone size={18} color="var(--accent-gold)" />
//                       <input
//                         type="tel" name="phone" value={form.phone}
//                         onChange={handleChange} placeholder="Phone Number"
//                         style={inputStyle} required
//                       />
//                     </div>
//                   </div>

//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
//                     <div style={fieldStyle}>
//                       <Calendar size={18} color="var(--accent-gold)" />
//                       <input
//                         type="date" name="date" value={form.date}
//                         onChange={handleChange}
//                         min={new Date().toISOString().split('T')[0]}
//                         style={inputStyle} required
//                       />
//                     </div>
//                     <div style={fieldStyle}>
//                       <MapPin size={18} color="var(--accent-gold)" />
//                       <select
//                         name="property" value={form.property}
//                         onChange={handleChange}
//                         style={{ ...inputStyle, cursor: 'pointer' }}
//                       >
//                         <option>Padappai - Villa Plots</option>
//                         <option>Chengalpattu - Farm Land</option>
//                         <option>Kanchipuram - Residential Plots</option>
//                         <option>Vadapalani - Commercial Sites</option>
//                       </select>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={status === 'loading'}
//                     style={{
//                       background: status === 'loading' ? '#555' : 'var(--primary-dark)',
//                       color: 'white',
//                       padding: '1.2rem',
//                       fontWeight: 700,
//                       borderRadius: '4px',
//                       cursor: status === 'loading' ? 'not-allowed' : 'pointer',
//                       border: 'none',
//                       fontSize: '1rem',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       gap: '10px',
//                       transition: 'background 0.2s',
//                     }}
//                   >
//                     {status === 'loading'
//                       ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Booking…</>
//                       : 'CONFIRM SITE VISIT'
//                     }
//                   </button>

//                   <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//                 </form>
//               </>
//             )}
//           </div>

//           <div>
//             <span className="badge-premium">Special Assurance</span>
//             <h2 className="serif" style={{ fontSize: '3.5rem', margin: '2rem 0' }}>No <span className="highlight">Obligation</span> Visit</h2>
//             <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '3rem' }}>
//               We believe in the quality of our projects. That's why we offer free site visits with zero pressure to buy. Our goal is to provide you with all the information you need to make an informed decision.
//             </p>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
//               {[
//                 'Free Consultation',
//                 'Transportation Assistance (On Request)',
//                 'Comprehensive Legal Briefing',
//               ].map((item, i) => (
//                 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 600 }}>
//                   <CheckCircle2 color="var(--accent-gold)" /> {item}
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ── Trust Section ── */}
//       <section style={{ padding: '8rem 0', background: 'var(--accent-emerald)', color: 'white', textAlign: 'center' }}>
//         <div className="container">
//           <h3 className="serif" style={{ fontSize: '2.5rem' }}>Safe & Secure Investment.</h3>
//           <p style={{ marginTop: '1rem', opacity: 0.7 }}>Over 500+ site visits organized every month across Chennai.</p>
//         </div>
//       </section>

//     </div>
//   );
// };

// // ── Inline SVG Icons ──────────────────────────────────────────────────────────
// const MapIcon = ({ size }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
//   </svg>
// );

// const TrendingUp = ({ size }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
//   </svg>
// );

// export default BookVisitPage;







import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, User, Calendar,
  CheckCircle2, Navigation, FileCheck,
  Loader, AlertCircle,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/* ── Inline SVG Icons ─────────────────────────────────────────────────────── */
const MapIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
  </svg>
);
const TrendingUp = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

/* ── Responsive helper: injects a <style> block once ─────────────────────── */
const ResponsiveStyles = () => (
  <style>{`
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Container */
    .bv-container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 clamp(1rem, 4vw, 2rem);
      box-sizing: border-box;
    }

    /* Hero heading */
    .bv-hero-h1 {
      font-size: clamp(2.2rem, 6vw, 5rem);
      color: white;
      margin-bottom: 1rem;
      line-height: 1.15;
    }

    /* "What to Expect" grid — 4 → 2 → 1 col */
    .bv-expect-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: clamp(1.5rem, 3vw, 4rem);
    }
    @media (max-width: 1024px) {
      .bv-expect-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 540px) {
      .bv-expect-grid { grid-template-columns: 1fr; }
    }

    /* Booking section: form + text side by side → stacked */
    .bv-booking-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: clamp(2rem, 6vw, 8rem);
      align-items: center;
    }
    @media (max-width: 900px) {
      .bv-booking-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      /* show text block first on mobile */
      .bv-booking-grid .bv-text-col { order: -1; }
    }

    /* Form inner grid: 2 col → 1 col on narrow */
    .bv-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(1rem, 3vw, 2rem);
    }
    @media (max-width: 540px) {
      .bv-form-row { grid-template-columns: 1fr; }
    }

    /* Form card padding */
    .bv-form-card {
      background: white;
      border-radius: clamp(20px, 4vw, 40px);
      padding: clamp(2rem, 5vw, 5rem);
      box-shadow: 0 40px 100px rgba(0,0,0,0.08);
      border: 1px solid #eee;
    }

    /* Section vertical padding */
    .bv-section-expect { padding: clamp(4rem, 8vw, 10rem) 0; background: #fcfcfc; }
    .bv-section-booking { padding: clamp(4rem, 8vw, 10rem) 0; }
    .bv-section-trust   { padding: clamp(3rem, 6vw, 8rem) 0; background: var(--accent-emerald, #1a5c37); color: white; text-align: center; }

    /* Section title */
    .bv-section-title {
      font-size: clamp(1.8rem, 4vw, 3.5rem);
      margin: 1.5rem 0;
    }
    .bv-text-col .bv-section-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
    }

    /* Trust heading */
    .bv-trust-h3 { font-size: clamp(1.5rem, 3vw, 2.5rem); }

    /* Hero sub */
    .bv-hero-sub {
      color: rgba(255,255,255,0.7);
      font-size: clamp(0.95rem, 2vw, 1.2rem);
      max-width: 700px;
      margin: 0 auto;
    }
  `}</style>
);

/* ── BookVisitPage ────────────────────────────────────────────────────────── */
const BookVisitPage = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    property: 'Padappai - Villa Plots',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.date) {
      alert('Please fill all required fields.');
      return;
    }
    setStatus('loading');
    try {
      const res  = await fetch(`${API_URL}/api/book-visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  /* shared input/field styles — defined here so JSX stays clean */
  const inputStyle = {
    border: 'none', outline: 'none', width: '100%',
    font: 'inherit', background: 'transparent', fontSize: '0.95rem',
  };
  const fieldStyle = {
    display: 'flex', alignItems: 'center', gap: '12px',
    borderBottom: '1px solid #eee', paddingBottom: '10px',
  };

  return (
    <div>
      <ResponsiveStyles />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '60vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: '3rem',
        background: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000) center/cover no-repeat',
        boxSizing: 'border-box',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.95))' }} />
        <div className="bv-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="bv-hero-h1 serif">
              Experience Before <br /><span className="highlight">You Invest.</span>
            </h1>
            <p className="bv-hero-sub">
              Book a curated site tour and witness the Greenfield quality firsthand. No obligations, just clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── What to Expect ────────────────────────────────────────────────── */}
      <section className="bv-section-expect">
        <div className="bv-container">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>
            <span className="badge-premium">Your Visit Guide</span>
            <h2 className="section-title serif bv-section-title">
              What to <span className="highlight">Expect</span>
            </h2>
          </div>
          <div className="bv-expect-grid">
            {[
              { icon: <Navigation size={32} />, title: 'Guided Site Tour',   desc: 'A personal walkthrough of the entire layout and amenities.' },
              { icon: <MapIcon    size={32} />, title: 'Layout Explanation', desc: 'Detailed brief on plot markings, road widths, and future plans.' },
              { icon: <TrendingUp size={32} />, title: 'Investment Advice',  desc: 'Consultation on ROI potential and market trends in the area.' },
              { icon: <FileCheck  size={32} />, title: 'Doc. Clarity',       desc: 'Review legal papers, DTCP approvals, and parent documents.' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: 'clamp(1.5rem, 3vw, 3rem)',
                background: 'white', borderRadius: '20px',
                border: '1px solid #eee', textAlign: 'center',
              }}>
                <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <h4 className="serif" style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', marginBottom: '0.75rem' }}>
                  {item.title}
                </h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ──────────────────────────────────────────────────── */}
      <section className="bv-section-booking">
        <div className="bv-container">
          <div className="bv-booking-grid">

            {/* Form Card */}
            <div className="bv-form-card">

              {/* Success state */}
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '3rem 0' }}
                >
                  <CheckCircle2 size={80} color="var(--accent-emerald)" style={{ marginBottom: '2rem' }} />
                  <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
                    Visit Scheduled!
                  </h2>
                  <p style={{ color: 'var(--text-light)' }}>
                    Our team will contact you shortly to confirm your visit details.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', phone: '', date: '', property: 'Padappai - Villa Plots' }); }}
                    style={{ marginTop: '2rem', color: 'var(--accent-gold)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                  >
                    Book another visit
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Error banner */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                      style={{ background: '#ffebee', border: '1px solid #ef9a9a', borderRadius: '12px', padding: '14px 18px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#c62828' }}
                    >
                      <AlertCircle size={20} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Something went wrong!</div>
                        <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Please try again or call us directly.</div>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Row 1: Name + Phone */}
                    <div className="bv-form-row">
                      <div style={fieldStyle}>
                        <User size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                        <input type="text"  name="name"  value={form.name}  onChange={handleChange} placeholder="Full Name"     style={inputStyle} required />
                      </div>
                      <div style={fieldStyle}>
                        <Phone size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                        <input type="tel"   name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number"  style={inputStyle} required />
                      </div>
                    </div>

                    {/* Row 2: Date + Property */}
                    <div className="bv-form-row">
                      <div style={fieldStyle}>
                        <Calendar size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                        <input
                          type="date" name="date" value={form.date} onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          style={inputStyle} required
                        />
                      </div>
                      <div style={fieldStyle}>
                        <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                        <select name="property" value={form.property} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                          <option>Padappai - Villa Plots</option>
                          <option>Chengalpattu - Farm Land</option>
                          <option>Kanchipuram - Residential Plots</option>
                          <option>Vadapalani - Commercial Sites</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      style={{
                        background: status === 'loading' ? '#555' : 'var(--primary-dark)',
                        color: 'white', padding: '1.2rem', fontWeight: 700,
                        borderRadius: '4px', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        border: 'none', fontSize: '1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        transition: 'background 0.2s', width: '100%',
                      }}
                    >
                      {status === 'loading'
                        ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Booking…</>
                        : 'CONFIRM SITE VISIT'
                      }
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Text Column */}
            <div className="bv-text-col">
              <span className="badge-premium">Special Assurance</span>
              <h2 className="serif bv-section-title" style={{ margin: '1.5rem 0' }}>
                No <span className="highlight">Obligation</span> Visit
              </h2>
              <p style={{ color: 'var(--text-light)', fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                We believe in the quality of our projects. That's why we offer free site visits with zero pressure to buy. Our goal is to provide you with all the information you need to make an informed decision.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  'Free Consultation',
                  'Transportation Assistance (On Request)',
                  'Comprehensive Legal Briefing',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                    <CheckCircle2 size={20} color="var(--accent-gold)" style={{ flexShrink: 0 }} /> {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trust Strip ───────────────────────────────────────────────────── */}
      <section className="bv-section-trust">
        <div className="bv-container">
          <h3 className="serif bv-trust-h3">Safe & Secure Investment.</h3>
          <p style={{ marginTop: '1rem', opacity: 0.7, fontFamily: 'sans-serif', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
            Over 500+ site visits organized every month across Chennai.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BookVisitPage;
