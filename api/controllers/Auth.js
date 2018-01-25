const bcrypt = require('bcrypt')
const Joi = require('joi')
const User = require('../models/User')

const signUp = (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
  }

  const { error, value } = Joi.validate({ email: email, password: password }, schema)
  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        if (error.details[0].type === 'string.email') {
          res.status(400).send({
            error: `${error.details[0].context.key.toUpperCase()} must be valid`
          })
        }
        if (error.details[0].type === 'any.empty') {
          res.status(400).send({
            error: `${error.details[0].context.key.toUpperCase()} field is required`
          })
        }
        break
      case 'password':
        if (error.details[0].type === 'any.empty') {
          res.status(400).send({
            error: `${error.details[0].context.key.toUpperCase()} field is required`
          })
        }
        if (error.details[0].type === 'string.regex.base') {
          res.status(400).send({
            error: `${error.details[0].context.key.toUpperCase()} must be more than 2 characters in length`
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

module.exports = {
  signUp
}
