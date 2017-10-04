const LocalStrategy = require('passport-local').Strategy;
const userModel= require('../../../app/models/user.js');

const config = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const passportCallback = (req, email, passport, done) => {
  const findUser = () => findUserByEmail(email);
  const localAddNewUser = () => addUser(req.body.userData);
  const sucess = (user) => done(null, user);
  const failure = (err) => {
    console.log(err);
    done(err);
  };

  Promise.resolve()
    .then(findUser)
    .then(localAddNewUser)
    .then(sucess)
    .catch(failure);
};

module.exports = new LocalStrategy(config, passportCallback);
