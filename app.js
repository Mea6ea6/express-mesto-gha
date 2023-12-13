const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
mongoose.connect(DB_URL);

app.use((req, res, next) => {
  req.user = {
    _id: '6575cef1aebdfd5e895467b0'
  };
  next();
});
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`app.js listening on port: ${PORT}`)
});