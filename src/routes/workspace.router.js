import express from 'express';
import workspaceController from '../controllers/workspace.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';


const workspaceRouter = express.Router();


workspaceRouter.post('/', workspaceController.createWorkspace);
workspaceRouter.delete('/:workspace_id', workspaceController.deleteWorkspaceById);

export default workspaceRouter;
