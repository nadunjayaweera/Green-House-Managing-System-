const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment-timezone");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const deviceIDRoutes = require("./routes/deviceID");
const userDeviceRoutes = require("./routes/userdevice");
const weatherDataRoutes = require("./routes/weatherdata");
const wateringDataRoutes = require("./routes/watercycle");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
connectDB();

// Set the time zone to Sri Lanka
moment.tz.setDefault("Asia/Colombo");

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/deviceID", deviceIDRoutes);
app.use("/api/v1/userdevice", userDeviceRoutes);
app.use("/api/v1/devicedata", weatherDataRoutes);
app.use("/api/v1/watercycle", wateringDataRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
