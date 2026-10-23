import authService from "../services/auth.service.js";
import successResponse from "../helpers/response.helper.js";
import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/environment.config.js";

class AuthController {
    async registerUser(req, res) {
        const { userName, email, password } = req.body;

        const user = await authService.registerUser(userName, email, password);


        return successResponse(res, "User created successfully.", user, 201);
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        const auth_token = await authService.loginUser(email, password);
        return successResponse(
            res,
            "User logged in successfully.",
            { auth_token }
        );
    }

    async verifyEmail(req, res) {
        const { token_email_verify } = req.params;
        const { email } = jwt.verify(token_email_verify, ENVIRONMENT.TOKEN_JWT_KEY);
        await authService.verifyEmail(email);
        return successResponse(res, "User verified successfully. You can now login.");
    }

    async resetPassword(req, res) {
        const { email } = req.body;
        await authService.resetPassword(email);
        return successResponse(res, "If the email exists in our system, you will receive an email to reset your password.");
    }


    async changePassword(req, res) {
        const { newPassword, confirmNewPassword, token } = req.body;
        const { email, userName } = jwt.verify(token, ENVIRONMENT.TOKEN_JWT_KEY);
        await authService.changePassword(email, userName, newPassword, confirmNewPassword);
        return successResponse(res, "Password changed successfully.");
    }

}

const authController = new AuthController();
export default authController;
