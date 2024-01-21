/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
const { celebrate, Joi } = require('celebrate');

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }),
  }),
});

const checkUserIdValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24)
      .messages({
        'string.length': 'Ошибка валидации ID пользователя',
        'string.alphanum': 'Ошибка валидации ID пользователя',
        'any.required': 'Поле является обязвтельным',
      }),
  }),
});

const updateUserInfoValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateUserAvatarValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .uri({ scheme: ['http', 'https'] }),
  }),
});

const checkCardIdValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24)
      .messages({
        'string.length': 'Ошибка валидации ID карточки',
        'string.alphanum': 'Ошибка валидации ID карточки',
        'any.required': 'Поле является обязвтельным',
      }),
  }),
});

const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .uri({ scheme: ['http', 'https'] }),
  }),
});

module.exports = {
  loginValid, createUserValid, checkUserIdValid, updateUserInfoValid, updateUserAvatarValid, checkCardIdValid, createCardValid,
};
