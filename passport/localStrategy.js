const db = require('../models/')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		db.user.findOne({ 
      where : { username: username }
    }).then((user) => {
      
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.validPassword(password)) {
        console.log("invalid password")
				return done(null, false, { message: 'Incorrect password' })
			}
      console.log(user)
			return done(null, user)
    }).catch(err => console.log(error))
	}
)

module.exports = strategy