import { FileType, ProjectType } from "../../types";

export interface IUserService {
    addProject(formData: ProjectType, thumbnail: FileType | undefined, userId: string): Promise<{ createdProject: Partial<ProjectType> }>
}