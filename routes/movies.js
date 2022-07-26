const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regRU, regEN, regUrl } = require('../utils/reg');

const { moviesController, createMovie, deleteMovie } = require('../controllers/movies');

// GET /movies - возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/', moviesController);

// POST /movies - создаёт фильм с переданными в теле country,
// director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regUrl),
    trailerLink: Joi.string().required().pattern(regUrl),
    thumbnail: Joi.string().required().pattern(regUrl),
    nameRU: Joi.string().required().pattern(regRU),
    nameEN: Joi.string().required().pattern(regEN),
  }),
}), createMovie);

// DELETE /movies/_id - удаляет сохранённый фильм по id
movieRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = movieRouter;
