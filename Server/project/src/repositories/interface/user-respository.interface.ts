import mongoose from "mongoose";
import {ProjectType} from "../../types/index";

export interface IUserRepository {
    createProject(projectData: ProjectType & { userId: mongoose.Types.ObjectId }): Promise<ProjectType>;
    findAllProjects(): Promise<{projects: ProjectType[]}>
    findProjectById(projectId: string): Promise<{project: ProjectType | null}>
    findProjectsByUserId(userId: string): Promise<{projects: ProjectType[]}>
    findProjectByIdAndUpdate(projectId: string, applicant: { userId: mongoose.Types.ObjectId; appliedAt: Date }): Promise<boolean>;
}