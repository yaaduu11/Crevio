import { ObjectId } from "mongoose";
import { UserType } from "../../types/Type"

export interface IAdminRepository {
    findByEmail(email: string) : Promise<UserType | null>;
    verifyAdmin(Id: string): Promise<boolean >;
    getFreelancers(): Promise<UserType[]>
    getClients(): Promise<UserType[]>
}