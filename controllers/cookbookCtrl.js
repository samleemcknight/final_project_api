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

module.exports = {
  index,
  show
};