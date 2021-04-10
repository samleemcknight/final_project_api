const db = require('../models/')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  (email, password, cb) => {
    db.user.findOne({
      where: {email}
    }).then((err, user) => {
      if (err) {
        return cb(err)
      }
      if (!user || !user.validPassword(password)) {
        return cb(null, false, { message: 'Incorrect password or username' })
      } else {
        return cb(null, user);
      }
  }).catch(cb)
}
)

module.exports = strategy