const FACEBOOK_APP_ID = "";
const FACEBOOK_APP_SECRET = "";

const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require("passport");

const { User } = require('../models/index')

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:5000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})