import mongoose from "mongoose";
import { httpStatusCodes, messages } from "../../constants";
import { IUserRepository } from "../../repositories/interface/user-respository.interface";
import { ApplyFileType, FileType, ProjectType } from "../../types";
import { generateHttpError } from "../../utils/http-error.util";
import { IUserService } from "../interface/user-service.interface";
import { handleProfileImageUpload, handlePDFUpload } from "../../config";
import { ApplicationType } from "../../models/applicants.model";

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

        const parsedSkills = typeof formData.skills === 'string' ? JSON.parse(formData.skills) : formData.skills;
        
        const projectData = {
            title: formData.title,
            thumbnail: imageURL,
            description: formData.description,
            category: formData.category,
            skills: parsedSkills,
            deadline: formData.deadline,
            additional_info: formData.additional_info,
            applicants: [],
            userId: new mongoose.Types.ObjectId(userId),
        };

        console.log('Project Data:', projectData);
        
        const createdProject = await this._userRepository.createProject(projectData);
        return { createdProject };
    }

    async allProjects(): Promise<{ projects: ProjectType[]; }> {
        const {projects} = await this._userRepository.findAllProjects()

        return {projects}
    }

    async allProjectsById(userId: string): Promise<{ projects: ProjectType[] }> {
        if(!userId) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, messages.DATA_EMPTY)
        }

        const {projects} = await this._userRepository.findProjectsByUserId(userId)

        return {projects}
    }

    // async applyToProject(userId: string, projectId: string): Promise<void> {
    //     if (!userId || !projectId) {
    //         throw generateHttpError(httpStatusCodes.BAD_REQUEST, messages.DATA_EMPTY);
    //     }

    //     const { project } = await this._userRepository.findProjectById(projectId);

    //     if (!project) {
    //         throw generateHttpError(httpStatusCodes.NOT_FOUND, "Project not found");
    //     }

    //     const alreadyApplied = project.applicants.some(app => app.userId.toString() === userId);
    //     if (alreadyApplied) {
    //         throw generateHttpError(httpStatusCodes.CONFLICT, "You already applied to this project");
    //     }

    //     const applicant = {
    //         userId: new mongoose.Types.ObjectId(userId),
    //         appliedAt: new Date()
    //     };

    //     await this._userRepository.findProjectByIdAndUpdate(projectId, applicant);
    //     console.log('service okayy');
    // }

    async applyToProject(data: ApplyFileType):Promise<void> {
        if(!data) {
            throw generateHttpError(httpStatusCodes.BAD_REQUEST, messages.DATA_EMPTY)
        }

        const { userId, projectId, coverLetter, resume } = data;

        const hasUserApplied = await this._userRepository.hasUserAlreadyApplied(userId, projectId)

        if(!hasUserApplied) {
            throw generateHttpError(httpStatusCodes.CONFLICT, "You already applied to this project");
        }

        let resumeUrl: string = '';
        if (resume && resume.buffer) resumeUrl = await handlePDFUpload(resume.buffer);
        else throw generateHttpError(httpStatusCodes.BAD_REQUEST, "Resume file is missing or invalid.");

        const applicationData : ApplyFileType = {
            userId,
            projectId,
            coverLetter,
            resumeUrl,
        };

        await this._userRepository.create(applicationData)
    }
}