const recipesJson = require("../recipes.json");
const { default: axios } = require("axios");
const url = `https://api.spoonacular.com/recipes/findByIngredients`;
const index = (req, res) => {
  res.send(recipesJson);
};

const find = (req, res) => {
  axios.get(url, {
      params: {
        apiKey: process.env.API_KEY,
        ingredients: req.params,
        number: 5
      },
    })
    .then((response) => {
      res.json({ recipes: response.data });
    });
};

module.exports = {
  index,
  find,
};
