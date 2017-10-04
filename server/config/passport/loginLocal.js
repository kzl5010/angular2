const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const config = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const userPassportCallback = (req, email, password, done) => {
  // const findUser = () => findUserbyEmail mongoose
  // const authenticate = (user) => {
  //   if (bcrypt.compareSync(password, user.password)) {
  //     return user;
  //   }
  //   throw new Error('Incorrect password');
  // }
  // const success = (user) => done(null, user);
  // const failure = (err) => {
  //   console.log(err);
  //   done(err);
  // };
  // Promise.resolve()
  //   .then(findUser)
  //   .then(authenticate)
  //   .then(success)
  //   .catch(failure);
};

module.exports = new LocalStrategy(config, userPassportCallback);
