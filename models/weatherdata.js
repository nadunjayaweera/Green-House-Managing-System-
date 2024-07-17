const mongoose = require("mongoose");
const moment = require("moment");

const weatherDataSchema = new mongoose.Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  deviceId: { type: String, required: true },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"), // Setting default value using moment
  },
});

module.exports = mongoose.model("WeatherData", weatherDataSchema);
