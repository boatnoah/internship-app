import Company from "../models/company.js";
import Internship from "../models/internship.js";
const expressAsyncHandler = require("express-async-handler");

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
  const internshipData = await Internship.find({
    _id: req.params.internshipid,
  }).exec();

  const companyName = await Company.find({
    _id: internshipData[0].company,
  }).exec();

  console.log(companyName);

  res.render("internship_detail", {
    company: companyName[0].name,
    internship_detail: internshipData,
  });
});

export default { internshipList, internshipDetail };
