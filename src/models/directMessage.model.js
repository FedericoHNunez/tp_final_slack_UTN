import mongoose from "mongoose"
import { USER_COLLECTION_NAME } from "./user.model.js"

const directMessageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true
        },
        id_receiver: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: USER_COLLECTION_NAME
        },
        id_sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: USER_COLLECTION_NAME
        },
    },
    {
        timestamps: true
    }
);

export const DIRECTMESSAGE_COLLECTION_NAME = 'DirectMessage'
const directMessageModel = mongoose.model(DIRECTMESSAGE_COLLECTION_NAME, directMessageSchema);
export default directMessageModel;