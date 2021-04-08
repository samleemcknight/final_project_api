const recipesJson = require("../recipes.json");
const { default: axios } = require("axios");
const urlIngredients = `https://api.spoonacular.com/recipes/findByIngredients`;
const urlRecipe = `https://api.spoonacular.com/recipes/`
const db = require('../models');

// for showing recipes in cookbook
const index = async (req, res) => {
  try {
    const foundUser = await db.user.findOne({
      where : {id: 1},
      include: [db.recipe]
    })
    res.json({ status: 201, message: "success", recipes: foundUser.recipes })
  } catch (error) {
    return res.json({ status: 401, message: "error", error })
  }

};

const find = async (req, res) => {
  const foundUser = await db.user.findOne({
    where : {id: 1},
    include: [db.ingredient]
  })
  // format user's ingredients into friendly version for api request
  let ingredients = []
  for (let i=0; i<foundUser.ingredients.length; i++) {
    ingredients.push(foundUser.ingredients[i].name)
  }
  // api request
  axios.get(urlIngredients, {
      params: {
        apiKey: process.env.API_KEY,
        ingredients: ingredients.join(","),
        number: 5
      },
    })
    .then(response => {
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
    if (response) res.json({ recipe: response.data })
    else res.json({message: "no recipe found"})
  })
  .catch(err => {
    res.json({ message: "there was an error" })
  })
}

// add recipe on '/show' to db favorites
const favorite = async (req, res) => {
  // find user 
  const foundUser = await db.user.findOne({ where: { id: 1 } })
  //in case no user is found
  if (!foundUser) {
   return res.json({ message: "No user found"})
  }

  // create new recipe
  const [newRecipe, created] = await db.recipe.findOrCreate({
    where: { title: req.body.title},
    defaults: {
      title: req.body.title,
      instructions: req.body.instructions,
      image_url: req.body.image_url,
      ingredients: req.body.ingredients
    }
  })

  // associate recipe with user
  
  foundUser.addRecipe(newRecipe).then(response => {
    foundUser.getRecipes().then(recipes => {
      return res.status(201).json({ status: 201, message: "success", recipes })
    })
  })
}

module.exports = {
  index,
  find,
  show,
  favorite,
};
