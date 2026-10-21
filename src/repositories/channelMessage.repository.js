import BaseRepository from './base.repository.js';
import channelMessagesModel from '../models/channelMessage.model.js';

class ChannelMessageRepository extends BaseRepository {
    constructor() {
        super(channelMessagesModel);
    }

    async create(content, id_channel, id_user) {
        const message = await this.model
            .create({
                content,
                id_channel,
                id_user
            });
        return message;
    }

    async getMessagesByChannelId(channelId) {
        return await this.model
            .find({ id_channel: channelId })
            .populate('id_user', 'userName')
            .sort({ createdAt: 1 });
    }

    async deleteAllMessagesByChannelId(channel_id) {
        return await this.model
            .deleteMany({ id_channel: channel_id });
    }
}

const channelMessageRepository = new ChannelMessageRepository();
export default channelMessageRepository;
