const Movie = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const CastError = require('../errors/CastError');

// GET /movies - возвращает все сохранённые текущим  пользователем фильмы
const moviesController = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// POST /movies - создаёт фильм с переданными в теле country,
// director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, nameRU, nameEN, movieId,
  } = req.body;
  const { _id } = req.user;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: _id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

// DELETE /movies/_id - удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  console.log(req.params);
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) next(new NotFoundError('Видео не существует'));
      if (req.user._id === movie.owner.toString()) {
        return movie.remove().then(() => res.send({ message: movie }));
      }
      return next(new ForbiddenError('Попытка удалить чужое видео'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
module.exports = { moviesController, createMovie, deleteMovie };
