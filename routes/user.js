const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl, isLoggedIn } = require("../middleware");
const userController = require("../controllers/users");

// Signup
router.route("/signup")
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signupUser));

// Login
router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), userController.userLogin);

// Logout
router.get("/logout", userController.userLogout);

// Leaderboard
router.get("/leaderboard", wrapAsync(userController.showLeaderboard));

// User Profile
router.get("/users/:username", wrapAsync(userController.showProfile));

module.exports = router;
