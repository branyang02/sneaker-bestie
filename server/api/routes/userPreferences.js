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
      "PreferredColor": ["blue", "red"],
      "PreferredBrand": ["Nike", "Adidas"],
      "PreferredType": ["sneakers", "hoodies"],
      "PreferredPriceRange": [100, 200]
    }
*/

// ADD USER PREFERENCE TO DATABASE
router.post("/add-preferences", checkAuth, (req, res, next) => {
  // Obtain fields from request body
  const { PreferredColor, PreferredBrand, PreferredType, PreferredPriceRange } =
    req.body;

  // Obtain the userID from the authenticated user
  const userID = req.user.userId;

  // Create a new UserPreference object
  const user_preference = new UserPreference({
    _id: new mongoose.Types.ObjectId(),
    userID: userID,
    PreferredColor: PreferredColor,
    PreferredBrand: PreferredBrand,
    PreferredType: PreferredType,
    PreferredPriceRange: PreferredPriceRange,
  });

  // Save UserPreference object to database
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
router.get("/view-preferences", checkAuth, (req, res, next) => {
  const userID = req.user.userId;
  UserPreference.findOne({ userID: userID })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry found for current User",
        });
      }
    })
    .catch(utilFunctions.throwError(res));
});

// UPDATE USER PREFERENCE IN DATABASE
router.patch("/update-preferences", checkAuth, (req, res, next) => {
  /*
    example request body:
      [
        {
          "propName": "PreferredColor",
          "value": ["blue", "red", "green"]
        }, {
          "propName": "PreferredBrand",
          "value": ["Nike", "Adidas", "Puma"]
        }, {
          "propName": "PreferredType",
          "value": ["sneakers", "hoodies", "jackets"]
        }, {
          "propName": "PreferredPriceRange",
          "value": [200, 300]
        }
      ]
  */
  const userID = req.user.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  UserPreference.updateOne({ userID: userID }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User preferences updated",
        updatedUserPreference: result,
      });
    })
    .catch(utilFunctions.throwError(res));
});

// EXPORT ROUTER
module.exports = router;
