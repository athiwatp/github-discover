const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()
const axios = require('axios')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'

// Body parser, to access req.body
app.use(bodyParser.json())

const oneWeek = 3600000 * 24 * 7

// Sessions to create req.session
app.use(session({
  secret: 'loremipsum',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + oneWeek),
    maxAge: oneWeek
  }
}))

// POST /api/login to log in the user and add him to the req.session.authUser
app.post('/api/login', function (req, res) {
  if (req.body.username) {
    axios.get('https://api.github.com/users/' + req.body.username).then(function (response) {
      if (response.data && typeof response.data.login !== 'undefined') {
        req.session.authUser = response.data
        return res.status(201).json(response.data)
      } else {
        return res.status(404).json({
          status: 404,
          message: 'Username not found'
        })
      }
    }).catch((e) => {
      return res.status(404).json({
        status: 404,
        message: 'Username not found'
      })
    })
  } else {
    return res.status(401).json({ message: 'Bad credentials' })
  }
})

// POST /api/logout to log out the user and remove it from the req.session
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})

// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

app.use(nuxt.render)

if (nuxt.options.dev) {
  new Builder(nuxt).build()
}

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
