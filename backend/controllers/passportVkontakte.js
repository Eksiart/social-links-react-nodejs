const VKONTAKTE_APP_ID = "";
const VKONTAKTE_APP_SECRET = "";

const VKontakteStrategy  = require('passport-vkontakte').Strategy;
const passport = require("passport");

passport.use(new VKontakteStrategy({
  clientID: VKONTAKTE_APP_ID,
  clientSecret: VKONTAKTE_APP_SECRET,
  callbackURL: "http://localhost:5000/auth/vk/callback"
},
function( accessToken, refreshToken, profile, done) {
  done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})