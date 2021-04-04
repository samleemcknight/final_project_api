// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");

//routes
router.post('/register', ctrl.authCtrl.register)

// exports
module.exports = router;