import nodemailer from 'nodemailer';
import { env } from './env.config';

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: env.USER_EMAIL,
        pass: env.USER_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
