import BaseRepository from './base.repository.js';
import memberModel from "../models/member.model.js";

class MemberRepository extends BaseRepository {
    constructor() {
        super(memberModel);
    }

    async create(id_user, id_workspace, rol) {
        const member = await this.model.create({
            id_user: id_user,
            id_workspace: id_workspace,
            role: rol
        });
        return member;
    }

    // traer todas las membresias de un usuario
    async getWorkspacesByUserId(userId) {
        const members = await this.model
            .find({ id_user: userId })
            .select('id_workspace role updated_at createdAt')
            .populate('id_workspace', 'name description');
        return members;
    }

    // traer todo los miembros de un espacio de trabajo 
    async getAllUsersByWorkspaceId(workspaceId) {
        const members = await this.model
            .find({ id_workspace: workspaceId })
            .populate('id_user', 'nombre apellido email');
        return members;
    }

    async getWorkspaceMembershipByUserId(user_id, id_workspace) {
        const membership = await this.model
            .findOne({ id_user: user_id, id_workspace: id_workspace })
        return membership
    }

    async updateActive(member_id) {
        return await this.model.updateOne({ _id: member_id }, { active: true });
    }

    async deleteByWorkspaceId(workspace_id) {
        return await this.model.deleteMany({ id_workspace: workspace_id });
    }

    async getMenbersByWorkspaceId(workspace_id) {
        return await this.model.find({ id_workspace: workspace_id })
            .populate('id_user', 'userName email');
    }
}


// clase de una sola instancia, no hace falta instanciarla cada vez que se quiera usar
const memberRepository = new MemberRepository();
export default memberRepository;