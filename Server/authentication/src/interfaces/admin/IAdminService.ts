import { UserType } from "../../types/Type";

export interface IAdminService {
    signin(email: string, password: string) : Promise<{accessToken: string, refreshToken:string}>;
    getFreelancers(token:string): Promise<{freelancers: UserType[]}>;
    getClients(token:string): Promise<{clients: UserType[]}>;
}