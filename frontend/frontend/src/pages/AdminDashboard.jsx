

// AdminDashboard.jsx — Clean Full Version

import React, { useState, useEffect } from 'react';
import '../Admin.css';
import {
  LayoutDashboard, Map, Users, Layers, Settings,
  Plus, Trash2, Edit3, ArrowUpRight, Search,
  Bell, LogOut, CheckCircle, BadgeDollarSign, Phone, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import logo from '../images/logo2.png';

const PROPERTY_TYPES = ["Land", "Apartment", "Villa", "Plot", "Commercial", "Independent House"];
const REPRESENTED_OPTIONS = ["Both Buyer & Sellers", "Buyer Only", "Seller Only", "Developer"];

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab]           = useState('Sold');
  const [showSoldModal, setShowSoldModal]   = useState(false);
  const [searchTerm, setSearchTerm]         = useState('');
  const [properties, setProperties]         = useState([]);
  const [soldSuccess, setSoldSuccess]       = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editingProperty, setEditingProperty]   = useState(null);
  const disabledTabs = ['Dashboard', 'Plots', 'Leads', 'Projects'];

  

  // ---------- SOLD ----------
  const [soldEntries, setSoldEntries] = useState([]);
  const [soldForm, setSoldForm] = useState({
    title: '', location: '', price: '', size: '',
    propertyType: 'Land', represented: 'Both Buyer & Sellers',
    customerName: '', status: 'Sold',
  });
  const [soldFormError, setSoldFormError] = useState('');

  // ---------- TESTIMONIALS ----------
  const [testimonials, setTestimonials]           = useState([]);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial]     = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', role: '', review: '', image: null
  });

  // ---------- SITE INQUIRIES ----------
  const [siteInquiries, setSiteInquiries] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [viewSellItem, setViewSellItem] = useState(null);
const [editSellItem, setEditSellItem] = useState(null);

  // ---------- SETTINGS ----------
  const [settings, setSettings] = useState({
    companyName: 'RSV Groups',
    contactEmail: 'info@rsvgroups.com',
    contactPhone: '+91 90000 00000',
    address: 'Anna Salai, Chennai',
  });

  // ---------- DUMMY DATA ----------
  const [plots]    = useState([
    { id: 1, name: 'Premium Plot A1',  location: 'OMR, Chennai', price: '45L', size: '1200 Sq.ft', status: 'Available', project: 'The Royal Estate' },
    { id: 2, name: 'Emerald Plot B4',  location: 'ECR, Chennai', price: '85L', size: '2400 Sq.ft', status: 'Booked',    project: 'Emerald Valley'  },
    { id: 3, name: 'Heritage Plot C9', location: 'GST Road',     price: '32L', size: '1000 Sq.ft', status: 'Available', project: 'Heritage West'   },
  ]);
  const [leads]    = useState([
    { id: 1, name: 'Anish Kumar',  phone: '+91 98765 43210', email: 'anish@email.com',  interest: 'OMR Plots',    status: 'New',       date: '2024-03-20' },
    { id: 2, name: 'Priya Sharma', phone: '+91 87654 32109', email: 'priya@email.com',  interest: 'ECR Luxury',   status: 'Contacted', date: '2024-03-19' },
    { id: 3, name: 'Vikram Singh', phone: '+91 76543 21098', email: 'vikram@email.com', interest: 'Heritage West',status: 'Sold',      date: '2024-03-18' },
  ]);
  const [projects] = useState([
    { id: 1, name: 'The Royal Estate', location: 'OMR, Chennai', units: '45/60', status: 'Active'   },
    { id: 2, name: 'Emerald Valley',   location: 'ECR, Chennai', units: '12/24', status: 'Limited'  },
    { id: 3, name: 'Heritage West',    location: 'GST Road',     units: '10/10', status: 'Sold Out' },
  ]);

  // ============ EFFECTS ============
  useEffect(() => {
    const props = JSON.parse(localStorage.getItem('user_properties') || '[]');
    setProperties(props);
  }, [activeTab]);

  useEffect(() => { loadTestimonials(); }, []);
  useEffect(() => { loadSiteInquiries(); }, []);
  useEffect(() => { loadSellListings(); }, []);
  useEffect(() => { loadSoldEntries(); }, []);

  // ============ LOADERS ============
  const loadTestimonials = async () => {
    try {
      const res = await axios.get('https://celebrated-flexibility-production-1c57.up.railway.app/api/testimonials');
      setTestimonials(res.data);
    } catch (err) { console.error(err); }
  };

  const loadSiteInquiries = async () => {
    try {
      const res = await axios.get('https://celebrated-flexibility-production-1c57.up.railway.app/api/site-inquiries');
      setSiteInquiries(res.data);
    } catch (err) { console.error(err); }
  };

  const loadSellListings = async () => {
  try {
    const res = await axios.get('https://celebrated-flexibility-production-1c57.up.railway.app/api/sell');
    setSellListings(res.data);
  } catch (err) { console.error(err); }
};

const loadSoldEntries = async () => {
  try {
    const res = await axios.get('https://celebrated-flexibility-production-1c57.up.railway.app/api/sold-leased');
    setSoldEntries(res.data);
  } catch (err) { console.error(err); }
};
  // ============ APPROVALS ============
  const handleApprove = (id) => {
    const props   = JSON.parse(localStorage.getItem('user_properties') || '[]');
    const updated = props.map(p => p.id === id ? { ...p, status: 'approved' } : p);
    localStorage.setItem('user_properties', JSON.stringify(updated));
    setProperties(updated);
  };

  const handleReject = (id) => {
    const props   = JSON.parse(localStorage.getItem('user_properties') || '[]');
    const updated = props.map(p => p.id === id ? { ...p, status: 'rejected' } : p);
    localStorage.setItem('user_properties', JSON.stringify(updated));
    setProperties(updated);
  };

  const handleView = (id) => {
    const props    = JSON.parse(localStorage.getItem('user_properties') || '[]');
    const property = props.find(p => p.id === id);
    setSelectedProperty(property);
  };

  const handleEdit = (property) => { setEditingProperty(property); };

  const handleSaveEdit = () => {
    const props   = JSON.parse(localStorage.getItem('user_properties') || '[]');
    const updated = props.map(p => p.id === editingProperty.id ? editingProperty : p);
    localStorage.setItem('user_properties', JSON.stringify(updated));
    setProperties(updated);
    setEditingProperty(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this property permanently?')) return;
    const props   = JSON.parse(localStorage.getItem('user_properties') || '[]');
    const updated = props.filter(p => p.id !== id);
    localStorage.setItem('user_properties', JSON.stringify(updated));
    setProperties(updated);
  };

  // ============ SOLD ============
  const handleSoldChange = (e) => setSoldForm({ ...soldForm, [e.target.name]: e.target.value });
const handleSoldSubmit = async (e) => {
  e.preventDefault();
  if (!soldForm.title || !soldForm.location) {
    setSoldFormError('Property Title and Location are required.');
    return;
  }
  setSoldFormError('');
  try {
  await axios.post('https://celebrated-flexibility-production-1c57.up.railway.app/api/sold-leased', {
  area:        soldForm.title,
  locality:    soldForm.location,
  price:       soldForm.price,
  size:        soldForm.size,
  type:        soldForm.propertyType,
  represented: soldForm.represented,
  status:      soldForm.status,
  description: soldForm.customerName,
});
    await loadSoldEntries();
    setSoldForm({
      title: '', location: '', price: '', size: '',
      propertyType: 'Land', represented: 'Both Buyer & Sellers',
      customerName: '', status: 'Sold'
    });
    setShowSoldModal(false);
    setSoldSuccess(true);
    setTimeout(() => setSoldSuccess(false), 3000);
  } catch (err) {
    console.error(err);
    setSoldFormError('Failed to save. Try again.');
  }
};
  const handleSoldDelete = async (id) => {
  if (!window.confirm('Delete this entry?')) return;
  try {
    await axios.delete(`https://celebrated-flexibility-production-1c57.up.railway.app/api/sold-leased/${id}`);
    await loadSoldEntries();
  } catch (err) { console.error(err); }
};
  // ============ TESTIMONIALS ============
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name',   testimonialForm.name);
      formData.append('role',   testimonialForm.role);
      formData.append('review', testimonialForm.review);
      if (testimonialForm.image) formData.append('image', testimonialForm.image);

      if (editingTestimonial) {
        await axios.put(
          `https://celebrated-flexibility-production-1c57.up.railway.app/api/testimonials/${editingTestimonial.id}`,
          formData, { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      } else {
        await axios.post(
          'https://celebrated-flexibility-production-1c57.up.railway.app/api/testimonials',
          formData, { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }
      await loadTestimonials();
      setTestimonialForm({ name: '', role: '', review: '', image: null });
      setEditingTestimonial(null);
      setShowTestimonialModal(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save testimonial');
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await axios.delete(`https://celebrated-flexibility-production-1c57.up.railway.app/api/testimonials/${id}`);
      await loadTestimonials();
    } catch (err) { console.error(err); }
  };

  const openAddTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialForm({ name: '', role: '', review: '', image: null });
    setShowTestimonialModal(true);
  };

  const openEditTestimonial = (item) => {
    setEditingTestimonial(item);
    setTestimonialForm({ name: item.name, role: item.role, review: item.review, image: null });
    setShowTestimonialModal(true);
  };

  const closeTestimonialModal = () => {
    setShowTestimonialModal(false);
    setEditingTestimonial(null);
    setTestimonialForm({ name: '', role: '', review: '', image: null });
  };

  // ============ SITE INQUIRIES ============
  const handleDeleteInquiry = async (id) => {
    try {
      await axios.delete(`https://celebrated-flexibility-production-1c57.up.railway.app/api/site-inquiries/${id}`);
      loadSiteInquiries();
    } catch (err) { console.error(err); }
  };
  const handleDeleteSellListing = async (id) => {
  if (!window.confirm('Delete this listing?')) return;
  try {
    await axios.delete(`https://celebrated-flexibility-production-1c57.up.railway.app/api/sell/${id}`);
    loadSellListings();
  } catch (err) { console.error(err); }
};

const handleApproveSellListing = async (id) => {
  try {
    await axios.patch(`https://celebrated-flexibility-production-1c57.up.railway.app/api/sell/${id}`, { status: 'approved' });
    loadSellListings();
  } catch (err) { console.error(err); }
};

const handleRejectSellListing = async (id) => {
  try {
    await axios.patch(`https://celebrated-flexibility-production-1c57.up.railway.app/api/sell/${id}`, { status: 'rejected' });
    loadSellListings();
  } catch (err) { console.error(err); }
};

const handleSaveSellEdit = async () => {
  try {
    await axios.put(`https://celebrated-flexibility-production-1c57.up.railway.app/api/sell/${editSellItem.id}`, editSellItem);
    loadSellListings();
    setEditSellItem(null);
  } catch (err) {
    console.error(err);
    alert('Failed to update listing');
  }
};

  // ============ NAV ============
  const handleTabClick = (tabId) => {
    if (!disabledTabs.includes(tabId)) setActiveTab(tabId);
  };

  // ============ TAB CONTENT ============
  const renderTabContent = () => {
    switch (activeTab) {

      // ---- SOLD ----
      case 'Sold':
        return (
          <div className="admin-table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 className="serif" style={{ fontSize: '1.5rem' }}>Sold / Leased Inventory</h3>
              <button className="book-btn" style={{ gap: '10px', fontSize: '0.8rem', padding: '0.8rem 1.5rem', cursor: 'pointer' }} onClick={() => setShowSoldModal(true)}>
                <Plus size={18} /> ADD SOLD DETAIL
              </button>
            </div>

            <AnimatePresence>
              {soldSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  style={{ background: 'rgba(46,213,115,0.12)', border: '1px solid rgba(46,213,115,0.3)', color: '#2ed573', borderRadius: '10px', padding: '12px 20px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  ✅ Sold entry added successfully!
                </motion.div>
              )}
            </AnimatePresence>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>PROPERTY DETAIL</th><th>LOCATION</th><th>VALUE</th>
                  <th>SIZE</th><th>REPRESENTED BY</th><th>STATUS</th><th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {soldEntries.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏡</div>
                      <div style={{ marginBottom: '0.4rem' }}>No sold entries yet.</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Click "+ ADD SOLD DETAIL" to record your first deal.</div>
                    </td>
                  </tr>
                ) : (
                  soldEntries.map((entry) => (
                   <motion.tr key={entry.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
  <td>
    <div style={{ fontWeight: 600 }}>{entry.area}</div>
    <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', marginTop: 3 }}>{entry.type}</div>
  </td>
  <td>{entry.locality}</td>
  <td style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{entry.price || '—'}</td>
  <td>{entry.size || '—'}</td>
  <td style={{ fontSize: '0.82rem' }}>
    <strong style={{ color: 'var(--accent-gold)' }}>{entry.represented}</strong>
  </td>
  <td>
    <span className={`status-badge ${entry.status === 'Sold' ? 'status-booked' : 'status-available'}`}>
      {entry.status}
    </span>
  </td>
  <td>
    <Trash2 size={18} style={{ cursor: 'pointer', color: '#ff4757', opacity: 0.7 }} onClick={() => handleSoldDelete(entry.id)} />
  </td>
</motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );
      // ---- TESTIMONIALS ----
      case 'Testimonials':
        return (
          <div className="admin-table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 className="serif" style={{ fontSize: '1.5rem' }}>Testimonials</h3>
              <button
                className="book-btn"
                style={{ gap: '10px', fontSize: '0.8rem', padding: '0.8rem 1.5rem', cursor: 'pointer' }}
                onClick={openAddTestimonial}
              >
                <Plus size={18} /> ADD TESTIMONIAL
              </button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>IMAGE</th><th>NAME</th><th>ROLE</th><th>REVIEW</th><th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💬</div>
                      No testimonials yet. Click "+ ADD TESTIMONIAL" to add one.
                    </td>
                  </tr>
                ) : (
                  testimonials.map((item) => (
                    <motion.tr key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <td>
                        <img
                          src={item.image_url ? `https://celebrated-flexibility-production-1c57.up.railway.app${item.image_url}` : '/default-user.jpg'}
                          alt={item.name}
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }}
                        />
                      </td>
                      <td style={{ fontWeight: 600 }}>{item.name}</td>
                      <td style={{ fontSize: '0.85rem', opacity: 0.7 }}>{item.role}</td>
                      <td style={{ fontSize: '0.82rem', maxWidth: '250px' }}>
                        {item.review.slice(0, 80)}{item.review.length > 80 ? '...' : ''}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' }}
                            onClick={() => openEditTestimonial(item)}
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' }}
                            onClick={() => handleDeleteTestimonial(item.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );
        case 'Sell Listings':
  return (
    <div className="admin-table-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 className="serif" style={{ fontSize: '1.5rem' }}>Sell Listings</h3>
        <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{sellListings.length} Listings</div>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Property</th><th>Category</th><th>Location</th>
            <th>Price</th><th>Amenities</th><th>Status</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellListings.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏠</div>
                No sell listings yet.
              </td>
            </tr>
          ) : (
            sellListings.map((item) => (
              <motion.tr key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <td>
                  <div style={{ fontWeight: 600 }}>{item.property_name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{item.property_type}</div>
                </td>
                <td style={{ textTransform: 'capitalize' }}>{item.category || '—'}</td>
                <td style={{ textTransform: 'capitalize' }}>{item.location || '—'}</td>
                <td style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{item.price || '—'}</td>
                <td style={{ fontSize: '0.78rem', maxWidth: '150px' }}>{item.amenities || '—'}</td>
                <td>
                  <span style={{
                    background: item.status === 'approved' ? '#288849' : item.status === 'rejected' ? '#d32f2f' : '#ff9800',
                    color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
                  }}>
                    {item.status || 'pending'}
                  </span>
                </td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
  <button
    style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
    onClick={() => setViewSellItem(item)}
  >View</button>
  <button
    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
    onClick={() => setEditSellItem({...item})}
  >Edit</button>
  <button
    style={{ background: '#288849', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
    onClick={() => handleApproveSellListing(item.id)}
  >Approve</button>
  <button
    style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
    onClick={() => handleRejectSellListing(item.id)}
  >Reject</button>
  <button
    style={{ background: '#111827', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
    onClick={() => handleDeleteSellListing(item.id)}
  >Delete</button>
</div>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

      // ---- SITE INQUIRIES ----
      case 'Site Inquiries':
        return (
          <div className="admin-table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 className="serif" style={{ fontSize: '1.5rem' }}>Site Inquiries</h3>
              <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{siteInquiries.length} Leads</div>
            </div>
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Phone</th><th>Region</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {siteInquiries.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No inquiries found.</td></tr>
                ) : (
                  siteInquiries.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <a href={`tel:${item.phone}`} style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>
                          {item.phone}
                        </a>
                      </td>
                      <td>{item.region}</td>
                      <td>{new Date(item.created_at).toLocaleDateString()}</td>
                      <td>
                        <button
                          style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                          onClick={() => handleDeleteInquiry(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

      // ---- SETTINGS ----
      case 'Settings':
        return (
          <div className="admin-table-container" style={{ maxWidth: '800px' }}>
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Configuration</h3>
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div className="admin-input-group">
                <label>Company Name</label>
                <input type="text" value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} />
              </div>
              <div className="admin-input-group">
                <label>Admin Email</label>
                <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
              </div>
              <div className="admin-input-group">
                <label>Support Phone</label>
                <input type="text" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} />
              </div>
              <div className="admin-input-group">
                <label>Office Address</label>
                <textarea
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#fdfdfd', border: '1px solid #eee' }}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                />
              </div>
              <button className="book-btn" style={{ width: 'fit-content', padding: '1rem 3rem', cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
        );

      default:
        return (
          <div className="admin-table-container">
            <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Tab Disabled</h3>
              <p style={{ opacity: 0.6 }}>This section is currently under development.</p>
            </div>
          </div>
        );
    }
  };

  // ============ RENDER ============
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo" style={{ cursor: 'pointer', padding: '0 10px' }}>
          <img src={logo} alt="RSV Groups Logo" style={{ width: '100%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} />
        </div>
        <nav className="admin-nav">
          {[
            { id: 'Dashboard',      icon: <LayoutDashboard size={20} /> },
            { id: 'Plots',          icon: <Map size={20} /> },
            { id: 'Leads',          icon: <Users size={20} /> },
            { id: 'Projects',       icon: <Layers size={20} /> },
            { id: 'Sold',           icon: <BadgeDollarSign size={20} /> },
            { id: 'Sell Listings', icon: <ArrowUpRight size={20} /> },
            { id: 'Testimonials',   icon: <Users size={20} /> },
            { id: 'Site Inquiries', icon: <Phone size={20} /> },
            { id: 'Settings',       icon: <Settings size={20} /> },
          ].map((item) => {
            const isDisabled = disabledTabs.includes(item.id);
            return (
              <div
                key={item.id}
                className={`admin-nav-item ${activeTab === item.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => handleTabClick(item.id)}
                style={{
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.4 : 1,
                  filter: isDisabled ? 'grayscale(0.3)' : 'none',
                  pointerEvents: isDisabled ? 'none' : 'auto',
                }}
              >
                {item.icon} {item.id}
                {isDisabled && <span style={{ fontSize: '0.7rem', marginLeft: '8px', color: '#888' }}>(Soon)</span>}
              </div>
            );
          })}
        </nav>
        <div style={{ marginTop: 'auto', cursor: 'pointer' }} className="admin-nav-item" onClick={onLogout}>
          <LogOut size={20} /> Logout
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <h1 className="serif">{activeTab}</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>RSV Management Hub</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={`Search in ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'rgba(15,26,17,0.04)', border: '1px solid var(--admin-border)', padding: '12px 20px 12px 45px', borderRadius: '100px', color: 'var(--admin-text)', outline: 'none', width: '300px' }}
              />
              <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text)', opacity: 0.5 }} />
            </div>
            <Bell size={24} style={{ color: 'var(--admin-text)', opacity: 0.5, cursor: 'pointer' }} />
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid white', background: `url(${logo}) center/cover`, cursor: 'pointer' }} />
          </div>
        </header>
        {renderTabContent()}
      </main>

      {/* ===== SOLD MODAL ===== */}
      <AnimatePresence>
        {showSoldModal && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowSoldModal(false); }}
          >
            <motion.div
              className="admin-modal"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
            >
              <button onClick={() => setShowSoldModal(false)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                <X size={22} />
              </button>
              <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                Add New <span className="highlight">Sold Detail</span>
              </h2>
              <form onSubmit={handleSoldSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>PROPERTY / DEAL TITLE</label>
                  <input type="text" name="title" value={soldForm.title} onChange={handleSoldChange} placeholder="e.g. Land in Kundrathur" />
                </div>
                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>SPECIFIC LOCATION</label>
                  <input type="text" name="location" value={soldForm.location} onChange={handleSoldChange} placeholder="e.g. Astalakshmi Nagar, Chennai" />
                </div>
                <div className="admin-input-group">
                  <label>PRICE / VALUE</label>
                  <input type="text" name="price" value={soldForm.price} onChange={handleSoldChange} placeholder="e.g. 75L or Market Rate" />
                </div>
                <div className="admin-input-group">
                  <label>SIZE (SQ.FT / GROUND)</label>
                  <input type="text" name="size" value={soldForm.size} onChange={handleSoldChange} placeholder="e.g. 2400 sqft" />
                </div>
                <div className="admin-input-group">
                  <label>PROPERTY TYPE</label>
                  <select name="propertyType" value={soldForm.propertyType} onChange={handleSoldChange}>
                    {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="admin-input-group">
                  <label>STATUS</label>
                  <select name="status" value={soldForm.status} onChange={handleSoldChange}>
                    <option>Sold</option>
                    <option>Leased</option>
                  </select>
                </div>
                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>REPRESENTED BY</label>
                  <select name="represented" value={soldForm.represented} onChange={handleSoldChange}>
                    {REPRESENTED_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
                    Preview → <span style={{ color: '#c9a84c', fontStyle: 'normal', fontWeight: 600 }}>RSV Groups Represented {soldForm.represented}</span>
                  </div>
                </div>
                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>CUSTOMER NAME / NOTE</label>
                  <input type="text" name="customerName" value={soldForm.customerName} onChange={handleSoldChange} placeholder="e.g. Jagadeesan M or Private Client" />
                </div>
                {soldFormError && (
                  <div style={{ gridColumn: 'span 2', color: '#ff4757', fontSize: '0.85rem', background: 'rgba(255,71,87,0.1)', padding: '10px 14px', borderRadius: '8px' }}>
                    {soldFormError}
                  </div>
                )}
                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="book-btn" style={{ flex: 1, cursor: 'pointer' }}>ADD SOLD ENTRY</button>
                  <button type="button" className="book-btn" style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
                    onClick={() => { setShowSoldModal(false); setSoldFormError(''); }}>
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== TESTIMONIAL MODAL ===== */}
      <AnimatePresence>
        {showTestimonialModal && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) closeTestimonialModal(); }}
          >
            <motion.div
              className="admin-modal"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
            >
              <button onClick={closeTestimonialModal} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                <X size={22} />
              </button>
              <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                {editingTestimonial ? 'Edit' : 'Add New'} <span className="highlight">Testimonial</span>
              </h2>
              <form onSubmit={handleTestimonialSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                <div className="admin-input-group">
                  <label>CUSTOMER NAME</label>
                  <input type="text" required placeholder="e.g. Rajesh Kumar"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                  />
                </div>
                <div className="admin-input-group">
                  <label>ROLE / DESIGNATION</label>
                  <input type="text" placeholder="e.g. Plot Owner, OMR"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                  />
                </div>
                <div className="admin-input-group">
                  <label>REVIEW</label>
                  <textarea
                    required placeholder="Customer's testimonial..."
                    style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'inherit', resize: 'vertical' }}
                    value={testimonialForm.review}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })}
                  />
                </div>
                <div className="admin-input-group">
                  <label>PROFILE PHOTO {editingTestimonial && '(leave empty to keep existing)'}</label>
                  <input type="file" accept="image/*"
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.files[0] || null })}
                  />
                  {testimonialForm.image && (
                    <img src={URL.createObjectURL(testimonialForm.image)} alt="Preview"
                      style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', marginTop: '10px', border: '2px solid var(--accent-gold)' }}
                    />
                  )}
                  {editingTestimonial && !testimonialForm.image && editingTestimonial.image_url && (
                    <img src={`https://celebrated-flexibility-production-1c57.up.railway.app${editingTestimonial.image_url}`} alt="Current"
                      style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', marginTop: '10px', border: '2px solid var(--accent-gold)', opacity: 0.7 }}
                    />
                  )}
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <button type="submit" className="book-btn" style={{ flex: 1, cursor: 'pointer' }}>
                    {editingTestimonial ? 'UPDATE TESTIMONIAL' : 'SAVE TESTIMONIAL'}
                  </button>
                  <button type="button" className="book-btn"
                    style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
                    onClick={closeTestimonialModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== VIEW PROPERTY MODAL ===== */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#fff', width: '700px', maxWidth: '95%', borderRadius: '16px', padding: '30px', color: '#111' }}
            >
              <h2 style={{ marginBottom: '1rem' }}>{selectedProperty.title}</h2>
              <p><strong>Location:</strong> {selectedProperty.location}</p>
              <p><strong>Type:</strong> {selectedProperty.type}</p>
              <p><strong>Owner:</strong> {selectedProperty.ownerName}</p>
              <p><strong>Phone:</strong> {selectedProperty.phone}</p>
              <button onClick={() => setSelectedProperty(null)}
                style={{ marginTop: '1.5rem', background: '#288849', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== EDIT PROPERTY MODAL ===== */}
      <AnimatePresence>
        {editingProperty && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}
            onClick={() => setEditingProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#fff', width: '700px', maxWidth: '95%', borderRadius: '16px', padding: '30px', color: '#111' }}
            >
              <h2 style={{ marginBottom: '1.5rem' }}>Edit Property</h2>
              <input type="text" value={editingProperty.title || ''} placeholder="Title"
                onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input type="text" value={editingProperty.location || ''} placeholder="Location"
                onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <textarea value={editingProperty.description || ''} placeholder="Description"
                onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                style={{ width: '100%', minHeight: '120px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button onClick={handleSaveEdit} style={{ background: '#288849', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Save Changes</button>
                <button onClick={() => setEditingProperty(null)} style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ===== VIEW SELL LISTING MODAL ===== */}
      <AnimatePresence>
        {viewSellItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}
            onClick={() => setViewSellItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#fff', width: '750px', maxWidth: '95%', borderRadius: '16px', padding: '35px', color: '#111', maxHeight: '90vh', overflowY: 'auto' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>🏠 Property Details</h2>
                <button onClick={() => setViewSellItem(null)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>✕</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                {[
                  { label: 'Property Name', value: viewSellItem.property_name },
                  { label: 'Category', value: viewSellItem.category },
                  { label: 'Property Type', value: viewSellItem.property_type },
                  { label: 'Location', value: viewSellItem.location },
                  { label: 'Expected Price', value: viewSellItem.price },
                  { label: 'Member Type', value: viewSellItem.member_type },
                  { label: 'Status', value: viewSellItem.status },
                  { label: 'Submitted On', value: new Date(viewSellItem.created_at).toLocaleDateString() },
                ].map((field) => (
                  <div key={field.label} style={{ background: '#f9f9f9', padding: '14px 18px', borderRadius: '10px', border: '1px solid #eee' }}>
                    <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>{field.label}</div>
                    <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{field.value || '—'}</div>
                  </div>
                ))}

                <div style={{ gridColumn: 'span 2', background: '#f9f9f9', padding: '14px 18px', borderRadius: '10px', border: '1px solid #eee' }}>
                  <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>Amenities</div>
                  <div style={{ fontWeight: 600 }}>{viewSellItem.amenities || '—'}</div>
                </div>

                <div style={{ gridColumn: 'span 2', background: '#f9f9f9', padding: '14px 18px', borderRadius: '10px', border: '1px solid #eee' }}>
                  <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>Property Address</div>
                  <div style={{ fontWeight: 600 }}>{viewSellItem.property_address || '—'}</div>
                </div>

                {viewSellItem.image_urls && (
  <div style={{ gridColumn: 'span 2', background: '#f9f9f9', padding: '14px 18px', borderRadius: '10px', border: '1px solid #eee' }}>
    <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>Property Images</div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {viewSellItem.image_urls.split(',').map((url, idx) => (
        <img
          key={idx}
          src={`https://celebrated-flexibility-production-1c57.up.railway.app${url.trim()}`}
          alt={`Property ${idx + 1}`}
          style={{ width: '150px', height: '110px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #eee' }}
        />
      ))}
    </div>
  </div>
)}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '2rem' }}>
                <button
                  style={{ background: '#288849', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => { handleApproveSellListing(viewSellItem.id); setViewSellItem(null); }}
                >Approve</button>
                <button
                  style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => { handleRejectSellListing(viewSellItem.id); setViewSellItem(null); }}
                >Reject</button>
                <button
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => { setEditSellItem({...viewSellItem}); setViewSellItem(null); }}
                >Edit</button>
                <button
                  style={{ background: '#f0f0f0', color: '#111', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => setViewSellItem(null)}
                >Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== EDIT SELL LISTING MODAL ===== */}
      <AnimatePresence>
        {editSellItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 }}
            onClick={() => setEditSellItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: '#1a1a2e', color: '#fff', width: '750px', maxWidth: '95%', borderRadius: '16px', padding: '35px', maxHeight: '90vh', overflowY: 'auto' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem' }}>✏️ Edit Sell Listing</h2>
                <button onClick={() => setEditSellItem(null)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.5rem' }}>✕</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                {[
                  { label: 'Property Name', key: 'property_name' },
                  { label: 'Expected Price', key: 'price' },
                  { label: 'Category', key: 'category' },
                  { label: 'Property Type', key: 'property_type' },
                  { label: 'Location', key: 'location' },
                  { label: 'Member Type', key: 'member_type' },
                ].map((field) => (
                  <div key={field.key} className="admin-input-group">
                    <label>{field.label.toUpperCase()}</label>
                    <input
                      type="text"
                      value={editSellItem[field.key] || ''}
                      onChange={(e) => setEditSellItem({ ...editSellItem, [field.key]: e.target.value })}
                    />
                  </div>
                ))}

                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>AMENITIES</label>
                  <input
                    type="text"
                    value={editSellItem.amenities || ''}
                    onChange={(e) => setEditSellItem({ ...editSellItem, amenities: e.target.value })}
                  />
                </div>

                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>PROPERTY ADDRESS</label>
                  <textarea
                    rows="3"
                    style={{ width: '100%', padding: '1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', resize: 'vertical' }}
                    value={editSellItem.property_address || ''}
                    onChange={(e) => setEditSellItem({ ...editSellItem, property_address: e.target.value })}
                  />
                </div>

                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>DESCRIPTION</label>
                  <textarea
                    rows="4"
                    style={{ width: '100%', padding: '1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', resize: 'vertical' }}
                    value={editSellItem.description || ''}
                    onChange={(e) => setEditSellItem({ ...editSellItem, description: e.target.value })}
                  />
                </div>

                <div className="admin-input-group">
                  <label>STATUS</label>
                  <select
                    value={editSellItem.status || 'pending'}
                    onChange={(e) => setEditSellItem({ ...editSellItem, status: e.target.value })}
                    style={{ width: '100%', padding: '0.9rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.2rem', marginTop: '2rem' }}>
                <button
                  style={{ flex: 1, background: '#288849', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600 }}
                  onClick={handleSaveSellEdit}
                >Save Changes</button>
                <button
                  style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '12px', borderRadius: '10px', cursor: 'pointer' }}
                  onClick={() => setEditSellItem(null)}
                >Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;

