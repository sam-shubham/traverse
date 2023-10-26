const mongoose = require("mongoose");
const orderschema = mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
      validate: [min_one_item],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "PENDING",
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "PENDING",
    },
    paymentMode: {
      type: String,
      required: true,
    },
    paymentInfo: {
      type: Object,
      required: false,
    },
    stripeCustomer: {
      type: Object,
      required: true,
    },

    // intent: {
    //   type: Object,
    //   required: true,
    // },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports =
  mongoose.models.orders || mongoose.model("orders", orderschema);

function min_one_item(items) {
  return items.length >= 1;
}
