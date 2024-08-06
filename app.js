const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./joi.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);


main()
    .then(() => {console.log("Connected successfully to DB");})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

// app.get("/testListing", async (req, res) => {
//     let newListing = new Listing({
//         title: "My New Villa",
//         description: "By the Beach",
//         price: 200000,
//         location: "Compengurt, Goa",
//         country: "India",
//     });

//     await newListing.save();
//     console.log("Data Saved Successfully");
//     res.send("Working Perfectly");
// });


// Index Route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
    

}

// Create Route
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
    console.log(result);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

// Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
}));

// edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

// Update Route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

// DELETE Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

app.get("/", (req, res) => {
    res.send("Hello, I am root..");
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
})

app.use((err, req, res, next) => {
    let {statusCode=500, message="Something went wrong!!"} = err;
    res.status(statusCode).render("error.ejs", {message});
});

app.listen(8080, () => {
    console.log("app is listening to port 8080");
});