import mongoose from "mongoose";
import {ApplyFileType, ProjectType} from "../../types/index";
import { ApplicationType } from '../../models/applicants.model';

export interface IUserRepository {
    createProject(projectData: ProjectType & { userId: mongoose.Types.ObjectId }): Promise<ProjectType>;
    create(data: ApplyFileType): Promise<ApplicationType>
    findAllProjects(): Promise<{projects: ProjectType[]}>
    findProjectById(projectId: string): Promise<{project: ProjectType | null}>
    findProjectsByUserId(userId: string): Promise<{projects: ProjectType[]}>
    findProjectByIdAndUpdate(projectId: string, applicant: { userId: mongoose.Types.ObjectId; appliedAt: Date }): Promise<boolean>;
    hasUserAlreadyApplied(userId: string, projectId: string): Promise<boolean>
}

