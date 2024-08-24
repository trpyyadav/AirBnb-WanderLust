const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../joi.js");
const Listing = require("../models/listing.js");
const {isLoggedin, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });



router
    .route("/")
    .get(wrapAsync(listingController.index)) // Index Route
    // .post(isLoggedin, validateListing, wrapAsync(listingController.createNewListing)); // Create Route
    .post(upload.single('listing[image]'), (req, res) => {
        res.send(req.file);
    });

// New Route
router.get("/new", isLoggedin, listingController.renderNewForm);

router
    .route("/:id") 
    .get(wrapAsync(listingController.showListing)) // Show Route
    .put(validateListing, isOwner, wrapAsync(listingController.updateListing)) // Update Route
    .delete(isLoggedin, isOwner, wrapAsync(listingController.destroyListing)); // DELETE Route

// edit Route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;