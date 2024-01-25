/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');

const { login, createUser } = require('./controllers/users');
const {
  loginValid, createUserValid,
} = require('./middlewares/validation');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
mongoose.connect(DB_URL);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.post('/signin', loginValid, login);
app.post('/signup', createUserValid, createUser);

app.use(router);
router.use('/', (req, res, next) => next(new NotFoundError('Страница не найдена')));

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
