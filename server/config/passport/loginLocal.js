const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const User = require('../../../app/models/user.js');

const config = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const userPassportCallback = (req, email, password, done) => {
  const findUser = () => User.findOne({ email }, (err, user) => {
    if (err) {
      throw (err);
    }
    return user;
  });
  const authenticate = (user) => {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new Error('Incorrect password');
  };
  const success = user => done(null, user);
  const failure = (err) => {
    console.log(err);
    done(err);
  };
  Promise.resolve()
    .then(findUser)
    .then(authenticate)
    .then(success)
    .catch(failure);
};

module.exports = new LocalStrategy(config, userPassportCallback);
