const express = require("express");
const MotionEvent = require("../models/MotionEvent");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await MotionEvent.find().sort({
      detectedAt: -1,
    });

    res.json(events);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;