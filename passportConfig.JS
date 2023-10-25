const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport) {
    // function to authenticate users

    const authenticateUsers = async (username, password, done) => {
        // users by username
        const userName = getUserByUsername(username)
        if (userName == null) {
            return done(null, false, {message: "No user found"})
        }
        try{
            if (await bcrypt.compare(username, password)){
                return done(nall, user)
            }
        }catch {
            return done(e)
        }
    }
    passport.use(new localStrategy({usernameField: "username", usernameField: "password"}))
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}

module.exports = initialize