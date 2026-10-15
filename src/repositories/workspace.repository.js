import BaseRepository from './base.repository.js';
import workspaceModel from '../models/workspace.model.js';

class WorkspaceRepository extends BaseRepository {
    constructor() {
        super(workspaceModel, 'description');
    }

    async create(nombre, description) {
        const workspaces = await this.model.create({
            name: nombre,
            description: description
        });
        return workspaces;
    }

    async getWorkspacesByUserId(user_id) {
        return await this.model.find({ id_user: user_id });
    }

}

const workspaceRepository = new WorkspaceRepository();
export default workspaceRepository;