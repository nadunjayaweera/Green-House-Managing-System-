const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createDate: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"), // Setting default value using moment
  },
});

module.exports = mongoose.model("User", userSchema);
