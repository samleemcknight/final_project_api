const db = require('./models')

// hooks only work on models, so must find a user like this in order to have pashword hashed
db.user.findOne({ 
  where: {id: 1}
}).then(res => {
  res.update({password: "P0orone5"}).then(res => {
    console.log(res)
    res.save()
  })
})

// db.user.update(
//   {password: "hellotheremyfriend"},
//   {where: {id: 1}},
//   {individualHooks: true}
// ).then(function(rowsUpdated) {
//    console.log("rows updated: ", rowsUpdated)
//  }).catch(err => {
//    console.log(err)
//  })
