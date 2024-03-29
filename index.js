require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { DATA_MOVIES_PRODUCTION, PORT } = require('./utils/data');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');

const cors = require('./middlewares/cors');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);

mongoose.connect(DATA_MOVIES_PRODUCTION).then(() => {
  console.log('Подключен к базе данных');
});

app.use(requestLogger);

app.use('/', authRouter);
app.use(auth);

app.use(userRouter);
app.use(movieRouter);

app.use('*', (_req, _res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler, () => {
  console.log('Ошибка');
});

app.listen(PORT, () => {
  console.log(`Порт ${PORT}`);
});
