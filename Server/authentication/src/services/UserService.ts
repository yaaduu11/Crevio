import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongoose';
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
import { generateAccessToken, generateRefreshToken, decodeAccessToken } from '../utils/jwtToken';

export class UserService implements IUserService {
    constructor(private userRepository : IUserRepository) {}

    async register(user: UserType): Promise<string> {
        const existingUser = await this.userRepository.findByEmail(user.email)
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
        console.log(user.email)
        
        return user.email as string;
    }

    async verifyOtp(otp: string, email: string): Promise<{ accessToken: string; refreshToken: string; user: UserType }> {
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

        const accessToken = await generateAccessToken(user._id as ObjectId)
        const refreshToken = await generateRefreshToken(user._id as ObjectId)

        return {accessToken, refreshToken, user}
    }

    async assignRole(role:string, token:string) : Promise<{userRole:string}> {
        let decoded = await decodeAccessToken(token)
        console.log('currently in assignRoleqqqqqqq', role);

        let user = await this.userRepository.findById(decoded.id as string)
        if(!user) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }
        console.log('currently in assignRoleppppppp', role);
        
        await this.userRepository.updateUserRole(user.email, role)
        return {userRole: role}
    }

    async login(email:string, password:string): Promise<{accessToken: string, refreshToken: string, user:UserType}> {
        let user = await this.userRepository.findByEmail(email)
        if(!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }

        const checkPassword = await bcrypt.compare(password, user.password as string)
        if(!checkPassword) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.INCORRECT_PASSWORD)
        }

        if(user.isBlocked){
            throw generateHttpError(httpStatusCodes.UNAUTHORIZED, Messages.USER_BLOCKED)
        }

        let accessToken = await generateAccessToken(user._id as ObjectId)
        let refreshToken = await generateRefreshToken(user._id as ObjectId)
        
        return {accessToken, refreshToken, user}
    }
}