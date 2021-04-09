// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");

//routes
router.get("/", ctrl.cookbookCtrl.index);
router.get("/:id", ctrl.cookbookCtrl.show);
router.post("/delete/:id", ctrl.cookbookCtrl.deleteRecipe )

// exports
module.exports = router;