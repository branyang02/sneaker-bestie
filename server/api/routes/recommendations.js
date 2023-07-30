const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const utilFunctions = require("../utils/util");
const fetch = require("node-fetch");
const axios = require("axios");

const Recommendation = require("../models/recommendation");
const Sneaker = require("../models/sneaker");
const checkAuth = require("../middleware/check-auth");

// LOAD RECOMMENDATIONS
router.get("/view-recommendations", checkAuth, (req, res, next) => {
  const userID = req.user.userId;
  Recommendation.findOne({ userID: userID })
    .populate({
      path: "sneakerRecommendations",
      select: "title",
    })
    .exec()
    .then((recommendation) => {
      if (!recommendation) {
        return res.status(404).json({ error: "You have no recommendation." });
      } else {
        res.status(200).json({
          count: recommendation.sneakerRecommendations.length,
          recommendation,
        });
      }
    })
    .catch(utilFunctions.throwError(res));
});

// GET NEW RECOMMENDATIONS
router.put("/get-new-recommendations", checkAuth, (req, res, next) => {
  const userID = req.user.userId;
  const token = req.token;

  // HTTP POST REQUEST TO PYTHON FLASK SERVER
  axios
    .post("http://127.0.0.1:5000/recommend", {
      userID: userID,
      token: token,
    })
    .then((response) => {
      // handle success

      // save recommendations to database
      const recommendations = response.data;

      Recommendation.findOne({ userID: userID })
        .exec()
        .then((result) => {
          if (result) {
            console.log("recommendation already exists");

            Recommendation.updateOne(
              { userID: userID },
              { $set: { sneakerRecommendations: recommendations } }
            )
              .then(() => {
                res.status(200).json({
                  message: "Recommendation Updated Successfully",
                });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          } else {
            console.log("recommendation does not exist");
            const recommendation = new Recommendation({
              _id: new mongoose.Types.ObjectId(),
              userID: userID,
              sneakerRecommendations: recommendations,
            });
            recommendation
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "recommendation created!",
                  result,
                });
              })
              .catch(utilFunctions.throwError(res));
          }
        })
        .catch(utilFunctions.throwError(res));
    })
    .catch((error) => {
      // handle error
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred when contacting the Flask server" });
    });
});

// EXPORT ROUTER
module.exports = router;
