const express = require('express');
const userRouter = express.Router();

const UserController = require('../controllers/users.controller');
const userController = new UserController();

userRouter.get('/users/:userId', userController.getUserData);
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);

module.exports = userRouter;
