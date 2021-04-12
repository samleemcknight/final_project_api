// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");
const passport = require('../passport/ppConfig')
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

//routes
router.post('/register', ctrl.authCtrl.register)
router.get('/user', isLoggedIn, ctrl.authCtrl.getUser)
router.get('/logout', ctrl.authCtrl.logout)

router.post('/login', passport.authenticate('local'),
    (req, res, next) => {
        const userInfo = {
            username: req.user.username
        };
        res.send(userInfo)
    }
)

// exports
module.exports = router;