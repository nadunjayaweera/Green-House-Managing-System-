const UserDevice = require("../models/userdevice");
const DeviceID = require("../models/deviceID"); // Import DeviceID model
const User = require("../models/user");

async function assignDeviceToUser(req, res) {
  try {
    // Check if the deviceID exists
    const existingDevice = await DeviceID.findOne({
      deviceID: req.body.deviceID,
    });
    if (!existingDevice) {
      return res.status(404).json({ message: "Device ID not found" });
    }

    // // Check if the user exists
    // const existingUser = await User.findOne({
    //   username: req.body.username,
    // });
    // if (!existingUser) {
    //   return res.status(404).json({ message: "Username not found" });
    // }

    // Check if the user already has the device assigned
    const existingUserDevice = await UserDevice.findOne({
      username: req.body.username,
      deviceID: req.body.deviceID,
    });
    if (existingUserDevice) {
      return res
        .status(400)
        .json({ message: "Device already assigned to user" });
    }

    // Assign device to user
    const newUserDevice = await UserDevice.create({
      username: req.body.username,
      deviceID: req.body.deviceID,
    });
    res.status(201).json(newUserDevice);
  } catch (error) {
    console.error("Error assigning device to user:", error);
    res.status(500).json({ message: "Error assigning device to user" });
  }
}

module.exports = { assignDeviceToUser };
