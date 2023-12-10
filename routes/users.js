const userRouter = require('express').Router();
const { getUsers, getUsersById, createUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUsersById);
userRouter.post('/', createUser);

module.exports = userRouter;