const db = require('./models')

// db.user.create({
//   first_name: "Sam",
//   last_name: "McKnight",
//   username: "sammcknight",
//   email: "sam@sam.com",
//   password: "P0orone5",
// }).then(res => {
//   console.log("success")
// }).catch(err => console.log("error, ", err))

// hooks only work on models, so must find a user like this in order to have pashword hashed
// db.user.findOne({ 
//   where: {id: 1}
// }).then(res => {
//   res.update({password: "P0orone5"}).then(res => {
//     console.log(res)
//     res.save()
//   })
// })

// db.user.update(
//   {password: "hellotheremyfriend"},
//   {where: {id: 1}},
//   {individualHooks: true}
// ).then(function(rowsUpdated) {
//    console.log("rows updated: ", rowsUpdated)
//  }).catch(err => {
//    console.log(err)
//  })

// db.user.findOne({ 
//   where: {id: 1}
// }).then(user => {
//   user.createRecipe({
//     title: "Roast Lamb",
//     ingredients: "1 leg of lamb, rosemary, olive oil, onions, garlic"
//   }).then(res => {
//     console.log(res)
//   })
// })

// db.recipe.destroy({where: {title: "Delicious Lorem Ipsum"}})
//   .then(res => {
//   console.log(res)
// }).catch(err => console.log(err))

// db.ingredient.findOrCreate({where :{name: "orange"}})
// .then(([ingredient, created]) => {
//   db.user.findOne({where: {id: 1}})
//   .then(user => {
//     user.addIngredient(ingredient)
//   }).then(res => {
//     console.log(res)
//   }).catch(err => {
//     console.log(err)
//   })
// })

// db.ingredient.update(
//   {name: "Chicken"},
//   {where: {id: 6}}
// ).then(response => {
//   console.log(response)
// }).catch(err => err)

const removeIngredient = async (req, res) => {
  // since users may input the same ingredients, make sure that they only delete the ingredients
  // associated with them
  const foundUser = await db.user.findOne({where: {id: req.user.id}, include: [db.ingredient]})
  const ingredients = foundUser.ingredients
  
  const ingredient = ingredients.filter(el => el.name === req.body.name)

  db.ingredient.destroy({where: {id: ingredient[0].id}})
  .then(data => res.json({message: "Success"}))
  .catch(error => {
      res.json({message: "There was an error", error: err})
    })
}

removeIngredient({user: {id: 2}, body: {name: "Lemon"}}, null)