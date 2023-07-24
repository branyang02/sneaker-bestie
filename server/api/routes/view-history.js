const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const utilFunctions = require("../utils/util");
const fetch = require("node-fetch");

const ViewHistory = require("../models/view_history");
const Sneaker = require("../models/sneaker");
const checkAuth = require("../middleware/check-auth");

// ADD VIEW HISTORY TO DATABASE
/*
    example request body:
      {
        "product_id": "bf364c53-eb77-4522-955c-6a6ce952cc6f"
      }
  */
router.post("/add-view-history", checkAuth, (req, res, next) => {
  const userID = req.user.userId;
  const productId = req.body.product_id;

  ViewHistory.findOne({ userID: userID })
    .exec()
    .then((viewHistory) => {
      if (viewHistory) {
        console.log("viewHistory already exists", viewHistory);
        Sneaker.findById(productId)
          .exec()
          .then((sneaker) => {
            if (!sneaker) {
              return res.status(404).json({ error: "Sneaker not found" });
            } else {
              ViewHistory.updateOne(
                { userID: userID },
                {
                  $addToSet: { viewedSneakers: productId },
                }
              )
                .then((result) => {
                  res
                    .status(200)
                    .json({ message: "View History Updated Successfully" });
                })
                .catch((err) => {
                  res.status(500).json({ error: err });
                });
            }
          })
          .catch(utilFunctions.throwError(res));
      } else {
        console.log("viewHistory does not exist");
        const viewHistory = new ViewHistory({
          _id: new mongoose.Types.ObjectId(),
          userID: userID,
          viewedSneakers: [productId],
        });
        viewHistory
          .save()
          .then((result) => {
            res.status(201).json({
              message: "viewHistory created!",
              result,
            });
          })
          .catch(utilFunctions.throwError(res));
      }
    })
    .catch(utilFunctions.throwError(res));
});

// VIEW ALL VIEW HISTORIES GIVEN USER
router.get("/all-view-history", checkAuth, (req, res, next) => {
  const userID = req.user.userId;
  ViewHistory.findOne({ userID: userID })
    .populate({
      path: "viewedSneakers",
      select: "title",
    })
    .exec()
    .then((viewHistory) => {
      if (!viewHistory) {
        return res.status(404).json({ error: "You have no view history." });
      } else {
        res.status(200).json({
          count: viewHistory.viewedSneakers.length,
          viewHistory,
        });
      }
    })
    .catch(utilFunctions.throwError(res));
});

// EXPORT ROUTER
module.exports = router;
