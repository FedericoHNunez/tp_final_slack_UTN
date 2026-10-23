import express from 'express';
import workspaceController from '../controllers/workspace.controller.js';
import channelRouter from './channel.router.js';
import workSpaceMiddleware from '../middlewares/workSpace.middleware.js';
import memberRouter from './member.router.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const workspaceRouter = express.Router();

// Channels sub-router
workspaceRouter.use('/:workspace_id/channels',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin', 'user']),
    channelRouter);

//members sub-router
workspaceRouter.use('/:workspace_id/members',
    memberRouter);


workspaceRouter.get('/',
    authMiddleware,
    workspaceController.getWorkspacesByUserId);

workspaceRouter.post('/',
    authMiddleware,
    workspaceController.createWorkspace);

//solo ownwer
workspaceRouter.delete('/:workspace_id',
    authMiddleware,
    workSpaceMiddleware(['owner']),
    workspaceController.deleteWorkspaceById);

//solo ownwer y admin
workspaceRouter.put('/:workspace_id',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin']),
    workspaceController.updateWorkspaceById);

workspaceRouter.get('/:workspace_id',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin', 'user']),
    workspaceController.getChannelsByWorkspaceId);

//solo member y admin puede invitar a un usuario




export default workspaceRouter;
