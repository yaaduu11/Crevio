import { IUserRepository } from "../interface/user-respository.interface";
import Project from '../../models/project.model';
import { ProjectType } from "../../types/index";
import mongoose from "mongoose";

class UserRepository implements IUserRepository {
    async createProject(projectData: ProjectType & { userId: mongoose.Types.ObjectId }): Promise<ProjectType> {
        return await Project.create(projectData);
    }

    async findAllProjects(): Promise<{ projects: ProjectType[]; }> {
        try {
            const projects = await Project.find({}).lean().exec();
            return {projects}
        } catch (error) {
            console.error(error);
            throw new Error("Error when finding the projects");
        }
    }

    async findProjectsByUserId(userId: string): Promise<{ projects: ProjectType[]; }> {
        try {
            const projects = await Project.find({ userId }).lean().exec();
            return {projects}
        } catch (error) {
            console.error(error);
            throw new Error("Error when finding the projects by userId");
        }
    }
}

export default new UserRepository;
