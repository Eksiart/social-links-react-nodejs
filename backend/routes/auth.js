const router = require("express").Router();
const passport = require("passport");

const { logIn, bindProviders } = require("../controllers/auth");

const authController = require('../controllers/auth');

router.post('/updatetokens', authController.updateTokens);

const CLIENT_URL = "http://localhost:3000/profile";
const LOGIN_URL = "http://localhost:3000/login";

router.get("/logout", (req, res) => {
  res.redirect(LOGIN_URL);
});

router.get("/google", (req, res, next) => {
  const { bind } = req.query;
  const state  = bind ? bind.toString('base64') : undefined

  const authenticator = passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ],
    accessType: 'offline',
    state
  })
  authenticator(req, res, next)
});

router.get("/google/callback", passport.authenticate("google", {session: false, failureRedirect: "/login/failed" }),
  async function(req, res) {
    const { state } = req.query
    if (state){
      await bindProviders(req.user.id, 'google', req.authInfo, state);
    }
    const loginResult = await logIn(req.user.id, 'google', req.authInfo);
    const accessToken = loginResult[0];
    const refreshToken = loginResult[1];
    const userId = loginResult[2];
    res.cookie('accessToken', accessToken, { maxAge: 2592000000 });
    res.cookie('refreshToken', refreshToken, { maxAge: 2592000000 });
    res.cookie('userId', userId, { maxAge: 2592000000 });
    res.redirect(CLIENT_URL);
  }
)

router.get("/facebook", (req, res, next) => {
  const { bind } = req.query;
  const state  = bind ? bind.toString('base64') : undefined
  const authenticator = passport.authenticate("facebook", {
    scope: ['email', 'user_photos'], 
    access_type: 'offline', 
    state
  })
  authenticator(req, res, next)
});

router.get("/facebook/callback", passport.authenticate("facebook", {session: false, failureRedirect: "/login/failed" }),
  async function(req, res) {
    const { state } = req.query
    if (state){
      await bindProviders(req.user.id, 'fb', '', state);
    }
    const loginResult = await logIn(req.user.id, 'fb');
    const accessToken = loginResult[0];
    const refreshToken = loginResult[1];
    const userId = loginResult[2];
    res.cookie('accessToken', accessToken, { maxAge: 2592000000 });
    res.cookie('refreshToken', refreshToken, { maxAge: 2592000000 });
    res.cookie('userId', userId, { maxAge: 2592000000 });
    res.redirect(CLIENT_URL);
  }
)

router.get("/vk", (req, res, next) => {
  const { bind } = req.query;
  const state  = bind ? bind.toString('base64') : undefined
  const authenticator = passport.authenticate("vkontakte", {
    session: false, 
    scope: ['user_photos', 'offline'],
    state
  })
  authenticator(req, res, next)
})

router.get("/vk/callback", passport.authenticate("vkontakte", {session: false, failureRedirect: "/login" }),
  async function(req, res) {
    const { state } = req.query
    if (state){
      await bindProviders(req.user.id, 'vk', '', state);
    }
    const loginResult = await logIn(req.user.id, 'vk');
    const accessToken = loginResult[0];
    const refreshToken = loginResult[1];
    const userId = loginResult[2];
    res.cookie('accessToken', accessToken, { maxAge: 2592000000 });
    res.cookie('refreshToken', refreshToken, { maxAge: 2592000000 });
    res.cookie('userId', userId, { maxAge: 2592000000 });
    res.redirect(CLIENT_URL);
  }
)

module.exports = router