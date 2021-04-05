const Movie = require('../models/movie');
const { currentError } = require('../utils/errors');

module.exports.getMovies = (req, res) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate('user')
    .then((movies) => res.send(movies))
    .catch(() => currentError());
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        currentError({ name: 'Conflict' });
      } else next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findOne({ movieId })
    .orFail()
    .catch(() => {
      currentError({ name: 'DocumentNotFoundError' });
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        currentError({ name: 'ForbiddenError' });
      }
      Movie.findByIdAndDelete(movie._id)
        .then((movieData) => {
          res.send(movieData);
        })
        .catch(next);
    })
    .catch(next);
};
