import express from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.get('/verify-email/:token_email_verify', authController.verifyEmail);
authRouter.post('/reset-password', authController.resetPassword);
authRouter.patch('/reset-password', authController.changePassword);


export default authRouter;