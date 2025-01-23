import { UserType } from "../../types/Type";

export interface IUserRepository {
    create(user: UserType): Promise<UserType>;
    findByEmail(email: string): Promise<UserType | null >;
}