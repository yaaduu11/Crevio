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

    async findProjectById(projectId: string): Promise<{ project: ProjectType | null }> {
        try {
            const project = await Project.findById(projectId).lean().exec()

            return { project: project as ProjectType | null };
        } catch (error) {
            console.error(error);
            throw new Error("Error when finding the project by Id")
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

    async findProjectByIdAndUpdate(projectId: string, applicant: { userId: mongoose.Types.ObjectId; appliedAt: Date }): Promise<boolean> {
        try {
            await Project.findByIdAndUpdate(
                projectId,
                { $push: { applicants: applicant } },
                { new: true }
            ).exec();
            return true;
        } catch (error) {
            console.error();
            throw new Error("Error when updating project")
        }
    }
}

export default new UserRepository;
