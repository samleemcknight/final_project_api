// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");

//routes
router.get("/", ctrl.cookbookCtrl.index);
router.get("/:id", ctrl.cookbookCtrl.show);

// exports
module.exports = router;