import mongoose from 'mongoose';
import connectMongoDB from '../config/mongo.configDB.js';
import userModel from '../models/user.model.js';
import usuariosDePrueba from './usuarios.js';
import { hashPassword } from '../helpers/authHelpers/bcrypt.helper.js';

async function seedUsers() {
    try {
        await connectMongoDB();
        console.log('--- Creando usuarios de prueba en la base de datos ---');

        let createdCount = 0;
        let skippedCount = 0;

        for (const user of usuariosDePrueba) {
            const existingUser = await userModel.findOne({
                $or: [{ email: user.email }, { userName: user.userName }]
            });

            if (existingUser) {
                console.log(`[OMITIDO] El usuario '${user.userName}' o email '${user.email}' ya existe.`);
                skippedCount++;
                continue;
            }

            const hashedPassword = await hashPassword(user.password);
            await userModel.create({
                userName: user.userName,
                email: user.email,
                password: hashedPassword,
                active: user.active ?? true,
                emailVerified: user.emailVerified ?? true
            });

            console.log(`[CREADO] Usuario '${user.userName}' (${user.email}) creado exitosamente.`);
            createdCount++;
        }

        console.log('---------------------------------------------');
        console.log(`Resultado: ${createdCount} usuarios creados, ${skippedCount} omitidos.`);
    } catch (error) {
        console.error('Error al crear los usuarios:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Conexión con MongoDB cerrada.');
        process.exit(0);
    }
}

seedUsers();
