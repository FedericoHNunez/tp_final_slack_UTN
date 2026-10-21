import express from 'express';
import memberController from '../controllers/member.controller.js';
import workSpaceMiddleware from '../middlewares/workSpace.middleware.js';
import memberMiddleware from '../middlewares/member.middleware.js';

const memberRouter = express.Router({ mergeParams: true });


memberRouter.get('/',
    workSpaceMiddleware(['owner', 'admin', 'user']),
    memberController.getMembers);

memberRouter.delete('/:member_id',
    workSpaceMiddleware(['owner', 'admin']),
    memberMiddleware,
    memberController.deleteMember);

memberRouter.post('/invite',
    workSpaceMiddleware(['owner', 'admin']),
    memberController.inviteMember);

/* 
memberRouter.put('/accep-invite/:invitation_token',
    memberController.acceptInvite)
 */
export default memberRouter;