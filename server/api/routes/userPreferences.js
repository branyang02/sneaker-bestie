const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const utilFunctions = require("../utils/util");
const fetch = require("node-fetch");

const UserPreference = require("../models/userPreference");
const checkAuth = require("../middleware/check-auth");
/*
  example request body:
    {
      "userID": "60b9b4b3e6b3a83a3c9b0b1a",
      "PreferredColor": ["blue", "red"],
      "PreferredBrand": ["Nike", "Adidas"],
      "PreferredType": ["sneakers", "hoodies"],
      "PreferredPriceRange": [100, 200]
    }
*/

// ADD USER PREFERENCE TO DATABASE
router.post("/add-user-preference", checkAuth, (req, res, next) => {
  // obtain fields from request body
  const {
    userID,
    PreferredColor,
    PreferredBrand,
    PreferredType,
    PreferredPriceRange,
  } = req.body;

  // create a new userPreference object
  const user_preference = new UserPreference({
    _id: new mongoose.Types.ObjectId(),
    userID: userID,
    PreferredColor: PreferredColor,
    PreferredBrand: PreferredBrand,
    PreferredType: PreferredType,
    PreferredPriceRange: PreferredPriceRange,
  });

  // save userPreference object to database
  user_preference
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User preferences added successfully",
        addedUserPreference: result,
      });
    })
    .catch(utilFunctions.throwError(res));
});

// VIEW USER PREFERENCE FROM DATABASE
router.get("/view-user-preference/:userID", checkAuth, (req, res, next) => {
  const userID = req.params.userID;
  UserPreference.findOne({ userID: userID })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry found for provided userID",
        });
      }
    })
    .catch(utilFunctions.throwError(res));
});

// EXPORT ROUTER
module.exports = router;