const loginLocal = require('./loginLocal.js');
const registerLocal = require('./registerLocal.js');

const setupPassport = (passport) => {
  passport.serializeUser((userSession, done) => {
    const localSession = userSession;
    delete localSession.password;
    done(null, localSession);
  });

  passport.deserializeUser((userSession, done) => {
    done(null, userSession);
  });

  passport.use('login-local', loginLocal);
  passport.use('register-local', registerLocal);
};

module.exports = setupPassport;
