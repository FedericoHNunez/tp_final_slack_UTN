import invitationModel from "../models/invatation.model.js";
import BaseRepository from "./base.repository.js";

class InvitationRepository extends BaseRepository {
    constructor() {
        super(invitationModel)
    }

    async create(id_invitedUser, id_workspace, role) {
        return this.model.create({
            id_invitedUser,
            id_workspace,
            role
        })
    }

    async findActiveInvitation(emailInvitedUser, workspace_id) {
        const invitation = await this.model.findOne({
            emailInvitedUser,
            workspace_id,
            active: true
        });
        return invitation;
    }
}

const invitationRepository = new InvitationRepository()
export default invitationRepository