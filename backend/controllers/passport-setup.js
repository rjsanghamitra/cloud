const passport = require("passport");
const GoogleUser = require("../models/GoogleUser.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "http://localhost:3001/auth/google/redirect",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await GoogleUser.findOne({ email: profile.emails[0].value });
        if (user) {
          return cb(null, user);
        } else {
          const newUser = new GoogleUser({
            id: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            picture: profile._json.picture,
            friends: [],
          });
          await newUser.save();
          return cb(null, profile);
        }
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
