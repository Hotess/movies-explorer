const jwt = require('jsonwebtoken');
const { currentError } = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    currentError({ name: 'UnauthorizedError' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    currentError({ name: 'UnauthorizedError' });
  }

  req.user = payload;

  next();
};
