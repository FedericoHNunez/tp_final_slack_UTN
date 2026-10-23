import express from 'express';
import memberController from '../controllers/member.controller.js';
import workSpaceMiddleware from '../middlewares/workSpace.middleware.js';
import memberMiddleware from '../middlewares/member.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const memberRouter = express.Router({ mergeParams: true });


memberRouter.get('/',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin', 'user']),
    memberController.getMembers);

memberRouter.delete('/:member_id',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin']),
    memberMiddleware,
    memberController.deleteMember);

memberRouter.post('/invite',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin']),
    memberController.inviteMember);

memberRouter.get('/accept-invite/:invitation_token',
    memberController.acceptInvite);


export default memberRouter;