import express from 'express';
import workspaceController from '../controllers/workspace.controller.js';
import channelRouter from './channel.router.js';
import workSpaceMiddleware from '../middlewares/workSpace.middleware.js';
import memberRouter from './member.router.js';

const workspaceRouter = express.Router();

// Channels sub-router
workspaceRouter.use('/:workspace_id/channels',
    workSpaceMiddleware(['owner', 'admin', 'user']),
    channelRouter);

//members sub-router
workspaceRouter.use('/:workspace_id/members',
    workSpaceMiddleware(['owner', 'admin', 'user']),
    memberRouter);


workspaceRouter.get('/',
    workspaceController.getWorkspacesByUserId);

workspaceRouter.post('/',
    workspaceController.createWorkspace);

//solo ownwer
workspaceRouter.delete('/:workspace_id',
    workSpaceMiddleware(['owner']),
    workspaceController.deleteWorkspaceById);

//solo ownwer y admin
workspaceRouter.put('/:workspace_id',
    workSpaceMiddleware(['owner', 'admin']),
    workspaceController.updateWorkspaceById);

workspaceRouter.get('/:workspace_id',
    workSpaceMiddleware(['owner', 'admin', 'user']),
    workspaceController.getChannelsByWorkspaceId);

//solo member y admin puede invitar a un usuario




export default workspaceRouter;
