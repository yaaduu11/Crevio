import { ApplyFileType, FileType, ProjectType, UserType } from "../../types";

export interface IUserService {
    addProject(formData: ProjectType, thumbnail: FileType | undefined, userId: string): Promise<{ createdProject: Partial<ProjectType> }>
    allProjects(): Promise<{projects: ProjectType[]}>
    allProjectsById(userId: string): Promise<{projects: ProjectType[]}>
    // applyToProject(userId: string, projectId: string): Promise<void>;
    applyToProject(data: ApplyFileType): Promise<void>;
    // getApplicants(projectId: string): Promise<{applicants: UserType[]}>

}