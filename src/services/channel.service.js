import channelRepository from "../repositories/channel.repository.js";
import ServerError from "../helpers/error.helper.js";

class ChannelService {

    async getChannels(filter = null) {
        if (!filter) {
            const channels = await channelRepository.getAll();
            return channels;
        }
        const channels = await channelRepository.getByOneSearchTerm(filter);
        return channels;
    }

    async createChannel(name, description, id_workspace) {
        if (!name || !description || !id_workspace) {
            throw new ServerError("Missing required fields: name, description and id_workspace are required.", 400);
        }
        const channel = await channelRepository.create(name, description, id_workspace);
        return channel;
    }

}
const channelService = new ChannelService();
export default channelService;