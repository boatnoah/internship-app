import mongoose from "mongoose";

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
  date_posted: { type: Date, default: Date.now },
});

export default mongoose.model("Internship", internshipSchema);
