const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

companySchema.virtual("url").get(function () {
  return `/catalog/company/${this._id}`;
});

export default mongoose.model("Company", companySchema);
