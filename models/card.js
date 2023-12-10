const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Минимальная длинна 2 символа"],
    maxlength: [30, "Максимальная длинна 30 символа"],
    required: {
      value: true,
      message: "Поле является обязательным"
    }
  },
  link: {
    type: String,
    required: {
      value: true,
      message: "Поле является обязательным"
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: {
      value: true,
      message: "Поле является обязательным"
    }
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  createdAt: {
    type: Date
  },
});

module.exports = mongoose.model('card', cardSchema);