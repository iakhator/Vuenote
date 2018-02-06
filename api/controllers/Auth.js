const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

require('dotenv').config()

const jwtSecret = process.env.JWT_SECRET

const signUp = (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
  }

  const { error, value } = Joi.validate({ name: name, email: email, password: password }, schema)
  if (error) {
    switch (error.details[0].context.key) {
      case 'name':
        if (error.details[0].type === 'any.empty') {
          res.status(400).send({
            error: `${error.details[0].context.key} field is required`
          })
        }
        break
      case 'email':
        if (error.details[0].type === 'string.email') {
          res.status(400).send({
            error: `${error.details[0].context.key} must be valid`
          })
        }
        if (error.details[0].type === 'any.empty') {
          res.status(400).send({
            error: `${error.details[0].context.key} field is required`
          })
        }
        break
      case 'password':
        if (error.details[0].type === 'any.empty') {
          res.status(400).send({
            error: `${error.details[0].context.key} field is required`
          })
        }
        if (error.details[0].type === 'string.regex.base') {
          res.status(400).send({
            error: `${error.details[0].context.key} must be more than 2 characters in length`
          })
        }
        break
      default:
        res.status(400).send(error)
        break
    }
  } else {
    bcrypt.hash(value.password, 10, (err, hash) => {
      if (err) {
        res.json({ 'message': 'An error occured' })
      } else {
        const user = new User({
          name: name,
          email: email,
          password: hash
        })
        user.save((error) => {
          if (error) return res.status(400).json({ error: `${email} is already in use` })
          res.status(200).json({ message: 'You have successfully registered' })
        })
      }
    })
  }
}

const signIn = (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
  const { error } = Joi.validate({ email: email, password: password }, schema)
  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        if (error.details[0].type === 'any.empty') {
          res.status(400).send({
            error: `${error.details[0].context.key} field is required`
          })
        }
        break
      case 'password':
        if (error.details[0].type === 'any.empty') {
          res.status(400).send({
            error: `${error.details[0].context.key} field is required`
          })
        }
        break
      default:
        res.status(400).send(error)
        break
    }
  } else {
    User.find({ email: email }, (error, user) => {
      if (error) {
        return res.status(400).json({ error: 'There was an error trying to get the user' })
      }
      if (user) {
        const userExist = user[0]
        if (userExist) {
          if (bcrypt.compareSync(req.body.password, userExist.password)) {
            const payLoad = (
              {
                email: userExist.email,
                password: userExist.password,
                id: userExist._id
              }
            )
            const token = jwt.sign(payLoad, jwtSecret, {
              expiresIn: 60 * 60 * 24
            })
            res.status(200).json({
              message: 'You have successfully logged in.',
              token
            })
          } else {
            res.status(401).json({
              message: 'Authentication failed, wrong password.'
            })
          }
        } else {
          return res.status(404).json({ message: 'That user does not exist' })
        }
      }
    })
  }
}
module.exports = {
  signUp,
  signIn
}
