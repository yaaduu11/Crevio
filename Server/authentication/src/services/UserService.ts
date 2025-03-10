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
import { FileType, GoogleAuthUserType, SigninResponse, UserType } from '../types/Type';
import { env } from '../config/env';
import { redisClient } from '../config/redis';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwtToken';
import { handleProfileImageUpload } from '../config/cloudinary';

export class UserService implements IUserService {
    constructor(private userRepository : IUserRepository) {}

    async register(user: UserType): Promise<string> {
        const existingUser = await this.userRepository.findByEmail(user.email)
        if (existingUser) {
            throw generateHttpError(httpStatusCodes.CONFLICT, Messages.USER_EXIST)
        }

        user.password = await bcrypt.hash(user.password as string, 10)

        let otp = generateOtp()
        console.log(otp)
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

    async verifyOtp(otp: string, email: string): Promise<{accessToken:string, refreshToken:string, user: UserType}> {
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

    async resendOtp(email: string): Promise<void> {
        const storedData = await redisClient.get(email);
        if(!storedData) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.OTP_EXPIRED)
        }

        const { userData } = JSON.parse(storedData);

        const newOtp = generateOtp()
        console.log(newOtp);
        
        await redisClient.setEx(email, 300, JSON.stringify({ otp: newOtp, userData }));

        let mailOptions = {
            user: env.USER_EMAIL,
            to: userData.email,
            subject: 'Your 6-digit Resended OTP',
            html: generateOtpHtmlTemplate(newOtp)
        }

        try {
            await transporter.sendMail(mailOptions)
        } catch (error) {
            console.log(error);
            throw generateHttpError(httpStatusCodes.INTERNAL_SERVER_ERROR, Messages.OTP_ERROR)
        }
    }

    async assignRole(role:string, email:string) : Promise<{userRole:string}> {
        let user = await this.userRepository.findByEmail(email)
        if(!user) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }        
        await this.userRepository.updateUserRole(user.email, role)

        return {userRole: role}
    }

    async login(email:string, password:string): Promise<{accessToken: string, refreshToken: string, user:UserType}> {
        let user = await this.userRepository.findByEmail(email)
        if(!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }

        if(user.isBlocked) {
            throw generateHttpError(httpStatusCodes.FORBIDDEN, Messages.USER_BLOCKED)
        }

        if(!user.password) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.GOOGLE_ACC_FP)
        }

        const checkPassword = await bcrypt.compare(password, user.password as string)
        if(!checkPassword) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.INCORRECT_PASSWORD)
        }

        let accessToken = await generateAccessToken(user._id as ObjectId)
        let refreshToken = await generateRefreshToken(user._id as ObjectId)
        
        return {accessToken, refreshToken, user}
    }

    async googleAuth(user: GoogleAuthUserType): Promise<SigninResponse> {
        const userExisted = await this.userRepository.findByEmail(user.email)
        if(userExisted){
            if(userExisted.isBlocked){
                throw generateHttpError(httpStatusCodes.UNAUTHORIZED, Messages.USER_BLOCKED)
            }

            const accessToken = await generateAccessToken(userExisted._id as ObjectId)
            const refreshToken = await generateRefreshToken(userExisted._id as ObjectId)

            return {accessToken, refreshToken, user: userExisted}
        }else{
            const userObject: UserType = {
                email: user.email,
                name: user.name
            }

            const userData = await this.userRepository.create(userObject)

            const accessToken = await generateAccessToken(userData._id as ObjectId)
            const refreshToken = await generateRefreshToken(userData._id as ObjectId)

            return {accessToken, refreshToken, user: userData}
        }
    }

    async forgotPassword(email: string): Promise<void> {
        const checkUser = await this.userRepository.findByEmail(email)
        if(!checkUser){                        
            throw generateHttpError(httpStatusCodes.BAD_REQUEST , Messages.USER_NOT_FOUND)
        }

        if(!checkUser.password) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.GOOGLE_ACC_FP)
        }

        let newOtp = generateOtp()
        
        await redisClient.setEx(email, 300, JSON.stringify({ otp: newOtp, checkUser }));
        
        let mailOptions = {
            user: env.USER_EMAIL,
            to: email,
            subject: 'Your 6-digit OTP',
            html: generateOtpHtmlTemplate(newOtp)
        }

        try {
            await transporter.sendMail(mailOptions)
        } catch (error) {
            console.log(error);
            throw generateHttpError(httpStatusCodes.INTERNAL_SERVER_ERROR, Messages.OTP_ERROR)
        }
    }


    async verifyOtpFp(otp: string, email: string): Promise<{ user: UserType; }> {
        const storedData = await redisClient.get(email)

        const {otp:storedOtp, userData} = JSON.parse(storedData as string)
        if(otp!==storedOtp) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.INCORRECT_OTP)
        }        
        return {user:userData}
    }

    async newPassword(password: string, email: string): Promise<{ user: UserType; }> {
        const user = await this.userRepository.findByEmail(email)
        if(!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }
        user.password = await bcrypt.hash(password, 10)
        await this.userRepository.updateUser(user)
        return {user}
    }

    async updateProfile(id: string, profileImage: FileType | undefined): Promise<{user: UserType}> {
        console.log(id);
        
        if (!profileImage) {            
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, "Profile image is required")
        }

        const imageURL = await handleProfileImageUpload(profileImage.buffer)
        
        const user = await this.userRepository.findById(id);

        if (!user) {
            console.log('second request');

            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }

        user.profilePicture = imageURL;
        await this.userRepository.updateUser(user);
        return {user}
    }

    async getProfileImage(userId: string): Promise<{ user: UserType; }> {
        const user = await this.userRepository.findById(userId)
        if(!user) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }
        return {user}
    }

    async editUserName(userId: string, name: string): Promise<{ userName: string; }> {
        const user = await this.userRepository.findById(userId)
        if(!user) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }

        user.name = name
        await this.userRepository.updateUser(user)
        const userName = user.name
        return {userName}
    }

    async refreshToken(token: string): Promise<string> {
        const payload = await verifyToken(token)

        if(!payload) {
            throw generateHttpError(httpStatusCodes.FORBIDDEN, Messages.INVALID_TOKEN)
        }

        const user = await this.userRepository.findById(payload.userId)
        if(!user) {            
            throw generateHttpError(httpStatusCodes.FORBIDDEN, Messages.USER_NOT_FOUND)
        }

        if(user.isBlocked) {
            throw generateHttpError(httpStatusCodes.FORBIDDEN, Messages.USER_BLOCKED)
        }

        const accessToken = await generateAccessToken(user._id as ObjectId)        
        return accessToken
    }
}