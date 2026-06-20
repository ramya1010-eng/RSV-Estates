

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Users, Building2, Award, Gem, Target, Eye, ShieldCheck, HeartPulse } from 'lucide-react';

// const AboutPage = ({ onNavigate }) => {
//   const stats = [
//     { num: "15+", label: "Years Experience" },
//     { num: "50+", label: "Projects Completed" },
//     { num: "1500+", label: "Happy Customers" },
//     { num: "10+", label: "Acres Developed" }
//   ];

//   return (
//     <div className="about-page-detailed">
//       {/* Hero Section */}
//       <section className="about-hero" style={{ 
//         height: '60vh', 
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
//             background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000) center/cover no-repeat',
//             zIndex: 0
//           }}
//         />
//         <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))', zIndex: 1 }} />
//         <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1rem' }}>Driven by <span className="highlight">Trust.</span></h1>
//             <h2 className="serif" style={{ fontSize: 'var(--font-lg)', color: 'rgba(255,255,255,0.8)' }}>Built on Transparency.</h2>
//           </motion.div>
//         </div>
//       </section>

//       {/* Company Overview */}
//       <section style={{ padding: '4rem 0' }}>
//         <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
//           <div>
//             <span className="badge-premium">Our Legacy</span>
//             <h2 className="serif" style={{ fontSize: 'var(--font-xl)', margin: '1rem 0 1.5rem 0' }}>Redefining <span className="highlight">Real Estate</span> in Chennai</h2>
//             <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
//               For over a decade, RSV Estate has been at the forefront of the plotted development industry in Chennai. We believe that land is the most honest form of investment, and our mission is to make land ownership a seamless, secure, and rewarding experience for everyone.
//             </p>
//             <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: 1.6 }}>
//               Our projects are selected after rigorous legal and geographical audits, ensuring that every square foot you buy from us holds maximum appreciation potential.
//             </p>
//           </div>
//           <div style={{ position: 'relative' }}>
//              <img 
//                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
//                alt="Modern Office" 
//                style={{ width: '100%', borderRadius: '40px 0 40px 0', border: '1px solid #eee' }}
//              />
//              <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', background: 'var(--accent-gold)', padding: '1.5rem', borderRadius: '20px', color: 'var(--primary-dark)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
//                 <h3 className="serif" style={{ fontSize: 'var(--font-lg)' }}>15+</h3>
//                 <p style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Years of Excellence</p>
//              </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section - No top/bottom spaces */}
//       <section style={{ padding: '3rem 0', background:'var(--accent-gold)', color: 'rgb(25, 54, 7)' }}>
//         <div className="container">
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
//             {stats.map((stat, i) => (
//               <div key={i}>
//                 <h3 className="serif" style={{ fontSize: 'var(--font-xl)', color: 'rgb(25, 54, 7)', marginBottom: '0.5rem' }}>{stat.num}</h3>
//                 <p style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, fontSize: '0.75rem' }}>{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Vision & Mission */}
//       <section style={{ padding: '4rem 0', background: '#fcfcfc' }}>
//         <div className="container">
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
//             <motion.div 
//                whileHover={{ y: -5 }}
//                style={{ padding: '3rem', background: 'white', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', border: '1px solid #eee' }}
//             >
//                <Target size={40} color="var(--accent-gold)" style={{ marginBottom: '1.5rem' }} />
//                <h3 className="serif" style={{ fontSize: 'var(--font-lg)', marginBottom: '1rem' }}>Our <span className="highlight">Vision</span></h3>
//                <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: 1.6 }}>
//                  To be the most trusted and transparent real estate partner in India, empowering people to secure their future through high-value land investments.
//                </p>
//             </motion.div>
//             <motion.div 
//                whileHover={{ y: -5 }}
//                style={{ padding: '3rem', background: 'white', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', border: '1px solid #eee' }}
//             >
//                <Eye size={40} color="var(--accent-gold)" style={{ marginBottom: '1.5rem' }} />
//                <h3 className="serif" style={{ fontSize: 'var(--font-lg)', marginBottom: '1rem' }}>Our <span className="highlight">Mission</span></h3>
//                <p style={{ color: 'var(--text-label)', fontSize: '1rem', lineHeight: 1.6 }}>
//                  To simplify the land-buying process by providing 100% verified properties, ensuring prime location selection, and delivering world-class infrastructure.
//                </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us - Reduced gaps */}
//       <section style={{ padding: '4rem 0' }}>
//         <div className="container">
//           <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
//             <h2 className="serif" style={{ fontSize: 'var(--font-xl)' }}>The <span className="highlight">RSV Estate</span> Standard</h2>
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
//             {[
//               { icon: <ShieldCheck size={28} />, title: "Verified Properties", desc: "Every project goes through a 50-point legal audit before it's offered to you." },
//               { icon: <Award size={28} />, title: "Clear Documentation", desc: "No hidden clauses or surprises. We provide full legal clarity from Day 1." },
//               { icon: <HeartPulse size={28} />, title: "Customer-First", desc: "Our relationship doesn't end at registration. We offer lifelong support." }
//             ].map((item, i) => (
//               <div key={i} style={{ textAlign: 'center' }}>
//                 <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
//                 <h4 className="serif" style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{item.title}</h4>
//                 <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA - Reduced padding */}
//       <section style={{ padding: '3rem 0', background: 'var(--accent-gold)', textAlign: 'center' }}>
//         <div className="container">
//           <h2 className="serif" style={{ fontSize: 'var(--font-md)', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>Want to know more about our journey?</h2>
//           <button onClick={() => onNavigate && onNavigate('contact')} className="book-btn" style={{ background: 'var(--primary-dark)', color: 'white', cursor: 'pointer' }}>Contact Our Team</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;










import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, HeartPulse, Target, Eye } from 'lucide-react';

const AboutPage = ({ onNavigate }) => {
  const stats = [
    { num: "15+",   label: "Years Experience" },
    { num: "50+",   label: "Projects Completed" },
    { num: "1500+", label: "Happy Customers" },
    { num: "10+",   label: "Acres Developed" },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Container ── */
        .ab-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        @media (max-width: 640px) {
          .ab-container { padding: 0 1rem; }
        }

        /* ── Section spacing ── */
        .ab-section-lg { padding: 4rem 0; }
        .ab-section-md { padding: 3rem 0; }
        @media (max-width: 640px) {
          .ab-section-lg { padding: 2.5rem 0; }
          .ab-section-md { padding: 2rem 0; }
        }

        /* ── Hero ── */
        .ab-hero {
          height: 60vh;
          min-height: 320px;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .ab-hero h1 { font-size: clamp(2rem, 6vw, 4rem); color: white; margin-bottom: 1rem; }
        .ab-hero h2 { font-size: clamp(1.1rem, 3vw, 2rem); color: rgba(255,255,255,0.8); }

        /* ── Overview grid ── */
        .ab-overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .ab-overview-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .ab-overview-img  { display: none; }
        }

        .ab-overview-text p { font-size: clamp(0.9rem, 2vw, 1.1rem); }

        /* ── Stats ── */
        .ab-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }
        @media (max-width: 640px) {
          .ab-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        .ab-stat-num { font-size: clamp(1.8rem, 5vw, 3rem); color: rgb(25,54,7); margin-bottom: 0.5rem; }
        .ab-stat-label { font-weight: 600; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6; font-size: 0.75rem; }

        /* ── Vision & Mission ── */
        .ab-vm-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        @media (max-width: 768px) {
          .ab-vm-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        }
        .ab-vm-card {
          padding: 3rem;
          background: white;
          border-radius: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.03);
          border: 1px solid #eee;
        }
        @media (max-width: 480px) {
          .ab-vm-card { padding: 1.75rem 1.25rem; border-radius: 20px; }
        }

        /* ── Why Choose Us ── */
        .ab-why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }
        @media (max-width: 768px) {
          .ab-why-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .ab-why-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        }

        /* ── Section headings ── */
        .ab-heading-xl { font-size: clamp(1.6rem, 4vw, 2.5rem); }
        .ab-heading-lg { font-size: clamp(1.3rem, 3vw, 2rem); }
        .ab-heading-md { font-size: clamp(1.1rem, 2.5vw, 1.6rem); }

        /* ── CTA button ── */
        .ab-cta-btn {
          background: var(--primary-dark);
          color: white;
          cursor: pointer;
          border: none;
          padding: 0.85rem 2rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.95rem;
          transition: opacity 0.2s;
        }
        .ab-cta-btn:hover { opacity: 0.85; }
      `}</style>

      <div className="about-page-detailed">

        {/* ── Hero ── */}
        <section className="ab-hero">
          <motion.div
            initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0,
              background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000) center/cover no-repeat',
              zIndex: 0,
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))', zIndex: 1 }} />
          <div className="ab-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="serif">Driven by <span className="highlight">Trust.</span></h1>
              <h2 className="serif">Built on Transparency.</h2>
            </motion.div>
          </div>
        </section>

        {/* ── Company Overview ── */}
        <section className="ab-section-lg">
          <div className="ab-container">
            <div className="ab-overview-grid">
              <div className="ab-overview-text">
                <span className="badge-premium">Our Legacy</span>
                <h2 className="serif ab-heading-xl" style={{ margin: '1rem 0 1.5rem' }}>
                  Redefining <span className="highlight">Real Estate</span> in Chennai
                </h2>
                <p style={{ color: 'var(--text-light)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  For over a decade, RSV Estate has been at the forefront of the plotted development industry in Chennai. We believe that land is the most honest form of investment, and our mission is to make land ownership a seamless, secure, and rewarding experience for everyone.
                </p>
                <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: 1.6 }}>
                  Our projects are selected after rigorous legal and geographical audits, ensuring that every square foot you buy from us holds maximum appreciation potential.
                </p>
              </div>

              <div className="ab-overview-img" style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
                  alt="Modern Office"
                  style={{ width: '100%', borderRadius: '40px 0 40px 0', border: '1px solid #eee', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', background: 'var(--accent-gold)', padding: '1.5rem', borderRadius: '20px', color: 'var(--primary-dark)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <h3 className="serif" style={{ fontSize: 'var(--font-lg)' }}>15+</h3>
                  <p style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: 0 }}>Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="ab-section-md" style={{ background: 'var(--accent-gold)', color: 'rgb(25,54,7)' }}>
          <div className="ab-container">
            <div className="ab-stats-grid">
              {stats.map((stat, i) => (
                <div key={i}>
                  <h3 className="serif ab-stat-num">{stat.num}</h3>
                  <p className="ab-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Vision & Mission ── */}
        <section className="ab-section-lg" style={{ background: '#fcfcfc' }}>
          <div className="ab-container">
            <div className="ab-vm-grid">
              <motion.div whileHover={{ y: -5 }} className="ab-vm-card">
                <Target size={40} color="var(--accent-gold)" style={{ marginBottom: '1.5rem' }} />
                <h3 className="serif ab-heading-lg" style={{ marginBottom: '1rem' }}>
                  Our <span className="highlight">Vision</span>
                </h3>
                <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 0 }}>
                  To be the most trusted and transparent real estate partner in India, empowering people to secure their future through high-value land investments.
                </p>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="ab-vm-card">
                <Eye size={40} color="var(--accent-gold)" style={{ marginBottom: '1.5rem' }} />
                <h3 className="serif ab-heading-lg" style={{ marginBottom: '1rem' }}>
                  Our <span className="highlight">Mission</span>
                </h3>
                <p style={{ color: 'var(--text-label)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 0 }}>
                  To simplify the land-buying process by providing 100% verified properties, ensuring prime location selection, and delivering world-class infrastructure.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="ab-section-lg">
          <div className="ab-container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="serif ab-heading-xl">
                The <span className="highlight">RSV Estate</span> Standard
              </h2>
            </div>
            <div className="ab-why-grid">
              {[
                { icon: <ShieldCheck size={28} />, title: 'Verified Properties',    desc: 'Every project goes through a 50-point legal audit before it\'s offered to you.' },
                { icon: <Award        size={28} />, title: 'Clear Documentation',   desc: 'No hidden clauses or surprises. We provide full legal clarity from Day 1.' },
                { icon: <HeartPulse  size={28} />, title: 'Customer-First',         desc: 'Our relationship doesn\'t end at registration. We offer lifelong support.' },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                  <h4 className="serif" style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ab-section-md" style={{ background: 'var(--accent-gold)', textAlign: 'center' }}>
          <div className="ab-container">
            <h2 className="serif ab-heading-md" style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>
              Want to know more about our journey?
            </h2>
            <button onClick={() => onNavigate && onNavigate('contact')} className="ab-cta-btn book-btn">
              Contact Our Team
            </button>
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutPage;

