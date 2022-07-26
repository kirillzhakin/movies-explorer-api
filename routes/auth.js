const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, signout, createUser } = require('../controllers/users');

// POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT
authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// POST /signup - создаёт пользователя с переданными в теле email, password и name
authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// POST /signout - удаляем JWT из куков пользователя

authRouter.post('/signout', signout);

module.exports = authRouter;
