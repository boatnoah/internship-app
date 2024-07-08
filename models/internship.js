const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const internshipSchema = new Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  role: { type: String, required: true },
  location: { type: String, required: true },
  link: { type: String, required: true },
  date_posted: { type: String, default: Date.now },
});

internshipSchema.virtual("url").get(function () {
  return `/catalog/internship/${this._id}`;
});

export default mongoose.model("Internship", internshipSchema);
