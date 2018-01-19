const express = require('express')
const HomeController = require('../api/Home')

const router = express.Router()

router.get('/home', HomeController.home)

module.exports = router
