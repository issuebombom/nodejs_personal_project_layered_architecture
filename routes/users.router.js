const express = require('express');
const userRouter = express.Router();

const AuthMiddleware = require('../middlewares/auth.middleware');
const auth = new AuthMiddleware();

const UserController = require('../controllers/users.controller');
const userController = new UserController();

userRouter.get('/users', userController.getUsers);
userRouter.get('/users/:userId', userController.getUser);
userRouter.put('/users/info', auth.verifyAccessToken, userController.modifyUserInfo);
userRouter.put('/users/password', auth.verifyAccessToken, userController.modifyUserPassword);
userRouter.delete('/users', auth.verifyAccessToken, userController.leave);
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);

module.exports = userRouter;
