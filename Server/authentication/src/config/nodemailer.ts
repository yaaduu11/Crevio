import nodemailer from 'nodemailer';
import { env } from './env';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.USER_EMAIL,
        password: env.USER_PASSWORD
    },
} as any)