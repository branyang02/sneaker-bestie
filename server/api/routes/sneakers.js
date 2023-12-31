const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const utilFunctions = require("../utils/util");
const fetch = require("node-fetch");

const Sneaker = require("../models/sneaker");

// ADD SNEAKER TO DATABASE (NO SERACH)
/*
  example request body:
  {
    "productId": "bf364c53-eb77-4522-955c-6a6ce952cc6f",
    "urlKey": "purple-hand-bag-leather",
    "styleId": "BY9109",
    "productType": "handbags",
    "title": "Gucci Duchessa Boston Bag",
    "brand": "Nike",
    "productAttributes": {
      "gender": "women",
      "season": "SS21",
      "releaseDate": "2017-09-14",
      "retailPrice": 456,
      "colorway": "String/Black-Villain Red-Neptune Green",
      "color": "purple"
    }
}
*/
router.post("/add-sneaker-from-data", async (req, res, next) => {
  const productId = req.body.productId;

  // Check if sneaker with given productId already exists
  const existingSneaker = await Sneaker.findOne({ productId: productId });
  if (existingSneaker) {
    return res.status(409).json({
      message: "A sneaker with the same productId already exists.",
    });
  }

  // create a sneaker object
  const sneaker = new Sneaker({
    _id: new mongoose.Types.ObjectId(),
    productId: req.body.productId,
    urlKey: req.body.urlKey,
    styleId: req.body.styleId,
    productType: req.body.productType,
    title: req.body.title,
    brand: req.body.brand,
    productAttributes: {
      gender: req.body.productAttributes.gender,
      season: req.body.productAttributes.season,
      releaseDate: req.body.productAttributes.releaseDate,
      retailPrice: req.body.productAttributes.retailPrice,
      colorway: req.body.productAttributes.colorway,
      color: req.body.productAttributes.color,
    },
  });

  // save sneaker to database
  sneaker
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json({
        message: "Added sneaker successfully",
        addedSneaker: {
          productId: result.productId,
          productType: result.productType,
          title: result.title,
          brand: result.brand,
          request: {
            type: "GET",
            url: `http://localhost:${process.env.PORT}/sneakers/view-sneaker/${result._id}`,
          },
        },
      });
    })
    .catch(utilFunctions.throwError(res));
});

// ADD SNEAKER TO DATABASE
/*
  example request body:
    {
      "productId": "bf364c53-eb77-4522-955c-6a6ce952cc6f"
    }
  */
router.post("/add-sneaker", async (req, res, next) => {
  const productId = req.body.productId;

  // Check if sneaker with given productId already exists
  const existingSneaker = await Sneaker.findOne({ productId: productId });
  if (existingSneaker) {
    return res.status(409).json({
      message: "A sneaker with the same productId already exists.",
    });
  }

  // fetch data from StockX API
  const resp = await fetch(
    `https://api.stockx.com/v2/catalog/products/${productId}`,
    {
      method: "GET",
      headers: {
        "x-api-key": "YOUR_API_KEY_HERE",
        Authorization: "Bearer <YOUR_JWT_HERE>",
      },
    }
  );

  // const data = await resp.text();
  // dummy data
  const data = {
    productId: "bf364c53-eb77-4522-955c-6a6ce952cc6f",
    urlKey: "purple-hand-bag-leather",
    styleId: "BY9109",
    productType: "handbags",
    title: "Gucci Duchessa Boston Bag",
    brand: "Nike",
    productAttributes: {
      gender: "women",
      season: "SS21",
      releaseDate: "2017-09-14",
      retailPrice: 456,
      colorway: "String/Black-Villain Red-Neptune Green",
      color: "purple",
    },
  };

  // create a sneaker object
  const sneaker = new Sneaker({
    _id: new mongoose.Types.ObjectId(),
    productId: data.productId,
    urlKey: data.urlKey,
    styleId: data.styleId,
    productType: data.productType,
    title: data.title,
    brand: data.brand,
    productAttributes: {
      gender: data.productAttributes.gender,
      season: data.productAttributes.season,
      releaseDate: data.productAttributes.releaseDate,
      retailPrice: data.productAttributes.retailPrice,
      colorway: data.productAttributes.colorway,
      color: data.productAttributes.color,
    },
  });

  // save sneaker to database
  sneaker
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json({
        message: "Added sneaker successfully",
        addedSneaker: {
          productId: result.productId,
          productType: result.productType,
          title: result.title,
          brand: result.brand,
          request: {
            type: "GET",
            url: `http://localhost:${process.env.PORT}/sneakers/view-sneaker/${result._id}`,
          },
        },
      });
    })
    .catch(utilFunctions.throwError(res));
});

// VIEW ALL SNEAKERS
router.get("/view-all", (req, res, next) => {
  Sneaker.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        sneakers: docs,
      };
      res.status(200).json(response); // display to user
    })
    .catch(utilFunctions.throwError(res));
});

// VIEW SNEAKER BY ID
router.get("/view-sneaker/:sneakerId", (req, res, next) => {
  const id = req.params.sneakerId;
  Sneaker.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message:
            "No valid sneaker found for provided ID, are you sure you are using _id?",
        });
      }
    })
    .catch(utilFunctions.throwError(res));
});

// EXPORT ROUTER
module.exports = router;
