import mongoose from "mongoose";
import { WORKSPACE_COLLECTION_NAME } from "./workspace.model.js";
import { USER_COLLECTION_NAME } from "./user.model.js";

const newInvitationSchema = new mongoose.Schema(
    {
        id_invitedUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: USER_COLLECTION_NAME
        },
        id_workspace: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: WORKSPACE_COLLECTION_NAME
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const INVATATION_COLLECTION_NAME = 'Invitation'
const invitationModel = mongoose.model(INVATATION_COLLECTION_NAME, newInvitationSchema)
export default invitationModel
