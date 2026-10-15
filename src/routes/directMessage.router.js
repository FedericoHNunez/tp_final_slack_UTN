import express from "express";
import directMessageController from "../controllers/directMessage.controller.js";

const directMessageRouter = express.Router();

directMessageRouter.get('/', directMessageController.getConversationsByUserId);
directMessageRouter.post('/:user_id', directMessageController.createDirectMessage);
directMessageRouter.patch('/:user_id', directMessageController.editMessageContent);
directMessageRouter.get('/:user_id', directMessageController.getMessagesByReceiverId);

export default directMessageRouter;
