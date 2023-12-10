const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({message:"Массив пользователей"});
  } catch (error) {
    return res.status(500).send({message:"Ошибка со стороны сервера", error: error.message})
  }
}

const getUsersById = async (req, res) => {
  try {
    const {userId} = req.params;
    const user = await User.findById({userId});
    return res.status(200).send(user)
  } catch (error) {
    switch (error.name) {
      case "CastError":
        return res.status(400).send({message:"Передан не валидный ID"})
      default:
        return res.status(500).send({message:"Ошибка со стороны сервера", error: error.message})
    }
  }
}

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    return res.status(200).send({message:"Новый пользователь"});
  } catch (error) {
    return res.status(500).send({message:"Ошибка со стороны сервера", error: error.message})
  }
}

module.exports = { getUsers, getUsersById, createUser }