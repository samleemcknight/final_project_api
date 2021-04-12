const passport = require('./passport/ppConfig')
// initialize dotenv for environmental variables
require("dotenv").config();

// require session secret
const session = require('express-session');

// instantiate express
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const routes = require("./routes");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/recipes", routes.recipes);
app.use("/api/v1/cookbook", routes.cookbook)
app.use("/api/v1/auth", routes.auth);

app.get('/', (req, res) => {
  res.send('success');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
