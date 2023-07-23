const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const utilFunctions = require("../utils/util");
const fetch = require("node-fetch");

const Recommendation = require("../models/recommendation");
const Sneaker = require("../models/sneaker");
const checkAuth = require("../middleware/check-auth");

router.get("/view-recommendations", checkAuth, (req, res, next) => {
  return res.status(200).json({ message: "view recommendations" });
});

router.patch("/get-new-recommendations", checkAuth, (req, res, next) => {
  return res.status(200).json({ message: "get new recommendations" });
});

// EXPORT ROUTER
module.exports = router;
