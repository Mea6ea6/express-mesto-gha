/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const DublicateError = require('../errors/DublicateError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');

const getUsers = async (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => next(new InternalServerError('Ошибка со стороны сервера')));
};

const getUserInfo = async (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send({ message: 'Текущий пользователь', data: user }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError('Переданы невалидный ID'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const getUsersById = async (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send({ message: `По ID ${user._id} успешно найден пользователь`, data: user }))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return next(new NotFoundError('Пользователь по указанному ID не найден'));
      }
      if (error.name === 'CastError') {
        return next(new BadRequestError('Передан не валидный ID пользователя'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((password) => User.create({
      name, about, avatar, email, password,
    }))
    .then((user) => res.status(201).send({ message: 'Успешно создан новый пользователь', data: user }))
    .catch((error) => {
      if (error.code === 11000) {
        return next(new DublicateError('Пользователь с таким email уже существует.'));
      }
      if (error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(201).send({ message: 'Успешное обновление информации профиля', data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ message: 'Успешное обновление аватара', data: user }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError('Передан не валидный ID пользователя'));
      }
      if (error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password).select('+password')
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'dev-secret', { expiresIn: '7d' }),
      });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError('Передан не валидный ID пользователя'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

module.exports = {
  getUsers, getUserInfo, getUsersById, createUser, updateProfile, updateAvatar, login,
};
