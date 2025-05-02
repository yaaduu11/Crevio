import mongoose from "mongoose";
import { httpStatusCodes, messages } from "../../constants";
import { IUserRepository } from "../../repositories/interface/user-respository.interface";
import { FileType, ProjectType } from "../../types";
import { generateHttpError } from "../../utils/http-error.util";
import { IUserService } from "../interface/user-service.interface";
import { handleProfileImageUpload } from "../../config";


export class UserService implements IUserService {
    constructor(private _userRepository: IUserRepository) {}

    async addProject(formData: ProjectType, thumbnail: FileType | undefined, userId: string): Promise<{ createdProject: Partial<ProjectType> }> {
        if (!formData) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, messages.DATA_EMPTY);
        }

        let imageURL: string = '';
        if(thumbnail) {
            if(thumbnail.buffer) {
                imageURL = await handleProfileImageUpload(thumbnail.buffer);
            }else{
                throw generateHttpError(httpStatusCodes.BAD_REQUEST, "Thumbnail buffer is missing.");
            }
        }

        const projectData = {
            title: formData.title,
            thumbnail: imageURL,
            description: formData.description,
            category: formData.category,
            skills: formData.skills,
            deadline: formData.deadline,
            additional_info: formData.additional_info,
            applicants: [],
            userId: new mongoose.Types.ObjectId(userId),
        };

        console.log('Project Data:', projectData);
        
        const createdProject = await this._userRepository.createProject(projectData);
        return { createdProject };
    }
}