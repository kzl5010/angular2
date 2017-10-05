const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../app/models/user.js');
const bcrypt = require('bcrypt-nodejs');


const config = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const passportCallback = (req, email, passport, done) => {
  const findUser = () => User.findOne({ email }, (err, user) => {
    if (err || user) {
      throw (err);
    }
    return null;
  });
  const localAddNewUser = () => {
    const user = new User();
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    user.save((err) => {
      if (err) {
        done(err);
      }
    });
    return user;
  };
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
