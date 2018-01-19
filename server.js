const express = require('express')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const routes = require('./server/routes')

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
