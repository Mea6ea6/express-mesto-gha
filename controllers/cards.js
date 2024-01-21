/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const UserRightsError = require('../errors/UserRightsError');

const getCards = async (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => next(new InternalServerError('Ошибка со стороны сервера')));
};

const createCard = async (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ message: 'Успешно создана новая карточка', data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (userId !== card.owner.toString()) {
        next(new UserRightsError('Невозможно удалить карточку.'));
      }
      return res.status(200).send({ message: `Карточка с ID: ${card._id} была успешно удалена` });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при удалении карточки'));
      }
      if (error.name === 'CastError') {
        return next(new BadRequestError('Передан не валидный ID карточки'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      res.send({ message: `Карточке с ID: ${card._id} поставлен лайк`, data: card });
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return next(new NotFoundError('Карточка по указанному ID не найдена'));
      }
      if (error.name === 'CastError') {
        return next(new BadRequestError('Передан не валидный ID карточки'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: owner } }, { new: true })
    .then((card) => {
      res.send({ message: `У карточке с ID: ${card._id} убран лайк`, data: card });
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return next(new NotFoundError('Карточка по указанному ID не найдена'));
      }
      if (error.name === 'CastError') {
        return next(new BadRequestError('Передан не валидный ID карточки'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
