const express = require("express");
const router = express.Router();
const path = require("path");

// Existing static routes
router.use("/feedback", express.static("./frontend/feedbackform"));
router.use("/signup", express.static("./frontend/signup"));
router.use("/hr-dashboard", express.static("./frontend/hr-dashboard"));
router.use("/employee-dashboard", express.static("./frontend/employee-dashboard"));

// 🔥 New route to render EJS with company name
router.get("/hr-dashboard-view", (req, res) => {
  const companyName = req.query.companyName || "Your Company";
  res.render("index", { companyName }); // Make sure you have views/index.ejs
});

module.exports = router;
