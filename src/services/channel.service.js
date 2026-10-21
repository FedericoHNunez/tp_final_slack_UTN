import channelRepository from "../repositories/channel.repository.js";
import ServerError from "../helpers/error.helper.js";
import workspaceRepository from "../repositories/workspace.repository.js";
import channelMessageRepository from "../repositories/channelMessage.repository.js";

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
        const workspacefound = await workspaceRepository.getById(id_workspace);
        if (!workspacefound) {
            throw new ServerError("Workspace not found.", 404);
        }
        const channel = await channelRepository.create(name, description, id_workspace);
        return channel;
    }

    async getMessagesByChannelId(channel_id) {
        if (!channel_id) {
            throw new ServerError("Missing required fields: id is required.", 400);
        }
        const channelFound = await channelRepository.getById(channel_id)
        if (!channelFound) {
            throw new ServerError("Channel not found.", 404);
        }
        const messagesChannelFound = await channelMessageRepository.getMessagesByChannelId(channel_id)
        return messagesChannelFound;
    }
}
const channelService = new ChannelService();
export default channelService;