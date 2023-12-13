const User = require('../models/user');

const getUsers = async (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users)
    })
    .catch((error) => {
      res.status(500).send({message:error.message})
    });
}

const getUsersById = async (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({message:'Пользователь по указанному ID не найден'});
      }
      return res.status(200).send(user)
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({message:'Передан не валидный ID'})
      }
      return res.status(500).send({message:'Ошибка со стороны сервера', error:error.message})
    });
}

const createUser = async (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then((user) => {
      return res.status(201).send({data:user})
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({message:'Переданы некорректные данные при создании пользователя', error:error.message});
      }
      return res.status(500).send({message:error.message});
    });
}

const updateProfile = (req, res) => {
  const userId = req.user._id;
  const {name, about} = req.body;
  User.findByIdAndUpdate(userId, {name, about}, {new: true, runValidators: true})
    .then((user) => res.send({data:user}))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({message:'Переданы некорректные данные при обновлении профиля'});
      }
      return res.status(500).send({message:error.message});
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const {avatar} = req.body;
  User.findByIdAndUpdate(userId, { avatar }, {new: true, runValidators: true})
    .then((user) => res.send({data:user}))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({message:'Переданы некорректные данные при обновлении аватара'});
      }
      return res.status(500).send({message:error.message});
    });
};

module.exports = { getUsers, getUsersById, createUser, updateProfile, updateAvatar }