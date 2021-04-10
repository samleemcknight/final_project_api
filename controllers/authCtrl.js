const db = require('../models')
const passport = require('../passport/ppConfig')

const getUser = async (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
    res.json({ user: req.user })
  } else {
    res.json({ user: null })
  }
}

const register = async (req, res) => {
  console.log(req.session)
  try {
    // create an instance of user model with req.body object
    const [user, created] = await db.user.findOrCreate({
        where: { email: req.body.email}, 
        defaults: 
          {
            username: req.body.username,
            password: req.body.password
          }
    })
    
    if (created) {
      console.log('user created');
      passport.authenticate('local')(req, res);
      return res.status(201).json({ status: 201, message: "success", user });
      } else {
        return res.json({status: 500, message: 'email already exists'})
      }

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
}

const logout = (req, res) => {
  req.logout();
  res.json({ status: 201, message: "successfully logged out" })
}

module.exports = {
  logout,
  register,
  getUser
};