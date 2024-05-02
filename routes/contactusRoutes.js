const express = require("express");
const router = express.Router();

const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { contactus } = require("../controllers/contactusController");

//auth routes
// /api/signup
router.post("/contactus", contactus);

module.exports = router;