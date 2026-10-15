import express from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/me', userController.getUserById);
userRouter.delete('/me', userController.deleteUser);


export default userRouter;
