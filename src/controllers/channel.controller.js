import channelService from "../services/channel.service.js";
import successResponse from "../helpers/response.helper.js";

class ChannelControler {

    async getChannels(req, res) {
        const { name } = req.query;
        const channels = await channelService.getChannels(name);
        return successResponse(res, "Channels fetched successfully.", { channels });
    }

    async getAllChannels(req, res) {
        return await this.getChannels(req, res);
    }

    async createChannel(req, res) {
        const { name, description, id_workspace } = req.body;
        const channel = await channelService.createChannel(name, description, id_workspace);
        return successResponse(res, "Channel created successfully.", channel, 201);
    }

}

const channelController = new ChannelControler();
export default channelController;