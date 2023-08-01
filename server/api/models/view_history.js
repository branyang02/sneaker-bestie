const mongoose = require("mongoose");

// create a Schema
const viewHistorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  viewedSneakers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sneaker", required: true, unique: true }],
});

// convert Schema to a Model
module.exports = mongoose.model("ViewHistory", viewHistorySchema);
