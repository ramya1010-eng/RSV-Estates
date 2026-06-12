

// import React from 'react';
// import Hero from '../components/Hero';
// import SearchBar from '../components/SearchBar';
// import FeaturedProjects from '../components/FeaturedProjects';
// import Amenities from '../components/Amenities';
// import Testimonials from '../components/Testimonials';
// import CustomerReviews from '../components/CustomerReviews';

// const Home = ({ onNavigate, onBuyNavigate }) => {
//   return (
//     <>
//       <Hero onNavigate={onNavigate} />
//       <SearchBar onSearch={() => onNavigate('buy')} />

//       {/* ✅ onBuyNavigate pass பண்றோம் — land/residential/commercial filter work ஆகும் */}
//       <FeaturedProjects onNavigate={onBuyNavigate} />

//       <Amenities />
//       <Testimonials onNavigate={onNavigate} />
//       <CustomerReviews onNavigate={onNavigate} />
//     </>
//   );
// };

// export default Home;







import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import FeaturedProjects from '../components/FeaturedProjects';
import Amenities from '../components/Amenities';
import CustomerReviews from '../components/CustomerReviews';

const Home = ({ onNavigate, onBuyNavigate }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <SearchBar onSearch={() => onNavigate('buy')} />
      <FeaturedProjects onNavigate={onBuyNavigate} />
      <Amenities />
      <CustomerReviews onNavigate={onNavigate} />
    </>
  );
};

export default Home;