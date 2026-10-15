import { config } from 'dotenv';
config();
const ENVIRONMENT = {
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    PORT: process.env.PORT || 3000,
    TOKEN_JWT_KEY: process.env.TOKEN_JWT_KEY,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    URL_BACKEND: process.env.URL_BACKEND
}

export default ENVIRONMENT;