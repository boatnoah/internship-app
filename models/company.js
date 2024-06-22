import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  website: String,
});

export default mongoose.model("Company", companySchema);
