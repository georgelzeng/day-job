const express = require('express');
const mongoose = require('mongoose');
const connect = require('./mongoose').connect
const passport = require('passport')
const session = require('express-session')
var crypto = require('crypto')
const routes = require('../routes/routes')


const MongoStore = require('connect-mongo')(session)

require('dotenv').config();

app = express()
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connect()

const port = process.env.PORT || 5000;

const connection = mongoose.connection;

// Session Setup
const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

// Passport
require('../config/passport');
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use(routes)

//server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})