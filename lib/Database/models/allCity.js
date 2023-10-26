const mongoose = require("mongoose");
const orderschema = mongoose.Schema(
  {
    address_components: { type: Array, required: false },
    adr_address: { type: String, required: false },
    formatted_address: { type: String, required: false },
    geometry: { type: Object, required: false },
    icon: { type: String, required: false },
    icon_background_color: { type: String, required: false },
    icon_mask_base_uri: { type: String, required: false },
    name: { type: String, required: false },
    photos: { type: Array, required: false },
    place_id: { type: String, required: false },
    reference: { type: String, required: false },
    types: { type: Array, required: false },
    url: { type: String, required: false },
    utc_offset: { type: Number, required: false },
    vicinity: { type: String, required: false },
    website: { type: String, required: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports =
  mongoose.models.Allcities || mongoose.model("Allcities", orderschema);
