import workspaceService from "../services/workspace.service.js";
import memberService from "../services/member.service.js";
import successResponse from "../helpers/response.helper.js";

class WorkspaceController {

    async getWorkspacesByUserId(req, res) {
        const user_id = req.user.id;
        const workspaceList = await workspaceService.getWorkspacesByUserId(user_id);
        return successResponse(res, "get all workspaces", { workspaces: workspaceList });
    }

    async createWorkspace(req, res) {
        const { name, description } = req.body;
        const workspace = await workspaceService.createWorkspace(name, description);
        const member = await memberService.createMember(req.user.id, workspace._id, 'owner');
        return successResponse(res, "Workspace created successfully.", { workspace, member }, 201);
    }

    async deleteWorkspaceById(req, res) {
        const { workspace_id } = req.params;
        const workspace = await workspaceService.deleteWorkspaceById(workspace_id);
        return successResponse(res, "Workspace deleted successfully.", { workspace },);
    }
}

const workspaceController = new WorkspaceController();
export default workspaceController;