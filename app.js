const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes');

const { login, createUser } = require('./controllers/users');
const {
  loginValid, createUserValid,
} = require('./middlewares/validation');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
mongoose.connect(DB_URL);

app.use(express.json());
app.use(helmet());
app.use(router);

app.post('/signin', loginValid, login);
app.post('/signup', createUserValid, createUser);

router.use((req, res) => res.status(404).send({ message: 'Страница не найдена' }));

app.listen(PORT, () => {
  console.log(`app.js listening on port: ${PORT}`);
});
