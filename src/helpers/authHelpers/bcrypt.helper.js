import bcrypt from "bcrypt";

export async function hashPassword(password) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function compareHash(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}