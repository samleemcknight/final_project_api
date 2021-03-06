const db = require('../models');

const allIngredients = async (req, res) => {
  const foundUser = await db.user.findOne({
    where : {id: req.user.id},
    include: [db.ingredient]
  })
  
  if (typeof foundUser.ingredients[0] === "undefined") {
    return res.json({status: 404, message: "this user has no ingredients"})
  }
  return res.json({ ingredients: foundUser.ingredients })
}

const addIngredient = async (req, res) => {
  if (req.body.name !== "" ) {
    const ingredient = await db.ingredient.create({name: req.body.name})
    
    const foundUser = await db.user.findOne({ where: { id: req.user.id } })
  
    foundUser.addIngredient(ingredient)
    .then(relationInfo => {
      res.json({ingredient: ingredient})
    })
    .catch(err => {
      res.json({message: "There was an error", error: err})
    })
  }
}

// needs to be changed to where it's based on ID instead
const removeIngredient = async (req, res) => {
  const foundUser = await db.user.findOne({where: {id: req.user.id}, include: [db.ingredient]})
  const ingredients = foundUser.ingredients
  
  const ingredient = ingredients.filter(el => el.name === req.body.name)
  console.log("ingredient called")
  if (typeof ingredient[0] === "undefined") {
    console.log("no ingredient")
    return res.json({message: "No ingredients of that name"})
  }
  db.ingredient.destroy({where: {id: ingredient[0].id}})
  .then(data => res.json({message: "Success"}))
  .catch(error => {
      res.json({message: "There was an error", error: err})
    })
}

module.exports = {
  addIngredient,
  allIngredients,
  removeIngredient
};