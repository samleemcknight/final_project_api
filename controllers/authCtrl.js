const db = require('../models')
const passport = require('../passport/ppConfig')
const {Op} = require('sequelize');

const getUser = async (req, res, next) => {
  if (req.user) {
    res.json({ status: 200, message: "success", user: req.user })
  } else {
    res.json({ user: null })
  }
}

const register = async (req, res, next) => {
  
  try {
    // create an instance of user model with req.body object
    const user = await db.user.findOne({
      where: {
        [Op.or]: [
          {email: req.body.email},
          {username: req.body.username}
        ]
      }
    })
    
    if (user) {
      return res.json({status: 500, message: "that username or email is already registered"})
    } 

    const newUser = await db.user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    // const [user, created] = await db.user.findOrCreate({
    //     where: { 
    //       [Op.or]: [
    //         {email: req.body.email},
    //         {username: req.body.username}
    //       ]
    //     }, 
    //     defaults: 
    //       {
    //         username: req.body.username,
    //         password: req.body.password
    //       }
    // })
    
    // take out for now until I figure out where the callback is going wrong
    if (newUser) {
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