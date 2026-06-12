








// SellPage.jsx — Supabase DB integration
// Table: sell
//
// Setup:
// 1. npm install @supabase/supabase-js
// 2. Run sell_table.sql in Supabase → SQL Editor
// 3. Replace SUPABASE_URL and SUPABASE_ANON_KEY below

import React, { useState, useMemo } from "react";
import "./SellPage.css";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase Config ──────────────────────────────────────────────────────────
// Supabase Dashboard → Project Settings → API → copy these two values
const SUPABASE_URL      = "https://gdyapjrcmbhojclmrhyf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_BdsZT5s1ds2ntHEFE3POiw_9E0i79Ws";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// ─────────────────────────────────────────────────────────────────────────────

const SellPage = ({ category = "" }) => {
  const [formData, setFormData] = useState({
    propertyName:     "",
    propertyCategory: "",
    location:         "",
    propertyType:     "",
    apartmentType:    "",
    landArea:         "",
    landAreaUnit:     "sqft",
    builtupArea:      "",
    builtupUnit:      "sqft",
    plotSize:         "",
    plotUnit:         "sqft",
    price:            "",
    additionalInfo:   "",
    ownerName:        "",
    propertyAddress:  "",
    phone:            "",
    email:            "",
    memberType:       "new",
    images:           [],
  });

  const [amenities, setAmenities] = useState({
    balconies:    false,
    lift:         false,
    parking:      false,
    security:     false,
    clubHouse:    false,
    swimmingPool: false,
    garden:       false,
    gym:          false,
    playGround:   false,
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [showSuccess,   setShowSuccess]   = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState("");

  const amenitiesList = [
    { key: "balconies",    label: "Balconies",    icon: "🏢" },
    { key: "lift",         label: "Lift",         icon: "🛗" },
    { key: "parking",      label: "Parking",      icon: "🚗" },
    { key: "security",     label: "Security",     icon: "🛡️" },
    { key: "clubHouse",    label: "Club House",   icon: "🏘️" },
    { key: "swimmingPool", label: "Swimming Pool",icon: "🏊" },
    { key: "garden",       label: "Garden",       icon: "🌳" },
    { key: "gym",          label: "Gym",          icon: "🏋️" },
    { key: "playGround",   label: "Play Ground",  icon: "🎡" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setAmenities((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const combined    = [...formData.images, ...files].slice(0, 10);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setFormData((prev) => ({ ...prev, images: combined }));
    setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 10));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const selectedAmenities = useMemo(
    () => Object.keys(amenities).filter((key) => amenities[key]),
    [amenities]
  );

  const toBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let base64Images = [];
      if (formData.images.length > 0) {
        base64Images = await Promise.all(formData.images.map(toBase64));
      }

      let resolvedType = "land";
      if (category) {
        resolvedType = category;
      } else if (formData.propertyType === "plot") {
        resolvedType = "land";
      } else if (formData.propertyCategory) {
        resolvedType = formData.propertyCategory;
      }

      const row = {
        title:             formData.propertyName    || "Elite Listing",
        price:             formData.price           || "Contact for Price",
        property_category: formData.propertyCategory,
        property_type:     formData.propertyType,
        apartment_type:    formData.apartmentType   || null,
        type:              resolvedType,
        land_area:         formData.landArea        || null,
        land_area_unit:    formData.landAreaUnit,
        builtup_area:      formData.builtupArea     || null,
        builtup_unit:      formData.builtupUnit,
        plot_size:         formData.plotSize        || null,
        plot_unit:         formData.plotUnit,
        location:          formData.location        || "Chennai",
        property_address:  formData.propertyAddress,
        additional_info:   formData.additionalInfo  || null,
        cover_image:       base64Images[0]          || null,
        images:            base64Images,
        amenities:         selectedAmenities,
        owner_name:        formData.ownerName,
        phone:             formData.phone,
        email:             formData.email,
        member_type:       formData.memberType,
        status:            "pending",
      };

      const { error: dbError } = await supabase.from("sell").insert([row]);
      if (dbError) throw dbError;

      setShowSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sell-page">

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            <h2>Property Submitted Successfully</h2>
            <p>Your property has been submitted and is currently pending approval.</p>
            <button className="continue-btn" onClick={() => { setShowSuccess(false); window.location.reload(); }}>
              Continue
            </button>
          </div>
        </div>
      )}

      <section className="benefits-section">
        <div className="benefit-card"><span>💎</span><h4>Premium Buyer Network</h4></div>
        <div className="benefit-card"><span>📈</span><h4>Maximum Property Exposure</h4></div>
        <div className="benefit-card"><span>⚡</span><h4>Fast &amp; Secure Closing</h4></div>
      </section>

      <div className="progress-wrapper">
        <div className="progress-labels">
          <span>Property</span><span>Amenities</span><span>Contact</span><span>Submit</span>
        </div>
        <div className="progress-bar"><div className="progress-fill"></div></div>
      </div>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>

          <div className="section-header">
            <h2>Property Details</h2>
            <p>Basic information about your property</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Property Name *</label>
              <input type="text" name="propertyName" value={formData.propertyName} onChange={handleInputChange} placeholder="Luxury Villa" />
            </div>
            <div className="form-group">
              <label>Expected Price *</label>
              <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="₹ 1.5 Cr" />
            </div>
          </div>

          <div className="property-category">
            <label className="section-label">Property Category</label>
            <div className="category-grid">
              {[
                { value: "residential", icon: "🏠", title: "Residential", sub: "Apartments, Villas, Houses" },
                { value: "commercial",  icon: "🏢", title: "Commercial",  sub: "Offices, Shops, Buildings" },
              ].map((c) => (
                <div key={c.value} className={`category-card ${formData.propertyCategory === c.value ? "active" : ""}`} onClick={() => setFormData({ ...formData, propertyCategory: c.value })}>
                  <div className="category-icon">{c.icon}</div><h4>{c.title}</h4><p>{c.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Property Type *</label>
            <div className="category-grid">
              {[
                { value: "apartment", icon: "🏢", label: "Apartment"  },
                { value: "villa",     icon: "🏠", label: "Villa"       },
                { value: "plot",      icon: "🌳", label: "Plot / Land" },
              ].map((t) => (
                <div key={t.value} className={`category-card ${formData.propertyType === t.value ? "active" : ""}`} onClick={() => setFormData({ ...formData, propertyType: t.value })}>
                  <div className="category-icon">{t.icon}</div><h4>{t.label}</h4>
                </div>
              ))}
            </div>
          </div>

          {formData.propertyType === "apartment" && (
            <div className="form-group">
              <label>Apartment Type *</label>
              <select name="apartmentType" value={formData.apartmentType} onChange={handleInputChange}>
                <option value="">Select Apartment Type</option>
                <option value="corporate">Corporate</option>
                <option value="scalable">Scalable</option>
                <option value="uds">UDS</option>
              </select>
            </div>
          )}

          {formData.propertyType === "villa" && (
            <div className="form-grid">
              <div className="form-group">
                <label>Land Area *</label>
                <input type="text" name="landArea" value={formData.landArea} onChange={handleInputChange} placeholder="Enter Land Area" />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select name="landAreaUnit" value={formData.landAreaUnit} onChange={handleInputChange}>
                  <option value="sqft">Sq.ft</option><option value="acre">Acre</option>
                </select>
              </div>
              <div className="form-group">
                <label>Built-up Area *</label>
                <input type="text" name="builtupArea" value={formData.builtupArea} onChange={handleInputChange} placeholder="Enter Built-up Area" />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select name="builtupUnit" value={formData.builtupUnit} onChange={handleInputChange}>
                  <option value="sqft">Sq.ft</option><option value="acre">Acre</option>
                </select>
              </div>
            </div>
          )}

          {formData.propertyType === "plot" && (
            <div className="form-grid">
              <div className="form-group">
                <label>Land Size *</label>
                <input type="text" name="plotSize" value={formData.plotSize} onChange={handleInputChange} placeholder="e.g. 1200" />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select name="plotUnit" value={formData.plotUnit} onChange={handleInputChange}>
                  <option value="sqft">Sq.ft</option><option value="acre">Acre</option>
                </select>
              </div>
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label>Location *</label>
              <select name="location" value={formData.location} onChange={handleInputChange}>
                <option value="">Select Location</option>
                <option value="Chennai">Chennai</option>
                <option value="Thiruvallur">Thiruvallur</option>
                <option value="Kanchipuram">Kanchipuram</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Property Description</label>
            <textarea rows="5" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} placeholder="Describe your property, nearby landmarks, facilities, road access, highlights..." />
          </div>

          <div className="section-header">
            <h2>Property Images</h2>
            <p>Upload up to 10 high quality images to attract buyers faster</p>
          </div>

          <div className="upload-container">
            <label htmlFor="property-images" className="upload-box">
              <div className="upload-icon">📷</div>
              <h4>Upload Property Images</h4>
              <p>Drag &amp; Drop or Click to Browse</p>
              <span>Maximum 10 images · 5 MB each</span>
            </label>
            <input id="property-images" type="file" accept="image/*" multiple onChange={handleImageChange} hidden />

            {imagePreviews.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px', marginTop: '1.5rem' }}>
                {imagePreviews.map((src, idx) => (
                  <div key={idx} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', aspectRatio: '1', border: '2px solid rgba(245,130,32,0.3)' }}>
                    <img src={src} alt={`preview-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    {idx === 0 && (
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(245,130,32,0.85)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, textAlign: 'center', padding: '3px 0' }}>COVER</div>
                    )}
                    <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '5px', right: '5px', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(0,0,0,0.65)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                  </div>
                ))}
                {imagePreviews.length < 10 && (
                  <label htmlFor="property-images" style={{ aspectRatio: '1', border: '2px dashed rgba(245,130,32,0.35)', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(245,130,32,0.7)', fontSize: '1.6rem', gap: '4px' }}>
                    <span>+</span><span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Add More</span>
                  </label>
                )}
              </div>
            )}
          </div>

          <div className="section-header">
            <h2>Amenities</h2>
            <p>Select all amenities available in your property</p>
          </div>

          <div className="amenities-grid">
            {amenitiesList.map((item) => (
              <label key={item.key} className={`amenity-card ${amenities[item.key] ? "selected" : ""}`}>
                <input type="checkbox" name={item.key} checked={amenities[item.key]} onChange={handleAmenityChange} />
                <span className="amenity-icon">{item.icon}</span>
                <span className="amenity-label">{item.label}</span>
              </label>
            ))}
          </div>

          <div className="section-header">
            <h2>Owner Information</h2>
            <p>Contact details for property verification</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Owner Name *</label>
              <input type="text" name="ownerName" value={formData.ownerName} onChange={handleInputChange} placeholder="Enter owner name" required />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" required />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" required />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Property Address *</label>
            <textarea rows="4" name="propertyAddress" value={formData.propertyAddress} onChange={handleInputChange} placeholder="Enter full property address" required />
          </div>

          <div className="section-header"><h2>Membership</h2></div>

          <div className="membership-cards">
            {["new", "existing"].map((type) => (
              <div key={type} className={`member-card ${formData.memberType === type ? "active" : ""}`} onClick={() => setFormData({ ...formData, memberType: type })}>
                <h4>{type === "new" ? "New Member" : "Existing Member"}</h4>
              </div>
            ))}
          </div>

          <div className="trust-section">
            <div>✓ Verified Buyer Network</div>
            <div>✓ Secure Property Verification</div>
            <div>✓ No Hidden Charges</div>
            <div>✓ Dedicated RSV Consultant</div>
          </div>

          {error && (
            <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', padding: '12px 16px', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <div className="action-buttons">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Property →"}
            </button>
            <button type="button" className="cancel-btn" onClick={() => window.location.reload()}>Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );     
};

export default SellPage;
