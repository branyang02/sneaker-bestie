const mongoose = require("mongoose");

// create a Schema
const userPreferenceShema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  PreferredColor: { type: [String], required: true },
  PreferredBrand: { type: [String], required: true },
  PreferredType: { type: [String], required: true },
  PreferredPriceRange: { type: [Number], required: true },
});

// convert Schema to a Model
module.exports = mongoose.model("UserPreference", userPreferenceShema);
