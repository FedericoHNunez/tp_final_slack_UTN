import mongoose from "mongoose";
import { USER_COLLECTION_NAME } from "./user.model.js";

const workspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 30,
            trim: true
        },
        description: {
            type: String,
            maxlength: 200,
            trim: true
        }
    },
    {
        timestamps: true,
        // Ejemplo de consulta para buscar por fecha de creación (rango de fechas):
        // const resultados = await Workspace.find({ 
        //     createdAt: { $gte: new Date('2023-01-01'), $lte: new Date('2023-12-31') } 
        // });
    }

);
export const WORKSPACE_COLLECTION_NAME = 'Workspace';
const workspaceModel = mongoose.model(WORKSPACE_COLLECTION_NAME, workspaceSchema);

export default workspaceModel;