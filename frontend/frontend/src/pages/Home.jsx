import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import FeaturedProjects from '../components/FeaturedProjects';
import Amenities from '../components/Amenities';
import Testimonials from '../components/Testimonials';


const Home = ({ onNavigate, onBuyNavigate }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <SearchBar onSearch={() => onNavigate('buy')} />
      <FeaturedProjects onNavigate={onBuyNavigate} />
      <Amenities />
      <Testimonials onNavigate={onNavigate} />
    </>
  );
};

export default Home;
