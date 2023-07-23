const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // get token from header
  const token = authHeader && authHeader.split(" ")[1]; // split token from "Bearer <token>"
  console.log("This is the token: ", token);
  if (token == null) {
    return res.sendStatus(401); // if there isn't any token
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    console.log("This is the user: ", user);
    req.user = user;
    next();
  });
};
