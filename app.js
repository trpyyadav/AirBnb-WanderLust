const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));


main()
    .then(() => {console.log("Connected successfully to DB");})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/testListing", async (req, res) => {
    let newListing = new Listing({
        title: "My New Villa",
        description: "By the Beach",
        price: 200000,
        location: "Compengurt, Goa",
        country: "India",
    });

    await newListing.save();
    console.log("Data Saved Successfully");
    res.send("Working Perfectly");
});

app.get("/", (req, res) => {
    res.send("Hello, I am root..");
})


app.listen(8080, () => {
    console.log("app is listening to port 8080");
});