const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/a-sandy-beach-with-palm-trees-and-water-isEwS4PsQSA",
        set: (v) => v === "" ? "https://unsplash.com/photos/a-sandy-beach-with-palm-trees-and-water-isEwS4PsQSA" : v,
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;