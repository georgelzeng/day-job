const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const User = require('../config/models/user.model')
const validPassword = require('../lib/passwordUtils').validPassword


const VerifyCallback = (username, password, done) => {
    console.log('verifycallback')
    User.findOne({username: username})
        .then((user) => {
            if (!user) {return done(null, false)}
            const isValid = validPassword(password, user.hash, user.salt)
            console.log(password)
            console.log(user.hash)
            console.log(user.salt)
            console.log(isValid)

            if (isValid) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch((err) => {
            console.log('error')
            done(err);
        })

}


const Strategy = new LocalStrategy(VerifyCallback);
passport.use(Strategy)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user)=> {
            done(null, user)
        })
        .catch(err => done(err))

})