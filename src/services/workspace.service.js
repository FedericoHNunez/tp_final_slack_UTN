import workspaceRepository from "../repositories/workspace.repository.js";
import ServerError from "../helpers/error.helper.js";
import userRepository from "../repositories/user.repository.js";

class WorkspaceService {
    async getWorkspaces(filter = null) {
        if (!filter) {
            return await workspaceRepository.getAll();
        }
        return await workspaceRepository.getByOneSearchTerm(filter);
    }

    async getWorkspacesByUserId(user_id) {
        if (!user_id) {
            throw new ServerError(
                "Missing required fields: user_id is required.",
                400
            );
        }
        const userExist = await userRepository.getById(user_id);
        if (!userExist) {
            throw new ServerError(
                "User not found.",
                404
            );
        }

        return await workspaceRepository.getWorkspacesByUserId(user_id);
    }

    async createWorkspace(name, description) {
        if (!name || !description) {
            throw new ServerError(
                "Missing required fields: name and description are required.",
                400
            );
        }
        return await workspaceRepository.create(name, description);
    }

    async deleteWorkspaceById(workspace_id) {
        return await workspaceRepository.deleteById(workspace_id);
    }
}

const workspaceService = new WorkspaceService();
export default workspaceService;
