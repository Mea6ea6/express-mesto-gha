/* eslint-disable consistent-return */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');

const NotFoundError = require('./errors/NotFoundError');

const { login, createUser } = require('./controllers/users');
const {
  loginValid, createUserValid,
} = require('./middlewares/validation');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
mongoose.connect(DB_URL);

app.use(express.json());
app.use(errors());
app.use(helmet());

app.post('/signin', loginValid, login);
app.post('/signup', createUserValid, createUser);

app.use(router);
router.use('/', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use((err, req, res, next) => {
  if (err.isJoi || (err.details && err.details.get('body'))) {
    const validationError = err.details.get('body');
    return res.status(400).json({ message: 'Ошибка', error: validationError.message });
  }
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`app.js listening on port: ${PORT}`);
});
