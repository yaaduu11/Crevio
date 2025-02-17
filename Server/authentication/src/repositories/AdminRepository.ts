import { IAdminRepository } from "../interfaces/admin/IAdminRepository";
import { UserType } from "../types/Type";
import User from "../models/UserSchema";
import e from "express";
import { ObjectId } from "mongoose";

class AdminRepository implements IAdminRepository {
    
    async findByEmail(email: string): Promise<UserType | null> {
        try {
            const data = await User.findOne({email})
            return data
        } catch (error) {
            console.log(error);
            throw new Error("Error when finding the admin");

        }
    }

    async verifyAdmin(Id: string): Promise<boolean> {
        try {
            const data = await User.findById(Id)
            return data?.role == 'admin'
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getFreelancers(): Promise<UserType[]> {
        try {
            const freelancers = await User.find({role:"freelancer"})
            return freelancers
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async getClients(): Promise<UserType[]> {
        try {
            const clients = await User.find({role: 'client'})
            return clients
        }catch(error) {
            console.log(error);
            return []
        }
    }
}

export default new AdminRepository