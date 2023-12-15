const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длинна 2 символа'],
    maxlength: [30, 'Максимальная длинна 30 символа'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длинна 2 символа'],
    maxlength: [30, 'Максимальная длинна 30 символа'],
    required: [true, 'Поле "about" должно быть заполнено'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле "avatar" должно быть заполнено'],
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('user', userSchema);
