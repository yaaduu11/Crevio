import { IUserRepository } from "../interfaces/user/IUserRepository";
import { UserType } from "../types/Type";
import User from '../models/UserSchema'

class UserRepository implements IUserRepository {

    async create(user: UserType): Promise<UserType> {
        try{
            const userData = await User.create(user)
            return userData 
        }catch (err) {
            console.error(err);
            throw new Error("Error creating user");
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

}

export default new UserRepository