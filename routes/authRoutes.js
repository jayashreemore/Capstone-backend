const express = require("express");
const router = express.Router();
const {
    signup,
    signin,
    logout,
    userProfile,
    userList,
    deleteUser,
    updateUser,
    showSingleUser,
} = require("../controllers/authController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

//auth routes
// /api/signup
router.post("/signup", signup);

// /api/signin
router.post("/signin", signin);

// /api/signin
router.get("/logout", logout);

// /api/userprofile
router.get("/me", isAuthenticated, userProfile);

// /api/users
router.get("/users", userList);

// /api/users/:id
router.get("/user/:id", showSingleUser);

// /api/delete/user/:id
router.delete("/delete/user/:id", deleteUser);

// /api/users/:id
router.put("/update/user/:id", updateUser);

module.exports = router;