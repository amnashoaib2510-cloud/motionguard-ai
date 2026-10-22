const express = require("express");
const MotionEvent = require("../models/MotionEvent");
const auth = require("../middleware/auth");

const router = express.Router();

// Returns only the logged-in user's events, newest first
router.get("/", auth, async (req, res) => {
  try {
    const events = await MotionEvent.find({ user: req.user.id })
      .sort({ detectedAt: -1 })
      .limit(500);

    res.json(events);
  } catch (error) {
    console.error("History error:", error.message);

    res.status(500).json({
      message: "Could not load history",
    });
  }
});

module.exports = router;
