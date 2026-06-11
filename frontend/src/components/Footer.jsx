
// import React from 'react';
// import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
// import logo from '../images/logo2.png';

// const Footer = ({ onNavigate }) => {
//   return (
//     <footer className="footer">
//       <div className="container">

//         {/* Main Footer Content */}
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//             gap: '3rem',
//             padding: '0',
//             alignItems: 'start'
//           }}
//         >

//           {/* Column 1 - Brand */}
//           <div>
//             <div
//               onClick={() => onNavigate('home')}
//               style={{
//                 cursor: 'pointer',
//                 marginBottom: '1.5rem'
//               }}
//             >
//               <img
//                 src={logo}
//                 alt="RSV Groups Logo"
//                 style={{
//                   width: '140px',
//                   height: 'auto'
//                 }}
//               />
//             </div>

//             <p
//               style={{
//                 color: 'rgba(255,255,255,0.5)',
//                 fontSize: '0.95rem',
//                 lineHeight: '1.6',
//                 marginBottom: '1.5rem',
//                 maxWidth: '280px'
//               }}
//             >
//               Visit us at our office <br></br>No. 7, Kamakodi Nagar, Valasaravakkam, 
//               <br></br>Chennai - 600087

//              <br/><br/> Contact Us <br></br> +91 9962917779, +91 99627 37779

//               <br/><br/>
//               E-mail : rsventerprises8344@gmail.com

//             </p>

//             <div style={{ display: 'flex', gap: '1rem' }}>
//               <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>
//                 <Facebook size={18} />
//               </a>

//               <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>
//                 <Twitter size={18} />
//               </a>

//               <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>
//                 <Instagram size={18} />
//               </a>

//               <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>
//                 <Youtube size={18} />
//               </a>
//             </div>
//           </div>

//           {/* Column 2 - Quick Links */}
//           <div>
//             <h4
//               style={{
//                 fontSize: '1.1rem',
//                 marginBottom: '1.5rem',
//                 fontWeight: '500',
//                 letterSpacing: '1px',
//                 marginTop: 0
//               }}
//             >
//               Quick Links
//             </h4>

//             <ul
//               style={{
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0
//               }}
//             >
//               {[
//                 'home',
//                 'about',
//                 'buy',
//                 'sell',
//                 'sold-leased',
//               ].map((item) => (
//                 <li
//                   key={item}
//                   style={{
//                     marginBottom: '0.75rem'
//                   }}
//                 >
//                   <button
//                     onClick={() => onNavigate(item)}
//                     style={{
//                       background: 'none',
//                       border: 'none',
//                       color: 'rgba(255,255,255,0.5)',
//                       cursor: 'pointer',
//                       padding: 0,
//                       fontSize: '1.2rem',
//                       transition: 'color 0.3s'
//                     }}
//                   >
//                     {item === 'sold-leased'
//                       ? 'Sold & Leased'
//                       : item.charAt(0).toUpperCase() + item.slice(1)}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3 - Company */}
//           <div>
//             <h4
//               style={{
//                 fontSize: '1.1rem',
//                 marginBottom: '1.5rem',
//                 fontWeight: '500',
//                 letterSpacing: '1px',
//                 marginTop: 0
//               }}
//             >
//               Company
//             </h4>

//             <ul
//               style={{
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0
//               }}
//             >

//               <li style={{ marginBottom: '0.75rem' }}>
//                 <button
//                   onClick={() => onNavigate('about')}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     color: 'rgba(255,255,255,0.5)',
//                     cursor: 'pointer',
//                     padding: 0,
//                     fontSize: '1.2rem'
//                   }}
//                 >
//                   About Us
//                 </button>
//               </li>

//               <li style={{ marginBottom: '0.75rem' }}>
//                 <button
//                   onClick={() => onNavigate('sold-leased')}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     color: 'rgba(255,255,255,0.5)',
//                     cursor: 'pointer',
//                     padding: 0,
//                     fontSize: '1.2rem'
//                   }}
//                 >
//                   Sold & Leased
//                 </button>
//               </li>

//               <li style={{ marginBottom: '0.75rem' }}>
//                 <button
//                   onClick={() => onNavigate('contact')}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     color: 'rgba(255,255,255,0.5)',
//                     cursor: 'pointer',
//                     padding: 0,
//                     fontSize: '1.2rem'
//                   }}
//                 >
//                   Contact Us
//                 </button>
//               </li>

//               <li style={{ marginBottom: '0.75rem' }}>
//                 <button
//                   onClick={() => onNavigate('book-visit')}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     color: 'rgba(255,255,255,0.5)',
//                     cursor: 'pointer',
//                     padding: 0,
//                     fontSize: '1.2rem'
//                   }}
//                 >
//                   Book Visit
//                 </button>
//               </li>

//             </ul>
//           </div>

//         </div>

//         {/* Bottom Bar */}
//         <div
//           style={{
//             borderTop: '1px solid rgba(9, 87, 32, 0.1)',
//             padding: '1rem 0',
//             marginTop: '2rem',
//             display: 'flex',
//             justifyContent: 'space-between',
//             flexWrap: 'wrap',
//             gap: '1rem',
//             opacity: 0.5,
//             fontSize: '1.2rem',
//             letterSpacing: '0.5px'
//           }}
//         >
//           <div
//             style={{
//               textAlign: 'center',
//               width: '100%'
//             }}
//           >
//             <p>
//               © 2026{' '}
//               <a
//                 href="https://devspectra.in/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{
//                   color: '#faf9f7',
//                   textDecoration: 'none',
//                   fontWeight: '600'
//                 }}
//               >
//                 DevSpectra
//               </a>
//               . ALL RIGHTS RESERVED.
//             </p>
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;






import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import logo from '../images/logo2.png';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="container">

        {/* Main Footer Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            padding: '0',
            alignItems: 'start'
          }}
        >

          {/* Column 1 - Brand */}
          <div>
            <div
              onClick={() => onNavigate('home')}
              style={{ cursor: 'pointer', marginBottom: '1.5rem' }}
            >
              <img
                src={logo}
                alt="RSV Groups Logo"
                style={{ width: '140px', height: 'auto' }}
              />
            </div>

            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                maxWidth: '280px'
              }}
            >
              Visit us at our office <br />
              No. 7, Kamakodi Nagar, Valasaravakkam,
              <br />Chennai - 600087

              <br /><br /> Contact Us <br />
              <a
                href="tel:+919962917779"
                style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
              >
                +91 9962917779
              </a>
              {', '}
              <a
                href="tel:+919962737779"
                style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
              >
                +91 99627 37779
              </a>

              <br /><br />
              E-mail : rsventerprises8344@gmail.com
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Facebook size={18} />
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Twitter size={18} />
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Instagram size={18} />
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                fontWeight: '500',
                letterSpacing: '1px',
                marginTop: 0
              }}
            >
              Quick Links
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['home', 'about', 'buy', 'sell', 'sold-leased'].map((item) => (
                <li key={item} style={{ marginBottom: '0.75rem' }}>
                  <button
                    onClick={() => onNavigate(item)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '1.2rem',
                      transition: 'color 0.3s'
                    }}
                  >
                    {item === 'sold-leased'
                      ? 'Sold & Leased'
                      : item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '1.5rem',
                fontWeight: '500',
                letterSpacing: '1px',
                marginTop: 0
              }}
            >
              Company
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <button
                  onClick={() => onNavigate('about')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 0, fontSize: '1.2rem' }}
                >
                  About Us
                </button>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <button
                  onClick={() => onNavigate('sold-leased')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 0, fontSize: '1.2rem' }}
                >
                  Sold & Leased
                </button>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <button
                  onClick={() => onNavigate('contact')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 0, fontSize: '1.2rem' }}
                >
                  Contact Us
                </button>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <button
                  onClick={() => onNavigate('book-visit')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 0, fontSize: '1.2rem' }}
                >
                  Book Visit
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(9, 87, 32, 0.1)',
            padding: '1rem 0',
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            opacity: 0.5,
            fontSize: '1.2rem',
            letterSpacing: '0.5px'
          }}
        >
          <div style={{ textAlign: 'center', width: '100%' }}>
            <p>
              © 2026{' '}
              <a
                href="https://devspectra.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#faf9f7', textDecoration: 'none', fontWeight: '600' }}
              >
                DevSpectra
              </a>
              . ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;