const mongoose = require("mongoose");
const moment = require("moment");

const deviceIDSchema = new mongoose.Schema({
  deviceID: { type: String, required: true, unique: true },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"), // Setting default value using moment
  },
});

module.exports = mongoose.model("DeviceID", deviceIDSchema);
