import channelService from "../services/channel.service.js";
import successResponse from "../helpers/response.helper.js";

class ChannelControler {

    async createChannel(req, res) {
        const { workspace_id } = req.params;
        const { name, description } = req.body;
        const channel = await channelService.createChannel(name, description, workspace_id);
        return successResponse(res, "Channel created successfully.", channel, 201);
    }

    async getMessagesByChannelId(req, res) {
        const { channel_id } = req.params;
        const messagesChannel = await channelService.getMessagesByChannelId(channel_id);
        return successResponse(res, "Messages fetched successfully.", messagesChannel, 200);
    }
}

const channelController = new ChannelControler();
export default channelController;