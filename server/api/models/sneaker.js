const mongoose = require("mongoose");

// create a Schema
const sneakerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  urlKey: {
    type: String,
    required: true,
  },
  styleId: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  productAttributes: {
    gender: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    retailPrice: {
      type: Number,
      required: true,
    },
    colorway: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
});

// convert Schema to a Model
module.exports = mongoose.model("Sneaker", sneakerSchema);
