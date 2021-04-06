// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");

//routes
router.get("/", ctrl.recipesCtrl.index);
router.post("/add_ingredient", ctrl.recipesCtrl.addIngredient)
router.get("/:ingredients", ctrl.recipesCtrl.find);
router.get("/show/:id", ctrl.recipesCtrl.show)
router.post("/", ctrl.recipesCtrl.favorite)

// exports
module.exports = router;
