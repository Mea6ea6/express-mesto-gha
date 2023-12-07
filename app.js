const express = require('express');
// const mongoose = require('mongoose');
const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.status(200).send({message:"Ты молодец!"})
})

app.listen(PORT, () => {
  console.log(`app.js listening on port: ${PORT}`)
})

// mongoose.connect(DB_URL)