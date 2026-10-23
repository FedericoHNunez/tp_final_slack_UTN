import mongoose from "mongoose";
import { USER_COLLECTION_NAME } from "./user.model.js";
import { WORKSPACE_COLLECTION_NAME } from "./workspace.model.js";

const memberSchema = new mongoose.Schema(
    {

        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: USER_COLLECTION_NAME
        },
        id_workspace: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: WORKSPACE_COLLECTION_NAME
        },
        role: {
            type: String,
            enum: ['admin', 'user', 'owner'],
            default: 'user'
        },
        active: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true
    }
);

export const MEMBER_COLLECTION_NAME = 'Member';
const memberModel = mongoose.model(MEMBER_COLLECTION_NAME, memberSchema);
export default memberModel;