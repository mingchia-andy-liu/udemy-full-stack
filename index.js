const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI, {
    useMongoClient: true
})

const app = express()

//middleware
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())

// api enpoints
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

// serving production assets
if (process.env.NODE_ENV === 'production') {
    // express will serve up production assets
    // eg. main.js or main.css
    // if express doesn't regonize the route, try to see if the file is in the path
    app.use(express.static('client/build'))

    // serve index.html iff any other fail to serve anything
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)