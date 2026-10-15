import express from 'express';
import channelController from '../controllers/channel.controller.js';

const channelRouter = express.Router();


channelRouter.post('/', channelController.createChannel);
channelRouter.get('/', channelController.getChannels);


export default channelRouter;