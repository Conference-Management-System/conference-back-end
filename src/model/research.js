const mongoose = require("mongoose");

const ResearchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    document: {
      type: String,
      required: false,
    },
    researcher_name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("research", ResearchSchema);
