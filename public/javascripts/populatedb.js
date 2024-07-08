import Company from "../../models/company.js";
import Internship from "../../models/internship.js";
import { getInternships } from "./getInternships.js";

export async function pushToMongoDB() {
  let newInternships = 0;
  try {
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
      let existingInternship = await Internship.find({
        company: company._id,
        role: data.role,
        location: data.location,
        date_posted: data.date_posted,
        link: data.link,
      });

      if (existingInternship.length === 0) {
        await Internship.create({
          company: company._id,
          role: data.role,
          location: data.location,
          link: data.link,
          date_posted: data.date_posted,
        });

        newInternships++;
      }
    }
    console.log(
      `${newInternships} new internships were processed and inserted`,
    );
  } catch (e) {
    console.error(e);
    throw e; // Rethrow the error to be caught in scheduleUpdate
  }
}
