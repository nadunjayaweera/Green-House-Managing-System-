const express = require("express");
const router = express.Router();
const waterCycleController = require("../controllers/watercycle");
const {
  authenticateToken,
  authenticateAdminToken,
} = require("../middleware/auth");

// POST request to add a new water cycle
router.post(
  "/addwatercycle",
  authenticateToken,
  waterCycleController.addWaterCycle
);

// GET request to retrieve all water cycles
router.get("/", authenticateAdminToken, waterCycleController.getAllWaterCycles);

// GET request to retrieve a single water cycle by ID
router.get(
  "/getwatercycle",
  authenticateToken,
  waterCycleController.getWaterCycleById
);

// Get User base water cycles by device ID
router.get(
  "/getwatercyclebydevice",
  authenticateToken,
  waterCycleController.getWaterCycleByDeviceId
);

// PUT request to update a water cycle
router.put(
  "/updatewateringcycle",
  authenticateToken,
  waterCycleController.updateWaterCycle
);

// DELETE request to delete a water cycle
router.delete(
  "/deletewateringcyle",
  authenticateToken,
  waterCycleController.deleteWaterCycle
);

module.exports = router;
