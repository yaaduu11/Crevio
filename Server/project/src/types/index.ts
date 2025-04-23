export interface ProjectType {
    title: string;
    thumbnail: File | null;
    description: string;
    category: string;
    skills: string[];
    deadline: string;
    additional_info: string;
}