const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true, 
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "donor", "needy", "volunteer"],
      default: "donor",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    donations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],
    helpRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HelpRequest",
      },
    ],
  },
  { timestamps: true }
);

const user = mongoose.model("users", userSchema);

module.exports = user;
