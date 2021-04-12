const db = require('../models/')
const LocalStrategy = require('passport-local').Strategy


const strategy = new LocalStrategy(
	{
		usernameField: 'username' 
	},
	function(username, password, done) {
		db.user.findOne({ 
      where : { username: username }
    }).then((user) => {
			if (!user || !user.validPassword(password)) {
        console.log("invalid password or username")
				return done(null, false, { message: 'Incorrect password' })
			} else {
				console.log("new user registered")
				return done(null, user)

			}
    }).catch(err => console.log(err))
	}
)

module.exports = strategy