import { UserType } from "../../types";

export interface IAdminService {
    signin(email: string, password: string) : Promise<{accessToken: string, refreshToken:string, admin:UserType}>;
    getFreelancers(userId:string): Promise<{freelancers: UserType[]}>;
    getClients(userId:string): Promise<{clients: UserType[]}>;
    clientBlockUnblock(userId: string): Promise<void>;
    freelancerBlockUnblock(userId: string): Promise<void>;
}