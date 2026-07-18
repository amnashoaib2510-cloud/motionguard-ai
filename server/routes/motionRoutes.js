const express = require("express");
const MotionEvent = require("../models/MotionEvent");


const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { user, percentage } = req.body;

    

    const event = await MotionEvent.create({
  user,
  percentage,
});

    res.status(201).json({
      message: "Motion event saved",
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;