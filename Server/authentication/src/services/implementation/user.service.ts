import bcrypt from 'bcryptjs'
import mongoose, { ObjectId } from 'mongoose';
import { transporter, env, redisClient, handleProfileImageUpload } from '../../config';
import { Messages, httpStatusCodes } from '../../constants';
import { FileType, GoogleAuthUserType, IFreelancerDetail, SigninResponse, UserType } from '../../types';
import { generateOtp, generateOtpHtmlTemplate, generateHttpError, generateAccessToken, generateRefreshToken, verifyToken } from '../../utils';
import { IUserRepository } from "../../repositories/interface/user-repository.interface";
import { IUserService } from "../../services/interface/user-service.interface";

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
            console.error(err);
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
            console.error(error);
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
        const user = await this.userRepository.findByEmail(email)
        if(!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }
        user.password = await bcrypt.hash(password, 10)
        await this.userRepository.updateUser(user)
        return {user}
    }

    async updateProfile(id: string, profileImage: FileType | undefined): Promise<{user: UserType}> {        
        if (!profileImage) {            
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, "Profile image is required")
        }

        const imageURL = await handleProfileImageUpload(profileImage.buffer)
        
        const user = await this.userRepository.findById(id);

        if (!user) {
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

    async addMoreInfo(userId: string, userData: Partial<IFreelancerDetail>): Promise<{ userDetails: Partial<IFreelancerDetail>; }> {        
        const user = await this.userRepository.findById(userId)

        if(!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }

        const tempObject: Partial<IFreelancerDetail> = {
            user_id: new mongoose.Types.ObjectId(userId) as unknown as mongoose.Schema.Types.ObjectId,
            profession: userData.profession ?? "",
            company: userData.company ?? "",
            qualification: userData.qualification ?? "",
            bio: userData.bio ?? "",
            work_experience: userData.work_experience ?? "",
            proficient_languages: userData.proficient_languages ?? [],
            skills: userData.skills ?? [],
            working_days: userData.working_days ?? "",
            active_hours: userData.active_hours ?? "",
            basic_price: userData.basic_price ?? 0,
            standard_price: userData.standard_price ?? 0,
            premium_price: userData.premium_price ?? 0,
            portfolio: userData.portfolio ?? "nil",
            linkedin: userData.linkedin ?? "nil",
            twitter: userData.twitter ?? "nil",
        };
        const userDetails = await this.userRepository.addMoreInfo(tempObject)
        return {userDetails}
    }

    async updateMoreInfo(userId: string, userData: Partial<IFreelancerDetail>): Promise<{ userDetails: Partial<IFreelancerDetail> }> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND);
        }
    
        const existingDetails = await this.userRepository.findDetailsByUserId(userId);
        if (!existingDetails) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, "Freelancer details not found.");
        }
    
        const updatedData: Partial<IFreelancerDetail> = {
            profession: userData.profession ?? existingDetails.profession,
            company: userData.company ?? existingDetails.company,
            qualification: userData.qualification ?? existingDetails.qualification,
            bio: userData.bio ?? existingDetails.bio,
            work_experience: userData.work_experience ?? existingDetails.work_experience,
            proficient_languages: userData.proficient_languages ?? existingDetails.proficient_languages,
            skills: userData.skills ?? existingDetails.skills,
            working_days: userData.working_days ?? existingDetails.working_days,
            active_hours: userData.active_hours ?? existingDetails.active_hours,
            basic_price: userData.basic_price ?? existingDetails.basic_price,
            standard_price: userData.standard_price ?? existingDetails.standard_price,
            premium_price: userData.premium_price ?? existingDetails.premium_price,
            portfolio: userData.portfolio ?? existingDetails.portfolio,
            linkedin: userData.linkedin ?? existingDetails.linkedin,
            twitter: userData.twitter ?? existingDetails.twitter,
        };
    
        const userDetails = await this.userRepository.updateMoreInfo(userId, updatedData);
        return { userDetails };
    }    

    async getMoreInfo(userId: string): Promise<{ userDetails: IFreelancerDetail }> {
        const userDetails = await this.userRepository.findDetailsByUserId(userId)
        if(!userDetails) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.DETAILS_NOT_FOUND_F)
        }

        return {userDetails}
    }

    async getUserData(userId: string): Promise<{ user: UserType; }> {
        const user = await this.userRepository.findById(userId)
        if(!user) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }
        
        return {user}
    }

    async updateUserSubStatus(userId: string, planName: string): Promise<void> {        
        if(!userId || !planName) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.DATA_NOT_FOUND)
        } 

        const user = await this.userRepository.findById(userId)
        if(!user) {            
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.USER_NOT_FOUND)
        }

        user.subscriptionType = planName
        await this.userRepository.updateUser(user)
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