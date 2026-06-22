import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url }) => {
  const base = 'https://rsvEstates.in';
 const fullTitle = title ? `RSV Estates | ${title}` : 'RSV Estates | Premium Real Estate in Chennai';


  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${base}${url || ''}`} />
      <meta property="og:image" content={`${base}/logo2.png`} />
      <meta property="og:site_name" content="RSV Estates" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${base}/logo2.png`} />
    </Helmet>
  );
};

export default SEO;