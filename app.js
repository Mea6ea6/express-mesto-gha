const express = require('express');
const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.status(200).send({message:"All In!"})
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

// mongoose.connect('mongodb://localhost:27017/mestodb', {
// });