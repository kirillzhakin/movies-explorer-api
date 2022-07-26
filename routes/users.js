const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { updateUserProfile, getMe } = require('../controllers/users');

// GET /users/me - возвращает информацию о пользователе (email и имя)
userRouter.get('/me', getMe);

// PATCH /users/me - обновляет информацию о пользователе (email и имя)
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserProfile);

module.exports = userRouter;
