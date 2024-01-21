const userRouter = require('express').Router();
const {
  getUsers, getUserInfo, getUsersById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');
const {
  checkUserIdValid, updateUserInfoValid, updateUserAvatarValid,
} = require('../middlewares/validation');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:userId', checkUserIdValid, getUsersById);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUserInfoValid, updateProfile);
userRouter.patch('/me/avatar', updateUserAvatarValid, updateAvatar);

module.exports = userRouter;
