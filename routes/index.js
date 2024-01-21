const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

router.use('/users', userRouter);
router.use('/cards', auth, cardRouter);

module.exports = router;
