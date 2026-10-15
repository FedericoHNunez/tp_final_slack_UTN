import express from 'express';
import memberController from '../controllers/member.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const memberRouter = express.Router();

memberRouter.post('/', authMiddleware, memberController.createMember);
memberRouter.get('/', memberController.getMembers);
memberRouter.get('/:member_id', authMiddleware, memberController.getMemberById);

export default memberRouter;