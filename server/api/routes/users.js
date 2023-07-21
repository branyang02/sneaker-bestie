const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/signup", (req, res, test) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        // if the user already exists
        console.log("User already exist", user);
        return res.status(409).json({
          message: "User already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "user created!",
                  result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.delete("/:userID", (req, res, next) => {
  const userID = req.params.userID;
  User.deleteOne({
    _id: userID,
  })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User deleted!"
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
