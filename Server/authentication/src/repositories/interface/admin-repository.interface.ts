import { ObjectId } from "mongoose";
import { UserType } from "../../types"

export interface IAdminRepository {
    findByEmail(email: string) : Promise<UserType | null>;
    findById(userId: string): Promise<UserType | null>;
    verifyAdmin(Id: string): Promise<boolean >;
    getFreelancers(): Promise<UserType[]>
    getClients(): Promise<UserType[]>
    save(user:UserType): Promise<boolean>;
}