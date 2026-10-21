import jwt from "jsonwebtoken"
import ENVIRONMENT from "../config/environment.config.js"
import ServerError from "../helpers/error.helper.js"

const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        //verifico si hay header
        if (!header || !header.startsWith('Bearer ')) {
            throw new ServerError("The authorization header is missing or not in the correct format.", 400);
        }
        const auth_token = header.split(' ')[1]
        //verifico si hat token
        if (!auth_token) {
            throw new ServerError("The token is missing.", 400);
        }
        const { _id, userName, email } = jwt.verify(auth_token, ENVIRONMENT.TOKEN_JWT_KEY)


        //mutamos la req para guardar el id, user name y mail del usuario
        req.user = { id: _id, userName, email };
        //que vaya al siguiente controlador
        next();

    } catch (error) {
        next(error);
    }
}

export default authMiddleware;