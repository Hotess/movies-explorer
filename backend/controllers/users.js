const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { currentError } = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.checkToken = (req, res, next) => {
  User.findById(req.user._id)
    .orFail((err) => currentError(err))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        currentError({ name: 'Conflict' });
      } else next(err);
    })

    .then((user) => res.status(201).send({
      name: user.name, email: user.email,
    }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    })
    .orFail((err) => currentError(err, res))
    .catch((err) => {
      currentError(err, res);
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch(next);
};
