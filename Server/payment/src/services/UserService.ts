import { IUserService } from "../interfaces/user/IUserService";
import { IUserRepository } from "../interfaces/user/IUserRepository";

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}
}