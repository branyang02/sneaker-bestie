const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Connect end points, those are relative path to products.js and orders.js
const userRoutes = require("./api/routes/users");
const sneakerRoutes = require("./api/routes/sneakers");

// connect to MongoDB database
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://jqm9ba:" +
    process.env.MongoDB_PASSWORD +
      "@cluster0.yiy71nq.mongodb.net/?retryWrites=true&w=majority"
  );
}

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Error Handling Middleware
// prevent CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //could edit to restrict web domain
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// MAIN PART: routes to handle middlewares
app.use("/users", userRoutes);
app.use("/sneakers", sneakerRoutes);

// handle error requests that reach this line, because all valid HTTP requests should be handled by endpoints Middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// display error message in JSON format
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
