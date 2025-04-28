import mongoose from "mongoose";
import {ProjectType} from "../../types/index";

export interface IUserRepository {
    createProject(projectData: Partial<ProjectType> & { userId: mongoose.Types.ObjectId }): Promise<ProjectType>;
}