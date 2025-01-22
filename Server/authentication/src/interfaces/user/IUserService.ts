import { UserType } from "../../types/Type";

export interface IUserService { 
    register(user: UserType): Promise<string>;
}