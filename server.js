const express = require('express')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const routes = require('./api/routes')

const app = express()
const config = require('./build/webpack.base.config.js')
const compiler = webpack(config)
const middleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})

const mongoDB = 'mongodb://127.0.0.1/vuetodo'
mongoose.connect(mongoDB)
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise
// Get the default connection
const db = mongoose.connection

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const indexHTML = (() => {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.use('/dist', express.static(path.resolve(__dirname, './dist')))
app.use('/', routes)

// require('./build/dev-server')(app)

app.get('*', (req, res) => {
  res.write(indexHTML)
  res.end()
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
