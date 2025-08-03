const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const help = mongoose.model("help", helpRequestSchema);

module.exports = help;
