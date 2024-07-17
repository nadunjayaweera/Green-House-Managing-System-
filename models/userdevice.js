const mongoose = require("mongoose");
const moment = require("moment");

const userDeviceSchema = new mongoose.Schema({
  username: { type: "string", required: true },
  deviceID: { type: "string", required: true },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"), // Setting default value using moment
  },
});

module.exports = mongoose.model("UserDevice", userDeviceSchema);
