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
            auth_token
        );
    }

    async verifyEmail(req, res) {
        const { token_email_verify } = req.params;
        const { email } = jwt.verify(token_email_verify, ENVIRONMENT.TOKEN_JWT_KEY);
        await authService.verifyEmail(email);
        return successResponse(res, "User verified successfully. You can now login.");
    }

    async resetPassword(req, res) {
        const { email, userName } = req.body;
        await authService.resetPassword(email, userName);
        return successResponse(res, "Verify your email to reset your password.");
    }

    async changePassword(req, res) {
        const { newPassword, confirmNewPassword } = req.body;
        const { token_password_reset } = req.params;
        const { email, userName } = jwt.verify(token_password_reset, ENVIRONMENT.TOKEN_JWT_KEY);
        await authService.changePassword(email, userName, newPassword, confirmNewPassword);
        return successResponse(res, "Password changed successfully.");
    }

}

const authController = new AuthController();
export default authController;
