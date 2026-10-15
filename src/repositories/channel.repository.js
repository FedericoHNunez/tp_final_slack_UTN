import BaseRepository from "./base.repository.js";
import channelModel from "../models/channel.model.js";

class ChannelRepository extends BaseRepository {
  constructor() {
    super(channelModel, 'name');
  }

  async create(name, description, id_workspace) {
    const channel = await this.model.create({
      name: name,
      description: description,
      id_workspace: id_workspace,
    });
    return channel;
  }

  async getAllChannelsByWorkspaceId(workspaceId) {
    const channels = await this.model
      .find({ id_workspace: workspaceId })
      .populate("id_workspace");
    return channels;
  }

  async updateById(channelId, name, description) {
    const result = await this.model.findByIdAndUpdate(
      channelId,
      { name, description },
      { returnDocument: 'after' },
    );
    return result;
  }
  async getAllChannelsByWorkpaceId(id_workspace) {
    const result = await this.model.find({ id_workspace: id_workspace });
    return result;
  }
}

const channelRepository = new ChannelRepository();
export default channelRepository;
