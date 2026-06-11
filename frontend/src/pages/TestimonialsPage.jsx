// import React, {
//   useState,
//   useEffect
// } from 'react';
// import axios from 'axios';
// import { Quote } from 'lucide-react';

// const TestimonialsPage = () => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   const fetchTestimonials = async () => {
//     try {
//       const res = await axios.get(
//         'http://localhost:5000/api/testimonials'
//       );

//       setReviews(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <section
//       style={{
//         background:
//           'linear-gradient(180deg,#02160d,#041f12)',
//         minHeight: '100vh',
//         padding:
//           '180px 0 100px',
//         color: '#fff'
//       }}
//     >
//       <div className="container">

//         <div
//           style={{
//             textAlign: 'center',
//             marginBottom: '80px'
//           }}
//         >
//           <div
//             style={{
//               width: '60px',
//               height: '2px',
//               background: '#c9a84c',
//               margin:
//                 '0 auto 25px'
//             }}
//           />

//           <p
//             style={{
//               color: '#c9a84c',
//               letterSpacing: '4px',
//               fontSize: '.9rem'
//             }}
//           >
//             VOICES OF TRUST
//           </p>

//           <h1
//             className="serif"
//             style={{
//               fontSize: '5.5rem',
//               marginTop: '15px',
//               lineHeight: '1.1'
//             }}
//           >
//             Customer Testimonials
//           </h1>

//           <p
//             style={{
//               color:
//                 'rgba(255,255,255,.65)',
//               marginTop: '15px',
//               fontSize: '1.2rem'
//             }}
//           >
//             Hear directly from our
//             valued buyers and sellers.
//           </p>
//         </div>

//         <div
//           className="testimonial-grid"
//         >
//           {reviews.map((r) => (
//             <div
//               key={r.id}
//               className="testimonial-card"
//             >
//               <Quote
//                 size={40}
//                 className="quote-icon"
//               />

//               <p className="testimonial-text">
//                 "{r.review}"
//               </p>

//               <div className="user-profile">
//                 <div className="profile-img">
//                   <img
//                     src={
//                       r.image_url
//                         ? `http://localhost:5000${r.image_url}`
//                         : '/default-user.jpg'
//                     }
//                     alt={r.name}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover'
//                     }}
//                   />
//                 </div>

//                 <div className="user-info">
//                   <h5 className="serif">
//                     {r.name}
//                   </h5>

//                   <p>{r.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default TestimonialsPage;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = ({ onNavigate }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/testimonials');
      setReviews(res.data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">

        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '5rem', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}
        >
          <div className="head-bar"></div>
          <p className="head-sub">VOICES OF TRUST</p>
          <h2 className="section-title serif">The Greenfield Experience</h2>
        </motion.div>

        <div className="testimonial-grid">
          {reviews.slice(0, 3).map((r, i) => (
            <motion.div
              key={r.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
            >
              <Quote size={40} className="quote-icon" />

              <p className="testimonial-text">"{r.review}"</p>

              <div className="user-profile">
                <div className="profile-img">
                  <img
                    src={r.image_url ? `http://localhost:5000${r.image_url}` : '/default-user.jpg'}
                    alt={r.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="user-info">
                  <h5 className="serif">{r.name}</h5>
                  <p>{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {reviews.length > 3 && (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button className="book-btn" onClick={() => onNavigate('testimonials')}>
              View All Testimonials →
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;