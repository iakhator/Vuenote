const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

const indexHTML = (() => {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

app.use('/dist', express.static(path.resolve(__dirname, './dist')))

require('./build/dev-server')(app)

app.get('/help', (req, res) => {
  res.send('how are you')
})

app.get('*', (req, res) => {
  res.write(indexHTML)
  res.end()
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`serverr started at http://localhost:${port}`)
});
