import { httpStatusCodes, messages } from "../../constants";
import { IUserRepository } from "../../repositories/interface/user-respository.interface";
import { ProjectType } from "../../types";
import { generateHttpError } from "../../utils/http-error.util";
import { IUserService } from "../interface/user-service.interface";


export class UserService implements IUserService {
    constructor(private _userRepository: IUserRepository) {}

    // async addProject(formData: ProjectType): Promise<{ project: ProjectType; }> {
    //     if(!formData) {
    //         throw generateHttpError(httpStatusCodes.BAD_REQUEST, messages.DATA_EMPTY)
    //     }


    //     return 'f'
    // }
}