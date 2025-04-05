const express = require('express');
const router = express.Router();

router.use("/feedback",express.static("./frontend/feedbackform"));


module.exports = router;