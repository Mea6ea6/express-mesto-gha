const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const auth = (req, res, next) => {
  let payload;
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new AuthorizationError('Необходима авторизация');
    }

    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация');
  }
  req.user = payload;

  next();
};

module.exports = auth;
