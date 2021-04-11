// import express router and controllers
const router = require("express").Router();
const ctrl = require("../controllers");
const passport = require('../passport/ppConfig')
const db = require('../models')

//routes
router.post('/register', ctrl.authCtrl.register)
router.get('/user', ctrl.authCtrl.getUser)
router.get('/logout', ctrl.authCtrl.logout)

router.post('/login', passport.authenticate('local'),
    (req, res) => {
        const userInfo = {
            username: req.user.username
        };
        res.send(userInfo)
    }
)

// exports
module.exports = router;