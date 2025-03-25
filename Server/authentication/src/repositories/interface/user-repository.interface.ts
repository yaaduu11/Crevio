import { ObjectId } from "mongoose";
import { UserType } from "../../types";
import { IFreelancerDetail } from "../../types";

export interface IUserRepository {
    create(user: UserType): Promise<UserType>;
    addMoreInfo(userData: Partial<IFreelancerDetail>): Promise<Partial<IFreelancerDetail>>;
    updateMoreInfo(userId: string, userData: Partial<IFreelancerDetail>): Promise<Partial<IFreelancerDetail>>;
    findDetailsByUserId(userId: string): Promise<IFreelancerDetail | null>;
    findByEmail(email: string): Promise<UserType | null >;
    findById(Id: string): Promise<UserType | null >;
    findUserRole(email:string): Promise<boolean>;
    updateUserRole(email: string, role: string) : Promise<void>;
    updateUser(user: UserType): Promise<void>;
}