import express from "express";
import internshipController from "../controllers/internshipController.js";
import companyController from "../controllers/companyController.js";

const router = express.Router();

// Internship routes
router.get("/", internshipController.internshipList);
router.get("/:companyid/:internshipid", internshipController.internshipDetail);

// Company Routes
router.get("/company", companyController.companyList);

export default router;
