import jwt from "jsonwebtoken";
import ENVIRONMENT from "../../config/environment.config.js";

class Token {

    createLoginToken(payload) {
        const auth_token = jwt.sign(payload, ENVIRONMENT.TOKEN_JWT_KEY);
        return auth_token
    }

    createVerifyEmailToken(payload, expiresIn) {
        const verify_email_token = jwt.sign(
            payload,
            ENVIRONMENT.TOKEN_JWT_KEY,
            {
                expiresIn
            }
        );
        return verify_email_token;
    }

}

const tokenHelper = new Token()
export default tokenHelper;
