const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.cookie;
    if (!token) {
      throw new AuthorizationError('Необходима авторизация');
    }

    const validToken = token.replace('token=', '');

    payload = jwt.verify(validToken, 'super-strong-secret');
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация');
  }
  req.user = payload;

  next();
};

module.exports = auth;
