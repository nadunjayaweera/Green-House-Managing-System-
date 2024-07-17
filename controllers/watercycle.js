const WaterCycle = require("../models/watercycle");

// Controller function to add a new water cycle
async function addWaterCycle(req, res) {
  try {
    const newWaterCycle = await WaterCycle.create(req.body);
    res.status(201).json(newWaterCycle);
  } catch (error) {
    if (error.message === "Overlap detected with existing water cycles") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error adding water cycle:", error);
    res.status(500).json({ message: "Error adding water cycle" });
  }
}

// Controller function to get all water cycles
async function getAllWaterCycles(req, res) {
  try {
    const waterCycles = await WaterCycle.find();
    res.json(waterCycles);
  } catch (error) {
    console.error("Error getting water cycles:", error);
    res.status(500).json({ message: "Error getting water cycles" });
  }
}

// Controller function to get a single water cycle by ID
async function getWaterCycleById(req, res) {
  try {
    // const watercycleId = req.query.id;
    const waterCycle = await WaterCycle.findById(req.query.id);
    if (!waterCycle) {
      return res.status(404).json({ message: "Water cycle not found" });
    }
    res.json(waterCycle);
  } catch (error) {
    console.error("Error getting water cycle by ID:", error);
    res.status(500).json({ message: "Error getting water cycle by ID" });
  }
}

// Controller function to get a single water cycle by ID
async function getWaterCycleByDeviceId(req, res) {
  try {
    const deviceId = req.query.deviceId;
    const waterCycle = await WaterCycle.find({ deviceId: deviceId });
    if (!waterCycle) {
      return res.status(404).json({ message: "Water cycle not found" });
    }
    res.json(waterCycle);
  } catch (error) {
    console.error("Error getting water cycle by device ID:", error);
    res.status(500).json({ message: "Error getting water cycle by device ID" });
  }
}

// Controller function to update a water cycle
async function updateWaterCycle(req, res) {
  try {
    const updatedWaterCycle = await WaterCycle.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );
    if (!updatedWaterCycle) {
      return res.status(404).json({ message: "Water cycle not found" });
    }
    res.json(updatedWaterCycle);
  } catch (error) {
    console.error("Error updating water cycle:", error);
    res.status(500).json({ message: "Error updating water cycle" });
  }
}

// Controller function to delete a water cycle
async function deleteWaterCycle(req, res) {
  try {
    const deletedWaterCycle = await WaterCycle.findByIdAndDelete(req.query.id);
    if (!deletedWaterCycle) {
      return res.status(404).json({ message: "Water cycle not found" });
    }
    res.json({ message: "Water cycle deleted successfully" });
  } catch (error) {
    console.error("Error deleting water cycle:", error);
    res.status(500).json({ message: "Error deleting water cycle" });
  }
}

module.exports = {
  addWaterCycle,
  getAllWaterCycles,
  getWaterCycleById,
  updateWaterCycle,
  deleteWaterCycle,
  getWaterCycleByDeviceId,
};
