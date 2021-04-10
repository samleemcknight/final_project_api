const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const db = require('../models')

passport.serializeUser((user, cb) => {
  cb(null, {id: user.id})
})

passport.deserializeUser((id, cb) => {
  db.user.findByPk(id)
  .then(user => {
    cb(null, user)
    }).catch(cb)
  })

passport.use(LocalStrategy)

module.exports = passport