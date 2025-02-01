// import nodemailer from 'nodemailer';
// import { env } from './env';

// export const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: env.USER_EMAIL,
//         password: env.USER_PASSWORD
//     },
// } as any)


import nodemailer from 'nodemailer';
import { env } from './env';

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
} as any);
