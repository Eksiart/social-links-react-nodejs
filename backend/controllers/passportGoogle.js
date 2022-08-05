const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

const { User } = require('../models/index')

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile, refreshToken);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})