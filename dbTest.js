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

db.recipe.destroy({where: {title: "Delicious Lorem Ipsum"}})
  .then(res => {
  console.log(res)
}).catch(err => console.log(err))