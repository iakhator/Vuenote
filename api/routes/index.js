const express = require('express')
const auth = require('../middlewares/auth')
const Home = require('../controllers/Home')
const Auth = require('../controllers/Auth')
const Notes = require('../controllers/Notes')

const router = express.Router()

router.get('/home', Home.home)
router.post('/signup', Auth.signUp)
router.post('/signin', Auth.signIn)
router.post('/note', auth.verifyToken, Notes.createNote)
router.get('/notes', auth.verifyToken, Notes.getNotes)

module.exports = router
