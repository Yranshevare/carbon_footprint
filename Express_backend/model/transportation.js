import mongoose from "mongoose";

// Transportation Schema
const transportationSchema = new mongoose.Schema({
  vehicle_type: {
    type: String,
    required: true
  },
  carbon_intensity_kg_co2_per_km: {
    type: Number, // Fixed: Changed from Float to Number
    required: true
  },
  carbon_intensity_kg_co2_per_mile: {
    type: Number, // Fixed: Changed from Float to Number
    required: true
  }
});
const Transportation = mongoose.model("Transportation", transportationSchema);

export default Transportation;