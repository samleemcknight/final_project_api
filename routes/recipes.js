// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");

//routes
router.get("/ingredients", ctrl.ingredientCtrl.allIngredients)
router.post("/add_ingredient", ctrl.ingredientCtrl.addIngredient)
router.delete("/ingredients", ctrl.ingredientCtrl.removeIngredient)
router.get("/find", ctrl.recipesCtrl.find);
router.get("/show/:id", ctrl.recipesCtrl.show)
router.post("/", ctrl.recipesCtrl.favorite)

// exports
module.exports = router;
