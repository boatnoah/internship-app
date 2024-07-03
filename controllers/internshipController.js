import Company from "../models/company.js";
import Internship from "../models/internship.js";
import expressAsyncHandler from "express-async-handler";

const internshipList = expressAsyncHandler(async (req, res, next) => {
  const allInternships = await Internship.find({}, "role _id")
    .populate("company", "name")
    .exec();

  res.render("all_internships", {
    title: "Internship List",
    all_internships: allInternships,
  });
});

const internshipDetail = expressAsyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Internship detail: ${req.params.internshipid}`);
});

export default { internshipList, internshipDetail };
