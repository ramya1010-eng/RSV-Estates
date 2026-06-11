import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';

const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={onChange ? 22 : 16}
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

const CustomerReviewsPage = ({ onNavigate }) => {
  const [reviews, setReviews] = useState([]);
  const [filterRating, setFilterRating] = useState(0);
  const [formData, setFormData] = useState({ name: '', role: '', review: '', rating: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchReviews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/customer-reviews');
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
      const res = await axios.post('http://localhost:5000/api/customer-reviews', formData);
      if (res.data.success) {
        setFormData({ name: '', role: '', review: '', rating: 0 });
        setShowSuccess(true);
        fetchReviews();
        setTimeout(() => setShowSuccess(false), 3500);
      } else {
        setSubmitMsg('Failed to submit. Please try again.');
      }
    } catch (err) {
      setSubmitMsg('Server error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  const ratingCounts = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => (r.rating || 5) === s).length,
  }));

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '6rem' }}>

      {/* Page Hero */}
      <div
        style={{
          background: 'linear-gradient(180deg, #0a140d 0%, #112217 100%)',
          padding: '8rem 0 5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(245,130,32,0.08) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div className="head-bar" style={{ margin: '0 auto 1rem' }}></div>
          <p className="head-sub">CLIENT VOICES</p>
          <h1 className="section-title serif" style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.5rem' }}>
            Customer Reviews
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginTop: '0.5rem' }}>
            Real experiences from our valued clients
          </p>
        </motion.div>
      </div>

      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => onNavigate('home')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#F58220', fontSize: '0.85rem', letterSpacing: '1px',
            fontFamily: "'Playfair Display', serif",
            marginTop: '2.5rem', marginBottom: '2rem',
          }}
        >
          <ArrowLeft size={16} /> BACK TO HOME
        </motion.button>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            gap: '2rem',
            background: 'rgba(245,130,32,0.05)',
            border: '1px solid rgba(245,130,32,0.15)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '3rem',
          }}
        >
          {/* Average */}
          <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.08)', paddingRight: '2rem' }}>
            <p style={{ fontSize: '3.5rem', fontWeight: 700, color: '#F58220', lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>
              {avgRating}
            </p>
            <StarRating value={Math.round(parseFloat(avgRating))} />
            <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '0.5rem' }}>
              {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Bar breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
            {ratingCounts.map(({ star, count }) => (
              <div
                key={star}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                onClick={() => setFilterRating(filterRating === star ? 0 : star)}
              >
                <span style={{ fontSize: '0.75rem', opacity: 0.6, width: '12px' }}>{star}</span>
                <Star size={12} fill="#F58220" color="#F58220" />
                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%',
                      background: filterRating === star ? '#F58220' : 'rgba(245,130,32,0.5)',
                      borderRadius: '99px',
                      transition: 'width 0.6s ease',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', opacity: 0.5, width: '24px' }}>{count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[0, 5, 4, 3, 2, 1].map((s) => (
            <button
              key={s}
              onClick={() => setFilterRating(s)}
              style={{
                padding: '6px 16px',
                borderRadius: '99px',
                border: '1px solid',
                borderColor: filterRating === s ? '#F58220' : 'rgba(255,255,255,0.15)',
                background: filterRating === s ? 'rgba(245,130,32,0.15)' : 'transparent',
                color: filterRating === s ? '#F58220' : 'rgba(255,255,255,0.6)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '0.5px',
                transition: 'all 0.2s',
              }}
            >
              {s === 0 ? 'All Reviews' : `${s} ★`}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', alignItems: 'start' }}>

          {/* Reviews List */}
          <div>
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ opacity: 0.5, textAlign: 'center', padding: '3rem 0' }}
                >
                  No reviews for this rating yet.
                </motion.p>
              ) : (
                filtered.map((r, i) => (
                  <motion.div
                    key={r.id || i}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="testimonial-card"
                    style={{ marginBottom: '1.25rem' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <StarRating value={r.rating || 5} />
                      <span style={{ fontSize: '0.75rem', opacity: 0.4 }}>
                        {r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                      </span>
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
                        }}
                      >
                        {r.image_url ? (
                          <img
                            src={`http://localhost:5000${r.image_url}`}
                            alt={r.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          r.name?.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="user-info">
                        <h5 className="serif">{r.name}</h5>
                        <p>{r.role || 'Customer'}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Write Review Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              position: 'sticky',
              top: '100px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(245,130,32,0.2)',
              borderRadius: '16px',
              padding: '2rem',
            }}
          >
            <h4 className="serif" style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>
              Share Your Experience
            </h4>
            <p style={{ fontSize: '0.85rem', opacity: 0.55, marginBottom: '1.5rem' }}>
              Your feedback helps others make confident decisions.
            </p>

            {/* Success Toast */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: 'rgba(34,197,94,0.15)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    marginBottom: '1rem',
                    fontSize: '0.85rem',
                    color: '#22c55e',
                    textAlign: 'center',
                  }}
                >
                  ✓ Review submitted successfully!
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ fontSize: '0.9rem' }}
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Your Role (e.g. Plot Owner)"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{ fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>Rating:</span>
                <StarRating
                  value={formData.rating}
                  onChange={(v) => setFormData({ ...formData, rating: v })}
                />
              </div>

              <textarea
                placeholder="Write your review..."
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                required
                rows={4}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: 'inherit',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                }}
              />

              {submitMsg && (
                <p style={{ fontSize: '0.83rem', color: '#ef4444', textAlign: 'center' }}>{submitMsg}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
                style={{
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  padding: '0.9rem',
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                {!isSubmitting && <ArrowRight size={16} style={{ marginLeft: '8px' }} />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewsPage;
