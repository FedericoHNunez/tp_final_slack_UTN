import memberRepository from "../repositories/member.repository.js";

class MemberService {
    async createMember(id_user, id_workspace, role = 'user') {
        const member = await memberRepository.create(id_user, id_workspace, role);
        return member;
    }

    async getMembers() {
        return await memberRepository.getAll();
    }

    async getMemberById(member_id) {
        const member = await memberRepository.getById(member_id);
        if (!member) {
            throw new ServerError(`Member with ID ${member_id} not found`, 404);
        }
        return member;
    }
}

const memberService = new MemberService();
export default memberService;