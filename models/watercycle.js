const mongoose = require("mongoose");

const waterCycleSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  cycleName: { type: String, required: true },
});

// Pre-save middleware to check for overlapping cycles
waterCycleSchema.pre("save", async function (next) {
  try {
    const { deviceId, startTime, endTime } = this;

    // Check if there are any overlapping cycles for the same device
    const overlappingCycles = await mongoose.models.WaterCycle.find({
      deviceId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: { $gte: startTime, $lt: endTime } },
        { endTime: { $lte: endTime, $gt: startTime } },
      ],
    });

    if (overlappingCycles.length > 0) {
      throw new Error("Overlap detected with existing water cycles");
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("WaterCycle", waterCycleSchema);
