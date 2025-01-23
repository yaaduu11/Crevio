import bcrypt from 'bcryptjs'

import { httpStatusCodes } from '../constants/statusCodes';
import { Messages } from '../constants/messages';
import { IUserRepository } from "../interfaces/user/IUserRepository";
import { IUserService } from "../interfaces/user/IUserService";
import { UserType } from '../types/Type';
import { env } from '../config/env';

export class UserService implements IUserService {
    constructor(
        private userRepository : IUserRepository
    ) {}

    async register(user: UserType): Promise<string> {
        const existingUser = await this.userRepository.findByEmail(user.email)

        if (existingUser) {
            throw new Error("User already exists with this email id");
        }


        return 'f'
    }
}