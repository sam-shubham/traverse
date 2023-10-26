const mongoose = require("mongoose");
const productschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Array,
    required: true,
  },
  address: {
    type: Array,
    required: false,
    default: [],
  },
  totalTries: {
    type: Object,
    required: false,
    default: { tries: 0, date: "03/07/2023" },
  },
  wishlist: {
    type: Array,
    required: false,
    default: [],
  },
  cartItems: {
    type: Array,
    required: false,
    default: [],
  },
  orders: {
    type: Array,
    required: false,
    default: [],
  },
  stripeCustomer: {
    type: Object,
    required: false,
  },
});

module.exports =
  mongoose.models.users || mongoose.model("users", productschema);
