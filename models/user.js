const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Минимальная длинна 2 символа"],
    maxlength: [30, "Максимальная длинна 30 символа"],
    required: {
      value: true,
      message: "Поле является обязательным"
    }
  },
  about: {
    type: String,
    minlength: [2, "Минимальная длинна 2 символа"],
    maxlength: [30, "Максимальная длинна 30 символа"],
    required: {
      value: true,
      message: "Поле является обязательным"
    }
  },
  avatar: {
    type: String,
    required: {
      value: true,
      message: "Поле является обязательным"
    }
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('user', userSchema);