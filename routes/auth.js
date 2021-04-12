// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");
const passport = require('../passport/ppConfig')
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')

//routes
router.get('/user', ctrl.authCtrl.getUser)
router.get('/logout', ctrl.authCtrl.logout)


router.post('/register', ctrl.authCtrl.register)

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