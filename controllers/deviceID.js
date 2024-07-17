const DeviceID = require("../models/deviceID");

async function addDevice(req, res) {
  try {
    // Check if the deviceID already exists
    const existingDevice = await DeviceID.findOne({
      deviceID: req.body.deviceID,
    });
    if (existingDevice) {
      return res.status(400).json({ message: "Device ID already exists" });
    }

    // Create a new device only if it doesn't already exist
    const newDevice = await DeviceID.create({ deviceID: req.body.deviceID });
    res.status(201).json(newDevice);
  } catch (error) {
    console.error("Error adding device:", error);
    res.status(500).json({ message: "Error adding device" });
  }
}

module.exports = { addDevice };
