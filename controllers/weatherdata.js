const WeatherData = require("../models/weatherdata");

async function postWeatherData(req, res) {
  try {
    const { temperature, humidity, deviceId } = req.body;

    // Create a new weather data document
    const newWeatherData = new WeatherData({
      temperature,
      humidity,
      deviceId,
    });

    // Save the weather data to the database
    await newWeatherData.save();

    res.status(201).json({ message: "Weather data saved successfully" });
  } catch (error) {
    console.error("Error saving weather data:", error);
    res.status(500).json({ message: "Error saving weather data" });
  }
}

module.exports = { postWeatherData };
