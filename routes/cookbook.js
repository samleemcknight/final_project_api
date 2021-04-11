// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");

//routes
router.get("/", ctrl.cookbookCtrl.index);
router.get("/show/:id", ctrl.cookbookCtrl.show);
router.delete("/delete/:id", ctrl.cookbookCtrl.deleteRecipe)
router.put("/edit", ctrl.cookbookCtrl.editRecipe)

// exports
module.exports = router;