const recipesJson = require("../recipes.json");
const { default: axios } = require("axios");
const urlIngredients = `https://api.spoonacular.com/recipes/findByIngredients`;
const urlRecipe = `https://api.spoonacular.com/recipes/`
const db = require('../models')

const index = (req, res) => {
  res.send(recipesJson);
};

const find = (req, res) => {
  axios.get(urlIngredients, {
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

const show = (req, res) => {
  
  axios.get(`${urlRecipe}/${req.params.id}/information`, {
    params: {
      apiKey: process.env.API_KEY,
    }
  })
  .then(response => {
    console.log(response.data)
    if (response) res.json({ recipe: response.data })
    else res.json({message: "no recipe found"})
  })
  .catch(err => {
    res.json({ message: "there was an error" })
  })
}

module.exports = {
  index,
  find,
  show
};
