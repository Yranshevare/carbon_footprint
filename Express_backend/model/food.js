import mongoose from "mongoose";
const SubTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  carbon_intensity_kg_co2_per_kg: { type: Number, required: true }
});

const FoodCarbonSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  carbon_intensity_kg_co2_per_kg: { type: Number, required: true },
  subType: [SubTypeSchema] // Array of SubTypes
});
const Food = mongoose.model("Food", FoodCarbonSchema); // Fixed model name


export default Food;