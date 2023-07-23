const mongoose = require("mongoose");

// create a Schema
const recommendationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  sneakerRecommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sneaker", required: true }],
});

// convert Schema to a Model
module.exports = mongoose.model("Recommendation", recommendationSchema);
