const express = require('express');
const userRouter = express.Router();

const UserController = require('../controllers/users.controller');
const userController = new UserController();

userRouter.get('/users', userController.getUsers);
userRouter.get('/users/:userId', userController.getUser);
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);

module.exports = userRouter;
