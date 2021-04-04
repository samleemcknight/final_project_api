// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");

//routes
router.get("/", ctrl.recipesCtrl.index);
router.get("/:ingredients", ctrl.recipesCtrl.find);
router.get("/show/:id", ctrl.recipesCtrl.show)

// exports
module.exports = router;
