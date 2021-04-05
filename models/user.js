'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.recipe)
      models.user.belongsToMany(models.ingredient, {through: "usersIngredients"})
    }

    validPassword(plainTextPassword) {
      return bcrypt.compareSync(plainTextPassword, this.password) 
    }

    toJSON() {
      let userData = this.get()
      delete userData.password
      return userData
    }

  };
  user.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 90],
          msg: "Password must be between 8 and 50 characters"
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'user',
  });

  // Hooks
  
  user.beforeCreate((pendingUser, options) => {
    if (pendingUser && pendingUser.password) {
      // hash password with bcrypt
      let hash = bcrypt.hashSync(pendingUser.password, 12)
      // store the hashed password in the db
      pendingUser.password = hash
    }
  })

  user.beforeUpdate((pendingUser, options) => {
    if (pendingUser.password) {
      // hash password with bcrypt
      let hash = bcrypt.hashSync(pendingUser.password, 12)
      // store the hashed password in the db
      pendingUser.password = hash
      console.log("user password hashed")
    }
  })

  return user;
};