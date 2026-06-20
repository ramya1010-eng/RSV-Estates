




import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % project.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [project.images.length]);

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onClick={onClick}
      style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '12px', position: 'relative' }}
    >
      <div className="card-image" style={{ height: '380px', position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={imgIndex}
            src={project.images[imgIndex]}
            alt={project.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
            }}
          />
        </AnimatePresence>

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '100px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)',
          zIndex: 2,
        }} />

        {/* Category label */}
        <span style={{
          position: 'absolute', bottom: '18px', left: '18px',
          zIndex: 3,
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#fff',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          padding: '6px 14px',
          borderRadius: '30px',
          textTransform: 'uppercase',
        }}>
          {project.label}
        </span>

        {/* Arrow */}
        <span style={{
          position: 'absolute', bottom: '14px', right: '16px',
          zIndex: 3,
          background: 'var(--accent-gold, #c9a84c)',
          color: '#fff',
          borderRadius: '50%',
          width: '34px', height: '34px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArrowRight size={16} />
        </span>
      </div>
    </motion.div>
  );
};

const FeaturedProjects = ({ onNavigate }) => {

  const projects = [
    {
      label: 'Land',
      category: 'land',
      images: [
        'https://images.unsplash.com/photo-1757924432508-d4e92411caeb?q=80&w=1032&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1669003154058-e1876138ac3c?w=500&auto=format&fit=crop',
      ],
    },
    {
      label: 'Residential',
      category: 'residential',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      ],
    },
    {
      label: 'Commercial',
      category: 'commercial',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      ],
    },
  ];

  const handleCardClick = (category) => {
    // ✅ onNavigate prop இருந்தா use it (React state routing)
    if (onNavigate) {
      onNavigate(category);
      return;
    }
    // Fallback: localStorage + hash
    localStorage.setItem('buy_category', category);
    window.location.hash = `buy?category=${category}`;
  };

  return (
    <section className="featured-projects" id="projects">
      <div className="container">
        <div className="section-head">
          <div className="head-left">
            <div className="head-bar"></div>
            <p className="head-sub">FEATURED DEVELOPMENTS</p>
            <h2 className="section-title serif">The Art of <br />Elite Living</h2>
          </div>
          <button className="view-all-btn" onClick={() => handleCardClick('all')}>
            EXPLORE COLLECTION <ArrowRight size={20} />
          </button>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              onClick={() => handleCardClick(p.category)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

