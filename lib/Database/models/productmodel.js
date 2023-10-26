const mongoose = require("mongoose");
const productschema = mongoose.Schema({
  productOfUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  productImg: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productHighlights: {
    type: Array,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productDesc: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.products || mongoose.model("products", productschema);
