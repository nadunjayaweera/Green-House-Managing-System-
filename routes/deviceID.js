const express = require("express");
const router = express.Router();
const { authenticateAdminToken } = require("../middleware/auth");
const addDevices = require("../controllers/deviceID");

// POST request to add a new device
router.post("/addDeviceID", authenticateAdminToken, addDevices.addDevice);

module.exports = router;
