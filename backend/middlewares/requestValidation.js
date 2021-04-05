const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Некорректный URL');
  }

  return value;
};

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(300),
    director: Joi.string().required().min(2).max(300),
    duration: Joi.number().required().min(2),
    year: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    image: Joi.string().custom(urlValidation).required(),
    trailer: Joi.string().custom(urlValidation).required(),
    thumbnail: Joi.string().custom(urlValidation).required(),
    nameRU: Joi.string().required().min(2).max(300),
    nameEN: Joi.string().required().min(2).max(300),
    movieId: Joi.number().required(),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validateMovie,
  validateId,
  validateUserUpdate,
  validateLogin,
  validateUser,
};
