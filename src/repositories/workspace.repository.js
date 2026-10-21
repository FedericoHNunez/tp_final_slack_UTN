import BaseRepository from './base.repository.js';
import workspaceModel from '../models/workspace.model.js';
import channelModel from '../models/channel.model.js';

class WorkspaceRepository extends BaseRepository {
    constructor() {
        super(workspaceModel, 'description');
    }

    async create(name, description) {
        const workspace = await this.model.create({
            name: name,
            description: description
        });
        return workspace;
    }
    async updateWorkspaceById(id, name, description) {
        return await this.model.findByIdAndUpdate(
            id,
            { name: name, description: description },
            { returnDocument: 'after' }
        );
    }

}

const workspaceRepository = new WorkspaceRepository();
export default workspaceRepository;