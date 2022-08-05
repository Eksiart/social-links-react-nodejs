const express = require("express");
const app = express();

const cookieSession = require("cookie-session");
const passport = require("passport");
const passportGoogle = require("./controllers/passportGoogle");
const passportFacebook = require("./controllers/passportFacebook");
const passportVk = require("./controllers/passportVkontakte");
const authRoute = require("./routes/auth")
const profileRoute = require("./routes/profile")
const cors = require("cors");

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const { sequelize } = require('./models/index');

app.use(cookieSession(
  {
    name: "session",
    keys: [ "links", "social"],
    maxAge: 24 * 60 * 60 * 100
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

app.use(require('./middleware/auth'))

app.use("/auth", authRoute);
app.use("/profile", profileRoute);

app.listen("5000", () => {
  console.log("Server is running!");
})