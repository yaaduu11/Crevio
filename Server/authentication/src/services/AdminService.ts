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

    async signin(email: string, password: string): Promise<{accessToken: string, refreshToken: string}> {        
        let admin = await this.adminRepository.findByEmail(email)

        if(!admin) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.ADMIN_NOT_FOUND)
        }

        const checkPassword = bcrypt.compare(password, admin.password as string)
        if(!checkPassword) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.INCORRECT_PASSWORD)
        }

        let accessToken = await generateAccessToken(admin?._id as ObjectId)
        let refreshToken = await generateRefreshToken(admin?._id as ObjectId)
        return {accessToken, refreshToken}
    }

    async getFreelancers(token: string): Promise<{ freelancers: UserType[]; }> {
        const decoded = await verifyToken(token)

        const isAdmin = await this.adminRepository.verifyAdmin(decoded.userId)
        if(!isAdmin) {
            throw generateHttpError(httpStatusCodes.UNAUTHORIZED, Messages.NO_ACCESS)
        }
        const freelancers = await this.adminRepository.getFreelancers()
        return {freelancers}
    }

    async getClients(token: string): Promise<{ clients: UserType[]; }> {
        let decoded = await verifyToken(token)

        const isAdmin = await this.adminRepository.verifyAdmin(decoded.userId)
        if(!isAdmin){
            throw generateHttpError(httpStatusCodes.UNAUTHORIZED, Messages.NO_ACCESS)
        }
        const clients = await this.adminRepository.getClients()
        return {clients}
    }

}