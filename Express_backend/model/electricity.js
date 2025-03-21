import mongoose from "mongoose";
const electricitySchema = new mongoose.Schema({
  country: { type: String, required: true },
  carbon_intensity_kg_co2_per_kwh: { type: Number, required: true }
});
const Electricity = mongoose.model("Electricity", electricitySchema);

export default Electricity