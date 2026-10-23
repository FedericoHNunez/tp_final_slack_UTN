import memberService from "../services/member.service.js";
import successResponse from "../helpers/response.helper.js";
import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/environment.config.js";

class MemberController {
    async createMember(req, res) {
        const { id_user, id_workspace, role } = req.body;
        const member = await memberService.createMember(id_user, id_workspace, role);
        return successResponse(res, "Member created successfully", { member });
    }

    async getMembers(req, res) {
        const workspace_id = req.workspace_selected._id;
        const members = await memberService.getMembersByWorkspaceId(workspace_id);
        return successResponse(res, "Members retrieved successfully", { members });
    }

    async getMemberById(req, res) {
        const { member_id } = req.params;
        const member = await memberService.getMemberById(member_id);
        return successResponse(res, "Member retrieved successfully", { member });
    }
    async deleteMember(req, res) {
        const member_selected = req.member_selected;
        const user = req.user.id;
        await memberService.deleteMember(member_selected, user);
        return successResponse(res, "Member deleted successfully", {});
    }

    async inviteMember(req, res) {
        const { email, role } = req.body;
        const senderUser = req.user.userName;
        const workspace_id = req.workspace_selected._id;
        const workspace_name = req.workspace_selected.name;
        const invitation = await memberService.inviteMember(email, workspace_id, role, senderUser, workspace_name);
        return successResponse(res, "User invited successfully", { invitation });
    }

    async acceptInvite(req, res) {
        const { invitation_token } = req.params;
        const { invitation_id, role } = jwt.verify(invitation_token, ENVIRONMENT.TOKEN_JWT_KEY);
        const member = await memberService.acceptInvite(invitation_id, role);
        return successResponse(res, "Member accepted invite successfully", { member });
    }
}

const memberController = new MemberController();
export default memberController;
