import Internship from "../models/internship.js";
import expressAsyncHandler from "express-async-handler";

const internshipList = expressAsyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Internship posting");
});

const internshipDetail = expressAsyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Internship detail: ${req.params.id}`);
});

export default { internshipList, internshipDetail };
