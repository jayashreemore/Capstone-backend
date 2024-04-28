const express = require("express");
const router = express.Router();

const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { subscription } = require("../controllers/subscriptionController");

//auth routes
// /api/signup
router.post("/subscription", subscription);

module.exports = router;
