const router = require("express").Router()
const User = require("../models/User.model")
const isAuthenticated = require("../middleware/verifyToken")


router.get("/edit-profile", isAuthenticated, (req, res, next) => {

  const { _id } = req.payload

  User
    .findById({ _id })
    .select({ password: 0 })
    .then(userData => res.json(userData))
    .catch(err => next(err))
})

router.get("/profile", isAuthenticated, (req, res, next) => {

  const { _id } = req.payload

  User
    .findById({ _id })
    .then(userData => res.json(userData))
    .catch(err => next(err))


})

router.put("/", isAuthenticated, (req, res, next) => {

  const { firstname, lastname, birth, country, phone, avatar } = req.body
  const { _id } = req.payload

  User
    .findByIdAndUpdate(_id, { firstname, lastname, birth, country, phone, avatar }, { new: true })
    .then(userData => res.json(userData))
    .catch(err => next(err))
})

router.delete("/", isAuthenticated, (req, res, next) => {
  
  const { _id } = req.payload

  User
    .findByIdAndDelete(_id)
    .then(userData => res.json(userData))
    .catch(err => next(err))
})



module.exports = router