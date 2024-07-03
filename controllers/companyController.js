import Company from "../models/company.js";
import expressAsyncHandler from "express-async-handler";

const companyList = expressAsyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: List of company's");
});

const companyDetail = expressAsyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: company detail: ${req.params.id}`);
});

export default { companyList, companyDetail };
