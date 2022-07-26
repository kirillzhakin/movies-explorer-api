const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const CastError = require('../errors/CastError');

const JWT_TOKEN = 'super-strong-secret';

// POST /signup - создаёт пользователя с переданными в теле email, password и name
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const { _id } = user;
      res.send({ _id, name, email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

// POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_TOKEN, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true }).send({ token, message: 'Авторизация прошла успешно' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// POST /signout - удаляем JWT из куков пользователя
const signout = (_req, res, next) => {
  try {
    res.cookie('jwt', '', {
      maxAge: -1,
      httpOnly: true,
      sameSite: true,
    })
      .send({ message: 'Выход' });
  } catch (err) {
    next(err);
  }
};

// GET /users/me - возвращает информацию о пользователе (email и имя)
const getMe = (req, res, next) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(...user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me - обновляет информацию о пользователе (email и имя)
const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Запрашиваемый пользователь не найден' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  updateUserProfile, getMe, login, signout, createUser,
};
