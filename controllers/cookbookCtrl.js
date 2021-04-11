const db = require('../models');
const {Op} = require('sequelize');
const { success } = require('../passport/localStrategy');

// for showing recipes in cookbook
const index = async (req, res) => {
  try {
    const foundUser = await db.user.findOne({
      where : {id: req.user.id},
      include: [db.recipe]
    })
    res.json({ status: 201, message: "success", recipes: foundUser.recipes })
  } catch (error) {
    return res.json({ status: 401, message: "error", error })
  }
};

const show = async (req, res) => {
  try {
    const foundRecipe = await db.recipe.findOne({
      where: {
        [Op.or]: [
          {id: req.params.id},
          {title: req.query.title}
        ]
      }
    })
    if (foundRecipe) {
      res.json({ status: 201, message: "success", recipe: foundRecipe })
    } else { res.json({ status: 400, message: "no recipes found"})}
  }
  catch (error) {
    return res.json({ status: 401, message: "error", error })
  }
}

const deleteRecipe = async (req, res) => {
  try {
    db.recipe.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({ status: 201, message: "success" })
  }
  catch (error) {
    return res.json({ status: 401, message: "error", error })
  }
}

const editRecipe = async (req, res) => {
  try {
    const recipe = await db.recipe.findOne({where: {id: req.body.id}})
    
    const updateRecipe = await recipe.update({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      image_url: req.body.imageUrl
    })
    
    return res.json( {message: "success", updateRecipe} )
    
  } catch (error) {
    return res.json({ status: 401, message: "error editing recipe", error })
  }
}

module.exports = {
  index,
  show,
  deleteRecipe,
  editRecipe
};