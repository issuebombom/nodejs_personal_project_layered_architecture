const express = require('express');
const usersRouter = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

usersRouter.get('/users/:userId', usersController.getUserData);
usersRouter.post('/signup', usersController.signup);
usersRouter.post('/login', usersController.login);

module.exports = usersRouter;
