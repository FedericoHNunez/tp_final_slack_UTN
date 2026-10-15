import memberService from "../services/member.service.js";
import successResponse from "../helpers/response.helper.js";

class MemberController {
    async createMember(req, res) {
        const { id_user, id_workspace, role } = req.body;
        const member = await memberService.createMember(id_user, id_workspace, role);
        return successResponse(res, "Member created successfully", { member });
    }

    async getMembers(req, res) {
        const members = await memberService.getMembers();
        return successResponse(res, "Members retrieved successfully", { members });
    }

    async getMemberById(req, res) {
        const { member_id } = req.params;
        const member = await memberService.getMemberById(member_id);
        return successResponse(res, "Member retrieved successfully", { member });
    }
}

const memberController = new MemberController();
export default memberController;
