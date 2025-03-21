import mongoose from "mongoose";
const WasteEmissionSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  emission_factor_kg_co2_per_kg: { type: Number, required: true }
});
const WasteEmission = mongoose.model("WasteEmission", WasteEmissionSchema);

export default WasteEmission;