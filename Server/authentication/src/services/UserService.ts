import bcrypt from 'bcryptjs'

import { httpStatusCodes } from '../constants/statusCodes';
import { generateOtp } from '../utils/generateOtp';
import { transporter } from '../config/nodemailer';
import { generateOtpHtmlTemplate } from '../utils/otpTemplate';
import { generateHttpError } from '../utils/httpError';
import { Messages } from '../constants/messages';
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { IUserService } from "../interfaces/user/IUserService";
import { UserType } from '../types/Type';
import { env } from '../config/env';
import { redisClient } from '../config/redis';

export class UserService implements IUserService {
    constructor(
        private userRepository : IUserRepository
    ) {}

    async register(user: UserType): Promise<string> {
        const existingUser = await this.userRepository.findByEmail(user.email)
        console.log(user.email)
        if (existingUser) {
            throw generateHttpError(httpStatusCodes.CONFLICT, Messages.USER_EXIST)
        }

        user.password = await bcrypt.hash(user.password as string, 10)

        let otp = generateOtp()
        
        let mailOptions = {
            user: env.USER_EMAIL,
            to: user.email,
            subject: 'Your 6-digit OTP',
            html: generateOtpHtmlTemplate(otp)
        }

        try {
            await transporter.sendMail(mailOptions)
        }catch (err) {
            console.log(err);
            throw generateHttpError(httpStatusCodes.INTERNAL_SERVER_ERROR, Messages.OTP_ERROR)
        }

        const tempObject = JSON.stringify({
            otp: otp,
            userData: user
        })

        await redisClient.setEx(user.email, 300, tempObject)
        
        return user.email as string;
    }

    async verifyOtp(otp: string, email:string) {
        const storedData = await redisClient.get(email)
        if(!storedData) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.OTP_EXPIRED)
        }

        const {otp: storedOtp, userData} = JSON.parse(storedData)

        if(otp!==storedOtp) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.INCORRECT_OTP)
        }

        const userObject : UserType = {
            name : userData.name as string,
            email : userData.email as string,
            password : userData.password as string
        }

        const user = await this.userRepository.create(userObject)
    }

    
}