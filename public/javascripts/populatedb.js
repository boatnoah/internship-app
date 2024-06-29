import Company from "../../models/company.js";
import Internship from "../../models/internship.js";
import { getInternships } from "./getInternships.js";
import { uri } from "../../config.js";
import mongoose from "mongoose";

async function pushToMongoDB() {
  try {
    await mongoose.connect(uri);

    const internshipData = await getInternships(
      "SimplifyJobs",
      "Summer2025-Internships",
    );

    for (const data of internshipData) {
      // Find or create the company
      let company = await Company.findOne({ name: data.company });
      if (!company) {
        company = await Company.create({ name: data.company });
      }

      // Create the internship, linking it to the company
      await Internship.create({
        company: company._id,
        role: data.position,
        location: data.location,
        link: data.link,
        date_posted: data.date,
      });
    }

    console.log(
      `${internshipData.length} internships were processed and inserted`,
    );
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}

pushToMongoDB();
