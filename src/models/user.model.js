import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true
        },
        emailVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const USER_COLLECTION_NAME = 'User';
const userModel = mongoose.model(USER_COLLECTION_NAME, userSchema);

export default userModel;