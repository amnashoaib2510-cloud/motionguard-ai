const mongoose = require("mongoose");

const motionEventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

   

    status: {
      type: String,
      default: "Motion Detected",
    },

    detectedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MotionEvent",
  motionEventSchema
);