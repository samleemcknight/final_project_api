module.exports = (req, res, next) => {
  if (!req.user) {
    res.json({status: 403, message: "you must be logged in to view this page"})
  } else {
    next()
  }
}