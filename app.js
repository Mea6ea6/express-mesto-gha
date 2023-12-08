const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
mongoose.connect(DB_URL);

app.get('/', (req, res) => {
  res.status(200).send({message:"Ты молодец!"})
});

app.use(router);
app.listen(PORT, () => {
  console.log(`app.js listening on port: ${PORT}`)
});