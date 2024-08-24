const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usercontroller = require("../controllers/user.js");

router
    .route("/signup")
    .get(usercontroller.renderSignUpForm)
    .post(wrapAsync(usercontroller.signUp));

router
    .route("/login")
    .get(usercontroller.renderLoginForm)
    .post(saveRedirectUrl, 
        passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), 
        usercontroller.login);

router.get("/logout", usercontroller.logout);

module.exports = router;