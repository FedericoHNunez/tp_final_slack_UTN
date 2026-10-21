import ENVIRONMENT from "../../config/environment.config.js";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function emailFormater(userName, email, token, subject, emailType, extraData = {}) {
    const templatePath = path.join(__dirname, "../../EmailTemplate", `${emailType}.ejs`);
    const emailContent = await ejs.renderFile(templatePath, {
        userName,
        email,
        token,
        url_backend: ENVIRONMENT.URL_BACKEND,
        ...extraData
    });
    return {
        to: email,
        from: process.env.EMAIL_USER,
        subject: subject,
        html: emailContent
    }
}
export default emailFormater;