// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");

//middleware
const isLoggedIn = require('../middleware/isLoggedIn')

//routes
router.get("/", isLoggedIn, ctrl.cookbookCtrl.index);
router.get("/show/:id", isLoggedIn, ctrl.cookbookCtrl.show);
router.delete("/delete/:id", isLoggedIn, ctrl.cookbookCtrl.deleteRecipe)
router.put("/edit", isLoggedIn, ctrl.cookbookCtrl.editRecipe)

// exports
module.exports = router;