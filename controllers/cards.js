const Card = require('../models/card');

const getCards = async (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards)
    })
    .catch((err) => {
      res.status(500).send({message:err.message})
    });
}

const createCard = async (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => {
      return res.status(201).send({data: card})
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({message:'Переданы некорректные данные при создании карточки', error:error.message});
      }
      return res.status(500).send({message:error.message});
    });
}

const deleteCard = async (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards)
    })
    .catch((err) => {
      res.status(500).send({message:err.message})
    });
}

module.exports = { getCards, createCard, deleteCard }