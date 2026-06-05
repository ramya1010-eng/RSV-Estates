
// AdminDashboard.jsx — Disabled Dashboard, Plots, Leads, Projects
// Only Sold, Approvals, Settings are active

import React, { useState, useEffect } from 'react';
import '../Admin.css';
import {
  LayoutDashboard,
  Map,
  Users,
  Layers,
  Settings,
  Plus,
  Trash2,
  Edit3,
  ArrowUpRight,
  Search,
  Bell,
  LogOut,
  CheckCircle,
  BadgeDollarSign,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import axios from 'axios';
import logo from '../images/LOGO.png';

const PROPERTY_TYPES = ["Land", "Apartment", "Villa", "Plot", "Commercial", "Independent House"];
const REPRESENTED_OPTIONS = ["Both Buyer & Sellers", "Buyer Only", "Seller Only", "Developer"];

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Sold'); // Changed default to Sold
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSoldModal, setShowSoldModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([]);
  const [soldSuccess, setSoldSuccess] = useState(false);

  // Disabled tabs list
  const disabledTabs = ['Dashboard', 'Plots', 'Leads', 'Projects'];

  const [soldEntries, setSoldEntries] = useState(
    JSON.parse(localStorage.getItem('sold_entries') || '[]')
  );

  const [soldForm, setSoldForm] = useState({
    title: '',
    location: '',
    price: '',
    size: '',
    propertyType: 'Land',
    represented: 'Both Buyer & Sellers',
    customerName: '',
    status: 'Sold',
  });
  const [soldFormError, setSoldFormError] = useState('');

  useEffect(() => {
  const props = JSON.parse(
    localStorage.getItem('user_properties') || '[]'
  );

  setProperties(props);
}, [activeTab]);

  const [selectedProperty, setSelectedProperty] = useState(null);

  const [testimonials, setTestimonials] = useState([]);

  const [siteInquiries, setSiteInquiries] = useState([]);

const [showTestimonialModal, setShowTestimonialModal] = useState(false);

const [editingTestimonial, setEditingTestimonial] = useState(null);

const [testimonialForm, setTestimonialForm] = useState({
  name: '',
  role: '',
  text: '',
  img: ''
});

useEffect(() => {
  loadTestimonials();
}, []);

const loadTestimonials = async () => {
  try {
    const res = await axios.get(
      'http://localhost:5000/api/testimonials'
    );

    setTestimonials(res.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  loadSiteInquiries();
}, []);

const loadSiteInquiries = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/site-inquiries"
    );

    setSiteInquiries(res.data);
  } catch (err) {
    console.error(err);
  }
};

const handleDeleteInquiry = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/site-inquiries/${id}`
    );

    loadSiteInquiries();
  } catch (err) {
    console.error(err);
  }
};

  const handleApprove = (id) => {
  const props = JSON.parse(
    localStorage.getItem('user_properties') || '[]'
  );

  const updated = props.map(p =>
    p.id === id
      ? { ...p, status: 'approved' }
      : p
  );

  localStorage.setItem(
    'user_properties',
    JSON.stringify(updated)
  );

  setProperties(updated);
};

  const handleReject = (id) => {
  const props = JSON.parse(
    localStorage.getItem('user_properties') || '[]'
  );

  const updated = props.map(p =>
    p.id === id
      ? { ...p, status: 'rejected' }
      : p
  );

  localStorage.setItem(
    'user_properties',
    JSON.stringify(updated)
  );

  setProperties(updated);
};

  const handleView = (id) => {
  const props = JSON.parse(
    localStorage.getItem('user_properties') || '[]'
  );

  const property = props.find(
    p => p.id === id
  );

  setSelectedProperty(property);
};

const [editingProperty, setEditingProperty] = useState(null);

const handleEdit = (property) => {
  setEditingProperty(property);
};

const handleSaveEdit = () => {
  const props = JSON.parse(
    localStorage.getItem('user_properties') || '[]'
  );

  const updated = props.map((p) =>
    p.id === editingProperty.id
      ? editingProperty
      : p
  );

  localStorage.setItem(
    'user_properties',
    JSON.stringify(updated)
  );

  setProperties(updated);
  setEditingProperty(null);
};

const handleDelete = (id) => {
  if (!window.confirm('Delete this property permanently?')) return;

  const props = JSON.parse(
    localStorage.getItem('user_properties') || '[]'
  );

  const updated = props.filter(
    (p) => p.id !== id
  );

  localStorage.setItem(
    'user_properties',
    JSON.stringify(updated)
  );

  setProperties(updated);
};

const handleAddTestimonial = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append(
      "name",
      testimonialForm.name
    );

    formData.append(
      "role",
      testimonialForm.role
    );

    formData.append(
      "review",
      testimonialForm.review
    );

    formData.append(
      "image",
      testimonialForm.image
    );

    await axios.post(
      "http://localhost:5000/api/testimonials",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

    const res = await axios.get(
      "http://localhost:5000/api/testimonials"
    );

    setTestimonials(res.data);

    setTestimonialForm({
      name: "",
      role: "",
      review: "",
      image: null
    });

    setShowTestimonialModal(false);

  } catch (err) {
    console.error(err);
    alert("Failed to save testimonial");
  }
};

  const [plots, setPlots] = useState([
    { id: 1, name: "Premium Plot A1", location: "OMR, Chennai", price: "45L", size: "1200 Sq.ft", status: "Available", project: "The Royal Estate" },
    { id: 2, name: "Emerald Plot B4", location: "ECR, Chennai", price: "85L", size: "2400 Sq.ft", status: "Booked", project: "Emerald Valley" },
    { id: 3, name: "Heritage Plot C9", location: "GST Road", price: "32L", size: "1000 Sq.ft", status: "Available", project: "Heritage West" },
  ]);

  const [leads, setLeads] = useState([
    { id: 1, name: "Anish Kumar", phone: "+91 98765 43210", email: "anish@email.com", interest: "OMR Plots", status: "New", date: "2024-03-20" },
    { id: 2, name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@email.com", interest: "ECR Luxury", status: "Contacted", date: "2024-03-19" },
    { id: 3, name: "Vikram Singh", phone: "+91 76543 21098", email: "vikram@email.com", interest: "Heritage West", status: "Sold", date: "2024-03-18" },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: "The Royal Estate", location: "OMR, Chennai", units: "45/60", status: "Active" },
    { id: 2, name: "Emerald Valley", location: "ECR, Chennai", units: "12/24", status: "Limited" },
    { id: 3, name: "Heritage West", location: "GST Road", units: "10/10", status: "Sold Out" },
  ]);

  const [settings, setSettings] = useState({
    companyName: "RSV Groups",
    contactEmail: "info@rsvgroups.com",
    contactPhone: "+91 90000 00000",
    address: "Anna Salai, Chennai",
  });

  const filteredPlots = plots.filter(plot =>
    plot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plot.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plot.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Plots",    value: plots.length,    icon: <Map size={24}/>,          trend: "+12%" },
    { label: "Active Leads",   value: leads.length,    icon: <Users size={24}/>,        trend: "+5%"  },
    { label: "Total Projects", value: projects.length, icon: <Layers size={24}/>,       trend: "Stable"},
    { label: "Bookings",       value: "24",            icon: <ArrowUpRight size={24}/>, trend: "+18%" },
  ];

  const handleSoldChange = (e) => {
    setSoldForm({ ...soldForm, [e.target.name]: e.target.value });
  };

  const handleSoldSubmit = (e) => {
    e.preventDefault();
    if (!soldForm.title || !soldForm.location) {
      setSoldFormError('Property Title and Location are required.');
      return;
    }
    setSoldFormError('');
    const newEntry = { ...soldForm, id: Date.now() };
    const updated = [newEntry, ...soldEntries];
    setSoldEntries(updated);
    localStorage.setItem('sold_entries', JSON.stringify(updated));
    setSoldForm({ title: '', location: '', price: '', size: '', propertyType: 'Land', represented: 'Both Buyer & Sellers', customerName: '', status: 'Sold' });
    setShowSoldModal(false);
    setSoldSuccess(true);
    setTimeout(() => setSoldSuccess(false), 3000);
  };

  const handleSoldDelete = (id) => {
    const updated = soldEntries.filter(e => e.id !== id);
    setSoldEntries(updated);
    localStorage.setItem('sold_entries', JSON.stringify(updated));
  };

  const handleTabClick = (tabId) => {
    // Only allow click if tab is not disabled
    if (!disabledTabs.includes(tabId)) {
      setActiveTab(tabId);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
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
                  <th>PROPERTY DETAIL</th>
                  <th>LOCATION</th>
                  <th>VALUE</th>
                  <th>SIZE</th>
                  <th>REPRESENTED BY</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
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
                        <div style={{ fontWeight: 600 }}>{entry.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', marginTop: 3 }}>{entry.propertyType}</div>
                      </td>
                      <td>{entry.location}</td>
                      <td style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{entry.price || '—'}</td>
                      <td>{entry.size || '—'}</td>
                      <td style={{ fontSize: '0.82rem' }}>
                        RSV Groups Represented{' '}
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

      case 'Approvals':
        return (
          <div className="admin-table-container">
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Property Approvals</h3>
            <table className="admin-table">
              <thead>
                <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Owner</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                {properties.length === 0 ? (
                  <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No pending properties at the moment.</td></tr>
                ) : (
                  properties.map((prop) => (
                    <tr key={prop.id || prop.title}>
                      <td style={{ fontWeight: 600 }}>
                        {prop.title}
                      </td>

                      <td>
                        {prop.location}
                      </td>

                      <td>
                        {prop.type || prop.propertyType || 'N/A'}
                      </td>

                      <td>
                        <div>{prop.ownerName}</div>
                        <div
                          style={{
                            fontSize: '0.75rem',
                            opacity: 0.6
                          }}
                        >
                          {prop.phone}
                        </div>
                      </td>

                      <td>
                        <span
                          style={{
                            background:
                              prop.status === 'approved'
                                ? '#288849'
                                : prop.status === 'rejected'
                                ? '#d32f2f'
                                : '#ff9800',
                            color: '#fff',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          {prop.status || 'pending'}
                        </span>
                      </td>

                <td>
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}
                >
                  <button
                    style={{ background:'#288849', color:'#fff', border:'none', padding:'8px 12px', borderRadius:'6px' }}
                    onClick={() => handleApprove(prop.id)}
                  >
                    Approve
                  </button>

                  <button
                    style={{ background:'#d32f2f', color:'#fff', border:'none', padding:'8px 12px', borderRadius:'6px' }}
                    onClick={() => handleReject(prop.id)}
                  >
                    Reject
                  </button>

                  <button
                    style={{ background:'#2563eb', color:'#fff', border:'none', padding:'8px 12px', borderRadius:'6px' }}
                    onClick={() => handleEdit(prop)}
                  >
                    Edit
                  </button>

                  <button
                    style={{ background:'#f59e0b', color:'#fff', border:'none', padding:'8px 12px', borderRadius:'6px' }}
                    onClick={() => handleView(prop.id)}
                  >
                    View
                  </button>

                  <button
                    style={{ background:'#111827', color:'#fff', border:'none', padding:'8px 12px', borderRadius:'6px' }}
                    onClick={() => handleDelete(prop.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
</tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );

        case 'Testimonials':
  return (
    <div className="admin-table-container">

      <div
        style={{
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          marginBottom:'2rem'
        }}
      >
        <h2>
  {editingTestimonial
    ? 'Edit Testimonial'
    : 'Add Testimonial'}
</h2>

        <button
          className="book-btn"
          onClick={() => setShowTestimonialModal(true)}
        >
          + Add Testimonial
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {testimonials.length === 0 ? (
            <tr>
              <td colSpan="4">
                No testimonials found.
              </td>
            </tr>
          ) : (
            testimonials.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>

                <td>{item.role}</td>

                <td>
                  {item.review.slice(0,60)}...
                </td>

                 <td>
                  <div className="testimonial-actions">

                    <button
                      className="testimonial-edit-btn"
                      onClick={() => {
                        setEditingTestimonial(item);

                        setTestimonialForm({
                          name: item.name,
                          role: item.role,
                          review: item.review,
                          image: item.image
                        });

                        setShowTestimonialModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="testimonial-delete-btn"
                      onClick={() =>
                        handleDeleteTestimonial(item.id)
                      }
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))
          )}

        </tbody>
      </table>

    </div>
  );

      case 'Site Inquiries':
  return (
    <div className="admin-table-container">

      <div
        style={{
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          marginBottom:'2rem'
        }}
      >
        <h3
          className="serif"
          style={{
            fontSize:'1.5rem'
          }}
        >
          Site Inquiries
        </h3>

        <div
          style={{
            color:'var(--accent-gold)',
            fontWeight:600
          }}
        >
          {siteInquiries.length} Leads
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Region</th>
            <th>Date</th>
            <th>Actions</th>      
          </tr>
        </thead>

        <tbody>

          {siteInquiries.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign:'center',
                  padding:'2rem'
                }}
              >
                No inquiries found.
              </td>
            </tr>
          ) : (
            siteInquiries.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>

                <td>
                  <a
                    href={`tel:${item.phone}`}
                    style={{
                      color:'var(--accent-gold)',
                      textDecoration:'none',
                      fontWeight:600
                    }}
                  >
                    {item.phone}
                  </a>
                </td>

                <td>{item.region}</td>

                <td>
                  {new Date(
                    item.created_at
                  ).toLocaleDateString()}
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleDeleteInquiry(item.id)
                    }
                    style={{
                      background:'#d32f2f',
                      color:'#fff',
                      border:'none',
                      padding:'8px 12px',
                      borderRadius:'6px',
                      cursor:'pointer'
                    }}
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

      case 'Settings':
        return (
          <div className="admin-table-container" style={{ maxWidth: '800px' }}>
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Configuration</h3>
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div className="admin-input-group">
                <label>Company Name</label>
                <input type="text" value={settings.companyName} onChange={(e) => setSettings({...settings, companyName: e.target.value})} />
              </div>
              <div className="admin-input-group">
                <label>Admin Email</label>
                <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} />
              </div>
              <div className="admin-input-group">
                <label>Support Phone</label>
                <input type="text" value={settings.contactPhone} onChange={(e) => setSettings({...settings, contactPhone: e.target.value})} />
              </div>
              <div className="admin-input-group">
                <label>Office Address</label>
                <textarea
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#fdfdfd', border: '1px solid #eee' }}
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
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

  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo" style={{ cursor: 'pointer', padding: '0 10px' }}>
          <img src={logo} alt="RSV Groups Logo" style={{ width: '100%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} />
        </div>
        <nav className="admin-nav">
          {[
            { id: 'Dashboard', icon: <LayoutDashboard size={20}/> },
            { id: 'Plots',     icon: <Map size={20}/> },
            { id: 'Leads',     icon: <Users size={20}/> },
            { id: 'Projects',  icon: <Layers size={20}/> },
            { id: 'Sold',      icon: <BadgeDollarSign size={20}/> },
            { id: 'Approvals', icon: <CheckCircle size={20}/> },
            { id: 'Testimonials', icon: <Users size={20}/> },
            { id: 'Site Inquiries', icon: <Phone size={20}/> },
            { id: 'Settings', icon: <Settings size={20}/> },
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
                  pointerEvents: isDisabled ? 'none' : 'auto'
                }}
              >
                {item.icon} {item.id}
                {isDisabled && <span style={{ fontSize: '0.7rem', marginLeft: '8px', color: '#888' }}>(Coming Soon)</span>}
              </div>
            );
          })}
        </nav>
        <div style={{ marginTop: 'auto', cursor: 'pointer' }} className="admin-nav-item" onClick={onLogout}>
          <LogOut size={20} /> Logout
        </div>
      </aside>

      {/* Main Content */}
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
                style={{
                  background: 'rgba(15, 26, 17, 0.04)',
                  border: '1px solid var(--admin-border)',
                  padding: '12px 20px 12px 45px',
                  borderRadius: '100px',
                  color: 'var(--admin-text)',
                  outline: 'none',
                  width: '300px'
                }}
              />
              <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text)', opacity: 0.5 }} />
            </div>
            <Bell size={24} style={{ color: 'var(--admin-text)', opacity: 0.5, cursor: 'pointer' }} />
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid white', background: 'url(https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100) center/cover', cursor: 'pointer' }}></div>
          </div>
        </header>

        {renderTabContent()}
      </main>

      {/* Add Sold Detail Modal */}
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
              style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
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
                    Preview → <span style={{ color: '#c9a84c', fontStyle: 'normal', fontWeight: 600 }}>
                      RSV Groups Represented {soldForm.represented}
                    </span>
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

          {showTestimonialModal && (
  <div className="admin-modal-overlay">

    <div
  className="admin-modal"
  style={{ position: 'relative' }}
>

  <button
  type="button"
  onClick={() => setShowTestimonialModal(false)}
  className="close-modal-btn"
>
  <X size={22} />
</button>

      <h2>Add Testimonial</h2>

      <form onSubmit={handleAddTestimonial}>

        <input
          placeholder="Customer Name"
          value={testimonialForm.name}
          onChange={(e)=>
            setTestimonialForm({
              ...testimonialForm,
              name:e.target.value
            })
          }
        />

        <input
          placeholder="Role"
          value={testimonialForm.role}
          onChange={(e)=>
            setTestimonialForm({
              ...testimonialForm,
              role:e.target.value
            })
          }
        />

                <textarea
          value={testimonialForm.review}
          onChange={(e) =>
            setTestimonialForm({
              ...testimonialForm,
              review: e.target.value
            })
          }
        />

        <input
  type="file"
  accept="image/*"
  onChange={(e) => {
  const file = e.target.files[0];

  if (!file) return;

  setTestimonialForm({
    ...testimonialForm,
    image: file
  });
}}
/>

{testimonialForm.image && (
  <img
    src={URL.createObjectURL(testimonialForm.image)}
    alt="Preview"
    style={{
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover"
    }}
  />
)}

        <div
  style={{
    display: 'flex',
    gap: '12px',
    marginTop: '20px'
  }}
>
  <button
  type="submit"
  className="save-testimonial-btn"
>
  {editingTestimonial
    ? 'Update Testimonial'
    : 'Save Testimonial'}
</button>

  <button
    type="button"
    className="cancel-testimonial-btn"
    onClick={() => setShowTestimonialModal(false)}
  >
    Cancel
  </button>
</div>

      </form>

    </div>

  </div>
)}

      {selectedProperty && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999
          }}
          onClick={() => setSelectedProperty(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              width: '700px',
              maxWidth: '95%',
              borderRadius: '16px',
              padding: '30px'
            }}
          >
            <h2>{selectedProperty.title}</h2>

            <p><strong>Location:</strong> {selectedProperty.location}</p>
            <p><strong>Type:</strong> {selectedProperty.type}</p>
            <p><strong>Owner:</strong> {selectedProperty.ownerName}</p>
            <p><strong>Phone:</strong> {selectedProperty.phone}</p>

            <button
              onClick={() => setSelectedProperty(null)}
              style={{
                background: '#288849',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >

                {editingProperty && (
                  <div
                    style={{
                          position: 'fixed',
                          inset: 0,
                          background: 'rgba(0,0,0,0.7)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: 99999
                              }}
                          onClick={() => setEditingProperty(null)}
                             >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                    background: '#fff',
                    width: '700px',
                    maxWidth: '95%',
                    borderRadius: '16px',
                    padding: '30px'
                    }}
                            >
                  <h2>Edit Property</h2>

                <input
                  type="text"
                  value={editingProperty.title || ''}
                  onChange={(e) =>
                  setEditingProperty({
              ...editingProperty,
                  title: e.target.value
                        })
                      }
              style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '15px'
                        }}
                            />

                      <input
                        type="text"
                        value={editingProperty.location || ''}
                        onChange={(e) =>
                          setEditingProperty({
                            ...editingProperty,
                            location: e.target.value
                          })
                        }
                        style={{
                          width: '100%',
                          padding: '12px',
                          marginBottom: '15px'
                        }}
                      />

                      <textarea
                        value={editingProperty.description || ''}
                        onChange={(e) =>
                          setEditingProperty({
                            ...editingProperty,
                            description: e.target.value
                          })
                        }
                        style={{
                          width: '100%',
                          minHeight: '120px',
                          padding: '12px'
                        }}
                      />

                      <div
                        style={{
                          display: 'flex',
                          gap: '15px',
                          marginTop: '20px'
                        }}
                      >
                        <button
                          onClick={handleSaveEdit}
                          style={{
                            background: '#288849',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          Save Changes
                        </button>

                        <button
                          onClick={() => setEditingProperty(null)}
                          style={{
                            background: '#d32f2f',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;