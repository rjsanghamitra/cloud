const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const verification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("middleware: ", token);
    jwt.verify(token, process.env.JWT_SECRET, {algorithms: "HS256"}, function(err, decoded) {
      if(err) {
        console.log(err);
      }
      console.log(decoded);
    });
    return next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "invalid or expired token" });
  }
};

module.exports = verification;