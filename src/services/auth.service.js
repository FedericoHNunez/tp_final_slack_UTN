import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/error.helper.js";
import { hashPassword, compareHash } from "../helpers/authHelpers/bcrypt.helper.js";
import { isValidEmail } from "../helpers/emailHelpers/emailvalidation.helper.js";
import tokenHelper from "../helpers/authHelpers/token.helper.js";
import emailFormater from "../helpers/emailHelpers/emailFormater.helper.js";
import mailer_transporter from "../config/mailer.config.js";

class AuthService {
    async registerUser(userName, email, password) {
        if (!userName || !email || !password) {
            throw new ServerError(
                "Missing required fields: userName, email, and password are required.",
                400
            );
        }

        if (!isValidEmail(email)) {
            throw new ServerError("Invalid email format.", 400);
        }

        const userEmailExist = await userRepository.getByEmail(email);
        if (userEmailExist) {
            throw new ServerError("User with this email already exists.", 409);
        }

        const hashedPassword = await hashPassword(password);
        const user = await userRepository.create(userName, email, hashedPassword);
        const verify_email_token = tokenHelper.createVerifyEmailToken(
            {
                email: user.email
            },
            "1d"
        );
        const verifyEmail = await emailFormater(
            user.userName,
            user.email,
            verify_email_token,
            "Confirmación de Registro en Slak",
            "verifyEmail"
        );
        await mailer_transporter.sendMail(verifyEmail);
        return user;
    }

    async loginUser(email, password) {
        if (!email || !password) {
            throw new ServerError(
                "Missing required fields: email and password are required.",
                400
            );
        }

        if (!isValidEmail(email)) {
            throw new ServerError("Invalid email format.", 400);
        }

        const user = await userRepository.getByEmail(email);

        if (!user) {
            throw new ServerError("Invalid credentials", 401);
        }
        if (!user.emailVerified) {
            throw new ServerError("User not verified. Please verify your email to login.", 403);
        }
        const userPasswordMatch = await compareHash(password, user.password);
        if (!userPasswordMatch) {
            throw new ServerError("Invalid credentials", 401);
        }
        const auth_token = tokenHelper.createLoginToken(
            {
                _id: user._id,
                email: user.email,
                userName: user.userName
            }
        );

        return auth_token;
    }

    async verifyEmail(email) {
        const userFound = await userRepository.getByEmail(email);

        if (!userFound) {
            throw new ServerError("User not found.", 404);
        }
        if (!userFound.active) {
            throw new ServerError("User is not active.", 403);
        }
        if (userFound.emailVerified) {
            throw new ServerError("User already verified.", 400);
        }
        const userVerified = await userRepository.updateById(
            userFound._id,
            { emailVerified: true }
        );
        return userVerified.userName;
    }

    async resetPassword(email) {

        if (!email) {
            throw new ServerError("Invalid credentials", 400);
        }
        if (!isValidEmail(email)) {
            throw new ServerError("Invalid email format.", 400);
        }
        const user = await userRepository.getByEmail(email);
        if (!user) return;

        const resetPasswordToken = tokenHelper.createVerifyEmailToken(
            {
                email: user.email,
                userName: user.userName
            },
            "1h"
        );
        const resetPasswordEmail = await emailFormater(
            user.userName,
            user.email,
            resetPasswordToken,
            "Reinicio de Contraseña en Slak",
            "resetpasswordEmail"
        );
        await mailer_transporter.sendMail(resetPasswordEmail);
        return;
    }


    async changePassword(email, userName, newPassword, confirmNewPassword) {
        if (!email || !userName) {
            throw new ServerError("Invalid token.", 401);
        }
        if (!newPassword || !confirmNewPassword) {
            throw new ServerError("Invalid credentials", 400);
        }
        if (newPassword !== confirmNewPassword) {
            throw new ServerError("Passwords do not match", 400);
        }
        const userFound = await userRepository.getByEmail(email);
        if (!userFound) {
            throw new ServerError("User not found.", 404);
        }
        const hashedPassword = await hashPassword(newPassword);
        const userUpdated = await userRepository.updateById(
            userFound._id,
            { password: hashedPassword }
        );
        return userUpdated.userName;
    }

}

const authService = new AuthService();
export default authService;
