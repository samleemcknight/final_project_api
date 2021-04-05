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

// add recipe on '/show' to db favorites
const favorite = async (req, res) => {
  // find user 
  const foundUser = await db.user.findOne({ where: { id: req.body.user.id } })
  const ingredients = []
  
  for (let i = 0; i < req.body.extendedIngredients.length; i++) {
    ingredients.push(req.body.extendedIngredients[i].original)
  }
  ingredients = ingredients.join(', ')

  if (!foundUser) {
   return res.json({ message: "No user found"})
  }
  const newRecipe = await db.recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    image_url: req.body.image,
    ingredients: req.body.extendedIngredients.join(', ')
  }) 
  foundUser.createRecipe(newRecipe).then(relationInfo => {
    return res.status(201).json({ status: 201, message: "success", newRecipe });
  } ).catch(err => console.log(err, "error"))

}

module.exports = {
  index,
  find,
  show,
  favorite
};
