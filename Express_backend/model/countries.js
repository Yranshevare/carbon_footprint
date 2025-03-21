import mongoose from "mongoose";
const countriesSchema = new mongoose.Schema({
  country: { type: String, required: true, unique: true },
  carbon_footprint_range_kg: {
    daily: { low: String, normal: String, high: String },
    week: { low: String, normal: String, high: String },
    month: { low: String, normal: String, high: String },
    year: { low: String, normal: String, high: String }
  }
});
const countries = mongoose.model("countries", countriesSchema);


export default countries;