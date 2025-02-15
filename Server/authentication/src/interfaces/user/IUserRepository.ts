import { ObjectId } from "mongoose";
import { UserType } from "../../types/Type";

export interface IUserRepository {
    create(user: UserType): Promise<UserType>;
    findByEmail(email: string): Promise<UserType | null >;
    findById(Id: string): Promise<UserType | null >;
    updateUserRole(email: string, role: string) : Promise<void>;
}