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
    ownerAddress: "",
    phone: "",
    mobile: "",
    email: "",
    memberType: "new",
    image: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

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

  const [imagePreview, setImagePreview] = useState(null);

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

  const getListingTitle = () => {
    if (category === "residential") return "Residential Property";
    if (category === "commercial") return "Commercial Property";
    if (category === "land") return "Land Property";
    return "Property Listing";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;

    setAmenities((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  const selectedAmenities = useMemo(() => {
    return Object.keys(amenities).filter(
      (key) => amenities[key]
    );
  }, [amenities]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let resolvedType = "land";

    if (category) {
      resolvedType = category;
    } else if (formData.propertyType === "plot") {
      resolvedType = "land";
    } else if (formData.propertyCategory) {
      resolvedType = formData.propertyCategory;
    }

    const processSubmission = (base64Img) => {
      const newProperty = {
        title:
          formData.propertyName || "Elite Listing",

        location:
          formData.location || "Chennai",

        price:
          formData.price || "Contact for Price",

        type: resolvedType,

        img:
          base64Img ||
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa",

        ownerName:
          formData.ownerName ||
          "Verified Owner",

        phone:
          formData.phone ||
          formData.mobile ||
          "+91 9999999999",

        email: formData.email,

        sqft: "As Per Document",

        status: "pending",

        amenities: selectedAmenities,

        id: Date.now(),
      };

      const existingProperties =
        JSON.parse(
          localStorage.getItem(
            "user_properties"
          ) || "[]"
        );

      localStorage.setItem(
        "user_properties",
        JSON.stringify([
          newProperty,
          ...existingProperties,
        ])
      );

      setShowSuccess(true);
    };

    if (formData.image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        processSubmission(reader.result);
      };

      reader.readAsDataURL(formData.image);
    } else {
      processSubmission(null);
    }
  };
    return (
    <div className="sell-page">

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Property Submitted Successfully
            </h2>

            <p>
              Your property has been submitted
              and is currently pending approval.
            </p>

            <button
              className="continue-btn"
              onClick={() => {
                setShowSuccess(false);
                window.location.reload();
              }}
            >
              Continue
            </button>

          </div>
        </div>
      )}

      <section className="benefits-section">

        <div className="benefit-card">
          <span>💎</span>
          <h4>Premium Buyer Network</h4>
        </div>

        <div className="benefit-card">
          <span>📈</span>
          <h4>Maximum Property Exposure</h4>
        </div>

        <div className="benefit-card">
          <span>⚡</span>
          <h4>Fast & Secure Closing</h4>
        </div>

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
            <p>
              Basic information about
              your property
            </p>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>
                Property Name *
              </label>

              <input
                type="text"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleInputChange}
                placeholder="Luxury Villa"
              />
            </div>

            <div className="form-group">
              <label>
                Expected Price *
              </label>

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

            <label className="section-label">
              Property Category
            </label>

            <div className="category-grid">

              <div
                className={`category-card ${
                  formData.propertyCategory ===
                  "residential"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    propertyCategory:
                      "residential",
                  })
                }
              >
                <div className="category-icon">
                  🏠
                </div>

                <h4>Residential</h4>

                <p>
                  Apartments, Villas,
                  Houses
                </p>
              </div>

              <div
                className={`category-card ${
                  formData.propertyCategory ===
                  "commercial"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    propertyCategory:
                      "commercial",
                  })
                }
              >
                <div className="category-icon">
                  🏢
                </div>

                <h4>Commercial</h4>

                <p>
                  Offices, Shops,
                  Buildings
                </p>
              </div>

            </div>

          </div>

          <div className="form-group">
  <label>Property Type *</label>

  <div className="category-grid">

    <div
      className={`category-card ${
        formData.propertyType === "apartment"
          ? "active"
          : ""
      }`}
      onClick={() =>
        setFormData({
          ...formData,
          propertyType: "apartment"
        })
      }
    >
      <div className="category-icon">
        🏢
      </div>

      <h4>Apartment</h4>
    </div>

    <div
      className={`category-card ${
        formData.propertyType === "villa"
          ? "active"
          : ""
      }`}
      onClick={() =>
        setFormData({
          ...formData,
          propertyType: "villa"
        })
      }
    >
      <div className="category-icon">
        🏠
      </div>

      <h4>Villa</h4>
    </div>

    <div
      className={`category-card ${
        formData.propertyType === "plot"
          ? "active"
          : ""
      }`}
      onClick={() =>
        setFormData({
          ...formData,
          propertyType: "plot"
        })
      }
    >
      <div className="category-icon">
        🌳
      </div>

      <h4>Plot / Land</h4>
    </div>

  </div>
</div>

{formData.propertyType === "apartment" && (

  <div className="form-group">

    <label>Apartment Type *</label>

    <select
      name="apartmentType"
      value={formData.apartmentType}
      onChange={handleInputChange}
    >
      <option value="">
        Select Apartment Type
      </option>

      <option value="corporate">
        Corporate
      </option>

      <option value="scalable">
        Scalable
      </option>

      <option value="uds">
        UDS
      </option>

    </select>

  </div>

)}

{formData.propertyType === "villa" && (
  <div className="form-grid">

    {/* Land Area */}
    <div className="form-group">
      <label>Land Area *</label>
      <input
        type="text"
        name="landArea"
        value={formData.landArea || ""}
        onChange={handleInputChange}
        placeholder="Enter Land Area"
      />
    </div>

    {/* Land Area Unit */}
    <div className="form-group">
      <label>Unit</label>
      <select
        name="landAreaUnit"
        value={formData.landAreaUnit || "sqft"}
        onChange={handleInputChange}
      >
        <option value="sqft">Sq.ft</option>
        <option value="acre">Acre</option>
      </select>
    </div>

    {/* Built-up Area */}
    <div className="form-group">
      <label>Built-up Area *</label>
      <input
        type="text"
        name="builtupArea"
        value={formData.builtupArea || ""}
        onChange={handleInputChange}
        placeholder="Enter Built-up Area"
      />
    </div>

    {/* Built-up Area Unit */}
    <div className="form-group">
      <label>Unit</label>
      <select
        name="builtupUnit"
        value={formData.builtupUnit || "sqft"}
        onChange={handleInputChange}
      >
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
          value={formData.landSize}
          onChange={(e) =>
            setFormData({
              ...formData,
              landSize: e.target.value,
            })
          }
        />
    </div>

    <div className="form-group">

      <label>Unit</label>

      <select
        name="plotUnit"
        value={formData.plotUnit}
        onChange={handleInputChange}
      >
        <option value="sqft">
          Sq.ft
        </option>

        <option value="acre">
          Acre
        </option>

      </select>

    </div>

  </div>

)}

          <div className="form-grid">

            <div className="form-group">
              <label>
                Location *
              </label>

              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              >
                <option value="">
                  Select Location
                </option>

                <option value="omr">
                  Chennai
                </option>

                <option value="ecr">
                  Thiruvallur
                </option>

                <option value="guindy">
                  Kanchipuram
                </option>

              </select>
            </div>

          </div>
                    <div className="form-group full-width">
            <label>
              Property Description
            </label>

            <textarea
              rows="5"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Describe your property, nearby landmarks, facilities, road access, highlights and other important details..."
            />
          </div>

          <div className="section-header">
            <h2>Property Images</h2>
            <p>
              Upload high quality images
              to attract buyers faster
            </p>
          </div>

          <div className="upload-container">

            <label
              htmlFor="property-image"
              className="upload-box"
            >
              <div className="upload-icon">
                📷
              </div>

              <h4>
                Upload Property Image
              </h4>

              <p>
                Drag & Drop or Click
                to Browse
              </p>

              <span>
                Maximum File Size 5 MB
              </span>
            </label>

            <input
              id="property-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

            {imagePreview && (
              <div className="preview-container">

                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />

              </div>
            )}

          </div>

          <div className="section-header">
            <h2>Amenities</h2>
            <p>
              Select all amenities
              available in your property
            </p>
          </div>

          <div className="amenities-grid">

            {amenitiesList.map((item) => (
              <label
                key={item.key}
                className={`amenity-card ${
                  amenities[item.key]
                    ? "selected"
                    : ""
                }`}
              >

                <input
                  type="checkbox"
                  name={item.key}
                  checked={amenities[item.key]}
                  onChange={
                    handleAmenityChange
                  }
                />

                <span className="amenity-icon">
                  {item.icon}
                </span>

                <span className="amenity-label">
                  {item.label}
                </span>

              </label>
            ))}

          </div>

          <div className="section-header">
            <h2>Owner Information</h2>
            <p>
              Contact details for
              property verification
            </p>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>
                Owner Name *
              </label>

              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                placeholder="Owner Name"
              />
            </div>

            <div className="form-group">
              <label>
                Email *
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
              />
            </div>

            <div className="form-group">
              <label>
                Phone Number *
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
            </div>

            <div className="form-group">
              <label>
                WhatsApp Number
              </label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile Number"
              />
            </div>

          </div>

          <div className="form-group full-width">

            <label>
              Property Address *
            </label>

            <textarea
              rows="4"
              name="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleInputChange}
              placeholder="Enter Property Address"
            />

            <label>
              Owner Address 
            </label>

            <textarea
              rows="4"
              name="ownerAddress"
              value={formData.ownerAddress}
              onChange={handleInputChange}
              placeholder="Enter Owner Address"
            />

          </div>

          <div className="form-group full-width">

          </div>

          <div className="section-header">
            <h2>Membership</h2>
          </div>

          <div className="membership-cards">

            <div
              className={`member-card ${
                formData.memberType ===
                "new"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setFormData({
                  ...formData,
                  memberType: "new",
                })
              }
            >
              <h4>New Member</h4>
            </div>

            <div
              className={`member-card ${
                formData.memberType ===
                "existing"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setFormData({
                  ...formData,
                  memberType:
                    "existing",
                })
              }
            >
              <h4>
                Existing Member
              </h4>
            </div>

          </div>

          <div className="trust-section">

            <div>
              ✓ Verified Buyer Network
            </div>

            <div>
              ✓ Secure Property Verification
            </div>

            <div>
              ✓ No Hidden Charges
            </div>

            <div>
              ✓ Dedicated RSV Consultant
            </div>

          </div>

          <div className="action-buttons">

            <button
              type="submit"
              className="submit-btn"
            >
              Submit Property →
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                window.location.reload()
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default SellPage;