const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regUrl } = require('../utils/reg');

const { moviesController, createMovie, deleteMovie } = require('../controllers/movies');

// GET /movies - возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/movies', moviesController);

// POST /movies - создаёт фильм с переданными в теле country,
// director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
movieRouter.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regUrl),
    trailerLink: Joi.string().required().pattern(regUrl),
    thumbnail: Joi.string().required().pattern(regUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

// DELETE /movies/_id - удаляет сохранённый фильм по id
movieRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
}), deleteMovie);

module.exports = movieRouter;
