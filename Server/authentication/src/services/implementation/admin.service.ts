import bcrypt from 'bcryptjs'
import { ObjectId } from "mongoose";
import { IAdminRepository } from "../../repositories/interface/admin-repository.interface";
import { IAdminService } from "../../services/interface/admin-service.interface";
import { redisClient } from '../../config';
import { Messages, httpStatusCodes } from "../../constants";
import { UserType } from '../../types';
import { generateAccessToken, generateRefreshToken, verifyToken, generateHttpError } from "../../utils";
import { IFreelancerDetail } from '../../types';


export class AdminService implements IAdminService {
    constructor(private _adminRepository: IAdminRepository) {}

    async signin(email: string, password: string): Promise<{accessToken: string, refreshToken: string, admin: UserType}> {        
        let admin = await this._adminRepository.findByEmail(email)        
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
        const isAdmin = await this._adminRepository.verifyAdmin(userId)
        if(!isAdmin) {
            throw generateHttpError(httpStatusCodes.UNAUTHORIZED, Messages.NO_ACCESS)
        }
        const freelancers = await this._adminRepository.getFreelancers()
        return {freelancers}
    }

    async getClients(userId: string): Promise<{ clients: UserType[]; }> {
        const isAdmin = await this._adminRepository.verifyAdmin(userId)
        if(!isAdmin){
            throw generateHttpError(httpStatusCodes.UNAUTHORIZED, Messages.NO_ACCESS)
        }
        const clients = await this._adminRepository.getClients()
        return {clients}
    }

    async clientBlockUnblock(userId: string): Promise<void> {
        const client = await this._adminRepository.findById(userId)        
        if(!client) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }
        client.isBlocked = !client.isBlocked;        
        await this._adminRepository.save(client)
        if(client.isBlocked) {
            if(client._id) await redisClient.set(client._id.toString(), JSON.stringify(client.isBlocked))
        }else{
            if(client._id) await redisClient.del(client._id.toString())
        }
    }

    async freelancerBlockUnblock(userId: string): Promise<void> {
        const freelancer = await this._adminRepository.findById(userId)
        if(!freelancer) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, Messages.USER_NOT_FOUND)
        }
        freelancer.isBlocked = !freelancer.isBlocked
        await this._adminRepository.save(freelancer)
        if(freelancer.isBlocked) {
            if(freelancer._id) await redisClient.set(freelancer._id.toString(), JSON.stringify(freelancer.isBlocked)) 
        }else{
            if(freelancer._id) await redisClient.del(freelancer._id.toString()) 
        }
    }

    async getMoreInfo(userId: string): Promise<{ userDetails: IFreelancerDetail }> {
        console.log('in serv');
        console.log(userId);
        
        const userDetails = await this._adminRepository.findDetailsByUserId(userId)
        console.log('got it in ser', userDetails);
        
        if(!userDetails) {
            throw generateHttpError(httpStatusCodes.NOT_FOUND, Messages.DETAILS_NOT_FOUND_F)
        }
        console.log('in ser okkkk');
        console.log('details', userDetails);
        
        return {userDetails}
    }
}