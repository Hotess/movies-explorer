const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Введён некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Введён некорректный URL',
    },
  },
  movieId: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Введён некорректный URL',
    },
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
