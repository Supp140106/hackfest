const express = require('express');
const router = express.Router();

router.use("/feedback",express.static("./frontend/feedbackform"));
router.use("/signup",express.static("./frontend/signup"));
router.use("/hr-dashboard",express.static("./frontend/hr-dashboard"));
router.use("/employee-dashboard",express.static("./frontend/employee-dashboard"));


module.exports = router;