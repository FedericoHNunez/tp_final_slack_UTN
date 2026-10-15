import nodemailer from "nodemailer";
import ENVIRONMENT from "./environment.config.js";


const mailer_transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: ENVIRONMENT.EMAIL_USER,
        pass: ENVIRONMENT.EMAIL_PASSWORD
    }
})

export default mailer_transporter