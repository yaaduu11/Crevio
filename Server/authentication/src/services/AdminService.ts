import bcrypt from 'bcryptjs'
import { ObjectId } from "mongoose";
import { IAdminRepository } from "../interfaces/admin/IAdminRepository";
import { IAdminService } from "../interfaces/admin/IAdminService";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwtToken";
import { generateHttpError } from "../utils/httpError";
import { httpStatusCodes } from "../constants/statusCodes";
import { Messages } from "../constants/messages";
import { UserType } from '../types/Type';


export class AdminService implements IAdminService {
    constructor(private adminRepository: IAdminRepository) {}

    async signin(email: string, password: string): Promise<{accessToken: string, refreshToken: string, admin: UserType}> {        
        let admin = await this.adminRepository.findByEmail(email)        
        if(!admin) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.ADMIN_NOT_FOUND)
        }

        const checkPassword = await bcrypt.compare(password, admin.password as string)
        
        if(!checkPassword) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.INCORRECT_PASSWORD)
        }

        let accessToken = await generateAccessToken(admin?._id as ObjectId)
        let refreshToken = await generateRefreshToken(admin?._id as ObjectId)
        
        return {accessToken, refreshToken, admin}
    }

    async getFreelancers(userId: string): Promise<{ freelancers: UserType[]; }> {
        const isAdmin = await this.adminRepository.verifyAdmin(userId)
        if(!isAdmin) {
            throw generateHttpError(httpStatusCodes.UNAUTHORIZED, Messages.NO_ACCESS)
        }
        const freelancers = await this.adminRepository.getFreelancers()
        return {freelancers}
    }

    async getClients(userId: string): Promise<{ clients: UserType[]; }> {
        const isAdmin = await this.adminRepository.verifyAdmin(userId)
        if(!isAdmin){
            throw generateHttpError(httpStatusCodes.UNAUTHORIZED, Messages.NO_ACCESS)
        }
        const clients = await this.adminRepository.getClients()
        return {clients}
    }

    async clientBlockUnblock(userId: string): Promise<void> {
        const client = await this.adminRepository.findById(userId)        
        if(!client) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }
        client.isBlocked = !client.isBlocked;        
        await this.adminRepository.save(client)
    }

    async freelancerBlockUnblock(userId: string): Promise<void> {
        const freelancer = await this.adminRepository.findById(userId)
        if(!freelancer) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }
        freelancer.isBlocked = !freelancer.isBlocked
        await this.adminRepository.save(freelancer)
    }
}