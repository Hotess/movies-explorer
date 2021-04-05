const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { validateUser, validateLogin } = require('../middlewares/requestValidation');
const { createUser, login } = require('../controllers/users');
const { currentError } = require('../utils/errors');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth, users);
router.use(auth, movies);

router.use((req, res, next) => {
  next(currentError({ name: 'DocumentNotFoundError' }));
});

module.exports = router;
