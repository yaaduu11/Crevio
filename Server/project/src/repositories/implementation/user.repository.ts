import { IUserRepository } from "../interface/user-respository.interface";
import Project from '../../models/project.model';
import { ProjectType } from "../../types/index";
import mongoose from "mongoose";

class UserRepository implements IUserRepository {
    async createProject(projectData: Partial<ProjectType> & { userId: mongoose.Types.ObjectId }): Promise<ProjectType> {
        return await Project.create(projectData);
    }
}

export default new UserRepository;
