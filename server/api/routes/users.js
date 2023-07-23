const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const utilFunctions = require("../utils/util");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");

const User = require("../models/user");

// SIGNUP
router.post("/signup", (req, res, test) => {
  /*
    example request body:
      {
        "email": "brandonbrid2100@gmail.com",
        "password": "admin"
      }
  */
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
              .catch(utilFunctions.throwError(res));
          }
        });
      }
    });
});

// LOGIN
router.post("/login", (req, res, next) => {
  /*
    example request body:
      {
        "email": "brandonbrid2100@gmail.com",
        "password": "admin"
      }
  */
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Authentication Successful",
            userid: user[0]._id,
            token: token,
          });
        }
        return res.status(401).json({
          message: "Authentication Failed",
        });
      });
    })
    .catch(utilFunctions.throwError(res));
});

// DELETE USER
router.delete("/:userID", checkAuth, (req, res, next) => {
  const userID = req.params.userID;
  User.deleteOne({
    _id: userID,
  })
    .exec()
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({
          error: "User not found",
        });
      }
      res.status(200).json({
        message: "User deleted!",
      });
    })
    .catch(utilFunctions.throwError(res));
});

module.exports = router;
