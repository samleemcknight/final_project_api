const db = require('../models');
const {Op} = require('sequelize')

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

module.exports = {
  index,
  show,
  deleteRecipe
};