const recipesJson = require("../recipes.json");
const { default: axios } = require("axios");
const urlIngredients = `https://api.spoonacular.com/recipes/findByIngredients`;
const urlRecipe = `https://api.spoonacular.com/recipes/`
const db = require('../models')

const index = (req, res) => {
  res.send(recipesJson);
};

const addIngredient = (req, res) => {
  db.ingredient.findOrCreate({
    where: {
      name: req.body.name
    }
  })
  .then(([response, created]) => {
    res.json({ message: "Ingredient Added", ingredient: response})
  })
  .catch(err => {
    res.json({ message: "There was an error", error: err})
  })
}

const find = (req, res) => {
  axios.get(urlIngredients, {
      params: {
        apiKey: process.env.API_KEY,
        ingredients: req.params,
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
  const foundUser = await db.user.findOne({ where: { id: req.body.user.id } })
  //in case no user is found
  if (!foundUser) {
   return res.json({ message: "No user found"})
  }
  
  // const ingredients = []
  // // push ingredients into array
  // for (let i = 0; i < req.body.extendedIngredients.length; i++) {
  //   ingredients.push(req.body.extendedIngredients[i].original)
  // }
  // // make array into string
  // ingredients = ingredients.join(', ')
  
  // create new recipe
  const newRecipe = await db.recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    image_url: req.body.image,
    ingredients: req.body.extendedIngredients.join(', ')
  }).catch(err => res.json({status: 400, message: "error creating recipe", error: err}))

  // associate recipe with user
  const makeAssoc = await foundUser.createRecipe(newRecipe).catch(err => console.log(err, "error"))
  // for some reason, createRecipe hasn't been adding the assoc, so this will manually do so:
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
  addIngredient
};
