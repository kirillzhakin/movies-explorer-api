const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { regEmail } = require('../utils/reg');

const ReqAuthError = require('../errors/ReqAuthError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Вы не указали почтовый адрес'],
    validate: {
      validator(v) {
        return regEmail.test(v);
      },
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Вы не указали пароль'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Вы не указали имя пользователя'],
    minlength: [2, 'Длина имени пользователя меньше 2-х символов'],
    maxlength: [30, 'Длина имени пользователя более 30-и символов'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function userFunction(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ReqAuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ReqAuthError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
