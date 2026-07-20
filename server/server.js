const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const historyRoutes = require("./routes/historyRoutes");
const path = require("path");
const motionRoutes = require("./routes/motionRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/motion", motionRoutes);
app.use("/api/history", historyRoutes);
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:");
    console.error(err);
  });


app.get("/", (req, res) => {
    res.send("Motion Detection Backend Running");
});

const PORT = process.env.PORT || 5000;

console.log("PORT ENV =", process.env.PORT);

app.listen(PORT, () => {
    console.log(`🚀 Server Running On Port ${PORT}`);
});