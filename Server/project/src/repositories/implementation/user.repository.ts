import { IUserRepository } from "../interface/user-respository.interface";
import Project from '../../models/project.model';
import Application, { ApplicationType } from '../../models/applicants.model'
import { ApplyFileType, ProjectType, UserType } from "../../types/index";
import mongoose from "mongoose";

class UserRepository implements IUserRepository {
    async createProject(projectData: ProjectType & { userId: mongoose.Types.ObjectId }): Promise<ProjectType> {
        return await Project.create(projectData);
    }

    async create(data: ApplyFileType): Promise<ApplicationType> {
        try{
            const AppliedData = await Application.create(data)
            return AppliedData 
        }catch (err) {
            console.error(err);
            throw new Error("Error when creating the application");
        }
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
            console.error(error);
            throw new Error("Error when updating project")
        }
    }

    async hasUserAlreadyApplied(userId: string, projectId: string): Promise<boolean> {
        try {            
            const existing = await Application.findOne({
                userId: new mongoose.Types.ObjectId(userId),
                projectId: new mongoose.Types.ObjectId(projectId),
            });

            return !!existing;
        } catch (error) {
            console.error(error);
            throw new Error("Error while checking if user already applied.");
        }
    }


    // async getApplicants(projectId: string): Promise<{ applicants: UserType[]; }> {
    //     try {            
    //         const applicants = await Application.find({
    //             projectId: new mongoose.Types.ObjectId(projectId),
    //         });

    //         return !!existing;
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error("Error while checking if user already applied.");
    //     }
    // }

}

export default new UserRepository;
