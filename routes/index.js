import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.redirect("/catalog/internship");
});

export default router;
