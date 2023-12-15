/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');

const getCards = async (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => res.status(500).send({ message: 'Ошибка со стороны сервера', error: error.message }));
};

const createCard = async (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ message: 'Успешно создана новая карточка', data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки', error: error.message });
      }

      return res.status(500).send({ message: 'Ошибка со стороны сервера', error: error.message });
    });
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send({ message: `Карточка с ID: ${card._id} была успешно удалена` }))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return res.status(404).send({ message: 'Карточка по указанному ID не найдена' });
      }
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный ID карточки' });
      }

      return res.status(500).send({ message: 'Ошибка со стороны сервера', error: error.message });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.send({ message: `Карточке с ID: ${card._id} поставлен лайк`, data: card });
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return res.status(404).send({ message: 'Карточка по указанному ID не найдена' });
      }
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный ID карточки' });
      }

      return res.status(500).send({ message: 'Ошибка со стороны сервера', error: error.message });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: owner } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.send({ message: `У карточке с ID: ${card._id} убран лайк`, data: card });
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return res.status(404).send({ message: 'Карточка по указанному ID не найдена' });
      }
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Передан некорректный ID карточки' });
      }

      return res.status(500).send({ message: 'Ошибка со стороны сервера', error: error.message });
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
