const users = require('express').Router();
const { validateUserUpdate } = require('../middlewares/requestValidation');
const {
  updateUser,
  checkToken,
} = require('../controllers/users');

users.get('/users/me', checkToken);
users.patch('/users/me', validateUserUpdate, updateUser);

module.exports = users;
