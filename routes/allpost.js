import express from "express";
import { getInternships } from "../public/javascripts/getInternships.js";
const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const internshipData = await getInternships(
    "SimplifyJobs",
    "Summer2025-Internships",
  );
  res.send(internshipData);
});

export default router;
