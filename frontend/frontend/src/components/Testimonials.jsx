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
      const res = await axios.get(
        'https://celebrated-flexibility-production-1c57.up.railway.app/api/testimonials'
      );

      setReviews(res.data);
    } catch (error) {
      console.error(
        'Error loading testimonials:',
        error
      );
    }
  };

  return (
    <section
      className="testimonials"
      id="testimonials"
    >
      <div className="container">

        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{
            marginBottom: '5rem',
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div className="head-bar"></div>

          <p className="head-sub">
            VOICES OF TRUST
          </p>

          <h2 className="section-title serif">
            The Greenfield Experience
          </h2>
        </motion.div>

        <div className="testimonial-grid">
          {reviews.slice(0, 3).map((r) => (
            <motion.div
              key={r.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Quote
                size={40}
                className="quote-icon"
              />

              <p className="testimonial-text">
                "{r.review}"
              </p>

              <div className="user-profile">
                <div className="profile-img">
                  <img
                    src={
                      r.image_url
                        ? `https://celebrated-flexibility-production-1c57.up.railway.app${r.image_url}`
                        : '/default-user.jpg'
                    }
                    alt={r.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                <div className="user-info">
                  <h5 className="serif">
                    {r.name}
                  </h5>

                  <p>{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '4rem'
          }}
        >
          <div
              style={{
                textAlign: 'center',
                marginTop: '3rem'
              }}
            >
              <button
                className="book-btn"
                onClick={() => onNavigate('testimonials')}
              >
                View All Testimonials →
              </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

