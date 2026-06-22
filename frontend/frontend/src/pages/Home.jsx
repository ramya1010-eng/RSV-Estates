import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import FeaturedProjects from '../components/FeaturedProjects';
import Amenities from '../components/Amenities';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';

const Home = ({ onNavigate, onBuyNavigate }) => {
  return (
    <>
      <SEO
        title="Home"
        description="RSV Estates – Premium residential, commercial and land properties in Chennai. Trusted real estate agents in Valasaravakkam."
        keywords="real estate Chennai, buy property Chennai, RSV Estates, property dealers Chennai"
        url="/#home"
      />
      <Hero onNavigate={onNavigate} />
      <SearchBar onSearch={() => onNavigate('buy')} />
      <FeaturedProjects onNavigate={onBuyNavigate} />
      <Amenities />
      <Testimonials onNavigate={onNavigate} />
    </>
  );
};

export default Home;