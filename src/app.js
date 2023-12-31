const path = require('path')
const express = require('express')
const app = express()
const config = require('../config.json')
const port = config.port

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('home', {})
})

app.get('*', (req, res) => {
  res.redirect('/')
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke :( [500 Internal Server Error]')
})

app.listen(port, () => {
  if (config.is_production) {
    console.log(`Listening on port ${port}`)
  } else {
    console.log(`http://localhost:${port}`)
  }
})