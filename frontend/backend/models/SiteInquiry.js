const mongoose = require("mongoose");

const siteInquirySchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      region: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "SiteInquiry",
  siteInquirySchema
);