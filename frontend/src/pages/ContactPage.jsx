

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, Send } from 'lucide-react';
// import mapImg from '../images/map1.jpeg';

// const ContactPage = () => {
//   return (
//     <div className="contact-page-detailed">
//       {/* Hero Section */}
//       <section className="contact-hero" style={{ 
//         height: '50vh', 
//         position: 'relative', 
//         display: 'flex', 
//         alignItems: 'center',
//         overflow: 'hidden'
//       }}>
//         <motion.div 
//           initial={{ scale: 1.15 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           style={{
//             position: 'absolute',
//             inset: 0,
//             background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat',
//             zIndex: 0
//           }}
//         />
//         <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.6), rgba(15,26,17,0.9))', zIndex: 1 }} />
//         <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '0' }}>We're Here to <span className="highlight">Help You.</span></h1>
//             <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--font-base)', marginTop: '0.5rem' }}>Get in touch with our experts for a personalized investment consultation.</p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Contact Cards - Reduced padding */}
//       <section style={{ padding: '3rem 0', background: '#f9f9f9' }}>
//         <div className="container">
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
//             {[
//               { icon: <Phone size={28} />, title: "Call Us", val: "+91 98765 43210", desc: "Available Mon-Sat, 9AM-7PM" },
//               { icon: <Mail size={28} />, title: "Email Us", val: "info@greenfield.com", desc: "Expect a reply within 24 hours" },
//               { icon: <MapPin size={28} />, title: "Visit Us", val: "Anna Nagar, Chennai", desc: "Our corporate headquarters" }
//             ].map((card, i) => (
//               <div key={i} style={{ padding: '2rem', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', border: '1px solid #eee' }}>
//                 <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{card.icon}</div>
//                 <h3 className="serif" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{card.title}</h3>
//                 <p style={{ fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{card.val}</p>
//                 <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{card.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Inquiry Form Section - Reduced gaps */}
//       <section style={{ padding: '3rem 0' }}>
//         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
//           <div>
//             <span className="badge-premium">Get a Quote</span>
//             <h2 className="serif" style={{ fontSize: 'var(--font-xl)', margin: '1rem 0 1rem 0' }}>Request <span className="highlight">Personalized</span> Details</h2>
//             <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
//               Whether you're looking for an immediate investment or a long-term villa plot, our team will help you find the right fit based on your budget and preferred location.
//             </p>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
//               <ShieldCheck size={20} /> <span style={{ fontSize: '0.85rem' }}>"We respond within 24 business hours"</span>
//             </div>
//           </div>
//           <div style={{ background: 'white', padding: '2.5rem', borderRadius: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
//             <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//                 <div className="input-group-modern">
//                   <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Full Name</label>
//                   <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', font: 'inherit' }} />
//                 </div>
//                 <div className="input-group-modern">
//                   <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Phone Number</label>
//                   <input type="tel" placeholder="+91 00000 00000" style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', font: 'inherit' }} />
//                 </div>
//               </div>
//               <div className="input-group-modern">
//                 <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Preferred Location</label>
//                 <select style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', font: 'inherit', background: 'transparent' }}>
//                   <option>OMR, Chennai</option>
//                   <option>ECR, Chennai</option>
//                   <option>GST Road, Chennai</option>
//                   <option>Oragadam</option>
//                 </select>
//               </div>
//               <div className="input-group-modern">
//                 <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '5px', display: 'block' }}>Investment Budget</label>
//                 <select style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', font: 'inherit', background: 'transparent' }}>
//                   <option>25L - 50L</option>
//                   <option>50L - 1Cr</option>
//                   <option>Above 1Cr</option>
//                 </select>
//               </div>
//               <button 
//                 className="submit-btn" 
//                 style={{ marginTop: '1.5rem', background: 'var(--primary-dark)', color: 'white', padding: '0.8rem', fontWeight: 700, borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: 'none' }}
//                 onClick={(e) => e.preventDefault()}
//               >
//                 <Send size={16} /> Send Inquiry
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* Branch Addresses & Building Section - Reduced gaps */}
//       <section style={{ padding: '3rem 0', background: 'white' }}>
//         <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
//           <div>
//             <h2 className="serif" style={{ fontSize: 'var(--font-xl)', marginBottom: '1.5rem' }}>Our <span className="highlight">Offices</span></h2>
            
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
//               <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
//                 <div style={{ background: 'var(--primary-bg)', padding: '0.8rem', borderRadius: '50%', color: 'var(--accent-gold)' }}><MapPin size={20} /></div>
//                 <div>
//                   <h3 className="serif" style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--primary-dark)' }}>Guindy Head Office</h3>
//                   <p style={{ color: 'var(--text-light)', lineHeight: 1.5, fontSize: '0.85rem' }}>12, RSV Tower, Industrial Estate, Guindy, Chennai 600032</p>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
//                 <div style={{ background: 'var(--primary-bg)', padding: '0.8rem', borderRadius: '50%', color: 'var(--accent-gold)' }}><MapPin size={20} /></div>
//                 <div>
//                   <h3 className="serif" style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--primary-dark)' }}>Tambaram Hub</h3>
//                   <p style={{ color: 'var(--text-light)', lineHeight: 1.5, fontSize: '0.85rem' }}>45, RSV Plaza, GST Road, Tambaram, Chennai 600045</p>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
//                 <div style={{ background: 'var(--primary-bg)', padding: '0.8rem', borderRadius: '50%', color: 'var(--accent-gold)' }}><MapPin size={20} /></div>
//                 <div>
//                   <h3 className="serif" style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--primary-dark)' }}>OMR Estate Branch</h3>
//                   <p style={{ color: 'var(--text-light)', lineHeight: 1.5, fontSize: '0.85rem' }}>88, RSV Coastal Tech Park, Rajiv Gandhi Salai (OMR), Navalur, Chennai 600130</p>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div style={{ position: 'relative' }}>
//              <img 
//                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
//                alt="RSV Groups Building" 
//                style={{ width: '100%', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
//              />
//              <div style={{ position: 'absolute', bottom: '-15px', left: '-15px', background: 'var(--primary-dark)', color: 'var(--accent-gold)', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}>
//                 <h3 className="serif" style={{ fontSize: 'var(--font-md)', marginBottom: '3px' }}>RSV Groups</h3>
//                 <p style={{ color: 'white', fontSize: '0.75rem', marginBottom: 0 }}>Corporate Headquarters</p>
//              </div>
//           </div>
//         </div>
//       </section>

//       {/* Chennai Hubs Map Section */}
//       <section style={{ height: '400px', position: 'relative', overflow: 'hidden' }}>
//          <a 
//            href="https://www.google.com/maps/search/Chennai" 
//            target="_blank" 
//            rel="noopener noreferrer" 
//            style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}
//          >
//            <div style={{ 
//              position: 'absolute', 
//              inset: 0, 
//              background: `url(${mapImg}) center/cover no-repeat`,
//              transition: 'filter 0.3s ease'
//            }} 
//            />
           
//            <div style={{ position: 'absolute', inset: 0, padding: '1rem' }}>
//               <div className="container" style={{ height: '100%', position: 'relative' }}>
//                 <div style={{ textAlign: 'center', marginTop: '2rem', background: 'var(--primary-dark)', padding: '1rem', borderRadius: '12px', maxWidth: '350px', margin: '2rem auto 0', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
//                   <h2 className="serif" style={{ color: 'white', fontSize: 'var(--font-md)', marginBottom: '0' }}>Our Chennai <span className="highlight">Hubs</span></h2>
//                   <p style={{ color: 'var(--accent-gold)', fontSize: '0.7rem', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Click to view on Google Maps</p>
//                 </div>
//               </div>
//            </div>
//          </a>
//       </section>

//       {/* Quick Actions - Reduced padding */}
//       <section style={{ padding: '2rem 0', background: 'var(--primary-dark)', color: 'white' }}>
//          <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
//             <button className="book-btn" style={{ gap: '8px', padding: '0.8rem 1.5rem', cursor: 'pointer' }}><Phone size={16} /> Call Now</button>
//             <button className="book-btn" style={{ background: 'transparent', border: '1px solid #25D366', color: '#25D366', gap: '8px', padding: '0.8rem 1.5rem', cursor: 'pointer' }}>
//                <MessageSquare size={16} /> WhatsApp Chat
//             </button>
//          </div>
//       </section>
//     </div>
//   );
// };

// export default ContactPage;





import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import mapImg from '../images/map1.jpeg';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    location: 'OMR, Chennai',
    budget: '25L - 50L',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      alert('Please enter your Name and Phone number.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setForm({ name: '', phone: '', location: 'OMR, Chennai', budget: '25L - 50L' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 0',
    border: 'none',
    borderBottom: '1px solid #ddd',
    outline: 'none',
    font: 'inherit',
    boxSizing: 'border-box',
    background: 'transparent',
  };

  const labelStyle = {
    fontSize: '0.7rem',
    fontWeight: 700,
    color: 'var(--accent-gold)',
    textTransform: 'uppercase',
    marginBottom: '5px',
    display: 'block',
  };

  const locations = {
  padappai: {
    name: "Padappai",
    lat: 12.8808,
    lng: 80.0224,
    mapsUrl: "https://maps.google.com/?q=Padappai"
  },
  vadapalani: {
    name: "Vadapalani",
    lat: 13.0500,
    lng: 80.2121,
    mapsUrl: "https://maps.google.com/?q=Vadapalani"
  },
  chengalpattu: {
    name: "Chengalpattu",
    lat: 12.6819,
    lng: 79.9835,
    mapsUrl: "https://maps.google.com/?q=Chengalpattu"
  },
  kanchipuram: {
    name: "Kanchipuram",
    lat: 12.8342,
    lng: 79.7036,
    mapsUrl: "https://maps.google.com/?q=Kanchipuram"
  }
};

const [selectedLocation, setSelectedLocation] =
  useState(locations.padappai);

  return (
    <div className="contact-page-detailed">

      {/* ── Hero ── */}
      <section className="contact-hero" style={{ height: '75vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div
          initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat', zIndex: 0 }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.6), rgba(15,26,17,0.9))', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '0' }}>
              We're Here to <span className="highlight">Help You.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--font-base)', marginTop: '0.5rem' }}>
              Get in touch with our experts for a personalized investment consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section style={{ padding: '3rem 0', background: '#f9f9f9' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { icon: <Phone size={28} />, title: 'Call Us',   val: '+91 98765 43210',    desc: 'Available Mon-Sat, 9AM-7PM' },
              { icon: <Mail size={28} />,  title: 'Email Us',  val: 'info@rsvgroups.com', desc: 'Expect a reply within 24 hours' },
              { icon: <MapPin size={28} />,title: 'Visit Us',  val: 'Anna Nagar, Chennai', desc: 'Our corporate headquarters' },
            ].map((card, i) => (
              <div key={i} style={{ padding: '2rem', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', border: '1px solid #eee' }}>
                <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{card.icon}</div>
                <h3 className="serif" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{card.title}</h3>
                <p style={{ fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{card.val}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <section style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <span className="badge-premium">Get a Quote</span>
            <h2 className="serif" style={{ fontSize: 'var(--font-xl)', margin: '1rem 0' }}>
              Request <span className="highlight">Personalized</span> Details
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Whether you're looking for an immediate investment or a long-term villa plot, our team will help you find the right fit based on your budget and preferred location.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              <ShieldCheck size={20} />
              <span style={{ fontSize: '0.85rem' }}>"We respond within 24 business hours"</span>
            </div>
          </div>

          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>

            {/* ── Success Message ── */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '12px', padding: '14px 18px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#2e7d32' }}
              >
                <CheckCircle size={20} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Inquiry Sent Successfully!</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>We'll get back to you within 24 hours.</div>
                </div>
              </motion.div>
            )}

            {/* ── Error Message ── */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: '#ffebee', border: '1px solid #ef9a9a', borderRadius: '12px', padding: '14px 18px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#c62828' }}
              >
                <AlertCircle size={20} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Something went wrong!</div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Please try again or call us directly.</div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group-modern">
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="input-group-modern">
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div className="input-group-modern">
                <label style={labelStyle}>Preferred Location</label>
                <select name="location" value={form.location} onChange={handleChange} style={inputStyle}>
                  <option>Chennai</option>
                  <option>Thiruvallur</option>
                  <option>Kanchipuram</option>
                </select>
              </div>

              <div className="input-group-modern">
                <label style={labelStyle}>Investment Budget</label>
                <select name="budget" value={form.budget} onChange={handleChange} style={inputStyle}>
                  <option>25L - 50L</option>
                  <option>50L - 1Cr</option>
                  <option>Above 1Cr</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  marginTop: '1.5rem',
                  background: status === 'loading' ? '#555' : 'var(--primary-dark)',
                  color: 'white',
                  padding: '0.9rem',
                  fontWeight: 700,
                  borderRadius: '4px',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none',
                  transition: 'background 0.2s',
                  fontSize: '0.95rem',
                }}
              >
                {status === 'loading'
                  ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                  : <><Send size={16} /> Send Inquiry</>
                }
              </button>

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </form>
          </div>
        </div>
      </section>

      {/* ── Branch Addresses ── */}
      <section style={{ padding: '3rem 0', background: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 className="serif" style={{ fontSize: 'var(--font-xl)', marginBottom: '1.5rem' }}>Our <span className="highlight">Offices</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { title: 'Guindy Head Office', addr: '12, RSV Tower, Industrial Estate, Guindy, Chennai 600032' },
                { title: 'Tambaram Hub',        addr: '45, RSV Plaza, GST Road, Tambaram, Chennai 600045' },
                { title: 'OMR Estate Branch',   addr: '88, RSV Coastal Tech Park, Rajiv Gandhi Salai (OMR), Navalur, Chennai 600130' },
              ].map((o, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--primary-bg)', padding: '0.8rem', borderRadius: '50%', color: 'var(--accent-gold)', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="serif" style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--primary-dark)' }}>{o.title}</h3>
                    <p style={{ color: 'var(--text-light)', lineHeight: 1.5, fontSize: '0.85rem' }}>{o.addr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
              alt="RSV Groups Building"
              style={{ width: '100%', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            />
            <div style={{ position: 'absolute', bottom: '-15px', left: '-15px', background: 'var(--primary-dark)', color: 'var(--accent-gold)', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}>
              <h3 className="serif" style={{ fontSize: 'var(--font-md)', marginBottom: '3px' }}>RSV Groups</h3>
              <p style={{ color: 'white', fontSize: '0.75rem', marginBottom: 0 }}>Corporate Headquarters</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Location Map ── */}

<section
  style={{
    padding: "5rem 0",
    background:
      "linear-gradient(180deg,#f8faf8 0%,#ffffff 100%)"
  }}
>
  <div className="container">

    <div
      style={{
        textAlign: "center",
        marginBottom: "3rem"
      }}
    >
      <span className="badge-premium">
        RSV Locations
      </span>

      <h2
        className="serif"
        style={{
          fontSize: "var(--font-xl)",
          marginTop: "1rem"
        }}
      >
        Explore Our
        <span className="highlight">
          {" "}Property Hubs
        </span>
      </h2>

      <p
        style={{
          color: "var(--text-light)",
          maxWidth: "700px",
          margin: "0 auto"
        }}
      >
        Visit our major locations across Chennai and
        Kanchipuram district. Click a location to
        explore it on the map.
      </p>
    </div>

    {/* Location Cards */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "1.5rem",
        marginBottom: "2rem"
      }}
    >
      {Object.entries(locations).map(([key, loc]) => (

        <motion.div
          whileHover={{
            y: -5
          }}
          key={key}
          onClick={() =>
            setSelectedLocation(loc)
          }
          style={{
            cursor: "pointer",
            background:
              selectedLocation.name === loc.name
                ? "var(--primary-dark)"
                : "white",
            color:
              selectedLocation.name === loc.name
                ? "white"
                : "inherit",
            padding: "1.5rem",
            borderRadius: "20px",
            border:
              selectedLocation.name === loc.name
                ? "2px solid var(--accent-gold)"
                : "1px solid #eee",
            boxShadow:
              "0 15px 40px rgba(0,0,0,0.06)",
            transition: "all .3s"
          }}
        >
          <MapPin
            size={28}
            color={
              selectedLocation.name === loc.name
                ? "#d4af37"
                : "#0d3b25"
            }
          />

          <h3
            className="serif"
            style={{
              marginTop: "1rem"
            }}
          >
            {loc.name}
          </h3>

          <p
            style={{
              fontSize: ".85rem",
              opacity: .8
            }}
          >
            Click to view location
          </p>
        </motion.div>

      ))}
    </div>

    {/* Map */}

    <div
      style={{
        overflow: "hidden",
        borderRadius: "25px",
        boxShadow:
          "0 25px 60px rgba(0,0,0,.12)",
        border: "1px solid #eee"
      }}
    >
      <iframe
        title="RSV Location Map"
        width="100%"
        height="550"
        style={{
          border: "none"
        }}
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&z=15&output=embed`}
      />
    </div>

    <div
      style={{
        textAlign: "center",
        marginTop: "2rem"
      }}
    >
      <a
        href={selectedLocation.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background:
            "var(--primary-dark)",
          color: "white",
          textDecoration: "none",
          padding: "14px 24px",
          borderRadius: "50px",
          fontWeight: "700"
        }}
      >
        <MapPin size={18} />
        Open {selectedLocation.name} in Google Maps
      </a>
    </div>

  </div>
</section>

    </div>
  );
};

export default ContactPage;
