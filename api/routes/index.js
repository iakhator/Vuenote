const express = require('express')
const Home = require('../controllers/Home')
const Auth = require('../controllers/Auth')

const router = express.Router()

router.get('/home', Home.home)
router.post('/signup', Auth.signUp)
router.post('/signin', Auth.signIn)

module.exports = router
