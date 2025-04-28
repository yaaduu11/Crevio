import { ProjectType } from "../../types";

export interface IUserService {
    addProject(formData: ProjectType, userId: string): Promise<{ createdProject: Partial<ProjectType> }>
}