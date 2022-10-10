const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const AccessError = require('../errors/access-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const id = req.user._id;
  Movie.create({ ...req.body, owner: id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Невалидные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Нет фильма с таким id');
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new AccessError('Нет прав для удаления фильма');
      }

      return Movie.findByIdAndRemove(id)
        .then(() => {
          if (!movie) {
            throw new NotFoundError('Нет фильма с таким id');
          }
          res.send(movie);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидные данные'));
        return;
      }
      next(err);
    });
};
