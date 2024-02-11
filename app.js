/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const app = express();

const { login, createUser } = require('./controllers/users');
const {
  loginValid, createUserValid,
} = require('./middlewares/validation');

const NotFoundError = require('./errors/NotFoundError');

app.use(cors({ credentials: true, origin: ['https://domainigor.students.nomoredomainsmonster.ru', 'http://domainigor.students.nomoredomainsmonster.ru', 'https://api.domainigor.students.nomoredomainsmonster.ru', 'http://api.domainigor.students.nomoredomainsmonster.ru', 'http://localhost:3000'] }));

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(DB_URL);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValid, login);
app.post('/signup', createUserValid, createUser);

app.use(router);
router.use('/', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : error.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`app.js listening on port: ${PORT}`);
});
