// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");

//middleware
const isLoggedIn = require('../middleware/isLoggedIn')

//routes
router.get("/ingredients", isLoggedIn, ctrl.ingredientCtrl.allIngredients)
router.post("/add_ingredient", isLoggedIn, ctrl.ingredientCtrl.addIngredient)
router.delete("/ingredients", isLoggedIn, ctrl.ingredientCtrl.removeIngredient)
router.get("/find", isLoggedIn, ctrl.recipesCtrl.find);
router.get("/show/:id", isLoggedIn, ctrl.recipesCtrl.show)
router.post("/", isLoggedIn, ctrl.recipesCtrl.favorite)

// exports
module.exports = router;
