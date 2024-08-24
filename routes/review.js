const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../joi.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedin, validateReview, isAuthorReview} = require("../middleware.js");

const reviewController = require("../controllers/review.js");



// Post Route
router.post("/", isLoggedin, validateReview, wrapAsync(reviewController.createReview));

//Delete Route
router.delete("/:reviewId", isLoggedin, isAuthorReview, wrapAsync(reviewController.destroyReview));

module.exports = router;