// initialize dotenv for environmental variables
require("dotenv").config();

// instantiate express
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const routes = require("./routes");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/recipes", routes.recipes);
app.use("/api/v1/cookbook", routes.cookbook)
app.use("/api/v1/auth", routes.auth);

app.listen(port, process.env.IP_ADDRESS, () => console.log(`Server is running on port ${port}`));
