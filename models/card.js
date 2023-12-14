const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длинна 2 символа'],
    maxlength: [30, 'Максимальная длинна 30 символа'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);