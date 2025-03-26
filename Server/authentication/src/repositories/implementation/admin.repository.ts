import { IAdminRepository } from "../interface/admin-repository.interface";
import { UserType } from "../../types";
import User from "../../models/user.model";
import { IFreelancerDetail } from "../../types";
import FreelancerDetail from "../../models/freelancer-detail.model";


class AdminRepository implements IAdminRepository {
    
    async findByEmail(email: string): Promise<UserType | null> {
        try {
            const data = await User.findOne({email})
            return data
        } catch (error) {
            console.error(error);
            throw new Error("Error when finding the admin");

        }
    }

    async verifyAdmin(Id: string): Promise<boolean> {
        try {
            const data = await User.findById(Id)
            return data?.role == 'admin'
        } catch (error) {
            console.error(error);
            return false
        }
    }

    async getFreelancers(): Promise<UserType[]> {
        try {
            const freelancers = await User.find({role:"freelancer"})
            return freelancers
        } catch (error) {
            console.error(error);
            return []
        }
    }

    async getClients(): Promise<UserType[]> {
        try {
            const clients = await User.find({role: 'client'})
            return clients
        }catch(error) {
            console.error(error);
            return []
        }
    }

    async findById(userId: string): Promise<UserType | null> {
        try {
            const client = await User.findById(userId)
            return client
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async save(user: UserType): Promise<boolean> {
        try {
            await User.findByIdAndUpdate(user._id, user)            
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    }

    async findDetailsByUserId(userId: string): Promise<IFreelancerDetail | null> {
        try {
            console.log('in repo');
            const userDetails = await FreelancerDetail.findOne({user_id: userId})
            console.log('finded');
            console.log('finded data', userDetails);
            
            return userDetails
        } catch (error) {
            throw new Error("error finding the freelancer details")
        }
    }
}

export default new AdminRepository