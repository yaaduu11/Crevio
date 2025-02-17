import { IUserRepository } from "../interfaces/user/IUserRepository";
import { UserType } from "../types/Type";
import User from '../models/UserSchema'
import { ObjectId } from "mongoose";

class UserRepository implements IUserRepository {

    async create(user: UserType): Promise<UserType> {
        try{
            const userData = await User.create(user)
            return userData 
        }catch (err) {
            console.error(err);
            throw new Error("Error when crea    ting the user");
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

    async updateUserRole(email: string, role: string): Promise<void> {
        try {
            await User.updateOne({ email }, { $set: { role } });
        } catch (error) {
            console.error(error);
            throw new Error("Error when updating the user's role");
        }
    }
    
}

export default new UserRepository