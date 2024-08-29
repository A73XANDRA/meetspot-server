const router = require('express').Router()
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const isAuthenticated = require('../middleware/verifyToken')

const saltRounds = 10

router.post('/signup', (req, res, next) => {

  const {
    firstname,
    lastname,
    nick,
    email,
    password,
    birth,
    country,
    phone,
    avatar
  } = req.body

  if (email === '' || password === '' || nick === '') {
    res.status(400).json({ message: 'Provide email, password and nick.' })
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' })
    return
  }

  if (password.length < 2) {
    res.status(400).json({ message: 'Password must have at least 3 characters' })
    return
  }

  User
    .findOne({ email })
    .then(foundUser => {

      if (foundUser) {
        res.status(400).json({ message: 'The user already exists.' })
      }

      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)

      User
        .create({
          firstname,
          lastname,
          nick,
          email,
          password: hashedPassword,
          birth,
          country,
          phone,
          avatar
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.post('/login', (req, res, next) => {

  const { email, password } = req.body

  if (email === '' || password === '') {
    res.status(400).json({ message: 'Provide email and password.' });
    return
  }

  User
    .findOne({ email })
    .then((foundUser) => {

      if (!foundUser) {
        res.status(401).json({ message: 'User not found.' })
        return
      }
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password)

      if (!passwordCorrect) {
        res.status(401).json({ message: 'Incorrect password' })
        return
      }

      const { _id, email, nick, avatar } = foundUser
      const payload = { _id, email, nick, avatar }

      const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: '6h' }
      )

      res.json({ authToken })
    })
    .catch(err => next(err))
})

router.get('/verify', isAuthenticated, (req, res, next) => {
  res.json(req.payload)
})


module.exports = router