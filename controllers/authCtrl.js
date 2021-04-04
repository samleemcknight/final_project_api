const db = require('../models')

// create async function for db calls
const register = async (req, res) => {
  
  try {
    // call db to see if user exists, based on user email
    const foundUser = await db.user.findOne({ where:
      {email: req.body.email }
    })

    // if the user exists, return this message
    if (foundUser) {
      return res.status(400).json({
        status: 400,
        message: "A user with this email aready exists. Please try again with a different email or login",
      });
    }

    // create an instance of user model with req.body object
    const createUser = await db.user.create(req.body)

    // return success response with newly created user object
    return res
      .status(201)
      .json({ status: 201, message: "success", createUser });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
}

const login = (req, res) => {
  res.sendStatus(201)
}

module.exports = {
  login,
  register,
};