import mongoose from "mongoose";
import { httpStatusCodes, messages } from "../../constants";
import { IUserRepository } from "../../repositories/interface/user-respository.interface";
import { ProjectType } from "../../types";
import { generateHttpError } from "../../utils/http-error.util";
import { IUserService } from "../interface/user-service.interface";


export class UserService implements IUserService {
    constructor(private _userRepository: IUserRepository) {}

    async addProject(formData: ProjectType, userId: string): Promise<{ createdProject: Partial<ProjectType> }> {
        if (!formData) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, messages.DATA_EMPTY);
        }

        const projectData = {
            title: formData.title,
            thumbnail: formData.thumbnail,
            description: formData.description,
            category: formData.category,
            skills: formData.skills,
            deadline: formData.deadline,
            additional_info: formData.additional_info,
            applicants: [],
            userId: new mongoose.Types.ObjectId(userId),
        };

        console.log('heeeeeeeeeeeey', projectData);
        
        const createdProject = await this._userRepository.createProject(projectData);
        return { createdProject };
    }
}