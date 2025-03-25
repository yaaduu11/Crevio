import { IUserRepository } from "../interface/user-repository.interface";
import { IFreelancerDetail, UserType } from "../../types";
import User from '../../models/user.model'
import FreelancerDetail from "../../models/freelancer-detail.model";

class UserRepository implements IUserRepository {

    async create(user: UserType): Promise<UserType> {
        try{
            const userData = await User.create(user)
            return userData 
        }catch (err) {
            console.error(err);
            throw new Error("Error when creating the user");
        }
    }

    async addMoreInfo(userData: Partial<IFreelancerDetail>): Promise<Partial<IFreelancerDetail>> {
        try {
            const userDetails = await FreelancerDetail.create(userData)
            return userDetails
        } catch (error) {
            throw new Error("Error when adding more info")
        }
    }

    async findDetailsByUserId(userId: string): Promise<IFreelancerDetail | null> {
        try {
            const userDetails = await FreelancerDetail.findOne({user_id: userId})
            return userDetails
        } catch (error) {
            throw new Error("error finding the freelancer details")
        }
    }

    async findByEmail(email: string): Promise<UserType | null> {
        try {
            const data = await User.findOne({email})
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("Error when finding the user by email");
        }
    }

    async findById(Id: string): Promise<UserType | null> {
        try {
            const data = await User.findById(Id)
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("Error when finding the user by id");
        }
    }

    async findUserRole(email: string): Promise<boolean> {
        const data = await User.findOne({email})
        if(data?.role !== 'freelancer' && data?.role !=='client' && data?.role !== 'admin') return true
        return false
    }

    async updateUserRole(email: string, role: string): Promise<void> {
        try {
            await User.updateOne({ email }, { $set: { role } });
        } catch (error) {
            console.error(error);
            throw new Error("Error when updating the user's role");
        }
    }

    async updateUser(user: UserType): Promise<void> {
        try {
            await User.findByIdAndUpdate(user._id, user)
        } catch (error) {
            console.error(error);
            throw new Error("Error when updating the user");
        }
    }
    
}

export default new UserRepository