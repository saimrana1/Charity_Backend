const mongoose = require("mongoose");
const donationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["cash", "card"], required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const donation = mongoose.model("donation", donationSchema);

module.exports = donation;
