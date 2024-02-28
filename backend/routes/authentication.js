const express = require("express");
const { login } = require("../controllers/authentication.js");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/login/success", (req, res) => {
  // used by frontend to check if user is logged in
  if (req.user) {
    return res.status(200).json({
      error: false,
      user: req.user,
    });
  } else {
    return res.status(403).json({ error: false, message: "not authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  return res.status(404).json({
    error: true,
    message: "log in failure",
  });
});

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    successRedirect: "http://localhost:3000/",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/")
})

router.post("/login", login);

module.exports = router;
