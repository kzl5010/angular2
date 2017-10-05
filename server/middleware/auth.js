const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send(new Error('User is not authenticated'));
};

const noAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.status(400).send(new Error('User is already authenticated'));
};

module.exports = {
  auth,
  noAuth,
};
