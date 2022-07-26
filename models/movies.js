const mongoose = require('mongoose');
const { regRU, regEN, regUrl } = require('../utils/reg');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Вы не указали страну создания фильма'],
  },
  director: {
    type: String,
    required: [true, 'Вы не указали режиссера фильма'],
  },
  duration: {
    type: Number,
    required: [true, 'Вы не указали длительность фильма'],
  },
  year: {
    type: Number,
    required: [true, 'Вы не указали год выпуска фильма'],
  },
  description: {
    type: String,
    required: [true, 'Вы не указали описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Вы не указали ссылку на постер к фильму'],
    validate: {
      validator(v) {
        return regUrl.test(v);
      },
      message: 'Некорректный адрес ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Вы не указали ссылку на трейлер фильма'],
    validate: {
      validator(v) {
        return regUrl.test(v);
      },
      message: 'Некорректный адрес ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Вы не указали миниатюрное изображение постера к фильму'],
    validate: {
      validator(v) {
        return regUrl.test(v);
      },
      message: 'Некорректный адрес ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: [true, 'Вы не указали название фильма'],
    validate: {
      validator(v) {
        return regRU.test(v);
      },
      message: 'Название фильма должно быть на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: [true, 'Вы не указали название фильма'],
    validate: {
      validator(v) {
        return regEN.test(v);
      },
      message: 'Название фильма должно быть на английском языке',
    },
  },
}, { versionKey: false });

const movieModel = mongoose.model('card', movieSchema);
module.exports = movieModel;
