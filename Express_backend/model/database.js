// import mongoose from "mongoose";

// // Transportation Schema
// const transportationSchema = new mongoose.Schema({
//   vehicle_type: {
//     type: String,
//     required: true
//   },
//   carbon_intensity_kg_co2_per_km: {
//     type: Number, // Fixed: Changed from Float to Number
//     required: true
//   },
//   carbon_intensity_kg_co2_per_mile: {
//     type: Number, // Fixed: Changed from Float to Number
//     required: true
//   }
// });
// const Transportation = mongoose.model("Transportation", transportationSchema);

// // Country Schema
// const countriesSchema = new mongoose.Schema({
//   country: { type: String, required: true, unique: true },
//   carbon_footprint_range_kg: {
//     daily: { low: String, normal: String, high: String },
//     week: { low: String, normal: String, high: String },
//     month: { low: String, normal: String, high: String },
//     year: { low: String, normal: String, high: String }
//   }
// });
// const Country = mongoose.model("Country", countriesSchema);

// // Electricity Schema
// const electricitySchema = new mongoose.Schema({
//   country: { type: String, required: true },
//   carbon_intensity_kg_co2_per_kwh: { type: Number, required: true }
// });
// const Electricity = mongoose.model("Electricity", electricitySchema);

// // Food Schema with SubType
// const SubTypeSchema = new mongoose.Schema({
//   type: { type: String, required: true },
//   carbon_intensity_kg_co2_per_kg: { type: Number, required: true }
// });

// const FoodCarbonSchema = new mongoose.Schema({
//   category: { type: String, required: true, unique: true },
//   carbon_intensity_kg_co2_per_kg: { type: Number, required: true },
//   subType: [SubTypeSchema] // Array of SubTypes
// });
// const Food = mongoose.model("Food", FoodCarbonSchema); // Fixed model name

// // Waste Emission Schema
// const WasteEmissionSchema = new mongoose.Schema({
//   type: { type: String, required: true, unique: true },
//   emission_factor_kg_co2_per_kg: { type: Number, required: true }
// });
// const WasteEmission = mongoose.model("WasteEmission", WasteEmissionSchema);

// // Export models
// export { Food, WasteEmission, Electricity, Country, Transportation };
