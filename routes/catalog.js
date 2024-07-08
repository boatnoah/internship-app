import express from "express";
import internshipController from "../controllers/internshipController.js";
import companyController from "../controllers/companyController.js";

const router = express.Router();

router.get("/company", companyController.companyList);
router.get("/company/:companyid", companyController.companyDetail);
// Internship routes
router.get("/internship", internshipController.internshipList);
router.get("/internship/:internshipid", internshipController.internshipDetail);

// Company Routes

export default router;
