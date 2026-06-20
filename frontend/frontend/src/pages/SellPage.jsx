import React, { useState, useMemo } from "react";
import "./SellPage.css";

const SellPage = ({ category = "" }) => {
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyCategory: "",
    location: "",
    propertyType: "",
    apartmentType: "",
    landArea: "",
    landAreaUnit: "sqft",
    builtupArea: "",
    builtupUnit: "sqft",
    plotSize: "",
    plotUnit: "sqft",
    price: "",
    additionalInfo: "",
    ownerName: "",
    propertyAddress: "",
    phone: "",
    email: "",
    memberType: "new",
    images: [],
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);

  const [amenities, setAmenities] = useState({
    balconies: false,
    lift: false,
    parking: false,
    security: false,
    clubHouse: false,
    swimmingPool: false,
    garden: false,
    gym: false,
    playGround: false,
  });

  const amenitiesList = [
    { key: "balconies", label: "Balconies", icon: "🏢" },
    { key: "lift", label: "Lift", icon: "🛗" },
    { key: "parking", label: "Parking", icon: "🚗" },
    { key: "security", label: "Security", icon: "🛡️" },
    { key: "clubHouse", label: "Club House", icon: "🏘️" },
    { key: "swimmingPool", label: "Swimming Pool", icon: "🏊" },
    { key: "garden", label: "Garden", icon: "🌳" },
    { key: "gym", label: "Gym", icon: "🏋️" },
    { key: "playGround", label: "Play Ground", icon: "🎡" },
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
    
    // Add to existing images, don't replace
    const newPreviews = files.map(f => URL.createObjectURL(f));
    setImagePreview(prev => [...prev, ...newPreviews]);
    setFormData(prev => ({ 
      ...prev, 
      images: [...(prev.images || []), ...files] 
    }));
    
    // Reset input so same files can be selected again
    e.target.value = '';
  };

  const selectedAmenities = useMemo(() => {
    return Object.keys(amenities).filter((key) => amenities[key]);
  }, [amenities]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('property_name', formData.propertyName);
      fd.append('category', formData.propertyCategory);
      fd.append('property_type', formData.propertyType);
      fd.append('location', formData.location);
      fd.append('price', formData.price);
      fd.append('description', formData.additionalInfo);
      fd.append('amenities', selectedAmenities.join(', '));
      fd.append('property_address', formData.propertyAddress);
      fd.append('member_type', formData.memberType);

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach(img => fd.append('images', img));
      }

      const response = await fetch('http://localhost:5000/api/sell', {
        method: 'POST',
        body: fd,
      });

      const data = await response.json();
      if (response.ok) {
        setShowSuccess(true);
      } else {
        alert('Failed to submit property. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit property. Please try again.');
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
            <button
              className="continue-btn"
              onClick={() => { setShowSuccess(false); window.location.reload(); }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <section className="benefits-section">
        <div className="benefit-card"><span>💎</span><h4>Premium Buyer Network</h4></div>
        <div className="benefit-card"><span>📈</span><h4>Maximum Property Exposure</h4></div>
        <div className="benefit-card"><span>⚡</span><h4>Fast & Secure Closing</h4></div>
      </section>

      <div className="progress-wrapper">
        <div className="progress-labels">
          <span>Property</span>
          <span>Amenities</span>
          <span>Contact</span>
          <span>Submit</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
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
              <input
                type="text"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleInputChange}
                placeholder="Luxury Villa"
              />
            </div>
            <div className="form-group">
              <label>Expected Price *</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="₹ 1.5 Cr"
              />
            </div>
          </div>

          <div className="property-category">
            <label className="section-label">Property Category</label>
            <div className="category-grid">
              <div
                className={`category-card ${formData.propertyCategory === "residential" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, propertyCategory: "residential" })}
              >
                <div className="category-icon">🏠</div>
                <h4>Residential</h4>
                <p>Apartments, Villas, Houses</p>
              </div>
              <div
                className={`category-card ${formData.propertyCategory === "commercial" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, propertyCategory: "commercial" })}
              >
                <div className="category-icon">🏢</div>
                <h4>Commercial</h4>
                <p>Offices, Shops, Buildings</p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Property Type *</label>
            <div className="category-grid">
              <div
                className={`category-card ${formData.propertyType === "apartment" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, propertyType: "apartment" })}
              >
                <div className="category-icon">🏢</div>
                <h4>Apartment</h4>
              </div>
              <div
                className={`category-card ${formData.propertyType === "villa" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, propertyType: "villa" })}
              >
                <div className="category-icon">🏠</div>
                <h4>Villa</h4>
              </div>
              <div
                className={`category-card ${formData.propertyType === "plot" ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, propertyType: "plot" })}
              >
                <div className="category-icon">🌳</div>
                <h4>Plot / Land</h4>
              </div>
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
                <input type="text" name="landArea" value={formData.landArea || ""} onChange={handleInputChange} placeholder="Enter Land Area" />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select name="landAreaUnit" value={formData.landAreaUnit || "sqft"} onChange={handleInputChange}>
                  <option value="sqft">Sq.ft</option>
                  <option value="acre">Acre</option>
                </select>
              </div>
              <div className="form-group">
                <label>Built-up Area *</label>
                <input type="text" name="builtupArea" value={formData.builtupArea || ""} onChange={handleInputChange} placeholder="Enter Built-up Area" />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select name="builtupUnit" value={formData.builtupUnit || "sqft"} onChange={handleInputChange}>
                  <option value="sqft">Sq.ft</option>
                  <option value="acre">Acre</option>
                </select>
              </div>
            </div>
          )}

          {formData.propertyType === "plot" && (
            <div className="form-grid">
              <div className="form-group">
                <label>Land Size *</label>
                <input
                  type="text"
                  value={formData.landSize || ""}
                  onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select name="plotUnit" value={formData.plotUnit} onChange={handleInputChange}>
                  <option value="sqft">Sq.ft</option>
                  <option value="acre">Acre</option>
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
            <textarea
              rows="5"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Describe your property..."
            />
          </div>

          <div className="section-header">
            <h2>Property Images</h2>
            <p>Upload high quality images to attract buyers faster</p>
          </div>

          <div className="upload-container">
  <label htmlFor="property-image" className="upload-box">
    <div className="upload-icon">📷</div>
    <h4>Upload Property Images</h4>
    <p>Drag & Drop or Click to Browse</p>
    <span>Select multiple images • Max 5 MB each</span>
  </label>
  <input
    id="property-image"
    type="file"
    accept="image/*"
    multiple
    onChange={handleImageChange}
    hidden
  />

  {imagePreview.length > 0 && (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginTop: '16px',
      padding: '16px',
      background: '#f9f9f9',
      borderRadius: '12px',
      border: '1px solid #e0e0e0'
    }}>
      <p style={{ width: '100%', margin: '0 0 8px 0', fontSize: '0.85rem', color: '#555', fontWeight: 600 }}>
        {imagePreview.length} image{imagePreview.length > 1 ? 's' : ''} selected
      </p>
      {imagePreview.map((src, idx) => (
        <div key={idx} style={{ position: 'relative' }}>
          <img
            src={src}
            alt={`Preview ${idx + 1}`}
            style={{
              width: '120px',
              height: '90px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '2px solid #288849',
              display: 'block'
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newPreviews = imagePreview.filter((_, i) => i !== idx);
              const newFiles = formData.images.filter((_, i) => i !== idx);
              setImagePreview(newPreviews);
              setFormData(prev => ({ ...prev, images: newFiles }));
            }}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#d32f2f',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1
            }}
          >✕</button>
        </div>
      ))}
      <label
        htmlFor="property-image"
        style={{
          width: '120px',
          height: '90px',
          border: '2px dashed #288849',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#288849',
          fontSize: '0.75rem',
          fontWeight: 600,
          gap: '4px'
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>+</span>
        Add More
      </label>
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
  <input type="text" name="ownerName" value={formData.ownerName} onChange={handleInputChange} placeholder="Enter your name" />
</div>
<div className="form-group">
  <label>Email *</label>
  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" />
</div>
<div className="form-group">
  <label>Phone Number *</label>
  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" />
</div>
</div>
          <div className="form-group full-width">
            <label>Property Address *</label>
            <textarea
              rows="4"
              name="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleInputChange}
              placeholder="Enter Property Address"
            />
          </div>

          <div className="section-header">
            <h2>Membership</h2>
          </div>

          <div className="membership-cards">
            <div
              className={`member-card ${formData.memberType === "new" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, memberType: "new" })}
            >
              <h4>New Member</h4>
            </div>
            <div
              className={`member-card ${formData.memberType === "existing" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, memberType: "existing" })}
            >
              <h4>Existing Member</h4>
            </div>
          </div>

          <div className="trust-section">
            <div>✓ Verified Buyer Network</div>
            <div>✓ Secure Property Verification</div>
            <div>✓ No Hidden Charges</div>
            <div>✓ Dedicated RSV Consultant</div>
          </div>

          <div className="action-buttons">
            <button type="submit" className="submit-btn">Submit Property →</button>
            <button type="button" className="cancel-btn" onClick={() => window.location.reload()}>Cancel</button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default SellPage;