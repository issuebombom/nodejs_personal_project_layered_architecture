const express = require('express');
const userRouter = express.Router();

const AuthMiddleware = require('../middlewares/auth.middleware');
const auth = new AuthMiddleware();

const UserController = require('../controllers/users.controller');
const userController = new UserController();

userRouter.get('/users', userController.getUsers);
userRouter.get('/users/info', auth.verifyAccessToken, userController.getUser);
userRouter.put('/users/info', auth.verifyAccessToken, userController.modifyUserInfo);
userRouter.put('/users/info/password', auth.verifyAccessToken, userController.modifyUserPassword);
userRouter.delete('/users/info', auth.verifyAccessToken, userController.leave);
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);

module.exports = userRouter;
