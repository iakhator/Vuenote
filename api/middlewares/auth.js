const jwt = require('jsonwebtoken')

require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET

/**
 * verifyToken verify the user upon login
 * @method verifyToken
 * @param  {string}    req  authorization header
 * @param  {string}    res  token generated
 * @param  {Function}  next move to the next function
 * @return {void}
 */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.json({ message: 'Failed to authenticate token.' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(401).send({
      message: 'Please register or login.'
    })
  }
}

module.exports = { verifyToken }
