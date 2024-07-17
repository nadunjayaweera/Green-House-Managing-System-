const express = require("express");
const router = express.Router();
const weatherDataController = require("../controllers/weatherdata");

// POST request to save weather data
router.post("/weatherdata", weatherDataController.postWeatherData);

module.exports = router;
