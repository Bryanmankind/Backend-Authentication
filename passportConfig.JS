const collection = require('./modules/Usershema');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await collection.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: 'No user found' });
      }

      // Check the password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      console.error(e);
      return done(e);
    }
  };

  passport.use(new localStrategy({ usernameField: 'username' }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await collection.findOne({ _id: id });
      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
}

module.exports = initialize;
