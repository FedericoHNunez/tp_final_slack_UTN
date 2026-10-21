import express from 'express';
import channelController from '../controllers/channel.controller.js';

const channelRouter = express.Router({ mergeParams: true });


channelRouter.post('/', channelController.createChannel);
channelRouter.get('/:channel_id', channelController.getMessagesByChannelId);


export default channelRouter;