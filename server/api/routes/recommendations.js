const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const utilFunctions = require("../utils/util");
const fetch = require("node-fetch");
const axios = require('axios');

const Recommendation = require("../models/recommendation");
const Sneaker = require("../models/sneaker");
const checkAuth = require("../middleware/check-auth");

// LOAD RECOMMENDATIONS
router.get("/view-recommendations", checkAuth, (req, res, next) => {});

// GET NEW RECOMMENDATIONS
router.patch("/get-new-recommendations", checkAuth, (req, res, next) => {
  const userID = req.user.userId;
  const token = req.token;

  // HTTP POST REQUEST TO PYTHON FLASK SERVER
  axios.post('http://127.0.0.1:5000/recommend', {
    userID: userID,
    token: token
  })
  .then((response) => {
    // handle success
    console.log(response.data); // this will print the response from the Flask server
    res.status(200).json({message: "Received response from Flask server", data: response.data});
  })
  .catch((error) => {
    // handle error
    console.log(error);
    res.status(500).json({error: "An error occurred when contacting the Flask server"});
  });
});

// EXPORT ROUTER
module.exports = router;
