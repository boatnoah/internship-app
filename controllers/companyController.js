import Company from "../models/company.js";
import Internship from "../models/internship.js";
const expressAsyncHandler = require("express-async-handler");

const companyList = expressAsyncHandler(async (req, res, next) => {
  const allCompanies = await Company.find().exec();

  res.render("all_companies", {
    title: "Company List",
    all_companies: allCompanies,
  });
});

const companyDetail = expressAsyncHandler(async (req, res, next) => {
  const companyDetails = await Company.find({
    _id: req.params.companyid,
  });

  console.log(companyDetails);

  const internshipFromCompany = await Internship.find({
    company: req.params.companyid,
  }).exec();

  console.log(internshipFromCompany);

  res.render("company_detail", {
    company_name: companyDetails[0].name,
    company_detail: internshipFromCompany,
  });
});

export default { companyList, companyDetail };
