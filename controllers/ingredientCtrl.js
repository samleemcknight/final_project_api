const db = require('../models');

const allIngredients = async (req, res) => {
  const foundUser = await db.user.findOne({
    where : {id: 1},
    include: [db.ingredient]
  })
  return res.json({ ingredients: foundUser.ingredients })
}

const addIngredient = async (req, res) => {
  if (req.body.name !== "" ) {
    const [ingredient, created] = await db.ingredient.findOrCreate({
      where: { name: req.body.name }
    })
    
    const foundUser = await db.user.findOne({ where: { id: 1 } })
    //in case no user is found
    if (!foundUser) {
     return res.json({ message: "No user found"})
    }
  
    foundUser.addIngredient(ingredient)
    .then(relationInfo => {
      res.json({ingredient: ingredient})
    })
    .catch(err => {
      res.json({message: "There was an error", error: err})
    })
  }
}

const removeIngredient = (req, res) => {
  db.ingredient.destroy({where: {name: req.body.name}})
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