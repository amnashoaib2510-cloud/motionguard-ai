const express = require("express");
const MotionEvent = require("../models/MotionEvent");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/save", auth, async (req, res) => {
  try {
    const percentage = Number(req.body.percentage);

    if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
      return res.status(400).json({
        message: "percentage must be a number between 0 and 100",
      });
    }

    // User comes from the verified token, not from the request body
    const event = await MotionEvent.create({
      user: req.user.id,
      percentage,
    });

    res.status(201).json({
      message: "Motion event saved",
      event,
    });
  } catch (error) {
    console.error("Motion save error:", error.message);

    res.status(500).json({
      message: "Could not save motion event",
    });
  }
});

module.exports = router;
