// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { motion } from 'framer-motion';
// // import { Star, ArrowRight } from 'lucide-react';

// // const StarRating = ({ value, onChange }) => {
// //   const [hovered, setHovered] = useState(0);
// //   return (
// //     <div style={{ display: 'flex', gap: '4px' }}>
// //       {[1, 2, 3, 4, 5].map((s) => (
// //         <Star
// //           key={s}
// //           size={22}
// //           fill={(hovered || value) >= s ? '#F58220' : 'none'}
// //           color={(hovered || value) >= s ? '#F58220' : '#ccc'}
// //           style={{ cursor: onChange ? 'pointer' : 'default', transition: 'all 0.15s' }}
// //           onMouseEnter={() => onChange && setHovered(s)}
// //           onMouseLeave={() => onChange && setHovered(0)}
// //           onClick={() => onChange && onChange(s)}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // const CustomerReviews = ({ onNavigate }) => {
// //   const [reviews, setReviews] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [formData, setFormData] = useState({ name: '', role: '', review: '', rating: 0 });
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [submitMsg, setSubmitMsg] = useState('');

// //   useEffect(() => {
// //     fetchReviews();
// //   }, []);

// //   const fetchReviews = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/customer-reviews');
// //       setReviews(res.data);
// //     } catch (err) {
// //       console.error('Error loading reviews:', err);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.rating) { setSubmitMsg('Please select a rating.'); return; }
// //     setIsSubmitting(true);
// //     setSubmitMsg('');
// //     try {
// //       const res = await axios.post('http://localhost:5000/api/customer-reviews', formData);
// //       if (res.data.success) {
// //         setFormData({ name: '', role: '', review: '', rating: 0 });
// //         setShowForm(false);
// //         fetchReviews();
// //       } else {
// //         setSubmitMsg('Failed to submit. Please try again.');
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setSubmitMsg('Server error. Please try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <section className="testimonials" id="customer-reviews" style={{ paddingTop: '2rem' }}>
// //       <div className="container">

// //         {/* Section Header */}
// //         <motion.div
// //           className="section-head"
// //           initial={{ opacity: 0, y: 30 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
// //           style={{
// //             marginBottom: '3rem',
// //             justifyContent: 'center',
// //             textAlign: 'center',
// //             flexDirection: 'column',
// //             alignItems: 'center',
// //           }}
// //         >
// //           <div className="head-bar"></div>
// //           <p className="head-sub">VOICES OF TRUST</p>
// //           <h2 className="section-title serif">The Greenfield Experience </h2>
// //         </motion.div>

// //         {/* Review Cards — data இருந்தா show, இல்லன்னா empty state */}
// //         {reviews.length > 0 ? (
// //           <div className="testimonial-grid">
// //             {reviews.slice(0, 3).map((r, i) => (
// //               <motion.div
// //                 key={r.id || i}
// //                 className="testimonial-card"
// //                 initial={{ opacity: 0, y: 40 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.7, delay: i * 0.1 }}
// //               >
// //                 <div style={{ marginBottom: '1rem' }}>
// //                   <StarRating value={r.rating || 5} />
// //                 </div>
// //                 <p className="testimonial-text">"{r.review}"</p>
// //                 <div className="user-profile">
// //                   <div
// //                     className="profile-img"
// //                     style={{
// //                       background: 'linear-gradient(135deg, #F58220, #e06b10)',
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       justifyContent: 'center',
// //                       color: 'white',
// //                       fontWeight: 700,
// //                       fontSize: '1.1rem',
// //                       fontFamily: "'Playfair Display', serif",
// //                     }}
// //                   >
// //                     {r.image_url ? (
// //                       <img
// //                         src={`http://localhost:5000${r.image_url}`}
// //                         alt={r.name}
// //                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// //                       />
// //                     ) : (
// //                       r.name?.charAt(0).toUpperCase()
// //                     )}
// //                   </div>
// //                   <div className="user-info">
// //                     <h5 className="serif">{r.name}</h5>
// //                     <p>{r.role || 'Customer'}</p>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         ) : (
// //           /* Empty state — no reviews yet */
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             whileInView={{ opacity: 1 }}
// //             viewport={{ once: true }}
// //             style={{
// //               textAlign: 'center',
// //               padding: '3rem 0',
// //               opacity: 0.5,
// //             }}
// //           >
// //             <p style={{ fontSize: '1rem' }}>No reviews yet. Be the first to share your experience!</p>
// //           </motion.div>
// //         )}

// //         {/* Buttons — எப்பவும் தெரியும் */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.8 }}
// //           style={{ textAlign: 'center', marginTop: '3rem' }}
// //         >
// //           <button
// //             className="book-btn"
// //             onClick={() => setShowForm((p) => !p)}
// //             style={{ marginRight: '1rem' }}
// //           >
// //             {showForm ? 'Cancel' : 'Write a Testimonials'}
// //           </button>
// //           <button
// //             className="book-btn"
// //             onClick={() => onNavigate('reviews')}
// //             style={{
// //               background: 'transparent',
// //               color: 'var(--accent-gold, #F58220)',
// //               border: '1px solid var(--accent-gold, #F58220)',
// //             }}
// //           >
// //             View All Testimonials <ArrowRight size={16} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
// //           </button>
// //         </motion.div>

// //         {/* Inline Review Form */}
// //         {showForm && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0 }}
// //             transition={{ duration: 0.5 }}
// //             style={{
// //               maxWidth: '560px',
// //               margin: '2.5rem auto 0',
// //               background: 'rgba(255,255,255,0.04)',
// //               border: '1px solid rgba(245,130,32,0.2)',
// //               borderRadius: '16px',
// //               padding: '2.5rem',
// //             }}
// //           >
// //             <h4
// //               className="serif"
// //               style={{ marginBottom: '1.5rem', fontSize: '1.4rem', textAlign: 'center' }}
// //             >
// //               Share Your Experience
// //             </h4>

// //             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
// //               <div className="input-group">
// //                 <input
// //                   type="text"
// //                   placeholder="Your Name"
// //                   value={formData.name}
// //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                   required
// //                   style={{ fontSize: '0.9rem' }}
// //                 />
// //               </div>

// //               <div className="input-group">
// //                 <input
// //                   type="text"
// //                   placeholder="Your Role (e.g. Plot Owner, Investor)"
// //                   value={formData.role}
// //                   onChange={(e) => setFormData({ ...formData, role: e.target.value })}
// //                   style={{ fontSize: '0.9rem' }}
// //                 />
// //               </div>

// //               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
// //                 <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Rating:</span>
// //                 <StarRating
// //                   value={formData.rating}
// //                   onChange={(v) => setFormData({ ...formData, rating: v })}
// //                 />
// //               </div>

// //               <textarea
// //                 placeholder="Write your review..."
// //                 value={formData.review}
// //                 onChange={(e) => setFormData({ ...formData, review: e.target.value })}
// //                 required
// //                 rows={4}
// //                 style={{
// //                   background: 'transparent',
// //                   border: '1px solid rgba(255,255,255,0.15)',
// //                   borderRadius: '8px',
// //                   padding: '12px 16px',
// //                   color: 'inherit',
// //                   fontSize: '0.9rem',
// //                   fontFamily: 'inherit',
// //                   resize: 'vertical',
// //                   outline: 'none',
// //                 }}
// //               />

// //               {submitMsg && (
// //                 <p style={{
// //                   fontSize: '0.85rem',
// //                   color: submitMsg.includes('select') || submitMsg.includes('Failed') || submitMsg.includes('error')
// //                     ? '#ef4444' : '#22c55e',
// //                   textAlign: 'center'
// //                 }}>
// //                   {submitMsg}
// //                 </p>
// //               )}

// //               <button
// //                 type="submit"
// //                 disabled={isSubmitting}
// //                 className="submit-btn"
// //                 style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1, padding: '1rem' }}
// //               >
// //                 {isSubmitting ? 'Submitting...' : 'Submit Review'}
// //                 {!isSubmitting && <ArrowRight size={16} style={{ marginLeft: '8px' }} />}
// //               </button>
// //             </form>
// //           </motion.div>
// //         )}

// //       </div>
// //     </section>
// //   );
// // };

// // export default CustomerReviews;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Star, ArrowRight, CheckCircle } from 'lucide-react';

// const API = 'http://localhost:5000';

// const StarRating = ({ value, onChange }) => {
//   const [hovered, setHovered] = useState(0);
//   return (
//     <div style={{ display: 'flex', gap: '4px' }}>
//       {[1, 2, 3, 4, 5].map((s) => (
//         <Star
//           key={s}
//           size={22}
//           fill={(hovered || value) >= s ? '#F58220' : 'none'}
//           color={(hovered || value) >= s ? '#F58220' : '#ccc'}
//           style={{ cursor: onChange ? 'pointer' : 'default', transition: 'all 0.15s' }}
//           onMouseEnter={() => onChange && setHovered(s)}
//           onMouseLeave={() => onChange && setHovered(0)}
//           onClick={() => onChange && onChange(s)}
//         />
//       ))}
//     </div>
//   );
// };

// const CustomerReviews = ({ onNavigate }) => {
//   const [reviews, setReviews]           = useState([]);
//   const [showForm, setShowForm]         = useState(false);
//   const [submitted, setSubmitted]       = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMsg, setSubmitMsg]       = useState('');
//   const [formData, setFormData]         = useState({ name: '', role: '', review: '', rating: 0 });

//   useEffect(() => { fetchApprovedReviews(); }, []);

//   const fetchApprovedReviews = async () => {
//     try {
//       const res = await axios.get(`${API}/api/customer-reviews?status=approved`);
//       setReviews(res.data);
//     } catch (err) {
//       console.error('Error loading reviews:', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.rating) { setSubmitMsg('Please select a rating.'); return; }
//     setIsSubmitting(true);
//     setSubmitMsg('');
//     try {
//       const res = await axios.post(`${API}/api/customer-reviews`, { ...formData, status: 'pending' });
//       if (res.data.success) {
//         setFormData({ name: '', role: '', review: '', rating: 0 });
//         setShowForm(false);
//         setSubmitted(true);
//         setTimeout(() => setSubmitted(false), 5000);
//       } else {
//         setSubmitMsg('Failed to submit. Please try again.');
//       }
//     } catch (err) {
//       console.error(err);
//       setSubmitMsg('Server error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="testimonials" id="customer-reviews" style={{ paddingTop: '2rem' }}>
//       <div className="container">

//         {/* Header */}
//         <motion.div
//           className="section-head"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
//           style={{ marginBottom: '3rem', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}
//         >
//           <div className="head-bar"></div>
//           <p className="head-sub">VOICES OF TRUST</p>
//           <h2 className="section-title serif">The Greenfield Experience</h2>
//         </motion.div>

//         {/* Approved Review Cards */}
//         {reviews.length > 0 ? (
//           <div className="testimonial-grid">
//             {reviews.slice(0, 3).map((r, i) => (
//               <motion.div
//                 key={r.id || i}
//                 className="testimonial-card"
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.7, delay: i * 0.1 }}
//               >
//                 <div style={{ marginBottom: '1rem' }}>
//                   <StarRating value={r.rating || 5} />
//                 </div>
//                 <p className="testimonial-text">"{r.review}"</p>
//                 <div className="user-profile">
//                   <div
//                     className="profile-img"
//                     style={{
//                       background: 'linear-gradient(135deg, #F58220, #e06b10)',
//                       display: 'flex', alignItems: 'center', justifyContent: 'center',
//                       color: 'white', fontWeight: 700, fontSize: '1.1rem',
//                       fontFamily: "'Playfair Display', serif",
//                       overflow: 'hidden',
//                     }}
//                   >
//                     {r.image_url
//                       ? <img src={`${API}${r.image_url}`} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                       : r.name?.charAt(0).toUpperCase()
//                     }
//                   </div>
//                   <div className="user-info">
//                     <h5 className="serif">{r.name}</h5>
//                     <p>{r.role || 'Customer'}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.5 }}
//           >
//             <p style={{ fontSize: '1rem' }}>No reviews yet. Be the first to share your experience!</p>
//           </motion.div>
//         )}

//         {/* Success Banner */}
//         <AnimatePresence>
//           {submitted && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: '12px',
//                 background: 'rgba(46,213,115,0.10)', border: '1px solid rgba(46,213,115,0.35)',
//                 color: '#2ed573', borderRadius: '12px', padding: '14px 22px',
//                 marginTop: '2rem', fontSize: '0.92rem', fontWeight: 500,
//               }}
//             >
//               <CheckCircle size={20} />
//               Thank you! Your review has been submitted and is pending admin approval.
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Action Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }} transition={{ duration: 0.8 }}
//           style={{ textAlign: 'center', marginTop: '3rem' }}
//         >
//           <button
//             className="book-btn"
//             onClick={() => { setShowForm((p) => !p); setSubmitMsg(''); }}
//             style={{ marginRight: '1rem' }}
//           >
//             {showForm ? 'Cancel' : 'Write a Testimonial'}
//           </button>
//           <button
//             className="book-btn"
//             onClick={() => onNavigate('reviews')}
//             style={{ background: 'transparent', color: 'var(--accent-gold, #F58220)', border: '1px solid var(--accent-gold, #F58220)' }}
//           >
//             View All Testimonials <ArrowRight size={16} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
//           </button>
//         </motion.div>

//         {/* Inline Review Form */}
//         <AnimatePresence>
//           {showForm && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }}
//               style={{
//                 maxWidth: '560px', margin: '2.5rem auto 0',
//                 background: 'rgba(255,255,255,0.04)',
//                 border: '1px solid rgba(245,130,32,0.2)',
//                 borderRadius: '16px', padding: '2.5rem',
//               }}
//             >
//               <h4 className="serif" style={{ marginBottom: '1.5rem', fontSize: '1.4rem', textAlign: 'center' }}>
//                 Share Your Experience
//               </h4>
//               <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                 <div className="input-group">
//                   <input
//                     type="text" placeholder="Your Name *" value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     required style={{ fontSize: '0.9rem' }}
//                   />
//                 </div>
//                 <div className="input-group">
//                   <input
//                     type="text" placeholder="Your Role (e.g. Plot Owner, Investor)" value={formData.role}
//                     onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                     style={{ fontSize: '0.9rem' }}
//                   />
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                   <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Rating: *</span>
//                   <StarRating value={formData.rating} onChange={(v) => setFormData({ ...formData, rating: v })} />
//                 </div>
//                 <textarea
//                   placeholder="Write your review... *" value={formData.review}
//                   onChange={(e) => setFormData({ ...formData, review: e.target.value })}
//                   required rows={4}
//                   style={{
//                     background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
//                     borderRadius: '8px', padding: '12px 16px', color: 'inherit',
//                     fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none',
//                   }}
//                 />
//                 <p style={{ fontSize: '0.78rem', opacity: 0.5, textAlign: 'center', margin: 0 }}>
//                   Your review will be visible after admin approval.
//                 </p>
//                 {submitMsg && (
//                   <p style={{ fontSize: '0.85rem', color: '#ef4444', textAlign: 'center' }}>{submitMsg}</p>
//                 )}
//                 <button
//                   type="submit" disabled={isSubmitting} className="submit-btn"
//                   style={{
//                     cursor: isSubmitting ? 'not-allowed' : 'pointer',
//                     opacity: isSubmitting ? 0.7 : 1, padding: '1rem',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
//                   }}
//                 >
//                   {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
//                   {!isSubmitting && <ArrowRight size={16} />}
//                 </button>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>

//       </div>
//     </section>
//   );
// };

// export default CustomerReviews;







// THIS FILE IS CustomerReviews.jsx (Home section component)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, CheckCircle } from 'lucide-react';

const API = 'http://localhost:5000';

const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={22}
          fill={(hovered || value) >= s ? '#F58220' : 'none'}
          color={(hovered || value) >= s ? '#F58220' : '#ccc'}
          style={{ cursor: onChange ? 'pointer' : 'default', transition: 'all 0.15s' }}
          onMouseEnter={() => onChange && setHovered(s)}
          onMouseLeave={() => onChange && setHovered(0)}
          onClick={() => onChange && onChange(s)}
        />
      ))}
    </div>
  );
};

const CustomerReviews = ({ onNavigate }) => {
  const [reviews, setReviews]           = useState([]);
  const [showForm, setShowForm]         = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg]       = useState('');
  const [formData, setFormData]         = useState({ name: '', role: '', review: '', rating: 0 });

  useEffect(() => { fetchApprovedReviews(); }, []);

  const fetchApprovedReviews = async () => {
    try {
      const res = await axios.get(`${API}/api/customer-reviews?status=approved`);
      setReviews(res.data);
    } catch (err) {
      console.error('Error loading reviews:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rating) { setSubmitMsg('Please select a rating.'); return; }
    setIsSubmitting(true);
    setSubmitMsg('');
    try {
      const res = await axios.post(`${API}/api/customer-reviews`, { ...formData, status: 'pending' });
      if (res.data.success) {
        setFormData({ name: '', role: '', review: '', rating: 0 });
        setShowForm(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setSubmitMsg('Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSubmitMsg('Server error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="testimonials" id="customer-reviews" style={{ paddingTop: '2rem' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3rem', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}
        >
          <div className="head-bar"></div>
          <p className="head-sub">VOICES OF TRUST</p>
          <h2 className="section-title serif">The Greenfield Experience</h2>
        </motion.div>

        {/* Approved Review Cards */}
        {reviews.length > 0 ? (
          <div className="testimonial-grid">
            {reviews.slice(0, 3).map((r, i) => (
              <motion.div
                key={r.id || i}
                className="testimonial-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <StarRating value={r.rating || 5} />
                </div>
                <p className="testimonial-text">"{r.review}"</p>
                <div className="user-profile">
                  <div
                    className="profile-img"
                    style={{
                      background: 'linear-gradient(135deg, #F58220, #e06b10)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 700, fontSize: '1.1rem',
                      fontFamily: "'Playfair Display', serif",
                      overflow: 'hidden',
                    }}
                  >
                    {r.image_url
                      ? <img src={`${API}${r.image_url}`} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : r.name?.charAt(0).toUpperCase()
                    }
                  </div>
                  <div className="user-info">
                    <h5 className="serif">{r.name}</h5>
                    <p>{r.role || 'Customer'}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.5 }}
          >
            <p style={{ fontSize: '1rem' }}>No reviews yet. Be the first to share your experience!</p>
          </motion.div>
        )}

        {/* Success Banner */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'rgba(46,213,115,0.10)', border: '1px solid rgba(46,213,115,0.35)',
                color: '#2ed573', borderRadius: '12px', padding: '14px 22px',
                marginTop: '2rem', fontSize: '0.92rem', fontWeight: 500,
              }}
            >
              <CheckCircle size={20} />
              Thank you! Your review has been submitted and is pending admin approval.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <button
            className="book-btn"
            onClick={() => { setShowForm((p) => !p); setSubmitMsg(''); }}
            style={{ marginRight: '1rem' }}
          >
            {showForm ? 'Cancel' : 'Write a Testimonial'}
          </button>
          <button
            className="book-btn"
            onClick={() => onNavigate('reviews')}
            style={{ background: 'transparent', color: 'var(--accent-gold, #F58220)', border: '1px solid var(--accent-gold, #F58220)' }}
          >
            View All Testimonials <ArrowRight size={16} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
          </button>
        </motion.div>

        {/* Inline Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }}
              style={{
                maxWidth: '560px', margin: '2.5rem auto 0',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(245,130,32,0.2)',
                borderRadius: '16px', padding: '2.5rem',
              }}
            >
              <h4 className="serif" style={{ marginBottom: '1.5rem', fontSize: '1.4rem', textAlign: 'center' }}>
                Share Your Experience
              </h4>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="input-group">
                  <input
                    type="text" placeholder="Your Name *" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required style={{ fontSize: '0.9rem' }}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text" placeholder="Your Role (e.g. Plot Owner, Investor)" value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{ fontSize: '0.9rem' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Rating: *</span>
                  <StarRating value={formData.rating} onChange={(v) => setFormData({ ...formData, rating: v })} />
                </div>
                <textarea
                  placeholder="Write your review... *" value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  required rows={4}
                  style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px', padding: '12px 16px', color: 'inherit',
                    fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none',
                  }}
                />
                <p style={{ fontSize: '0.78rem', opacity: 0.5, textAlign: 'center', margin: 0 }}>
                  Your review will be visible after admin approval.
                </p>
                {submitMsg && (
                  <p style={{ fontSize: '0.85rem', color: '#ef4444', textAlign: 'center' }}>{submitMsg}</p>
                )}
                <button
                  type="submit" disabled={isSubmitting} className="submit-btn"
                  style={{
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1, padding: '1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
                  {!isSubmitting && <ArrowRight size={16} />}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default CustomerReviews;
