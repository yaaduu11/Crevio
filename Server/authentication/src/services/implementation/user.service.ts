import bcrypt from 'bcryptjs'
import mongoose, { mongo, ObjectId } from 'mongoose';
import { transporter, env, redisClient, handleProfileImageUpload } from '../../config';
import { Messages, httpStatusCodes } from '../../constants';
import { FileType, GoogleAuthUserType, IFreelancerDetail, SigninResponse, UserType } from '../../types';
import { generateOtp, generateOtpHtmlTemplate, generateHttpError, generateAccessToken, generateRefreshToken, verifyToken } from '../../utils';
import { IUserRepository } from "../../repositories/interface/user-repository.interface";
import { IUserService } from "../../services/interface/user-service.interface";
import { mapper } from '../../config';
import { FreelancerDetailDTO, FreelancerDetailEntity, UserDTO, UserEntity } from '../../core';
import { winstonWarn, winstonError } from '../../utils/log-helper.util';

export class UserService implements IUserService {
    constructor(private _userRepository : IUserRepository) {}

    async register(user: UserType): Promise<string> {
        const existingUser = await this._userRepository.findByEmail(user.email)
        if (existingUser) {
            winstonWarn('Registration attempt with existing email', { email: user.email })
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
            winstonError('Failed to send OTP email', { email: user.email, error: err })
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
            winstonWarn('OTP verification failed - expired', { email })
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.OTP_EXPIRED)
        }

        const {otp: storedOtp, userData} = JSON.parse(storedData)
        if(otp!==storedOtp) {
            winstonWarn('OTP verification failed - incorrect OTP', { email })
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.INCORRECT_OTP)
        }

        const dto = Object.assign(new UserDTO(), userData);
        const userObject = mapper.map(dto, UserDTO, UserEntity);
        
        const user = await this._userRepository.create(userObject)

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
            console.error(error);
            throw generateHttpError(httpStatusCodes.INTERNAL_SERVER_ERROR, Messages.OTP_ERROR)
        }
    }

    async assignRole(role:string, email:string) : Promise<{userRole:string}> {
        let user = await this._userRepository.findByEmail(email)
        if(!user) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }        
        await this._userRepository.updateUserRole(user.email, role)

        return {userRole: role}
    }

    async login(email:string, password:string): Promise<{accessToken: string, refreshToken: string, user:UserType}> {
        let user = await this._userRepository.findByEmail(email)
        if(!user) {
            winstonWarn('Login failed - user not found', { email })
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }

        if(user.isBlocked) {
            winstonWarn('Login attempt for blocked user', { email, userId: user._id })
            throw generateHttpError(httpStatusCodes.FORBIDDEN, Messages.USER_BLOCKED)
        }

        if(!user.password) {
            winstonWarn('Login failed - attempted on Google account without password', { email, userId: user._id })
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.GOOGLE_ACC_FP)
        }

        const checkPassword = await bcrypt.compare(password, user.password as string)
        if(!checkPassword) {
            winstonWarn('Login failed - incorrect password', { email, userId: user._id })
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.INCORRECT_PASSWORD)
        }

        let accessToken = await generateAccessToken(user._id as ObjectId)
        let refreshToken = await generateRefreshToken(user._id as ObjectId)
        
        return {accessToken, refreshToken, user}
    }

    async googleAuth(user: GoogleAuthUserType): Promise<SigninResponse> {
        const userExisted = await this._userRepository.findByEmail(user.email)
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

            const userData = await this._userRepository.create(userObject)

            const accessToken = await generateAccessToken(userData._id as ObjectId)
            const refreshToken = await generateRefreshToken(userData._id as ObjectId)

            return {accessToken, refreshToken, user: userData}
        }
    }

    async forgotPassword(email: string): Promise<void> {
        const checkUser = await this._userRepository.findByEmail(email)
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
            console.error(error);
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
        const user = await this._userRepository.findByEmail(email)
        if(!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }
        user.password = await bcrypt.hash(password, 10)
        await this._userRepository.updateUser(user)
        return {user}
    }

    async updateProfile(id: string, profileImage: FileType | undefined): Promise<{user: UserType}> {        
        if (!profileImage) {            
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, "Profile image is required")
        }

        const imageURL = await handleProfileImageUpload(profileImage.buffer)
        
        const user = await this._userRepository.findById(id);

        if (!user) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }

        user.profilePicture = imageURL;
        await this._userRepository.updateUser(user);
        return {user}
    }

    async getProfileImage(userId: string): Promise<{ user: UserType; }> {
        const user = await this._userRepository.findById(userId)
        if(!user) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }
        return {user}
    }

    async editUserName(userId: string, name: string): Promise<{ userName: string; }> {
        const user = await this._userRepository.findById(userId)
        if(!user) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }

        user.name = name
        await this._userRepository.updateUser(user)
        const userName = user.name
        return {userName}
    }

    async addMoreInfo(userId: string, userData: Partial<IFreelancerDetail>): Promise<{ userDetails: Partial<IFreelancerDetail>; }> {        
        const user = await this._userRepository.findById(userId)

        if(!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }

        const dto = Object.assign(new FreelancerDetailDTO(), userData)
        const mappedEntity = mapper.map(dto, FreelancerDetailDTO, FreelancerDetailEntity)

        const tempObject: Partial<IFreelancerDetail> = {
            ...mappedEntity,
            user_id: new mongoose.Types.ObjectId(userId) as unknown as mongoose.Schema.Types.ObjectId,
            proficient_languages: userData.proficient_languages,
            skills: userData.skills
        };

        const userDetails = await this._userRepository.addMoreInfo(tempObject)
        return {userDetails}
    }

    async updateMoreInfo(userId: string, userData: Partial<IFreelancerDetail>): Promise<{ userDetails: Partial<IFreelancerDetail> }> {
        const user = await this._userRepository.findById(userId);
        if (!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND);
        }
    
        const existingDetails = await this._userRepository.findDetailsByUserId(userId);
        if (!existingDetails) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, "Freelancer details not found.");
        }

        const mergedData: Partial<IFreelancerDetail> = {
            ...existingDetails,
            ...userData,
        };

        const dto = Object.assign(new FreelancerDetailDTO(), mergedData);
        const mappedEntity = mapper.map(dto, FreelancerDetailDTO, FreelancerDetailEntity);

        const updatedData: Partial<IFreelancerDetail> = {
            ...mappedEntity,
            user_id: new mongoose.Types.ObjectId(userId) as unknown as mongoose.Schema.Types.ObjectId,
            proficient_languages: userData.proficient_languages,
            skills: userData.skills,
        };
    
        const userDetails = await this._userRepository.updateMoreInfo(userId, updatedData);
        return { userDetails };
    }    

    async getMoreInfo(userId: string): Promise<{ userDetails: IFreelancerDetail }> {
        const userDetails = await this._userRepository.findDetailsByUserId(userId)
        if(!userDetails) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.DETAILS_NOT_FOUND_F)
        }

        return {userDetails}
    }

    async getUserData(userId: string): Promise<{ user: UserType; }> {
        const user = await this._userRepository.findById(userId)
        if(!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }
        
        return {user}
    }

    async updateUserSubStatus(userId: string, planName: string): Promise<void> {        
        if(!userId || !planName) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.DATA_NOT_FOUND)
        } 

        const user = await this._userRepository.findById(userId)
        if(!user) {            
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }

        user.subscriptionType = planName
        await this._userRepository.updateUser(user)
    }

    async refreshToken(token: string): Promise<string> {
        const payload = await verifyToken(token)
        if(!payload) {
            throw generateHttpError(httpStatusCodes.FORBIDDEN, Messages.INVALID_TOKEN)
        }

        const user = await this._userRepository.findById(payload.userId)
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