const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../joi.js");
const Listing = require("../models/listing.js");
const {isLoggedin, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");



// Index Route
router.get("/", wrapAsync(listingController.index));

// New Route
router.get("/new", isLoggedin, listingController.renderNewForm);

// Create Route
router.post("/", isLoggedin, validateListing, wrapAsync(listingController.createNewListing));

// Show Route
router.get("/:id", wrapAsync(listingController.showListing));

// edit Route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.renderEditForm));

// Update Route
router.put("/:id", validateListing, isOwner, wrapAsync(listingController.updateListing));

// DELETE Route
router.delete("/:id", isLoggedin, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;